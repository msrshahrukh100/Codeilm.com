from django.shortcuts import render

# Create your views here.


def group_list(request):
	context = {
		"groups": [],
	}
	return render(request, "group_list.html", context)
