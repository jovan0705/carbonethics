import requests
from rest_framework import viewsets,status
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated, AllowAny
from .models import Ticket
from .serializers import TicketSerializer
from rest_framework_simplejwt.authentication import JWTAuthentication
from django.contrib.auth.models import User  # Import User model for creating a superuser

# Function to send client data to Zapier/Integromat
def send_to_zapier(client_data):
    webhook_url = 'https://hooks.zapier.com/hooks/catch/id'  # Replace with your actual Zapier Webhook URL
    response = requests.post(webhook_url, json=client_data)
    return response

# ViewSet for Ticket model
class TicketViewSet(viewsets.ModelViewSet):
    permission_classes = [IsAuthenticated]  # Optional: Restrict to authenticated users only
    queryset = Ticket.objects.all()  # Fetch all Ticket records
    serializer_class = TicketSerializer  # Use TicketSerializer to handle serialization

    def get_queryset(self):
        queryset = Ticket.objects.all()  # Default queryset, fetch all tickets

        # Get client ID from the query parameters
        client_id = self.request.query_params.get('client', None)

        if client_id is not None:
            queryset = queryset.filter(client_id=client_id)  # Assuming client is a ForeignKey in Ticket

        return queryset

    def perform_create(self, serializer):
        # Save the client instance
        body = self.request.data
        client_id = body.get('client')
        client = User.objects.get(id=client_id)

        # Send the client data to Zapier/Integromat
        client_data = {
            'name': client.username,
            'email': client.email,
            "ticket_name": body.get('title'),
            "ticket_description": body.get('description'),
            "team_member": ["jovangunawan.work@gmail.com"]
        }

        response = send_to_zapier(client_data)
        print("response Data: ", response.json())
        
        # You can also handle errors and responses here if needed
        if response.status_code == 200:
            print("Client data sent to Zapier successfully.")
        else:
            return Response({'message': 'Failed to send client data'}, status=status.HTTP_400_BAD_REQUEST)

        return Response(serializer.data)

# Create a superuser API view
class CreateUserView(APIView):
    authentication_classes = []  # Disable authentication for this view
    permission_classes = [AllowAny]  # Allow any user (no authentication needed)

    def post(self, request):
        body = self.request.data
        username=body.get('username')
        email=body.get('email')
        password=body.get('password')
        # Only create the superuser if it doesn't already exist
        if User.objects.filter(username=username).exists():
            return Response({'message': 'user already exists!'}, status=status.HTTP_400_BAD_REQUEST)

        try:
            # Create the superuser programmatically
            user = User.objects.create_user(
                username=username, 
                email=email, 
                password=password
            )
            return Response(
                {'message': f'User {user.username} created successfully!'}, 
                status=status.HTTP_201_CREATED
            )
        except Exception as e:
            return Response(
                {'message': f'Error creating superuser: {str(e)}'}, 
                status=status.HTTP_500_INTERNAL_SERVER_ERROR
            )
