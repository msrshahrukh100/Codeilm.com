from django.http import HttpResponse, JsonResponse
from .import utils
# Create your views here.


def add_user_following(request, user_id=None):
	if request.method == "POST":
		if not user_id:
			return HttpResponse(status=404)
		utils.add_user_following(user_id=request.user.id, following_id=user_id)
		return JsonResponse({"msg": "Following added"})
