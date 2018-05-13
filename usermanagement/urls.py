from django.urls import path
from .views import add_user_following

urlpatterns = [
    path('add-following/<int:user_id>', add_user_following, name="add_user_following"),
]
