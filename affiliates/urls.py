from django.urls import path
from .views import get_static_files

urlpatterns = [
    path('get-static-files/', get_static_files, name="get_static_files"),
]
