from django.contrib import admin
from .models import Gallery

class GalleryAdmin(admin.ModelAdmin):
    # explicitly reference fields to be shown, note image_tag is read-only
    fields = ( 'image_tag', 'image', 'externalURL', 'shop', 'title', 'description')
    readonly_fields = ('image_tag',)

admin.site.register(Gallery, GalleryAdmin)
