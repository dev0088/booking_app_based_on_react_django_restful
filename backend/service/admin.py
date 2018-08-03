from django.contrib import admin
from .models import Service

class ServiceAdmin(admin.ModelAdmin):
    # explicitly reference fields to be shown, note image_tag is read-only
    fields = ( 'title', 'description', 'image_tag', 'image', 'externalURL', 'price', 'time','service_category')
    readonly_fields = ('image_tag',)

admin.site.register(Service, ServiceAdmin)
