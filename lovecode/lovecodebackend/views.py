from django.shortcuts import render
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

from django.utils.cache import learn_cache_key, get_cache_key
from django.core.cache import cache
import base64


# Create your views here.

def learn(request):
	return render(request, 'index.html', {})


class TutorialList(generics.ListAPIView):
	queryset = lovecode_models.Tutorial.objects.all()
	serializer_class = lovecode_serializers.TutorialListSerializer
	pagination_class = TutorialListPaginator

	def get_queryset(self):
		get_params = self.request.GET
		repository_name = get_params.get('repo_name')
		branch_name = get_params.get('branch_name')
		repo_create = get_params.get('repo_create')
		if repository_name and branch_name and repo_create and self.request.user.is_authenticated:
			return lovecode_models.Tutorial.objects.filter(
				user=self.request.user,
				repository_name=repository_name,
				branch_name=branch_name
			)
		return lovecode_models.Tutorial.objects.filter(is_published=True)


class TutorialDetail(generics.RetrieveAPIView):
	queryset = lovecode_models.Tutorial.objects.all()
	serializer_class = lovecode_serializers.TutorialDetailSerializer
	lookup_field = "id"


class UserRepositoryLearnContent(APIView):
	permission_classes = (permissions.IsAuthenticated, HasGithubAccount)

	def get(self, request, repo_name=None):
		github_api = GithubApi(request)
		branch_name = request.GET.get('branch_name')
		response = github_api.get_learn_md_content(request, repo_name, branch_name)
		data_from_api = response.get("data", {})
		content_from_api = data_from_api.get("content", "")
		sha = data_from_api.get("sha", "")
		data_from_db = lovecode_models.Tutorial.objects.filter(
			user=request.user,
			repository_name=repo_name,
			branch_name=branch_name
		)
		if data_from_db.exists():
			obj = data_from_db.first()
			content_from_db = obj.learn_md_content
			date_modified_db = obj.updated_at
		else:
			content_from_db = ""
			date_modified_db = ""

		return Response({
			"content_from_api": base64.b64decode(content_from_api),
			"content_from_db": content_from_db,
			"date_modified_db": date_modified_db,
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
			obj_id = data.get('id')
			if obj_id:
				obj = lovecode_models.Tutorial.objects.get(id=obj_id)
				obj.learn_md_content = data.get('content', "")
				obj.save()
				data = lovecode_serializers.TutorialDetailSerializer(obj)
				return Response(data.data, status=status.HTTP_200_OK)
		return Response({"msg": "Data not provided"}, status=status.HTTP_404_NOT_FOUND)


class PublishUnpublishTutorial(generics.UpdateAPIView):
	permission_classes = (permissions.IsAuthenticated, HasGithubAccount, IsOwner)
	queryset = lovecode_models.Tutorial.objects.all()
	serializer_class = lovecode_serializers.TutorialDetailSerializer
	lookup_field = 'id'

	def partial_update(self, serializer):
		serializer.save()
