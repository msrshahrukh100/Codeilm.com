from django.shortcuts import render, redirect
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
	# this view is for the purpose of testing emails with a sample context data
	group = RamzaanGroup.objects.all().first()
	context = {
		"motivator": request.user,
		"group": RamzaanGroup.objects.all().first(),
		"group_target": group.target_statement

	}

	return render(request, "emails/motivation_sent_email.html", context)
