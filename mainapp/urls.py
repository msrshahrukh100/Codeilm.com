from django.urls import include, path
from .views import home, mark_notifications_read

urlpatterns = [
    path('', home, name="home"),
    # path('<slug:community>/', community_mapper, name="community_mapper")
    path('mark-notifications-read/', mark_notifications_read, name="mark_notifications_read"),
]
