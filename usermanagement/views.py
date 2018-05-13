from django.contrib.auth.models import User
from django.http import HttpResponse, JsonResponse
from django.shortcuts import render, get_object_or_404
from .models import Connections
# Create your views here.


def add_user_following(request, user_id=None):
	if request.method == "POST":
		if not id:
			return HttpResponse(status=404)
		following = get_object_or_404(User, id=user_id)
		user = request.user
		obj, created = Connections.objects.get_or_create(user=user, following=following)
		if created:
			obj.save()
		return JsonResponse({"msg": "Following added"})
