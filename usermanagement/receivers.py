from django.contrib.auth.models import User
from django.db.models.signals import post_save
from django.dispatch import receiver
from allauth.socialaccount.models import SocialAccount
from .models import UserProfile


@receiver(post_save, sender=SocialAccount)
def create_user_profile(sender, instance, created, **kwargs):
	print("coming to signal")
	if created:
		obj, up_created = UserProfile.objects.get_or_create(
			user=instance.user,
		)
		if up_created:
			obj.save()
