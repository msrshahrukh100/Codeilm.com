from django.http import HttpResponse, JsonResponse
from .import utils
from rest_framework import generics, permissions
from django.contrib.auth.models import User
from . import serializers as usermanagementserializers
from .paginators import UsersListPagination
from .permissions import IsOwnerOrReadOnly
from . import models as usermanagementmodels
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
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


class FollowUnfollowUser(APIView):
	permission_classes = (permissions.IsAuthenticated,)

	def post(self, request):
		data = request.data
		if data:
			user = request.user
			following_user_id = data.get('following_user_id')
			active = data.get('active')

			obj, created = usermanagementmodels.Connections.objects.update_or_create(
				user=user,
				following_id=following_user_id,
				defaults={'active': active}
			)
			if created:
				utils.add_user_following(user_id=request.user.id, following_id=following_user_id)
			return Response(usermanagementserializers.ConnectionsSerializer(obj).data, status=status.HTTP_200_OK)
		return Response({"msg": "Data not provided"}, status=status.HTTP_404_NOT_FOUND)
