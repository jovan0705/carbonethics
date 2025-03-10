from rest_framework import serializers
from .models import Ticket
from django.contrib.auth.models import User  # Import User model

# Serializer for the Ticket model
class TicketSerializer(serializers.ModelSerializer):
    client = serializers.PrimaryKeyRelatedField(queryset=User.objects.all())

    class Meta:
        model = Ticket
        fields = ['client', 'title', 'solution', 'ticket_id', 'status']
