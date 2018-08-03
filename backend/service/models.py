import os
from django.db import models
from django.conf import settings
from django.utils.safestring import mark_safe
from djmoney.models.fields import MoneyField
from service_category.models import ServiceCategory

class Service(models.Model):
  created_at = models.DateTimeField(auto_now_add=True)
  title = models.CharField(max_length = 255)
  description = models.TextField(blank=True)
  image = models.ImageField(upload_to='service', blank=True)
  externalURL = models.URLField(blank=True)
  price = MoneyField(max_digits=14, decimal_places=2, default_currency='UAH')
  time = models.IntegerField(blank=False, default=30)
  service_category = models.ForeignKey(ServiceCategory, related_name='services', on_delete=models.SET_DEFAULT, null=True, blank=True, default=None)

  def url(self):
      # returns a URL for either internal stored or external image url
      if self.externalURL:
          return self.externalURL
      else:
          return os.path.join('/', settings.MEDIA_URL, 'service/', os.path.basename(str(self.image)))

  def image_tag(self):
      return mark_safe('<img src="{src}" width="{width}" height="{height}" />'.format(
                src=self.url(), 
                width=150,
                height=(150/self.image.width * self.image.height) 
            ))

  image_tag.short_description = 'Image'    

  def __str__(self):
    return '{category_name} -> {service_name}:  {currency} {amount} '.format(
        category_name=self.service_category.title,
        service_name=self.title,
        currency=str(self.price.currency),
        amount=str(self.price.amount)
      )

  class Meta:
    ordering = ('service_category', 'title', 'price')
    unique_together = ('title', 'id')
    managed = True