from django.urls import path
from .views import view_email

urlpatterns = [
    path('', view_email, name="view_email"),
    
]
