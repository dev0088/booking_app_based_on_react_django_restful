from django.conf.urls import url
from .views import GalleryList, GalleryDetail

urlpatterns = [
    url(r'^(?P<pk>[0-9]+)/service/$', GalleryDetail.as_view()),
    url(r'^all', GalleryList.as_view()),
]
