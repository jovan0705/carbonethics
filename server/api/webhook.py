import json
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
import requests
from .models import Ticket
from django.contrib.auth.models import User
from .serializers import TicketSerializer

# View to handle incoming Trello webhook notifications
def send_to_zapier(client_data):
    webhook_url = 'https://hooks.zapier.com/hooks/catch/id'  # Replace with your actual Zapier Webhook URL
    response = requests.post(webhook_url, json=client_data)
    return response

@csrf_exempt
def trello_webhook(request):
    print(request.method, 'this is method')
    if request.method == "POST":
        # Parse the JSON payload from Trello
        payload = json.loads(request.body)
        
        # Example: Check if a card was moved to a certain list
        if payload['action']['type'] == 'createCard':
            ticket_id = payload['action']['data']['card']['id']
            card_name = payload['action']['data']['card']['name'].split('-')[0]
            email = payload['action']['data']['card']['name'].split('-')[1]
            status = payload['action']['data']['list']['name']
            client = User.objects.get(email=email)
            serializer = TicketSerializer(data={
                        'ticket_id': ticket_id,
                        'title': card_name,
                        'client': client.id,
                        'status': status
                    })
            if serializer.is_valid():
                serializer.save()
            else:
                print('errors:', serializer.errors)
        elif payload['action']['type'] == 'updateCard':
            ticket_id = payload['action']['data']['card']['id']
            if payload['action']['data']['listAfter']:
                status = payload['action']['data']['listAfter']['name']
                ticket = Ticket.objects.get(ticket_id=ticket_id)

                serializer = TicketSerializer(ticket, data={
                            'status': status
                        }, partial=True)
                if serializer.is_valid():
                    if status == 'Done':
                        send_to_zapier({
                            'email': payload['action']['data']['card']['name'].split('-')[1],
                            'solution': ticket.solution
                        })
                    serializer.save()
                else:
                    print('errors:', serializer.errors)
        elif payload['action']['type'] == 'commentCard': 
            ticket_id = payload['action']['data']['card']['id']
            solution = payload['action']['data']['text']
            ticket = Ticket.objects.get(ticket_id=ticket_id)

            serializer = TicketSerializer(ticket, data={
                        'solution': solution
                    }, partial=True)
            if serializer.is_valid():
                serializer.save()
            else:
                print('errors:', serializer.errors)

        # Respond to Trello with status code 200 to acknowledge receipt
        return JsonResponse({'status': 'success'}, status=200)
    elif request.method == "HEAD":
        return JsonResponse({'status': 'success'}, status=200)

    return JsonResponse({'error': 'Invalid method'}, status=405)
