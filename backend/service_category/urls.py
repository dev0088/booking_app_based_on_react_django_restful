from django.conf.urls import url
from rest_framework.views import APIView
from .serializers import ServiceCategorySerializer
from .models import ServiceCategory
from .views import ServiceCategoriesList, ServiceCategoryDetail

urlpatterns = [
    url(r'^(?P<pk>[0-9]+)/service/$', ServiceCategoryDetail.as_view()),
    url(r'^all', ServiceCategoriesList.as_view()),
]
