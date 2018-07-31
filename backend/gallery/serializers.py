from rest_framework import serializers

from .models import Gallery


class GallerySerializer(serializers.ModelSerializer):
    """Serializers registration requests and creates a new user."""
    shop = serializers.SlugRelatedField(
                                       many=False,
                                       read_only=True,
                                       slug_field='title'
                                    )
    class Meta:
        model = Gallery
        fields = '__all__'

