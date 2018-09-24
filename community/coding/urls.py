from django.urls import path
# from .views import group_list, group_detail, send_motivation, post_status_update, get_status_updates, get_group_extra_content
from django.views.generic import TemplateView

urlpatterns = [
    path('', TemplateView.as_view(template_name="coding/codinggroupslist.html"), name="group_list"),
    path('<slug:slug>/', TemplateView.as_view(template_name="coding/codinggroupdetail.html"), name="group_detail"),
    # path('<int:id>/<slug:slug>', group_detail, name="group_detail"),
    # path('<int:id>/<slug:slug>/status-update', post_status_update, name="post_status_update"),
    # path('<int:group_id>/<slug:group_slug>/motivate/<int:to_user_id>', send_motivation, name="send_motivation"),
    # path('get-status-update/', get_status_updates, name="get_status_updates"),
    # path('fetch-extra-content-popup/<slug:group_hash_id>', get_group_extra_content, name="get_group_extra_content"),
]
