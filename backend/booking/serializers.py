from rest_framework import serializers

from .models import Booking


class BookingSerializer(serializers.ModelSerializer):
    """Serializers registration requests and creates a new user."""
    user = serializers.SlugRelatedField(
                                many=False,
                                read_only=True,
                                slug_field='username'
                              )
    service = serializers.SlugRelatedField(
                                many=False,
                                read_only=True,
                                slug_field='title'
                              )

    class Meta:
        model = Booking
        # fields = ['title', 'description', 'image', 'externalURL', 'price', 'service_category']
        fields = '__all__'

