from django.urls import path
from .views import view_email, unsubscribe_user

urlpatterns = [
    path('', view_email, name="view_email"),
    path('unsubscribe-user/', unsubscribe_user, name="unsubscribe_user"),
    
]
