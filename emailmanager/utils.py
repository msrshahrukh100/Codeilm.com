from . import tasks as emailmanager_tasks
from django.conf import settings


def get_params_from_context(context):
	get_params = "?"
	for key in context.keys():
		get_params += key + "=" + context[key] + "&"

	return get_params


def send_welcome_email(user):
	name = user.first_name if user.first_name else "Friend"
	context = {"name": name, "base_url": settings.BASE_URL}
	context["get_params"] = get_params_from_context(context)
	emailmanager_tasks.send_ses_email(
		sender="Shahrukh <shahrukh@allywith.com>",
		user_ids=[user.id],
		subject="Allywith first signup",
		template_path="emails/welcome_email.html",
		context=context,
	)