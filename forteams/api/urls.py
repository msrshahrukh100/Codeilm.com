from django.urls import path
from .views import TeamList, TeamDetail


urlpatterns = [
    path('teams/', TeamList.as_view(), name="teams"),
    path('teams/<slug:slug>', TeamDetail.as_view(), name="team-detail"),
]
