from django.shortcuts import render
from . import serializers as projects_serializers
from . import models as projects_models
from rest_framework import generics, permissions
# Create your views here.


class ProjectDetail(generics.RetrieveDestroyAPIView):
	queryset = projects_models.Project.objects.all()
	serializer_class = projects_serializers.ProjectDetailSerializer
	lookup_field = "id"


class ProjectList(generics.ListCreateAPIView):
	queryset = projects_models.Project.objects.filter(is_private=False)
	serializer_class = projects_serializers.ProjectListSerializer