from django.shortcuts import render, redirect
from .models import Community
from django.http import JsonResponse
from django.contrib.auth.decorators import login_required

# Create your views here.


def home(request):
	communities = Community.objects.all()
	context = {
		"communities": communities
	}
	return render(request, "index.html", context)


# def community_mapper(request, community):
# 	if community is "ramzaan-community":
# 		return None

@login_required
def mark_notifications_read(request):
	if request.method == "POST":
		user = request.user
		qs = user.notifications.sent()
		if qs.exists():
			qs.mark_all_as_read()
		return JsonResponse({"status": "success", "msg": "Marked as read"})