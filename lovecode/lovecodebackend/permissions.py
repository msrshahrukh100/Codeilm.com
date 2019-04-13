from rest_framework.permissions import BasePermission
from allauth.socialaccount.models import SocialAccount

class HasGithubAccount(BasePermission):
	def has_permission(self, request, view):
		qs = SocialAccount.objects.filter(user=request.user, provider="GitHub")	
		return qs.exists()