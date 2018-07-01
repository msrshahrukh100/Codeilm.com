from django.shortcuts import render, redirect
from .models import UnsubscribedUser
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
