from django.contrib import messages
from django.contrib.auth.decorators import login_required
from django.http import HttpResponseRedirect, JsonResponse
from django.shortcuts import render, get_object_or_404
from django.urls import reverse
from django.utils import timezone
from feedback.tasks import add_activity
from notifications.signals import notify
from .models import RamzaanGroup, RamzaanStatusUpdate
from . import utils
from . import tasks


def get_status_updates(request):
	page_no = request.GET.get('page')
	status_updates = utils.get_status_updates_page(page_no)
	context = {
		"status_updates": status_updates,
	}
	return render(request, "partials/recent_activities_ramzaan_list.html", context)


def group_list(request):
	groups = RamzaanGroup.objects.filter(is_inactive=False)
	context = {
		"groups": groups
	}
	return render(request, "group_list.html", context)


def group_detail(request, id, slug):
	group = get_object_or_404(RamzaanGroup, id=id, slug=slug)
	user = request.user
	users = group.users.all()
	is_member = False

	if user in users:
		is_member = True

	context = {
		"logged_in_user": user,
		"group": group,
		"users": users,
		"is_member": is_member,
		"status_updates": utils.get_status_updates_page(1),
	}
	return render(request, "group_detail_ramzaan.html", context)


@login_required
def group_join(request, id, slug):
	user = request.user
	group = get_object_or_404(RamzaanGroup, id=id, slug=slug)
	if user in group.users.all():
		messages.info(request, 'You are already part of this group')
	else:
		utils.add_user_to_group(request, user, group)

	return HttpResponseRedirect(reverse("ramzaan:group_detail", kwargs={"id": id, "slug": slug}))


def send_motivation(request, id, slug, to_user_id):
	if request.method == "POST":
		user = request.user
		tasks.send_motivation(user.id)
		return JsonResponse({"status": "Success"})
	return JsonResponse({"status": "Failure"})


@login_required
def post_status_update(request, id=None, slug=None):
	group = get_object_or_404(RamzaanGroup, id=id, slug=slug)
	if request.method == 'POST':
		user = request.user
		data = request.POST.dict()
		data.pop('csrfmiddlewaretoken')
		data.pop('action')
		utils.update_user_status(user, group, **data)
		return HttpResponseRedirect(reverse('ramzaan:group_detail', kwargs={"id": group.id, "slug": group.slug}))
