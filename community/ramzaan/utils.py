from django.contrib import messages
from django.core.paginator import EmptyPage, PageNotAnInteger, Paginator
from .models import RamzaanUserProgress, RamzaanStatusUpdate


def add_user_to_group(request, user, group):
		group.users.add(user)
		obj = RamzaanUserProgress.objects.create(user=user, group=group)
		obj.save()
		messages.success(request, 'You have successfully joined this group')


def get_status_updates_page(page_no):
	qs = RamzaanStatusUpdate.objects.all()
	paginator = Paginator(qs, 2)
	status_updates = paginator.get_page(page_no)
	return status_updates
