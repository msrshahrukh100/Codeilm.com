from django.shortcuts import render, redirect
from .models import Community
from django.http import JsonResponse
from django.contrib.auth.decorators import login_required
from django.urls import reverse
import logging

logger = logging.getLogger(__name__)
# Create your views here.


def opensearch(request):
	return render(request, 'open_search.xml', content_type="application/xhtml+xml")


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
