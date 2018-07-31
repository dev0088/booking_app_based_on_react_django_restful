from rest_framework import serializers

from .models import ServiceCategory
from service.models import Service
from service.serializers import ServiceSerializer

class ServiceCategorySerializer(serializers.ModelSerializer):
    """Serializers registration requests and creates a new user."""
    services = ServiceSerializer(many=True, read_only=True)

    class Meta:
        model = ServiceCategory
        fields = ['title', 'description', 'image', 'externalURL', 'services']
