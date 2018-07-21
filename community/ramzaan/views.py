from django.contrib import messages
from django.contrib.auth.decorators import login_required
from django.http import HttpResponseRedirect, JsonResponse
from django.shortcuts import render, get_object_or_404
from django.urls import reverse
from .models import RamzaanGroup, RamzaanUnitDescription
from . import utils
from . import tasks
from mainapp import community_utils


def get_status_updates(request):
	page_no = request.GET.get('page')
	status_updates = utils.get_status_updates_page(page_no)
	context = {
		"status_updates": status_updates,
	}
	return render(request, "ramzaan/partials/recent_activities_ramzaan_list.html", context)


def group_list(request):
	groups = RamzaanGroup.objects.filter()
	context = {
		"groups": groups
	}
	return render(request, "group_list.html", context)


def group_detail(request, id, slug):
	group = get_object_or_404(RamzaanGroup, id=id)
	user = request.user  # the current logged in user
	group_users = group.users.all().exclude(user__isnull=True)  # query set of group user objects
	users = [obj.user for obj in group_users]
	unit_descriptions = RamzaanUnitDescription.objects.filter(group=group).order_by('unit')
	try:
		user_at_unit = user.ramzaan_userprogressuser.first().at_unit
	except Exception as e:
		user_at_unit = None

	context = {
		"logged_in_user": user,
		"group": group,
		"group_users": group_users,
		"status_updates": utils.get_status_updates_page(1),
		"users": users,
		"group_options": community_utils.get_group_options(request, group, 'sealed-nector'),
		"unit_descriptions": unit_descriptions,
		"user_at_unit": user_at_unit

	}
	return render(request, "group_detail_ramzaan.html", context)


@login_required
def send_motivation(request, group_id, group_slug, to_user_id):
	if request.method == "POST":
		user = request.user
		tasks.send_motivation(from_user_id=user.id, to_user_id=to_user_id, group_id=group_id)
		return JsonResponse({"status": "Success"})
	return JsonResponse({"status": "Failure"})


@login_required
def post_status_update(request, id=None, slug=None):
	group = get_object_or_404(RamzaanGroup, id=id)
	if request.method == 'POST':
		user = request.user
		data = request.POST.dict()
		data.pop('csrfmiddlewaretoken')
		data.pop('action')
		utils.update_user_status(request, user, group, **data)
		return HttpResponseRedirect(reverse('ramzaan:group_detail', kwargs={"id": group.id, "slug": group.slug}))
