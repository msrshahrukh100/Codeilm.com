from django.urls import path
from . import views as projects_views

urlpatterns = [
	path('', projects_views.ProjectList.as_view(), name="project_list"),
	path('create/', projects_views.ProjectCreate.as_view(), name="project_create"),
    path('<str:id>/', projects_views.ProjectDetail.as_view(), name="project_detail"),
    path('<str:project_id>/tasks', projects_views.ProjectTaskList.as_view(), name="project_tasks"),
    path('<str:project_id>/tasks/reorder', projects_views.ProjectTaskReorder.as_view(), name="project_tasks_reorder"),
    path('<str:project_id>/comments', projects_views.ProjectCommentList.as_view(), name="project_comments"),

    path('tasks/<str:id>', projects_views.ProjectTaskRetrieveUpdateDestroy.as_view(), name="project_tasks_update"),
    path('comments/<str:id>', projects_views.CommenTaskRetrieveUpdateDestroy.as_view(), name="project_comments_update"),
]
