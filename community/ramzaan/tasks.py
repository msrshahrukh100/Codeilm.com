from background_task import background
from django.contrib.auth.models import User
from feedback.tasks import add_activity
from notifications.signals import notify

@background(schedule=60)
def send_motivation(user_id):
	'''
	Adds the user activity
	First Parameter is the user and then the activity code
	'''
	user = User.objects.get(id=user_id)
	notify.send(user, recipient=user, verb='Motivated you', age="21")
	add_activity(user.id, 'ramzaan-motivation-sent')
