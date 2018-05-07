from django.urls import include, path
from .views import group_list, group_detail

urlpatterns = [
    path('', group_list, name="group_list"),
    path('<int:id>/<slug:slug>', group_detail, name="group_detail"),
    # path('<slug:community>/', community_mapper, name="community_mapper")
]
