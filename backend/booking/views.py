from django.shortcuts import render

# Create your views here.
from rest_framework import status
from rest_framework.permissions import AllowAny
from rest_framework.response import Response
from rest_framework.views import APIView

from .serializers import BookingSerializer
from .models import Booking
from authentication.models import User
from service.models import Service

class BookingsList(APIView):
    """
    List all bookings.
    """
    def get(self, request, format=None):
        bookings = Booking.objects.all()
        serializer = BookingSerializer(bookings, many=True)
        return Response(serializer.data)


class BookingDetail(APIView):
    """
    Retrieve a booking instance.
    """
    def get_object(self, pk):
        try:
            return Booking.objects.get(pk=pk)
        except Booking.DoesNotExist:
            raise Http404

    def get(self, request, pk, format=None):
        booking = self.get_object(pk)
        serializer = BookingSerializer(booking)
        return Response(serializer.data)

    def put(self, request, pk, format=None):
        booking = self.get_object(pk)
        serializer = BookingSerializer(booking, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, pk, format=None):
        booking = self.get_object(pk)
        booking.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)

class CreateBooking(APIView):
    """
    Retrieve a booking instance.
    """
    def post(self, request, format=None):
        user = User.objects.get(
            username=request.data['user']['username']
          )
        service = Service.objects.get(title=request.data['booking']['service'])
        booking_time = request.data['booking']['booking_time']
        customer_name='{first_name} {last_name}'.format(
            first_name=request.data['client']['first_name'],
            last_name=request.data['client']['last_name']
          )
        customer_email=request.data['client']['email']
        customer_phone_number=request.data['client']['phone_number']
        customer_description=request.data['client']['description']
        customer_reminder=request.data['client']['reminder']
        customer_agree=request.data['client']['agree']
        booking = Booking.objects.create(
            user=user, 
            service=service, 
            customer_name=customer_name,
            booking_time=request.data['booking']['booking_time'],
            customer_email=customer_email,
            customer_phone_number=customer_phone_number,
            customer_description=customer_description,
            customer_reminder=customer_reminder,
            customer_agree=customer_agree
          )
        booking.save
        data = {
            'id': booking.id,
        }
        return Response(data, status=status.HTTP_200_OK)

