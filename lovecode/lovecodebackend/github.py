from allauth.socialaccount.models import SocialAccount
from django.shortcuts import get_object_or_404
from django.conf import settings
from .models import GithubApiResponse
import requests
import logging
from .utils import get_links_from_headers

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


	def make_request_to_github_api(self, url, get_params, request_headers):
		repos_data = requests.get(url, params=get_params, headers=request_headers)
		return repos_data, repos_data.headers.get('Etag').strip("W/")



	def get_response_from_github_api(self, request, url):
		try:

			headers = {}
			params = {
				"client_id": self.client_id,
				"client_secret": self.client_secret,
				"per_page": self.per_page,
				"page": self.page
			}


			obj, created = GithubApiResponse.objects.get_or_create(url=url, get_params=params, user=request.user)

			headers['If-None-Match'] = obj.etag
				
			response, etag = self.make_request_to_github_api(url, params, headers)


			if response.status_code == 200:
				print("____________fetched from the api________")
				
				obj.response = response.json()
				# obj.request_headers = dict(request.headers)
				obj.response_headers = dict(response.headers)
				obj.etag = etag
				obj.url = url
				obj.save()
				return {"links": get_links_from_headers(obj.response_headers.get('Link'), ""), "data": response.json()}
			elif response.status_code == 304:
				print("returned from db")
				return {"links": get_links_from_headers(obj.response_headers.get('Link', "")), "data": obj.response}
		except Exception as e:
			print(e)
			return {}



	def get_user_repos(self, request):
		github_account = self.get_github_acount(request.user)
		repos_url = github_account.extra_data.get("repos_url")
		try:
			# del request.session["user_repos_etag"]
			# return
			return self.get_response_from_github_api(request, repos_url)
		except Exception as e:
			print(e)
			return {}
