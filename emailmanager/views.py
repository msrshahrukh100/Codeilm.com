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
		"title": "Help kerala",
		"content": """

### Many people are still stuck and are in desperate need of help. Here is a list of places on which you can make your contributions -

1. **Amazon's initiative** to help the victims of flood - https://www.amazon.in/b?ie=UTF8&node=8891257031

2. **Paytm's initiative** to help flood victims - https://paytm.com/helpinghand

3. **Bigbasket is providing a bundle of materials which is only rupees 116**. See here - https://www.bigbasket.com/bb/csr/21/kerala-flood-relief/…

4. You can reach out to your nearest help center and donate with required materials


### An average of 6 requests per minute are coming on this website for help and other materials - https://keralarescue.in/requests/?district= 
&nbsp;
## "Your help is just a click away"
&nbsp;
### Google is providing a map which shows the area affected, volunteers out for help and much more important information - https://www.google.com/maps/d/u/0/viewer…
&nbsp;
### You can have a look at which districts are in need of which materials here - https://keralarescue.in/district_needs/
		""",
		"group": RamzaanGroup.objects.all().first(),
		"message": group.target_statement,
		"person_image_url": "https://allywith.com/media/cache/ad/e2/ade227dc7c39d0e5b7001445c55bc11b.jpg",
		"button_url": "osmthin",
		"button_title": "sdf"

	}

	return render(request, "emails/content_only.html", context)
