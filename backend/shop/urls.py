from django.conf.urls import url
from rest_framework.views import APIView
from .serializers import ShopSerializer
from .models import Shop
from .views import ShopsList, ShopDetail

urlpatterns = [
    url(r'^(?P<pk>[0-9]+)/shop/$', ShopDetail.as_view()),
    url(r'^all', ShopsList.as_view()),
]
