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
		github_api = GithubApi()
		response = github_api.get_learn_md_content(request, repo_name)
		data = response.get("data")
		if data:
			content = data.get("content")
			asdf = base64.b64decode(content)
			print(str(asdf))
			return Response({"content": base64.b64decode(content)})
		else:
			return {}


class UserRepositoriesCached(APIView):

	permission_classes = (permissions.IsAuthenticated,)

	@method_decorator(cache_page(10, key_prefix="something"))
	@method_decorator(vary_on_cookie)
	def get(self, request, datetime=None):
		from django.utils import timezone
		usernames = [timezone.now()]
		response = Response(usernames)
		return response


class UserRepositories(APIView):

	permission_classes = (permissions.IsAuthenticated,)

	def get(self, request, page=0):
		github_api = GithubApi(page=page)
		response = github_api.get_user_repos(request)
		return Response(response)