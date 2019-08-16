from django.shortcuts import render
from . import serializers as projects_serializers
from . import models as projects_models
from rest_framework import generics, permissions
from rest_framework.response import Response
# Create your views here.


class ProjectDetail(generics.RetrieveUpdateDestroyAPIView):
	queryset = projects_models.Project.objects.all()
	serializer_class = projects_serializers.ProjectDetailSerializer
	lookup_field = "id"


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