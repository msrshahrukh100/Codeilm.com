from django.contrib.auth.models import User
from django.db.models.signals import post_save
from django.dispatch import receiver
from .models import UserProfile, UserSettings
from django.core.mail import send_mail
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
			print (instance.email)
			# send_mail('Subject shahrukh', 'Here is the message.', 'msr.concordfly@gmail.com', ['msr.concordfly@gmail.com'])
			emailmanager_utils.send_sendgrid_template_email(
				"c8b46ab3-cabc-48ad-a021-d39ba71a0399",
				"msr.concordfly@gmail.com",
				"msr.concordfly@gmail.com",
				bcc=None,
				personalization_obj=None,
				cc=None,
				subject=None,
				subscription_tracking=False,
				group_id=None,
				category=None
				)