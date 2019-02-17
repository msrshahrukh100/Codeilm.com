from django.urls import path
from . import views as gym_views

urlpatterns = [
    path('gym-home/', gym_views.home, name="gym_home"),
]
