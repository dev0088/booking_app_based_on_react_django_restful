from rest_framework import serializers

from .models import Place


class PlaceSerializer(serializers.ModelSerializer):
    """Serializers registration requests and creates a new user."""
    shop = serializers.SlugRelatedField(
												        many=False,
												        read_only=True,
												        slug_field='title'
												      )
    class Meta:
        model = Place
        fields = ['title', 'description', 'image', 'externalURL', 'shop']
