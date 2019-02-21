from django.urls import path, re_path
from . import views as gym_views

urlpatterns = [
    re_path('gym-home/', gym_views.home, name="gym_home"),
    path('gymapp/api/schedules/', gym_views.ScheduleList.as_view(), name="schedule-list"),
    path('gymapp/api/exercises/', gym_views.ExerciseList.as_view(), name="exercise-list"),
    path('gymapp/api/exercises/<slug:exercise_hash_id>', gym_views.ExerciseDetail.as_view(), name="exercise-detail"),
    path('login/', gym_views.login, name="gymloginpage"),
    # re_path(r'^gym-home/$', gym_views.home, name="gym_home"),
    # re_path(r'^gym-home/(?P<slug>[\w-]+)$', gym_views.home, name="gym_home"),
]
