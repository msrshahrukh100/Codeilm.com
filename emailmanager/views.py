from django.shortcuts import render

# Create your views here.


def view_email(request):
	data = request.GET
	context = {}
	for key in data.keys():
		context[key] = data[key]
	return render(request, "emails/welcome_email.html", context)
