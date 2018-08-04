from django.contrib.auth.models import User
from notifications.signals import notify
from django.conf import settings
from .models import Connections
from feedback.tasks import add_activity
from emailmanager import tasks as emailmanager_tasks
from emailmanager import utils as emailmanager_utils
from background_task import background
from mainapp.utils import get_user_display_name
from sorl.thumbnail import get_thumbnail


@background(schedule=1)
def send_connection_notifications(user_id, following_id):
	user = User.objects.get(id=user_id)
	following = User.objects.get(id=following_id)
	Connections.objects.create(user=user, following=following)

	verb = get_user_display_name(user) + " started following you"
	notify.send(
		sender=user,
		recipient=following,
		verb=verb,
		image_url=get_thumbnail(user.user_profile.first().get_profile_pic_url(), '100x100', crop="center").url
	)
	context = {
		"base_url": settings.BASE_URL,
		"email": following.email,
		"template": "emails/connection_added_email.html",
		"follower_image_url": user.user_profile.first().get_profile_pic_url(),
		"follower_full_name": get_user_display_name(user),
		"link_url": "",

	}
	context["get_params"] = emailmanager_utils.get_params_from_context(context)
	emailmanager_tasks.send_ses_email(
		"Allywith <shahrukh@allywith.com>",
		"emails/connection_added_email.html",
		context,
		[following.id],
		None,
		"🤗 %s started following you on Allywith " % get_user_display_name(user),
	)

	add_activity(user.id, 'started-following-' + get_user_display_name(following))