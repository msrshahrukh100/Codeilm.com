from allauth.socialaccount.models import SocialAccount
from django.shortcuts import get_object_or_404
from django.conf import settings
from .models import GithubApiResponse
import requests
import logging

logger = logging.getLogger(__name__)


class GithubApi:
	def __init__(self, page):
		self.client_id = settings.GITHUB_CLIENT_ID
		self.client_secret = settings.GITHUB_CLIENT_SECRET
		self.per_page = 10
		self.page = page
		self.etag_names = ["user_repos_etag"]

	def get_github_acount(self, user):
		return get_object_or_404(SocialAccount, user=user, provider="GitHub")

	def get_response_from_db(self, request, etag):
		qs = GithubApiResponse.objects.filter(user=request.user, etag=etag)
		if not qs.exists():
			return None
		return qs.first().response


	def get_response_from_github_api(self, request, url, etag_name, conditional_request=False):
		try:
			headers = {}
			etag = request.session.get(etag_name)
			params = {
				"client_id": self.client_id,
				"client_secret": self.client_secret,
				"per_page": self.per_page,
				"page": self.page
			}

			if etag and conditional_request:
				headers['If-None-Match'] = etag
			repos_data = requests.get(url, params=params, headers=headers)
			request.session[etag_name] = repos_data.headers.get("ETag").strip("W/")

			if repos_data.status_code == 200:
				logger.info("____________fetched from the api________")
				obj, created = GithubApiResponse.objects.get_or_create(user=request.user, etag=request.session.get(etag_name))
				obj.response = repos_data.json()
				obj.headers = dict(repos_data.headers)
				obj.url = request.build_absolute_uri()
				obj.save()
				return repos_data.json()
			elif repos_data.status_code == 304:
				db_values = self.get_response_from_db(request, etag)
				if db_values:
					logger.info("_______fetching from database values________")
					return db_values
				return self.get_response_from_github_api(request, url, etag_name, False)
		except Exception as e:
			logger.error(e)
			return {}



	def get_user_repos(self, request):
		github_account = self.get_github_acount(request.user)
		repos_url = github_account.extra_data.get("repos_url")
		try:
			# del request.session["user_repos_etag"]
			# return
			return self.get_response_from_github_api(request, repos_url, "user_repos_etag", True)
		except Exception as e:
			logger.error(e)
			return {}
