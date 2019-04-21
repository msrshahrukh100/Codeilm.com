from django.shortcuts import render
from django.contrib.auth.models import User
from . import serializers as lovecode_serializers
from . import models as lovecode_models
from rest_framework import generics, permissions
from rest_framework.views import APIView
from rest_framework.response import Response
from .permissions import HasGithubAccount
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


class TutorialList(generics.ListCreateAPIView):
	queryset = lovecode_models.Tutorial.objects.all()
	serializer_class = lovecode_serializers.TutorialListSerializer
	pagination_class = TutorialListPaginator


class TutorialDetail(generics.RetrieveAPIView):
	queryset = lovecode_models.Tutorial.objects.all()
	serializer_class = lovecode_serializers.TutorialDetailSerializer
	lookup_field = "hash_id"


class UserRepositoryLearnContent(APIView):
	permission_classes = (permissions.IsAuthenticated,)

	def get(self, request, repo_name=None):
		github_api = GithubApi(request)
		branch_name = request.GET.get('branch_name')
		response = github_api.get_learn_md_content(request, repo_name, branch_name)
		data = response.get("data")
		if data:
			content = data.get("content")
			sha = data.get("sha")
			return Response({"content": base64.b64decode(content), "sha": sha})
		else:
			return Response({})


class UserRepositoryBranches(APIView):
	permission_classes = (permissions.IsAuthenticated,)

	def get(self, request, repo_name=None):
		github_api = GithubApi(request)
		response = github_api.get_repo_branches(request, repo_name)
		return Response(response)


class UserRepositories(APIView):

	permission_classes = (permissions.IsAuthenticated,)

	def get(self, request, page=0):
		github_api = GithubApi(request, page=page)
		response = github_api.get_user_repos(request)
		return Response(response)


class CreateUpdateCommitLearnFile(APIView):
	permission_classes = (permissions.IsAuthenticated,)

	def post(self, request):
		github_api = GithubApi(request)
		response = github_api.save_commit_learn(request)

		return Response(response, status=status.HTTP_201_CREATED)

