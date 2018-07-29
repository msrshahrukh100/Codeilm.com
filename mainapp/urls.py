from django.urls import path
from .views import home, mark_notifications_read, redirect_to_page, group_join, save_group_creation_request, how_does_it_work


urlpatterns = [
    path('', home, name="home"),
    path('how-does-it-work/', how_does_it_work, name="how_does_it_work"),
    path('redirect/', redirect_to_page, name="redirect_to_page"),
    path('save-group-creation-request/', save_group_creation_request, name="save_group_creation_request"),
    # path('<slug:community>/', community_mapper, name="community_mapper")
    path('<str:community>/<int:id>/<slug:slug>/join', group_join, name="group_join"),
    path('mark-notifications-read/', mark_notifications_read, name="mark_notifications_read"),
]
