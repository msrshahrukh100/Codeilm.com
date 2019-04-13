from allauth.socialaccount.models import SocialAccount
from django.shortcuts import get_object_or_404
from django.conf import settings
import requests

class GithubApi:
	def __init__(self):
		self.client_id = settings.GITHUB_CLIENT_ID
		self.client_secret = settings.GITHUB_CLIENT_SECRET
		self.per_page = 10
		self.page = 1

	def get_github_acount(self, user):
		return get_object_or_404(SocialAccount, user=user, provider="GitHub")


	def get_user_repos(self, user):
		github_account = self.get_github_acount(user)
		repos_url = github_account.extra_data.get("repos_url")
		try:
			params = {
				"client_id": self.client_id,
				"client_secret": self.client_secret,
				"per_page": self.per_page,
				"page": self.page
			}
			repos_data = requests.get(repos_url, params=params)
			print(repos_data.headers.get('Link'))
			return repos_data.json()
		except:
			return {}
