from rest_framework import serializers

from .models import Shop
from place.models import Place
from place.serializers import PlaceSerializer

class ShopSerializer(serializers.ModelSerializer):
    """Serializers registration requests and creates a new user."""
    places = PlaceSerializer(many=True, read_only=True)

    class Meta:
        model = Shop
        fields = '__all__'
