from django.conf.urls import url
from .views import RemindersList, ReminderDetail

urlpatterns = [
    url(r'^(?P<pk>[0-9]+)/reminder/$', ReminderDetail.as_view()),
    url(r'^all', RemindersList.as_view()),
]
