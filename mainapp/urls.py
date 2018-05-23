from django.urls import path
from .views import home, mark_notifications_read, redirect_to_page

urlpatterns = [
    path('', home, name="home"),
    path('redirect/', redirect_to_page, name="redirect_to_page"),
    # path('<slug:community>/', community_mapper, name="community_mapper")
    path('mark-notifications-read/', mark_notifications_read, name="mark_notifications_read"),
]
