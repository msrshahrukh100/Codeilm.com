from rest_framework.permissions import BasePermission
from rest_framework import permissions
# from allauth.socialaccount.models import SocialAccount

class CanViewProject(BasePermission):
	def has_object_permission(self, request, view, obj):
		if request.user.is_authenticated:
			if request.method in permissions.SAFE_METHODS:
				if obj.is_private:
					if (obj.poster == request.user) or (request.user in obj.developers.all()):
						return True
					return False
				return True
			return obj.poster == request.user
		else:
			return not obj.is_private


class CanRetrieveUpdateDestroyTask(BasePermission):
	def has_object_permission(self, request, view, obj):
		if request.method in permissions.SAFE_METHODS:
			if (obj.project.poster == request.user) or (request.user in obj.project.developers.all()):
				return True
			return False
		else:
			if request.user in obj.project.developers.all():
				return True
		return False


class CanRetrieveTask(BasePermission):
	def has_object_permission(self, request, view, obj):
		if (obj.project.poster == request.user) or (request.user in obj.project.developers.all()):
			return True
		return False


class CanRetrieveUpdateDestroyComment(BasePermission):
	def has_object_permission(self, request, view, obj):
		if request.method in permissions.SAFE_METHODS:
			if (obj.project.poster == request.user) or (request.user in obj.project.developers.all()):
				return True
		else:
			if request.user == obj.user:
				return True
		return False
