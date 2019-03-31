from background_task import background
from django.contrib.auth.models import User
from .models import GithubRepo
import requests
import simplejson
from allauth.socialaccount.models import SocialApp


@background(schedule=20)
def add_languages(githubrepo_id):
	print("runnign jobs")
	instances = GithubRepo.objects.filter(id=githubrepo_id)
	repo_data = instances.first().repo_data
	languages_url = repo_data.get("languages_url")
	print(languages_url)
	if languages_url:
		try:
			social_app = SocialApp.objects.get(provider='GitHub')
			languages_url += '?client_id=' + social_app.client_id + "&client_secret=" + social_app.secret
			languages = requests.get(languages_url)
			instances.update(languages=languages.json())
			print(languages.json())
		except Exception as e:
			print(e)


