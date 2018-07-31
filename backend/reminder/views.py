from django.shortcuts import render

# Create your views here.
from rest_framework import status
from rest_framework.permissions import AllowAny
from rest_framework.response import Response
from rest_framework.views import APIView

from .serializers import ReminderSerializer
from .models import Reminder


class RemindersList(APIView):
    """
    List all reminders.
    """
    def get(self, request, format=None):
        reminders = Reminder.objects.all()
        serializer = ReminderSerializer(reminders, many=True)
        return Response(serializer.data)


class ReminderDetail(APIView):
    """
    Retrieve a reminder instance.
    """
    def get_object(self, pk):
        try:
            return Reminder.objects.get(pk=pk)
        except Reminder.DoesNotExist:
            raise Http404

    def get(self, request, pk, format=None):
        reminder = self.get_object(pk)
        serializer = ReminderSerializer(reminder)
        return Response(serializer.data)

    def put(self, request, pk, format=None):
        reminder = self.get_object(pk)
        serializer = ReminderSerializer(reminder, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, pk, format=None):
        reminder = self.get_object(pk)
        reminder.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)

