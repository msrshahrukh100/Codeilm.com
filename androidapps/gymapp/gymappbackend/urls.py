from django.urls import path, re_path
from . import views as gym_views

urlpatterns = [
    re_path('gym-home/', gym_views.home, name="gym_home"),
    path('api/exercises/', gym_views.ExerciseList.as_view()),
    path('login/', gym_views.login, name="gymloginpage"),
    # re_path(r'^gym-home/$', gym_views.home, name="gym_home"),
    # re_path(r'^gym-home/(?P<slug>[\w-]+)$', gym_views.home, name="gym_home"),
]
