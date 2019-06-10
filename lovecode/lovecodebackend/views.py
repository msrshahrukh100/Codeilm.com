from django.shortcuts import render, get_object_or_404
from django.contrib.auth.models import User
from . import serializers as lovecode_serializers
from . import models as lovecode_models
from rest_framework import generics, permissions
from rest_framework.views import APIView
from rest_framework.response import Response
from .permissions import HasGithubAccount, IsOwner
from rest_framework.permissions import IsAdminUser
from .paginators import TutorialListPaginator
from django.utils.decorators import method_decorator
from django.views.decorators.cache import cache_page
from django.views.decorators.vary import vary_on_cookie, vary_on_headers
from .github import GithubApi
from rest_framework import status
from . import tasks
from django.utils.cache import learn_cache_key, get_cache_key
from django.core.cache import cache
import base64
from mainapp.utils import save_request_ip_info
from allauth.socialaccount.providers.github.views import GitHubOAuth2Adapter
from allauth.socialaccount.providers.oauth2.client import OAuth2Client
from django.conf import settings
from django.http import JsonResponse

# Create your views here.

def auth(request):
	authenticated = request.user.is_authenticated
	data = {
		"authenticated": authenticated,
		"user": lovecode_serializers.UserSerializer(request.user).data if authenticated else None
	}
	return JsonResponse(data)

def learn(request):
	return render(request, 'index.html', {})

def tutorial_detail(request, tutorial_id, tutorial_slug):
	tutorial = get_object_or_404(lovecode_models.Tutorial, id=tutorial_id)
	context = {
		"title": tutorial.title,
		"description": tutorial.title + " by " + tutorial.user.get_full_name(),
		"url": request.build_absolute_uri()
	}
	return render(request, 'lovecode.html', context)


class TutorialList(generics.ListAPIView):
	queryset = lovecode_models.Tutorial.objects.all()
	serializer_class = lovecode_serializers.TutorialListSerializer
	pagination_class = TutorialListPaginator

	def get_queryset(self):
		get_params = self.request.GET
		repository_name = get_params.get('repo_name')
		branch_name = get_params.get('branch_name')
		repo_create = get_params.get('repo_create')
		if repo_create:
			if repository_name and branch_name and self.request.user.is_authenticated:
				return lovecode_models.Tutorial.objects.filter(
					user=self.request.user,
					repository_name=repository_name,
					branch_name=branch_name
				)
			else:
				return []
		return lovecode_models.Tutorial.objects.filter(is_published=True)


class TutorialDetail(generics.RetrieveAPIView):
	queryset = lovecode_models.Tutorial.objects.all()
	serializer_class = lovecode_serializers.TutorialDetailSerializer
	lookup_field = "id"


	def tutorial_viewed(self, request, id=None):
		user_id = None
		request_ip_info_id = None
		request_ip_info = save_request_ip_info(request)
		if request_ip_info:
			request_ip_info_id = request_ip_info.id
		if request.user.is_authenticated:
			user_id = request.user.id

		tasks.save_tutorial_view(tutorial_id=id,
			ip=request.META['REMOTE_ADDR'],
			session=request.session.session_key,
			user_id=user_id,
			request_ip_info_id=request_ip_info_id
		)

	def retrieve(self, request, *args, **kwargs):
		if request.user.id != id:
			self.tutorial_viewed(request, **kwargs)
		return super().retrieve(request, *args, **kwargs)


class PublishUnpublishTutorial(generics.RetrieveUpdateAPIView):
	permission_classes = (permissions.IsAuthenticated, HasGithubAccount, IsOwner)

	queryset = lovecode_models.Tutorial.objects.all()
	serializer_class = lovecode_serializers.TutorialDetailSerializer
	lookup_field = 'id'

	# def partial_update(self, serializer):
	# 	serializer.save()


# Utility API views

class UserRepositoryLearnContent(APIView):
	permission_classes = (permissions.IsAuthenticated, HasGithubAccount)

	def get(self, request, repo_name=None, branch_name=None, tutorial_slug=None):
		github_api = GithubApi(request)
		response = {}#github_api.get_learn_md_content(request, repo_name, branch_name)
		data_from_api = response.get("data", {})
		content_from_api = data_from_api.get("content", "")
		sha = data_from_api.get("sha", "")
		data_from_db = lovecode_models.Tutorial.objects.filter(
			user=request.user,
			repository_name=repo_name,
			branch_name=branch_name,
			slug=tutorial_slug
		)
		db_data = None

		if data_from_db.exists():
			obj = data_from_db.first()
			db_data = lovecode_serializers.TutorialDetailSerializer(obj).data
		else:
			content_from_db = ""
			date_modified_db = ""

		return Response({
			"content_from_api": base64.b64decode(content_from_api),
			"db_data": db_data,
			"sha": sha
		})


class UserRepositoryBranches(APIView):
	permission_classes = (permissions.IsAuthenticated, HasGithubAccount)

	def get(self, request, repo_name=None):
		github_api = GithubApi(request)
		response = github_api.get_repo_branches(request, repo_name)
		return Response(response)


class UserRepositories(APIView):

	permission_classes = (permissions.IsAuthenticated, HasGithubAccount)

	def get(self, request, page=0):
		github_api = GithubApi(request, page=page)
		response = github_api.get_user_repos(request)
		return Response(response)


class CreateUpdateCommitLearnFile(APIView):
	permission_classes = (permissions.IsAuthenticated, HasGithubAccount)

	def post(self, request):
		github_api = GithubApi(request)
		print(request.data)
		response = github_api.save_commit_learn(request)

		return Response(response, status=status.HTTP_201_CREATED)


class CreateGetTutorial(APIView):
	permission_classes = (permissions.IsAuthenticated, HasGithubAccount)

	def post(self, request):
		data = request.data
		if data:
			obj, created = lovecode_models.Tutorial.objects.get_or_create(
				user=request.user,
				title=data.get("title", ""),
				repository_name=data.get("repo_name", ""),
				repository_data=data.get("repo_data"),
				branch_name=data.get("branch_name", "")
			)
			data = lovecode_serializers.TutorialDetailSerializer(obj)
			return Response({"created": created, "tutorial_data": data.data}, status=status.HTTP_200_OK)
		else:
			return Response({"msg": "Data not provided"}, status=status.HTTP_404_NOT_FOUND)



class SaveLearnFileToDb(APIView):
	permission_classes = (permissions.IsAuthenticated, HasGithubAccount)

	def post(self, request):
		data = request.data
		if data:
			repo_name = data.get('repo_name')
			branch_name = data.get('branch_name')
			slug = data.get('tutorial_slug')
			if repo_name and branch_name:
				obj =  get_object_or_404(lovecode_models.Tutorial,
					user=request.user,
					repository_name=repo_name,
					branch_name=branch_name,
					slug=slug
				)
				obj.learn_md_content = data.get('content', "")
				obj.save()
				data = lovecode_serializers.TutorialDetailSerializer(obj)
				return Response(data.data, status=status.HTTP_200_OK)
		return Response({"msg": "Data not provided"}, status=status.HTTP_404_NOT_FOUND)


class LikeUnlikeTutorial(APIView):
	permission_classes = (permissions.IsAuthenticated, HasGithubAccount)

	def post(self, request):
		data = request.data
		if data:
			tutorial_id = data.get('tutorial_id')
			liked = data.get('liked')
			user = request.user
			obj, created = lovecode_models.TutorialLike.objects.update_or_create(
				user=user,
				tutorial_id=tutorial_id,
				defaults={'liked': liked}
			)
			data = {
				"like_data": lovecode_serializers.TutorialLikeSerializer(obj).data,
				"tutorial_like_data": obj.tutorial.like_data
			}
			return Response(data, status=status.HTTP_200_OK)
		return Response({"msg": "Data not provided"}, status=status.HTTP_404_NOT_FOUND)


class TutorialMetricsData(APIView):

	def get(self, request, tutorial_id):

		if request.user.is_authenticated:
			obj = get_object_or_404(lovecode_models.Tutorial, id=tutorial_id, user=request.user)
			like_data = lovecode_serializers.TutorialLikeSerializer(obj.user_likes.all(), many=True).data
			logged_in_view_data = lovecode_serializers.TutorialViewSerializer(obj.user_views.exclude(user=None), many=True).data

			distinct_viewers = obj.user_views.exclude(user=None).values_list('user', flat=True).distinct()
			users = User.objects.filter(id__in=distinct_viewers)
			distinct_viewers_data = lovecode_serializers.UserSerializer(users, many=True).data
			all_views = lovecode_serializers.TutorialViewSerializer(obj.user_views.all(), many=True).data

			return Response({
				"all_views": all_views,
				"like_data": like_data,
				"logged_in_view_data": logged_in_view_data,
				"distinct_viewers": distinct_viewers_data
			})
		return Response({}, status.HTTP_404_NOT_FOUND)


class Echo(APIView):

	def get(self, request):
		if request.user.is_authenticated:
			return Response(lovecode_serializers.UserSerializer(request.user).data)
		return Response({"msg": "Not Allowed"}, status=status.HTTP_401_UNAUTHORIZED)
