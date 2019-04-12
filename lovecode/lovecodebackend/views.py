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
from allauth.socialaccount.models import SocialAccount
from rest_framework.exceptions import NotFound
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


class UserRepositories(APIView):

	permission_classes = (permissions.IsAuthenticated,)

	@method_decorator(cache_page(60))
	@method_decorator(vary_on_cookie, vary_on_headers)
	def get(self, request, datetime=None):
		qs = SocialAccount.objects.filter(user=request.user, provider="GitHub")
		if not qs.exists():
			return NotFound("User doesn't have a github account")
		github_account = qs.first()
		repos_url = github_account.extra_data.get("repos_url")

		from django.utils import timezone
		usernames = [timezone.now(), repos_url]
		return Response(usernames)