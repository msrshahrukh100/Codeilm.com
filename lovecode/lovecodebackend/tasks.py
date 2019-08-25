from background_task import background
from django.contrib.auth.models import User
from .models import GithubRepo, TutorialView, Tutorial, TutorialLike
import requests
import simplejson
from allauth.socialaccount.models import SocialApp
from django.db.models import Q
from mainapp.utils import create_request_ip_info_object
from django.conf import settings
from emailmanager import tasks as emailmanager_tasks
from mainapp.utils import get_user_display_name


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
def save_tutorial_view(tutorial_id, ip, session, user_id, request_ip_info_data):
	tutorial = Tutorial.objects.filter(id=tutorial_id)
	if not tutorial.exists():
		return
	tutorial = tutorial.first()
	if user_id:
		obj, created = TutorialView.objects.get_or_create(
			user_id=user_id,
			session=session,
			tutorial=tutorial,
		)
		if created:
			obj.request_ip_info = create_request_ip_info_object(request_ip_info_data)
			obj.ip = ip
			obj.save()
			# update the rank of the tutorial
			if user_id != tutorial.user.id:
				rank_change = settings.TUTORIAL_RANK.get("view", 0)
				tutorial.rank = tutorial.rank + rank_change

		anonymous_views_count = tutorial.user_views.filter(user=None).count()
		views_count = tutorial.user_views.filter(~Q(user=None) & ~Q(user__id=user_id)).count()
		view_data = {
			"views_count": views_count,
			"anonymous_views_count": anonymous_views_count
		}
		tutorial.view_data = view_data
		tutorial.save()

	else:
		obj = TutorialView.objects.create(
			ip=ip,
			session=session,
			tutorial=tutorial,
			request_ip_info=create_request_ip_info_object(request_ip_info_data)
		)



@background(schedule=8)
def send_tutorial_liked_email(tutorial_like_id):
	obj = TutorialLike.objects.get(id=tutorial_like_id)
	user = obj.user
	context = {
		"person_image_url": user.user_profile.first().get_profile_pic_url(),
		"person_profile_url": settings.BASE_URL + "/u/%s-%s" % (user.username, user.id),
		"message": "%s liked your post '%s' on Codeilm " % (get_user_display_name(user), obj.tutorial.title),
		"button_title": "See your post",
		"button_url": settings.BASE_URL + obj.tutorial.get_absolute_url(),
	}
	emailmanager_tasks.send_ses_email(
		"Codeilm <shahrukh@codeilm.com>",
		"emails/email_with_image.html",
		context,
		[obj.tutorial.user.id],
		None,
		"🤗 %s liked your post on Codeilm " % get_user_display_name(user),
	)
