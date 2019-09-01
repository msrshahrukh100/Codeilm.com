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
	company = CommunitySerializer(required=False, read_only=True)
	auth_user_is_developer = serializers.SerializerMethodField(required=False, read_only=True)
	auth_user_is_poster = serializers.SerializerMethodField(required=False, read_only=True)

	def get_auth_user_is_developer(self, obj):
		user = None
		request = self.context.get("request")
		if request and hasattr(request, "user"):
			user = request.user
			if user.is_authenticated and user in obj.developers.all():
				return True
		return False

	def get_auth_user_is_poster(self, obj):
		user = None
		request = self.context.get("request")
		if request and hasattr(request, "user"):
			user = request.user
			if user.is_authenticated and user == obj.poster:
				return True
		return False

	class Meta:
		model = projects_models.Project
		fields = ('id', 'title', 'slug', 'description', 'auth_user_is_developer', 'auth_user_is_poster', 'poster', 'company', 'developers', 'is_private', 'deadline', 'payment_type', 'created_at', 'updated_at', 'created_at')


class ProjectCreateSerializer(serializers.ModelSerializer):
	id = serializers.CharField(read_only=True, default="")
	class Meta:
		model = projects_models.Project
		fields = ('id', 'title', 'poster', 'description', 'company', 'is_private', 'deadline', 'payment_type')



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
	auth_user_is_developer = serializers.SerializerMethodField(required=False, read_only=True)
	auth_user_is_poster = serializers.SerializerMethodField(required=False, read_only=True)

	def get_auth_user_is_developer(self, obj):
		user = None
		request = self.context.get("request")
		if request and hasattr(request, "user"):
			user = request.user
			if user.is_authenticated and user in obj.project.developers.all():
				return True
		return False

	def get_auth_user_is_poster(self, obj):
		user = None
		request = self.context.get("request")
		if request and hasattr(request, "user"):
			user = request.user
			if user.is_authenticated and user == obj.project.poster:
				return True
		return False


	class Meta:
		model = projects_models.Task
		fields = ('id', 'project', 'text', 'deadline', 'done', 'auth_user_is_developer', 'auth_user_is_poster', 'order', 'updated_at')


class CommentSerializer(serializers.ModelSerializer):
	id = serializers.CharField(read_only=True, default="")
	user = UserSimpleSerializer(read_only=True)
	project = serializers.PrimaryKeyRelatedField(
        pk_field=HashidSerializerCharField(source_field='projects.Project.id'),
        read_only=True)
	is_owner = serializers.SerializerMethodField(required=False, read_only=True)
	auth_user_is_developer = serializers.SerializerMethodField(required=False, read_only=True)
	auth_user_is_poster = serializers.SerializerMethodField(required=False, read_only=True)

	def get_is_owner(self, obj):
		user = None
		request = self.context.get("request")
		if request and hasattr(request, "user"):
			user = request.user
			if user.is_authenticated and user == obj.user:
				return True
		return False

	def get_auth_user_is_developer(self, obj):
		user = None
		request = self.context.get("request")
		if request and hasattr(request, "user"):
			user = request.user
			if user.is_authenticated and user in obj.project.developers.all():
				return True
		return False

	def get_auth_user_is_poster(self, obj):
		user = None
		request = self.context.get("request")
		if request and hasattr(request, "user"):
			user = request.user
			if user.is_authenticated and user == obj.project.poster:
				return True
		return False


	class Meta:
		model = projects_models.Comment
		fields = ('id', 'project', 'text', 'user', 'is_owner', 'auth_user_is_poster', 'auth_user_is_developer', 'updated_at')

