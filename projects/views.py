from django.shortcuts import render
from . import serializers as projects_serializers
from . import models as projects_models
from rest_framework import generics, permissions
from rest_framework.response import Response
from .permissions import CanViewProject, CanRetrieveUpdateDestroyTask
# Create your views here.


class ProjectDetail(generics.RetrieveUpdateDestroyAPIView):
	queryset = projects_models.Project.objects.all()
	serializer_class = projects_serializers.ProjectDetailSerializer
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


class ProjectList(generics.ListCreateAPIView):
	queryset = projects_models.Project.objects.filter(is_private=False)
	serializer_class = projects_serializers.ProjectListSerializer


class ProjectTaskList(generics.ListCreateAPIView):
	queryset = projects_models.Task.objects.all()
	serializer_class = projects_serializers.TaskSerializer


	def get(self, request, project_id=None):
		queryset = self.filter_queryset(self.get_queryset())
		queryset = queryset.filter(project__id=project_id)

		page = self.paginate_queryset(queryset)
		if page is not None:
			serializer = self.get_serializer(page, many=True)
			return self.get_paginated_response(serializer.data)

		serializer = self.get_serializer(queryset, many=True)
		return Response(serializer.data)

	def perform_create(self, serializer):
		data = self.request.data
		project = projects_models.Project.objects.get(id=data.get('project_id'))
		serializer.save(project=project)


class ProjectTaskRetrieveUpdateDestroy(generics.RetrieveUpdateDestroyAPIView):
	queryset = projects_models.Task.objects.all()
	serializer_class = projects_serializers.TaskSerializer
	lookup_field = "id"
	permission_classes = (permissions.IsAuthenticated, CanRetrieveUpdateDestroyTask)


class ProjectCommentList(generics.ListCreateAPIView):
	queryset = projects_models.Comment.objects.all()
	serializer_class = projects_serializers.CommentSerializer


	def get(self, request, project_id=None):
		queryset = self.filter_queryset(self.get_queryset())
		queryset = queryset.filter(project__id=project_id)

		page = self.paginate_queryset(queryset)
		if page is not None:
			serializer = self.get_serializer(page, many=True)
			return self.get_paginated_response(serializer.data)

		serializer = self.get_serializer(queryset, many=True)
		return Response(serializer.data)

	def perform_create(self, serializer):
		data = self.request.data
		project = projects_models.Project.objects.get(id=data.get('project_id'))
		serializer.save(project=project)


class CommenTaskRetrieveUpdateDestroy(generics.RetrieveUpdateAPIView):
	queryset = projects_models.Comment.objects.all()
	serializer_class = projects_serializers.CommentSerializer
	lookup_field = "id"
	permission_classes = (permissions.IsAuthenticated, CanRetrieveUpdateDestroyTask)