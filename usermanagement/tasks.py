from django.contrib.auth.models import User
from notifications.signals import notify
from django.conf import settings
from .models import Connections
from feedback.tasks import add_activity
from emailmanager import tasks as emailmanager_tasks
from emailmanager import utils as emailmanager_utils
from background_task import background


@background(schedule=3)
def send_connection_notifications(user_id, following_id):
	user = User.objects.get(id=user_id)
	following = User.objects.get(id=following_id)
	Connections.objects.create(user=user, following=following)

	verb = user.get_full_name() + " started following you"
	notify.send(
		sender=user,
		recipient=following,
		verb=verb,
		image_url=user.user_profile.first().get_profile_pic_url())

	context = {
		"base_url": settings.BASE_URL,
		"email": following.email,
		"template": "emails/connection_added_email.html",
		"follower_image_url": user.user_profile.first().get_profile_pic_url(),
		"follower_full_name": user.get_full_name(),
		"link_url": "",

	}
	context["get_params"] = emailmanager_utils.get_params_from_context(context)
	emailmanager_tasks.send_ses_email(
		sender="Allywith <shahrukh@allywith.com>",
		user_ids=[following.id],
		subject="🤗 %s started following you on Allywith " % user.get_full_name(),
		template_path="emails/connection_added_email.html",
		context=context,
	)

	add_activity(user.id, 'started-following-' + following.get_full_name())