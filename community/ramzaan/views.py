from django.shortcuts import render, get_object_or_404
from .models import RamzaanGroup, RamzaanUserProgress
from django.urls import reverse
from django.contrib import messages
from django.http import HttpResponsePermanentRedirect


def group_list(request):
	groups = RamzaanGroup.objects.filter(is_inactive=False)
	context = {
		"groups": groups
	}
	return render(request, "group_list.html", context)


def group_detail(request, id, slug):
	user = request.user
	from notifications.signals import notify
	notify.send(user, recipient=user, verb='you reached level 10')
	group = get_object_or_404(RamzaanGroup, id=id, slug=slug)
	context = {
		"group": group,
		"users": group.users.all()
	}
	return render(request, "group_detail.html", context)


def group_join(request, id, slug):
	user = request.user
	group = get_object_or_404(RamzaanGroup, id=id, slug=slug)
	if user in group.users.all():
		messages.info(request, 'You are already part of this group')
	else:
		group.users.add(user)
		obj = RamzaanUserProgress.objects.create(user=user, group=group)
		obj.save()
		messages.success(request, 'You have successfully joined this group')
	return HttpResponsePermanentRedirect(reverse("ramzaan:group_detail", kwargs={"id": id, "slug": slug}))

