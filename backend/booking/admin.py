from django.contrib import admin
from .models import Booking

class BookingAdmin(admin.ModelAdmin):
    # explicitly reference fields to be shown, note image_tag is read-only
    fields = ( 
	    	'user', 
	    	'service', 
	    	'booking_time', 
	    	'state', 
	    	'review_mark', 
	    	'customer_name', 
	    	'customer_phone_number', 
	    	'customer_email',
	    	'customer_description',
	    	'customer_reminder',
	    	'customer_agree'
	    )

admin.site.register(Booking, BookingAdmin)
