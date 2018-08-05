from django.shortcuts import render, redirect
from django.http import Http404
from .models import UnsubscribedUser
from community.ramzaan.models import RamzaanGroup
# Create your views here.


def view_email(request):
	data = request.GET
	context = {}
	for key in data.keys():
		context[key] = data[key]
	template = context["template"]
	context["at_site"] = True
	return render(request, template, context)


def unsubscribe_user(request):
	if request.method == "POST":
		email = request.POST.get("email")
		obj, created = UnsubscribedUser.objects.update_or_create(email=email)
		return redirect("/")
	return render(request, "unsubscribe.html", {})


def test_email(request):
	if not request.user.is_staff:
		raise Http404("Page doesn't exist")
	# this view is for the purpose of testing emails with a sample context data
	group = RamzaanGroup.objects.all().first()
	context = {
		"name": request.user.get_full_name(),
		"email": request.user.email,
		"group": RamzaanGroup.objects.all().first(),
		"message": group.target_statement,
		"person_image_url": "https://allywith.com/media/cache/ad/e2/ade227dc7c39d0e5b7001445c55bc11b.jpg",
		"button_url": "osmthin",
		"button_title": "sdf"

	}

	return render(request, "emails/promotion_email.html", context)
