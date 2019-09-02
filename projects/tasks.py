from django.contrib.auth.models import User
from django.conf import settings
from emailmanager import tasks as emailmanager_tasks
from emailmanager import utils as emailmanager_utils
from background_task import background
from mainapp.utils import get_user_display_name



@background(schedule=10)
def send_project_added_email(kwargs):

	context = {
		"message": "You have successfully created the project '%s' on Codeilm. A developer will shortly start working on your project and you'll be updated on the progress of the project" % kwargs.get("title"),
		"button_title": "See your Project",
		"button_url": "/p/%s" % kwargs.get("id"),
	}

	emailmanager_tasks.send_ses_email(
		"Codeilm <shahrukh@codeilm.com>",
		"emails/email_with_image.html",
		context,
		[kwargs.get('poster')],
		None,
		"✔️ Project Created on Codeilm ",
	)

