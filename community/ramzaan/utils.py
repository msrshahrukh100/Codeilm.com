from django.contrib import messages
from django.core.paginator import Paginator
from django.utils import timezone
from feedback.tasks import add_activity
from .models import RamzaanUserProgress, RamzaanStatusUpdate, RamzaanGroupUser
from mainapp.utils import save_request_ip_info


def add_user_to_group(request, user, group):
	request_ip_info_obj = save_request_ip_info(request)
	ramzaangroupuser_object = RamzaanGroupUser.objects.create(user=user, request_ip_info=request_ip_info_obj)
	ramzaangroupuser_object.save()
	group.users.add(ramzaangroupuser_object)
	obj = RamzaanUserProgress.objects.create(user=user, group=group)
	obj.save()
	messages.success(request, 'You have successfully joined this group')


def get_post_age(date):
	old_post = 0
	time_delta = timezone.now() - date
	if time_delta > timezone.timedelta(days=1) and time_delta < timezone.timedelta(days=7):
		old_post = 1
	elif time_delta > timezone.timedelta(days=7):
		old_post = 2
	return str(old_post)


def get_status_updates_page(page_no):
	qs = RamzaanStatusUpdate.objects.all()
	paginator = Paginator(qs, 4)
	status_updates = paginator.get_page(page_no)
	return status_updates


def update_user_status(user, group, **data):
	obj = RamzaanStatusUpdate.objects.create(**data)
	obj.save()
	user_progress_obj, created = RamzaanUserProgress.objects.get_or_create(user=user, group=group)
	user_progress_obj.at_unit = obj.on_unit
	user_progress_obj.save()
	add_activity(user.id, 'ramzaan-status-update')
