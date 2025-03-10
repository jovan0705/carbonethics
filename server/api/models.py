from django.db import models
from django.contrib.auth.models import User

# Create your models here.

class Ticket(models.Model):
  client = models.ForeignKey(User,on_delete=models.CASCADE)
  title = models.CharField(max_length=100)
  solution =  models.CharField(max_length=250, null=True)
  ticket_id = models.CharField(max_length=36, null=True)
  status = models.CharField(max_length=12, null=True)

  def __str__(self):
 	  return self.title
