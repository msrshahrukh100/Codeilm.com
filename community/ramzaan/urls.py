from django.urls import include, path
from .views import group_list, group_detail, group_join, send_motivation, post_status_update

urlpatterns = [
    path('', group_list, name="group_list"),
    path('<int:id>/<slug:slug>', group_detail, name="group_detail"),
    path('<int:id>/<slug:slug>/join', group_join, name="group_join"),
    path('<int:id>/<slug:slug>/status-update', post_status_update, name="post_status_update"),
    path('<int:id>/<slug:slug>/motivate/<int:to_user_id>', send_motivation, name="send_motivation"),
    # path('<slug:community>/', community_mapper, name="community_mapper")
]
