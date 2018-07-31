from django.contrib import admin
from .models import Shop

class ShopAdmin(admin.ModelAdmin):
    # explicitly reference fields to be shown, note image_tag is read-only
    fields = ( 'title', 'description', 'image_tag', 'image', 'externalURL', 'phone_number', 'email')
    readonly_fields = ('image_tag',)

admin.site.register(Shop, ShopAdmin)
