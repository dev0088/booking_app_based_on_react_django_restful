from django.shortcuts import render

# Create your views here.
from rest_framework import status
from rest_framework.permissions import AllowAny
from rest_framework.response import Response
from rest_framework.views import APIView

from .serializers import ServiceCategorySerializer
from .models import ServiceCategory


class ServiceCategoriesList(APIView):
    """
    List all service_categorys.
    """
    def get(self, request, format=None):
        service_categorys = ServiceCategory.objects.all()
        serializer = ServiceCategorySerializer(service_categorys, many=True)
        return Response(serializer.data)


class ServiceCategoryDetail(APIView):
    """
    Retrieve a service category instance.
    """
    def get_object(self, pk):
        try:
            return ServiceCategory.objects.get(pk=pk)
        except ServiceCategory.DoesNotExist:
            raise Http404

    def get(self, request, pk, format=None):
        service_category = self.get_object(pk)
        serializer = ServiceCategorySerializer(service_category)
        return Response(serializer.data)

    def put(self, request, pk, format=None):
        service_category = self.get_object(pk)
        serializer = ServiceCategorySerializer(service_category, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, pk, format=None):
        service_category = self.get_object(pk)
        service_category.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)

