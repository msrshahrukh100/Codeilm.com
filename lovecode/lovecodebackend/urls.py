from django.urls import path
from . import views as lovecode_views

urlpatterns = [
    # path('learn/', lovecode_views.learn, name="learn"),
    path('tutorials/', lovecode_views.TutorialList.as_view() , name="tutorials_list"),
    path('tutorials/create_or_get', lovecode_views.CreateGetTutorial.as_view(), name="tutorials_get_or_create"),
    path('tutorials/save', lovecode_views.SaveLearnFileToDb.as_view(), name="tutorials_save"),
    path('tutorials/<slug:hash_id>', lovecode_views.TutorialDetail.as_view(), name="tutorials_detail"),

    path('userrepositories/<int:page>', lovecode_views.UserRepositories.as_view(), name="user_repositories"),
    path('repo/branches/<str:repo_name>', lovecode_views.UserRepositoryBranches.as_view(), name="user_repositories_branches"),
    path('learn/content/<str:repo_name>', lovecode_views.UserRepositoryLearnContent.as_view(), name="user_repo_learn_content"),
    path('commit/learn', lovecode_views.CreateUpdateCommitLearnFile.as_view(), name="commit_learn"),
    # path('userrepositories/<slug:datetime>', lovecode_views.UserRepositories.as_view(), name="user_repositories"),

]
