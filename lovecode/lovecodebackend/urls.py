from django.urls import path
from . import views as lovecode_views

urlpatterns = [
    # path('learn/', lovecode_views.learn, name="learn"),
    path('tutorials/', lovecode_views.TutorialList.as_view() , name="tutorials_list"),
    path('tutorials/<slug:hash_id>', lovecode_views.TutorialDetail.as_view(), name="tutorials_detail"),

    path('userrepositories/cached', lovecode_views.UserRepositoriesCached.as_view(), name="user_repositories_cached"),
    path('userrepositories/', lovecode_views.UserRepositories.as_view(), name="user_repositories"),
    # path('userrepositories/<slug:datetime>', lovecode_views.UserRepositories.as_view(), name="user_repositories"),

]
