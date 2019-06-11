from django.urls import path, re_path
from .views import home, mark_notifications_read, redirect_to_page, group_join, save_group_creation_request, how_it_works, redirect_for_server_error
from .views import GetJSONWebToken, GetRefreshJSONWebToken, codeilm
from django.views.generic import TemplateView
import lovecode.lovecodebackend.views as lovecode_views

urlpatterns = [

    path('old/allywith.com', home, name="home"),
    path('', codeilm, name="codeilm"),
    re_path(r'^stories/', lovecode_views.lovecode_home , name="lovecode_home"),

    path('how-it-works/', how_it_works, name="how_it_works"),
    path('redirect/', redirect_to_page, name="redirect_to_page"),
    path('will-be-back/', redirect_for_server_error, name="redirect_for_server_error"),
    path('save-group-creation-request/', save_group_creation_request, name="save_group_creation_request"),
    # path('<slug:community>/', community_mapper, name="community_mapper")
    path('<str:community>/<int:id>/<slug:slug>/join', group_join, name="group_join"),
    path('mark-notifications-read/', mark_notifications_read, name="mark_notifications_read"),

    # authentication related
    path('get-authenticate-user-token/', GetJSONWebToken.as_view(), name="get_authenticate_user_token"),
    path('get-authenticate-user-refresh-token/', GetRefreshJSONWebToken.as_view(), name="get_authenticate_user_refresh_token"),
]
