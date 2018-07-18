from . import tasks as usermanagement_tasks


def add_user_following(user_id, following_id):
	usermanagement_tasks.send_connection_notifications(user_id=user_id, following_id=following_id)
