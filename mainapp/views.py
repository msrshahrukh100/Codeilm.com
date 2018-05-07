from django.shortcuts import render, redirect
from .models import Community
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
