from django.shortcuts import render, redirect, get_object_or_404
from .models import Community
from django.http import JsonResponse, HttpResponseRedirect
from django.contrib.auth.decorators import login_required
from django.urls import reverse
import logging
from . import utils as utils
from django.contrib import messages
import community.ramzaan.models as ramzaan_models
import community.ramzaan.utils as ramzaan_utils

logger = logging.getLogger(__name__)
# Create your views here.


def opensearch(request):
	return render(request, 'open_search.xml', content_type="application/xhtml+xml")


@login_required
def group_join(request, id, slug, community):
	user = request.user

	if community == "ramzaan":
		group = get_object_or_404(ramzaan_models.RamzaanGroup, id=id)
		is_member = utils.check_user_in_group(request, group)
		if is_member:
			messages.info(request, 'You are already part of this group')
		else:
			ramzaan_utils.add_user_to_group(request, user, group)

		return HttpResponseRedirect(reverse("ramzaan:group_detail", kwargs={"id": id, "slug": slug}))


def home(request):
	communities = Community.objects.all()
	logger.info("The communities queryset exists")
	logger.info(communities.exists())
	context = {
		"communities": communities
	}

	return render(request, "index.html", context)


@login_required
def mark_notifications_read(request):
	if request.method == "POST":
		user = request.user
		qs = user.notifications.unread()
		if qs.exists():
			qs.mark_all_as_read()
		return JsonResponse({"status": "success", "msg": "Marked as read"})


def redirect_to_page(request, exception, template_name="feedback_page.html"):
	return redirect(reverse("feedback:feedback_page", kwargs={"id": 1, "slug": "join-the-community"}))
