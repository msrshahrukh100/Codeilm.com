from django.urls import path
from .views import learn

urlpatterns = [
    path('learn/', learn, name="learn"),
]
