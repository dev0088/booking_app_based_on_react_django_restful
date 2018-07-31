from django.conf.urls import url
from .views import ServicesList, ServiceDetail

urlpatterns = [
    url(r'^(?P<pk>[0-9]+)/service/$', ServiceDetail.as_view()),
    url(r'^all', ServicesList.as_view()),
]
