from django.contrib import admin
from .models import Place

class PlaceAdmin(admin.ModelAdmin):
    # explicitly reference fields to be shown, note image_tag is read-only
    fields = ( 'title', 'description', 'image_tag', 'image', 'externalURL', 'shop')
    readonly_fields = ('image_tag',)

admin.site.register(Place, PlaceAdmin)
