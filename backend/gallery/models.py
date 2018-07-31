import os
from django.db import models
from django.conf import settings
from django.utils.safestring import mark_safe
from shop.models import Shop

class Gallery(models.Model):
  image = models.ImageField(upload_to='service', blank=True)
  externalURL = models.URLField(blank=True)
  shop = models.ForeignKey(Shop, related_name='galleries', on_delete=models.SET_DEFAULT, null=True, blank=True, default=None)
  title = models.CharField(max_length = 255, blank=True)
  description = models.TextField(blank=True)
  created_at = models.DateTimeField(auto_now_add=True)

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

    if self.title:
      title = self.title
    else:
      title = '{prefix} {number}'.format(
          prefix='Gallery',
          number=self.id
        )

    if self.image:
      print('=== image: ', str(self.image))
      title = title + ', ' + str(self.image)

    return title