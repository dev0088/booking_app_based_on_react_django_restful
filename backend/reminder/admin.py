from django.contrib import admin
from .models import Reminder

class ReminderAdmin(admin.ModelAdmin):
    # explicitly reference fields to be shown, note image_tag is read-only
    fields = ('interval',)

admin.site.register(Reminder, ReminderAdmin)
