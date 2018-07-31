import os
from django.db import models
from django.conf import settings


class Reminder(models.Model):
  interval = models.IntegerField(blank=False, default=30)
  created_at = models.DateTimeField(auto_now_add=True)
  

  def __str__(self):
    return '{interval} minutes'.format(
        interval = self.interval
      )