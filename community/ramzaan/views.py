from django.contrib.auth.decorators import login_required
from django.http import HttpResponseRedirect, JsonResponse
from django.shortcuts import render, get_object_or_404
from django.urls import reverse
from .models import RamzaanGroup, RamzaanUnitDescription, RamzaanUserProgress
from . import utils
from . import tasks
from mainapp import community_utils
import mainapp.models as mainapp_models
from django.conf import settings


def get_status_updates(request):
	page_no = request.GET.get('page')
	group_hash_id = request.GET.get('group_hash_id')
	group = RamzaanGroup.objects.get(group_hash_id=group_hash_id)
	status_updates = utils.get_status_updates_page(page_no=page_no, group=group)
	context = {
		"status_updates": status_updates,
		"group": group
	}
	return render(request, "group_templates/partials/recent_activities_ramzaan_list.html", context)


def group_list(request):
	groups = RamzaanGroup.objects.filter()
	community = mainapp_models.Community.objects.get(id=settings.RAMZAAN_COMMUNITY_ID)

	context = {
		"groups": groups,
		"community": community
	}
	return render(request, "group_list.html", context)


def get_group_extra_content(request, group_hash_id):
	group = RamzaanGroup.objects.get(group_hash_id=group_hash_id)
	template = group.ramzaan_groupoptions.extra_content_popup_template
	return render(request, template, {})


def group_detail(request, id, slug):
	group = get_object_or_404(RamzaanGroup, id=id)
	user = request.user  # the current logged in user
	group_users = group.users.all().exclude(user__isnull=True)  # query set of group user objects
	users = [obj.user for obj in group_users]
	unit_descriptions = RamzaanUnitDescription.objects.filter(group=group).order_by('unit')
	if user.is_authenticated:
		user_progress_qs = RamzaanUserProgress.objects.filter(user=user, group=group)
		if user_progress_qs.exists():
			user_at_unit = RamzaanUserProgress.objects.filter(user=user, group=group).first().at_unit
		else:
			user_at_unit = None
	else:
		user_at_unit = None

	context = {
		"logged_in_user": user,
		"group": group,
		"group_users": group_users,
		"status_updates": utils.get_status_updates_page(page_no=1, group=group),
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
		tasks.send_motivation(user.id, to_user_id, group_id)
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
