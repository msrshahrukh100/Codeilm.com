from django.shortcuts import render
from . import serializers as projects_serializers
from . import models as projects_models
from rest_framework import generics, permissions
from rest_framework.response import Response
from .permissions import CanViewProject, CanRetrieveUpdateDestroyTask, CanRetrieveTask, CanRetrieveUpdateDestroyComment
from django.db import transaction
from rest_framework.views import APIView
from django.db.models import Q


# Create your views here.
class ProjectList(APIView):
	def get(self, request):
		all_projects = projects_models.Project.objects.filter(is_private=False)
		user_projects = request.user.developerprojects.all()
		return Response({
			"all_projects": projects_serializers.ProjectListSerializer(all_projects, many=True).data,
			"user_projects": projects_serializers.ProjectListSerializer(user_projects, many=True).data
		})




class ProjectDetail(generics.RetrieveUpdateDestroyAPIView):
	queryset = projects_models.Project.objects.all()
	serializer_class = projects_serializers.ProjectDetailSerializer
	permission_classes = (permissions.IsAuthenticated, CanViewProject)
	lookup_field = "id"


class ProjectMeta(generics.RetrieveAPIView):
	queryset = projects_models.Project.objects.all()
	serializer_class = projects_serializers.ProjectMetaSerializer
	permission_classes = (permissions.IsAuthenticated, CanViewProject)
	lookup_field = "id"



class ProjectCreate(generics.CreateAPIView):
	queryset = projects_models.Project.objects.all()
	serializer_class = projects_serializers.ProjectCreateSerializer
	permission_classes = (permissions.IsAuthenticated, )

	def perform_create(self, serializer):
		user = None
		if self.request and hasattr(self.request, "user"):
			user = self.request.user
			serializer.save(poster=user)


class ProjectTaskList(generics.ListCreateAPIView):
	queryset = projects_models.Task.objects.all()
	serializer_class = projects_serializers.TaskSerializer
	permission_classes = (permissions.IsAuthenticated, CanRetrieveTask)


	def get(self, request, project_id=None):
		queryset = self.filter_queryset(self.get_queryset())
		queryset = queryset.filter(project__id=project_id)
		for obj in queryset:
			self.check_object_permissions(request, obj)
		page = self.paginate_queryset(queryset)
		if page is not None:
			serializer = self.get_serializer(page, many=True)
			return self.get_paginated_response(serializer.data)

		serializer = self.get_serializer(queryset, many=True)
		return Response(serializer.data)

	def perform_create(self, serializer):
		data = self.kwargs
		project = projects_models.Project.objects.get(id=data.get('project_id'))
		order = project.tasks.all().count()
		serializer.save(project=project, order=order+1, user=self.request.user)


class ProjectTaskReorder(generics.UpdateAPIView):
	queryset = projects_models.Task.objects.all()
	serializer_class = projects_serializers.TaskSerializer
	permission_classes = (permissions.IsAuthenticated, CanRetrieveUpdateDestroyTask)

	def update(self, *args, **kwargs):
		data = self.request.data

		try:
			with transaction.atomic():
				for task in data:
					projects_models.Task.objects.filter(id=task.get("id")).update(order=task.get("order", 0))
		except:
			return Response({"status": False, "msg": "Failed to update order"})

		return Response({"status": True, "msg": "Updated order"})

class ProjectTaskRetrieveUpdateDestroy(generics.RetrieveUpdateDestroyAPIView):
	queryset = projects_models.Task.objects.all()
	serializer_class = projects_serializers.TaskSerializer
	lookup_field = "id"
	permission_classes = (permissions.IsAuthenticated, CanRetrieveUpdateDestroyTask)


class ProjectCommentList(generics.ListCreateAPIView):
	queryset = projects_models.Comment.objects.all()
	serializer_class = projects_serializers.CommentSerializer
	permission_classes = (permissions.IsAuthenticated, CanRetrieveTask)


	def get(self, request, project_id=None):
		queryset = self.filter_queryset(self.get_queryset())
		queryset = queryset.filter(project__id=project_id)
		for obj in queryset:
			self.check_object_permissions(request, obj)
		page = self.paginate_queryset(queryset)
		if page is not None:
			serializer = self.get_serializer(page, many=True)
			return self.get_paginated_response(serializer.data)

		serializer = self.get_serializer(queryset, many=True)
		return Response(serializer.data)

	def perform_create(self, serializer):
		data = self.kwargs
		project = projects_models.Project.objects.get(id=data.get('project_id'))
		serializer.save(project=project, user=self.request.user)


class ProjectCommentRetrieveUpdateDestroy(generics.RetrieveUpdateDestroyAPIView):
	queryset = projects_models.Comment.objects.all()
	serializer_class = projects_serializers.CommentSerializer
	lookup_field = "id"
	permission_classes = (permissions.IsAuthenticated, CanRetrieveUpdateDestroyComment)