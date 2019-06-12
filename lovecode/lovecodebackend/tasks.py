from background_task import background
from django.contrib.auth.models import User
from .models import GithubRepo, TutorialView, Tutorial
import requests
import simplejson
from allauth.socialaccount.models import SocialApp
from django.db.models import Q

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


@background(schedule=8)
def save_tutorial_view(tutorial_id, ip, session, user_id, request_ip_info_id):
	tutorial = Tutorial.objects.get(id=tutorial_id)
	if user_id:
		obj, created = TutorialView.objects.get_or_create(
			user_id=user_id,
			ip=ip,
			session=session,
			tutorial=tutorial,
		)
		if created:
			# update the rank of the tutorial
			rank_change = settings.TUTORIAL_RANK.get("view", 0)
			tutorial.rank = tutorial.rank + rank_change
			tutorial.save()
	else:
		obj = TutorialView.objects.create(
			ip=ip,
			session=session,
			tutorial=tutorial,
		)
	obj.request_ip_info_id = request_ip_info_id
	obj.save()
	anonymous_views_count = tutorial.user_views.filter(user=None).count()
	views_count = tutorial.user_views.filter(~Q(user=None)).count()
	view_data = {
		"views_count": views_count,
		"anonymous_views_count": anonymous_views_count
	}
	tutorial.view_data = view_data
	tutorial.save()

