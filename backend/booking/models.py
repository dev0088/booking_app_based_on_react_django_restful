import os
from django.db import models
from django.conf import settings
from authentication.models import User
from service.models import Service


BOOKING_STATE_CHOICES = (
    ('booked', 'Booked'),
    ('accepted', 'Accepted'),
    ('declined', 'Declined'),
    ('canceled', 'Canceled'),
    ('timeout', 'Timeout'),
    ('completed', 'Completed'),
)


class Booking(models.Model):
  user = models.ForeignKey(User, related_name='bookings', on_delete=models.SET_DEFAULT, null=True, blank=True, default=None)
  service = models.ForeignKey(Service, related_name='bookings', on_delete=models.SET_DEFAULT, null=True, blank=True, default=None)
  booking_time = models.DateTimeField(blank=False)
  state = models.CharField(choices=BOOKING_STATE_CHOICES, default='Male', max_length = 255)
  review_mark = models.FloatField(blank=True, default=0.0) 
  customer_name = models.CharField(max_length = 50)
  customer_phone_number = models.CharField(max_length = 50)
  customer_email = models.EmailField(max_length = 100, unique=False)
  customer_description = models.TextField(blank=True)
  customer_reminder = models.CharField(max_length = 255)
  customer_agree = models.BooleanField(default=False)

  created_at = models.DateTimeField(auto_now_add=True)
  

  def __str__(self):
    return '{customer_name} booked "{service_name}" service to {user_name} at {booking_time}'.format(
        customer_name=self.customer_name,
        service_name=self.service.title,
        user_name=self.user.first_name + self.user.last_name,
        booking_time=str(self.booking_time)
      )