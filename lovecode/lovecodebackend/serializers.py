from rest_framework import serializers
from . import models as lovecode_model
from mainapp import models as mainapp_models
from django.contrib.auth.models import User


class UserSerializer(serializers.ModelSerializer):
	user_profile_pic = serializers.SerializerMethodField()
	full_name = serializers.SerializerMethodField()
	intro = serializers.SerializerMethodField()
	github_username = serializers.SerializerMethodField()

	def get_intro(self, obj):
		return obj.user_profile.first().intro

	def get_github_username(self, obj):
		github_account = obj.socialaccount_set.filter(provider="GitHub").first()
		if github_account:
			return github_account.extra_data.get('login')
		return ""

	def get_full_name(self, obj):
		full_name = obj.get_full_name()
		if full_name:
			return full_name
		return obj.username

	def get_user_profile_pic(self, obj):
		return obj.user_profile.first().get_profile_pic_url()

	class Meta:
		model = User
		fields = ('id', 'full_name', 'first_name', 'last_name', 'intro', 'user_profile_pic', 'github_username', 'username')

class GithubRepoSerializer(serializers.ModelSerializer):
	hash_id = serializers.CharField(default="")
	class Meta:
		model = lovecode_model.GithubRepo
		fields = ('hash_id', 'user', 'repo_data', 'created_at', 'updated_at')

class TutorialListSerializer(serializers.ModelSerializer):
	id = serializers.CharField(default="")
	user = UserSerializer()
	liked_by_authenticated_user = serializers.SerializerMethodField()
	owner_is_authenticated_user = serializers.SerializerMethodField()
	tutorial_tags = serializers.SerializerMethodField()

	def get_tutorial_tags(self, obj):
		qs = obj.tags.all()
		return TutorialTagsSerializer(qs, many=True).data


	def get_owner_is_authenticated_user(self, obj):
		user = None
		request = self.context.get("request")
		if request and hasattr(request, "user"):
			user = request.user
			if user.is_authenticated and user == obj.user:
				return True
		return False

	def get_liked_by_authenticated_user(self, obj):
		user_ids = None
		if obj.like_data:
			user_ids = obj.like_data["user_ids"]
		else:
			return False
		user = None
		request = self.context.get("request")
		if request and hasattr(request, "user"):
			user = request.user
			if user.is_authenticated and user.id in user_ids:
				return True
		return False

	class Meta:
		model = lovecode_model.Tutorial
		fields = ('id', 'user', 'title','slug', 'tutorial_tags', 'read_time', 'repository_name', 'branch_name', 'owner_is_authenticated_user', 'liked_by_authenticated_user', 'like_data', 'view_data', 'created_at', 'updated_at')

class TutorialDetailSerializer(serializers.ModelSerializer):
	id = serializers.CharField(default="")
	user = UserSerializer()
	liked_by_authenticated_user = serializers.SerializerMethodField()
	owner_is_authenticated_user = serializers.SerializerMethodField()
	tutorial_tags = serializers.SerializerMethodField()

	def get_tutorial_tags(self, obj):
		qs = obj.tags.all()
		return TutorialTagsSerializer(qs, many=True).data

	def get_owner_is_authenticated_user(self, obj):
		user = None
		request = self.context.get("request")
		if request and hasattr(request, "user"):
			user = request.user
			if user.is_authenticated and user == obj.user:
				return True
		return False

	def get_liked_by_authenticated_user(self, obj):
		user_ids = None
		if obj.like_data:
			user_ids = obj.like_data["user_ids"]
		else:
			return False
		user = None
		request = self.context.get("request")
		if request and hasattr(request, "user"):
			user = request.user
			if user.is_authenticated and user.id in user_ids:
				return True
		return False

	class Meta:
		model = lovecode_model.Tutorial
		fields = ('id', 'user', 'tutorial_data', 'title', 'tutorial_tags', 'learn_md_content', 'owner_is_authenticated_user', 'liked_by_authenticated_user', 'like_data', 'view_data', 'title','slug', 'read_time', 'repository_name', 'branch_name', 'is_published',  'created_at', 'updated_at')


class TutorialUpdateSerializer(serializers.ModelSerializer):
	class Meta:
		model = lovecode_model.Tutorial
		fields = ('is_published', )


class RequestIPInfoSerializer(serializers.ModelSerializer):
	class Meta:
		model = mainapp_models.RequestIpInfo
		fields = ('__all__')


class TutorialLikeSerializer(serializers.ModelSerializer):
	tutorial = serializers.CharField(default="")
	user = UserSerializer()
	class Meta:
		model = lovecode_model.TutorialLike
		fields = ('id', 'user', 'tutorial', 'liked', 'created_at', 'updated_at')


class TutorialViewSerializer(serializers.ModelSerializer):
	tutorial = serializers.CharField(default="")
	user = UserSerializer()
	request_ip_info = RequestIPInfoSerializer()

	class Meta:
		model = lovecode_model.TutorialLike
		fields = ('id', 'user', 'tutorial', 'request_ip_info', 'created_at', 'updated_at')



class TutorialTagsSerializer(serializers.ModelSerializer):
	class Meta:
		model = lovecode_model.TutorialTags
		fields = ('__all__')