from background_task import background
from django.contrib.auth.models import User
from feedback.tasks import add_activity
from notifications.signals import notify
from . import models as ramzaan_models
from emailmanager import tasks as emailmanager_tasks
from django.conf import settings
from emailmanager import utils as emailmanager_utils
from mainapp.utils import get_user_display_name
from sorl.thumbnail import get_thumbnail
from emailmanager.tasks import send_ses_email


@background(schedule=20)
def send_motivation(from_user_id, to_user_id, group_id):
	'''
	Adds the user activity
	First Parameter is the user and then the activity code
	'''
	from_user = User.objects.get(id=from_user_id)
	to_user = User.objects.get(id=to_user_id)
	group = ramzaan_models.RamzaanGroup.objects.get(id=group_id)
	ramzaan_models.RamzaanGroupUserMotivation.objects.create(to_user=to_user, from_user=from_user, group=group)
	verb = get_user_display_name(from_user) + " motivated you"
	notify.send(
		sender=from_user,
		recipient=to_user,
		verb=verb,
		image_url=get_thumbnail(from_user.user_profile.first().get_profile_pic_url(), '100x100', crop="center").url
	)

	context = {
		"base_url": settings.BASE_URL,
		"email": to_user.email,
		"template": "emails/motivation_sent_email.html",
		"motivator_image_url": from_user.user_profile.first().get_profile_pic_url(),
		"motivator_full_name": get_user_display_name(from_user),
		"group_name": group.name,
		"community_name": group.get_community_name(),
		"group_url": group.get_absolute_url(),
		"group_target": group.target_statement,

	}
	context["get_params"] = emailmanager_utils.get_params_from_context(context)
	emailmanager_tasks.send_ses_email(
		"Allywith <shahrukh@allywith.com>",
		"emails/motivation_sent_email.html",
		context,
		[to_user.id],
		None,
		subject="🕊 Motivation received from " + get_user_display_name(from_user),
	)

	add_activity(from_user.id, 'ramzaan-motivation-sent')


@background(schedule=20)
def send_update_user_status_notifications(user_id, group_id, data, online_user_ids):
	user = User.objects.get(id=user_id)
	followers = user.user_followers.all()
	group = ramzaan_models.RamzaanGroup.objects.get(id=group_id)
	email_context = {
		"message": get_user_display_name(user) + " updated status on the group '" + group.name + "' in the community " + group.community.name,
		"person_image_url": user.user_profile.first().get_profile_pic_url(),
		"button_url": group.get_absolute_url(),
		"button_title": "Visit the group"
	}
	email_subject = "🙌 " + get_user_display_name(user) + " updated the status"
	for follower in followers:
		notify.send(
			user,
			recipient=follower.user,
			verb=get_user_display_name(user) + ' updated the status',
			image_url=get_thumbnail(user.user_profile.first().get_profile_pic_url(), '100x100', crop="center").url
		)
		sender = "Allywith <shahrukh@allywith.com>"
		send_ses_email(
			sender,
			"emails/email_with_image.html",
			email_context,
			[follower.user.id],
			None,
			email_subject
		)


@background(schedule=20)
def send_task_completed_notifications(user_id, group_id, data, online_user_ids):
	user = User.objects.get(id=user_id)
	group = ramzaan_models.RamzaanGroup.objects.get(id=group_id)
	group_users = group.users.all()
	email_context = {
		"message": get_user_display_name(user) + " completed the task of the group '" + group.name + "' in the community " + group.community.name,
		"person_image_url": user.user_profile.first().get_profile_pic_url(),
		"button_url": group.get_absolute_url(),
		"button_title": "Visit the group"
	}
	email_subject = "🌟 " + get_user_display_name(user) + " completed the task of the group " + group.name
	for group_user in group_users:
		notify.send(
			user,
			recipient=group_user.user,
			verb=get_user_display_name(user) + ' completed the task of the group',
			image_url=get_thumbnail(user.user_profile.first().get_profile_pic_url(), '100x100', crop="center").url
		)
		sender = "Allywith <shahrukh@allywith.com>"
		send_ses_email(
			sender,
			"emails/email_with_image.html",
			email_context,
			[group_user.user.id],
			None,
			email_subject
		)
