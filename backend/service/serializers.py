from rest_framework import serializers

from .models import Service


class ServiceSerializer(serializers.ModelSerializer):
    """Serializers registration requests and creates a new user."""
    service_category = serializers.SlugRelatedField(
												        many=False,
												        read_only=True,
												        slug_field='title'
												      )
    class Meta:
        model = Service
        # fields = ['title', 'description', 'image', 'externalURL', 'price', 'service_category']
        fields = '__all__'

