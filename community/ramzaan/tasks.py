from background_task import background
from django.contrib.auth.models import User
from feedback.tasks import add_activity
from notifications.signals import notify
from . import models as ramzaan_models

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
	notify.send(sender=from_user, recipient=to_user, verb='motivated you')
	add_activity(from_user.id, 'ramzaan-motivation-sent')


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
