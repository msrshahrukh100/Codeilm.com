from . import tasks as emailmanager_tasks


def send_welcome_email(user):
	name = user.first_name if user.first_name else "Friend"
	emailmanager_tasks.send_ses_email(
		name=name,
		sender="Shahrukh <shahrukh@allywith.com>",
		user_ids=[user.id],
		subject="Allywith first signup",
		template_path="emails/welcome_email.html",
	)