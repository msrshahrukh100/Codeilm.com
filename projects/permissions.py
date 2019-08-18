from rest_framework.permissions import BasePermission
from rest_framework import permissions
# from allauth.socialaccount.models import SocialAccount

class CanViewProject(BasePermission):
	def has_object_permission(self, request, view, obj):

		if request.method in permissions.SAFE_METHODS:
			if obj.is_private:
				if (obj.poster == request.user) or (request.user in obj.developers.all()):
					return True
				return False
			return True
		return obj.poster == request.user
