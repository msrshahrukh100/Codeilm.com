from django.http import HttpResponse, JsonResponse
from .import utils
from rest_framework import generics
from django.contrib.auth.models import User
from . import serializers as usermanagementserializers
from .paginators import UsersListPagination
from .permissions import IsOwnerOrReadOnly
# Create your views here.


def add_user_following(request, user_id=None):
	if request.method == "POST":
		if not user_id:
			return HttpResponse(status=404)
		utils.add_user_following(user_id=request.user.id, following_id=user_id)
		return JsonResponse({"msg": "Following added"})


class UserProfile(generics.RetrieveUpdateAPIView):
	queryset = User.objects.all()
	lookup_field = 'id'
	serializer_class = usermanagementserializers.UserProfilePageSerializer
	permission_classes = (IsOwnerOrReadOnly, )


class UsersList(generics.ListAPIView):
	queryset = User.objects.all()
	serializer_class = usermanagementserializers.UserProfilePageSerializer
	pagination_class = UsersListPagination
