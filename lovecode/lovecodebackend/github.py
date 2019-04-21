from allauth.socialaccount.models import SocialAccount, SocialToken
from django.shortcuts import get_object_or_404
from django.conf import settings
from .models import GithubApiResponse
import requests
import logging
from .utils import get_links_from_headers
import base64
import json

logger = logging.getLogger(__name__)


class GithubApi:
	def __init__(self, request, page=0):
		social_token_obj = SocialToken.objects.filter(account__user=request.user, account__provider='GitHub').first()
		self.auth_token = social_token_obj.token
		self.per_page = 10
		self.page = page
		self.etag_names = ["user_repos_etag"]

	def get_github_acount(self, user):
		return get_object_or_404(SocialAccount, user=user, provider="GitHub")


	def make_request_to_github_api(self, url, get_params, request_headers):
		repos_data = requests.get(url, params=get_params, headers=request_headers)
		return repos_data, repos_data.headers.get('Etag').strip("W/")


	def put_data_to_github(self, url, data):
		headers = {}
		headers['Authorization'] = "token " + self.auth_token
		response = requests.put(url, data=json.dumps(data), headers=headers)
		return response.json()



	def get_response_from_github_api(self, request, url, extra_params={}):
		try:

			headers = {}
			params = {
				"per_page": self.per_page,
				"page": self.page
			}

			params = {**params, **extra_params}

			obj, created = GithubApiResponse.objects.get_or_create(url=url, get_params=params, user=request.user)

			headers['If-None-Match'] = obj.etag
			headers['Authorization'] = "token " + self.auth_token
				
			response, etag = self.make_request_to_github_api(url, params, headers)


			if response.status_code == 200:
				print("____________fetched from the api________")
				
				obj.response = response.json()
				# obj.request_headers = dict(request.headers)
				obj.response_headers = dict(response.headers)
				obj.etag = etag
				obj.url = url
				obj.save()
				return {"links": get_links_from_headers(obj.response_headers.get('Link', "")), "data": response.json()}
			elif response.status_code == 304:
				print("returned from db")
				return {"links": get_links_from_headers(obj.response_headers.get('Link', "")), "data": obj.response}
		except Exception as e:
			print(e)
			return {}


	def get_learn_md_content(self, request, repo_name, branch_name):
		github_account = self.get_github_acount(request.user)
		login = github_account.extra_data.get("login")
		try:
			extra_params = {"ref": branch_name}
			url = "https://api.github.com/repos/" + login + "/" + repo_name + "/contents/learn.md"
			return self.get_response_from_github_api(request, url, extra_params)
		except Exception as e:
			print(e)
			return {}

	def get_repo_branches(self, request, repo_name):
		github_account = self.get_github_acount(request.user)
		login = github_account.extra_data.get("login")
		try:
			url = "https://api.github.com/repos/" + login + "/" + repo_name + "/branches"
			return self.get_response_from_github_api(request, url)
		except Exception as e:
			print(e)
			return {}


	def get_user_repos(self, request):
		github_account = self.get_github_acount(request.user)
		repos_url = github_account.extra_data.get("repos_url")
		try:
			return self.get_response_from_github_api(request, repos_url)
		except Exception as e:
			print(e)
			return {}


	def save_commit_learn(self, request):
		github_account = self.get_github_acount(request.user)
		login = github_account.extra_data.get("login")
		data = request.data
		try:
			url = "https://api.github.com/repos/" + login + "/" + data.get('repo_name') + "/contents/learn.md"
			data["content"] = base64.b64encode(data['content'].encode("utf-8")).decode("utf-8")
			return self.put_data_to_github(url, data)
		except Exception as e:
			print(e)
			return {}

