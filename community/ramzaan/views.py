from django.shortcuts import render, get_object_or_404
from .models import RamzaanGroup, RamzaanUserProgress
from django.urls import reverse
from django.contrib import messages
from django.http import HttpResponseRedirect, JsonResponse
from notifications.signals import notify
from django.contrib.auth.decorators import login_required


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
		"is_member": is_member
	}
	return render(request, "group_detail_ramzaan.html", context)


@login_required
def group_join(request, id, slug):
	print("coming to funciton")
	user = request.user
	group = get_object_or_404(RamzaanGroup, id=id, slug=slug)
	if user in group.users.all():
		print("coming here")
		messages.info(request, 'You are already part of this group')
	else:
		group.users.add(user)
		obj = RamzaanUserProgress.objects.create(user=user, group=group)
		obj.save()
		messages.success(request, 'You have successfully joined this group')
	return HttpResponseRedirect(reverse("ramzaan:group_detail", kwargs={"id": id, "slug": slug}))


def send_motivation(request, id, slug, to_user_id):
	if request.method == "POST":
		user = request.user
		notify.send(user, recipient=user, verb='Motivated you', age="21")

		return JsonResponse({"status": "Success"})
	return JsonResponse({"status": "Failure"})
