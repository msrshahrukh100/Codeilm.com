from django.shortcuts import render
from .models import RamzaanGroup
# Create your views here.


def group_list(request):
	groups = RamzaanGroup.objects.filter(is_inactive=False)
	context = {
		"groups": groups
	}
	return render(request, "group_list.html", context)


def group_detail(request, id, slug):
	return render(request, "group_detail.html", {})
