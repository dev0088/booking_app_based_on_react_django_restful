from django.contrib import admin
from .models import ServiceCategory

class ServiceCategoryAdmin(admin.ModelAdmin):
    # explicitly reference fields to be shown, note image_tag is read-only
    fields = ( 'title','description', 'image_tag','image','externalURL')
    readonly_fields = ('image_tag',)

admin.site.register(ServiceCategory, ServiceCategoryAdmin)
