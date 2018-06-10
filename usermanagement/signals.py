from django.contrib.auth.models import User
from django.db.models.signals import post_save
from django.dispatch import receiver
from .models import UserProfile, UserSettings
import emailmanager.utils as emailmanager_utils


@receiver(post_save, sender=User)
def create_user_profile(sender, instance, created, **kwargs):
	if created:
		obj, up_created = UserProfile.objects.get_or_create(
			user=instance,
		)
		if up_created:
			obj.save()

		obj, us_created = UserSettings.objects.get_or_create(user=instance)
		if us_created:
			obj.save()

		if instance.email:
			emailmanager_utils.send_welcome_email(instance)