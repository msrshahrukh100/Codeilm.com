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


@background(schedule=20)
def send_update_user_status_notifications(user_id, group_id, data, online_user_ids):
	user = User.objects.get(id=user_id)
	followers = user.user_followers.all()
	for follower in followers:
		notify.send(user, recipient=follower.user, verb='Updated his status', age="21")
		if follower.user.id in online_user_ids:
			print("online now, don't send mail")
		else:
			pass
			# send mai
