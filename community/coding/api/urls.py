from django.urls import path, re_path
from .views import CodingGroupsList, CodingGroupDetail

app_name = 'coding-api'
urlpatterns = [
    path('groups/', CodingGroupsList.as_view(), name="groups_list"),
    path('groups/<slug:slug>', CodingGroupDetail.as_view(), name="groups_detail"),
    # re_path(r'^(?P<slug>[\w-]+)/$', CodingGroupDetail.as_view(), name='detail'),
]
