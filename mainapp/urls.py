from django.urls import path
from .views import home, mark_notifications_read, redirect_to_page, group_join


urlpatterns = [
    path('', home, name="home"),
    path('redirect/', redirect_to_page, name="redirect_to_page"),
    # path('<slug:community>/', community_mapper, name="community_mapper")
    path('<int:id>/<slug:slug>/<str:community>/join', group_join, name="group_join"),
    path('mark-notifications-read/', mark_notifications_read, name="mark_notifications_read"),
]
