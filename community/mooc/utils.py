from django.contrib import messages
from django.core.paginator import Paginator
from feedback.tasks import add_activity
from .models import MoocUserProgress, MoocStatusUpdate, MoocGroupUser
from mainapp.utils import save_request_ip_info, get_user_display_name
from . import tasks
import emailmanager.tasks as emailmanager_tasks


def add_user_to_group(request, user, group):
	request_ip_info_obj = save_request_ip_info(request)
	users = [groupuser.user for groupuser in group.users.all().order_by('-id')]
	recipients = [(get_user_display_name(g_user), g_user.email) for g_user in users]
	no_of_recipients = len(recipients)
	moocgroupuser_object = MoocGroupUser.objects.create(user=user, request_ip_info=request_ip_info_obj)
	moocgroupuser_object.save()
	group.users.add(moocgroupuser_object)
	obj = MoocUserProgress.objects.create(user=user, group=group)
	obj.save()
	messages.success(request, 'You have successfully joined this group')
	if no_of_recipients % 5 is 0 and no_of_recipients != 0:
		new_user_names = recipients[0][0] + ", " + recipients[1][0]
		context = {
			"message": new_user_names + " and 3 others just joined the group " + group.name + " in the community " + group.community.name,
			"person_image_url": user.user_profile.first().get_profile_pic_url(),
			"button_url": group.get_absolute_url(),
			"button_title": "Visit the group"
		}
		emailmanager_tasks.send_ses_email(
			"Allywith <shahrukh@allywith.com>",
			"emails/email_with_image.html",
			context,
			None,
			recipients,
			"😃 " + new_user_names + " and 3 others joined the group " + group.name,
		)


def get_status_updates_page(page_no, group):
	qs = MoocStatusUpdate.objects.filter(group=group)
	paginator = Paginator(qs, 6)
	status_updates = paginator.get_page(page_no)
	return status_updates


def update_user_status(request, user, group, **data):
	obj = MoocStatusUpdate.objects.create(**data)
	user_progress_qs = MoocUserProgress.objects.filter(user=user, group=group)
	if user_progress_qs.exists():
		user_progress_obj = user_progress_qs.first()
	else:
		user_progress_obj = MoocUserProgress.objects.create(user=user, group=group)
	user_progress_obj.at_unit = obj.at_unit
	user_progress_obj.save()
	add_activity(user.id, 'mooc-status-update')
	online_user_ids = request.online_now_ids
	if user_progress_obj.get_progress() == 100:
		tasks.send_task_completed_notifications(user.id, group.id, data, online_user_ids)
	else:
		tasks.send_update_user_status_notifications(user.id, group.id, data, online_user_ids)
