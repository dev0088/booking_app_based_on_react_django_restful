from django.conf.urls import url
from rest_framework_jwt.views import obtain_jwt_token
from rest_framework_jwt.views import obtain_jwt_token
from rest_framework_jwt.views import refresh_jwt_token
from rest_framework_jwt.views import verify_jwt_token

from rest_framework import status
from rest_framework.views import APIView
from rest_framework.response import Response

from .models import Place
from .views import PlacesList, PlaceDetail

urlpatterns = [
    url(r'^(?P<pk>[0-9]+)/place/$', PlaceDetail.as_view()),
    url(r'^all', PlacesList.as_view()),
]
