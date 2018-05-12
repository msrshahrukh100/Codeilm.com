from background_task import background
from django.contrib.auth.models import User
from .models import UserActivity


@background(schedule=60)
def add_activity(user_id, activity):
	'''
	Adds the user activity
	First Parameter is the user and then the activity code
	'''
	user = User.objects.get(id=user_id)
	obj = UserActivity.objects.create(user=user, activity=activity)
	obj.save()
