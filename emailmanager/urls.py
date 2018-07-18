from django.urls import path
from .views import view_email, unsubscribe_user, test_email

urlpatterns = [
    path('', view_email, name="view_email"),
    path('unsubscribe-user/', unsubscribe_user, name="unsubscribe_user"),
    path('test-email/', test_email, name="test_email"),
]
