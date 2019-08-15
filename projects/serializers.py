from rest_framework import serializers
from django.contrib.auth.models import User
from . import models as projects_models
from usermanagement.serializers import UserSimpleSerializer


class ProjectDetailSerializer(serializers.ModelSerializer):
	id = serializers.CharField(read_only=True, default="")
	poster = UserSimpleSerializer(read_only=True)
	developers = UserSimpleSerializer(read_only=True, many=True)

	class Meta:
		model = projects_models.Project
		fields = ('id', 'title', 'description', 'poster', 'company', 'developers', 'is_private', 'deadline', 'payment_type', 'created_at', 'updated_at')


class ProjectListSerializer(serializers.ModelSerializer):
	id = serializers.CharField(read_only=True, default="")

	class Meta:
		model = projects_models.Project
		fields = ('id', 'title', 'description', 'is_private', 'deadline', 'created_at')



