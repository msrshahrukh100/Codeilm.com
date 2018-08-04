from django.contrib import messages
from django.core.paginator import Paginator
from django.utils import timezone
from feedback.tasks import add_activity
from .models import RamzaanUserProgress, RamzaanStatusUpdate, RamzaanGroupUser
from mainapp.utils import save_request_ip_info, get_user_display_name
from . import tasks
import emailmanager.tasks as emailmanager_tasks


def add_user_to_group(request, user, group):
	request_ip_info_obj = save_request_ip_info(request)
	recipients = list(RamzaanGroupUser.objects.all().values_list('user__email', flat=True))
	ramzaangroupuser_object = RamzaanGroupUser.objects.create(user=user, request_ip_info=request_ip_info_obj)
	ramzaangroupuser_object.save()
	group.users.add(ramzaangroupuser_object)
	obj = RamzaanUserProgress.objects.create(user=user, group=group)
	obj.save()
	messages.success(request, 'You have successfully joined this group')
	context = {
		"message": get_user_display_name(user) + " just joined the group " + group.name + " in the community " + group.community.name,
		"person_image_url": user.user_profile.first().get_profile_pic_url(),
		"button_url": group.get_absolute_url(),
		"button_title": "Visit the group"
	}
	emailmanager_tasks.send_ses_email(
		sender="Allywith <shahrukh@allywith.com>",
		recipients=recipients,
		subject="😃 " + get_user_display_name(user) + " joined the group " + group.name,
		template_path="emails/email_with_image.html",
		context=context,
	)


def get_post_age(date):
	old_post = 0
	time_delta = timezone.now() - date
	if time_delta > timezone.timedelta(days=1) and time_delta < timezone.timedelta(days=7):
		old_post = 1
	elif time_delta > timezone.timedelta(days=7):
		old_post = 2
	return str(old_post)


def get_status_updates_page(page_no, group):
	qs = RamzaanStatusUpdate.objects.filter(group=group)
	paginator = Paginator(qs, 6)
	status_updates = paginator.get_page(page_no)
	return status_updates


def update_user_status(request, user, group, **data):
	obj = RamzaanStatusUpdate.objects.create(**data)
	user_progress_obj, created = RamzaanUserProgress.objects.get_or_create(user=user, group=group)
	user_progress_obj.at_unit = obj.at_unit
	user_progress_obj.save()
	add_activity(user.id, 'ramzaan-status-update')
	online_user_ids = request.online_now_ids
	tasks.send_update_user_status_notifications(user.id, group.id, data, online_user_ids)
