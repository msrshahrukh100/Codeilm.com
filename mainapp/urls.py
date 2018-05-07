from django.urls import include, path
from .views import home

urlpatterns = [
    path('', home, name="home"),
    # path('<slug:community>/', community_mapper, name="community_mapper")
]
