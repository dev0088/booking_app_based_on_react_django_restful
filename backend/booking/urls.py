from django.conf.urls import url
from .views import BookingsList, BookingDetail, CreateBooking

urlpatterns = [
    url(r'^(?P<pk>[0-9]+)/booking/$', BookingDetail.as_view()),
    url(r'^all', BookingsList.as_view()),
    url(r'^create_booking', CreateBooking.as_view()),
]
