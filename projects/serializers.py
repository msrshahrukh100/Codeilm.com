from rest_framework import serializers
from django.contrib.auth.models import User
from . import models as projects_models
from usermanagement.serializers import UserSimpleSerializer
from hashid_field.rest import HashidSerializerCharField
from usermanagement.serializers import CommunitySerializer

class ProjectDetailSerializer(serializers.ModelSerializer):
	id = serializers.CharField(read_only=True, default="")
	poster = UserSimpleSerializer(read_only=True)
	developers = UserSimpleSerializer(read_only=True, many=True)
	company = CommunitySerializer()

	class Meta:
		model = projects_models.Project
		fields = ('id', 'title', 'slug', 'description', 'poster', 'company', 'developers', 'is_private', 'deadline', 'payment_type', 'created_at', 'updated_at')


class ProjectListSerializer(serializers.ModelSerializer):
	id = serializers.CharField(read_only=True, default="")

	class Meta:
		model = projects_models.Project
		fields = ('id', 'title', 'slug', 'description', 'is_private', 'deadline', 'created_at')



class TaskSerializer(serializers.ModelSerializer):
	id = serializers.CharField(read_only=True, default="")
	project = serializers.PrimaryKeyRelatedField(
        pk_field=HashidSerializerCharField(source_field='projects.Project.id'),
        read_only=True)

	class Meta:
		model = projects_models.Task
		fields = ('id', 'project', 'text', 'deadline')
