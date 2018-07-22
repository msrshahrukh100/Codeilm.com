from django.db.models.signals import post_save
from django.dispatch import receiver
from .models import GroupCreationRequest
from emailmanager.utils import send_info_mail_to_admins


@receiver(post_save, sender=GroupCreationRequest)
def send_email_to_admin_for_group_creation_request(sender, instance, **kwargs):
	if 'created' in kwargs:
		pass
		# content = "A new group creation request from <br>user:<b>%s</b><br> on the community:<b>%s</b> with the description:<br>%s" % (instance.user, instance.community, instance.description)
		# context = {
		# 	"subject": "New Group creation request",
		# 	"content": content,
		# 	"url": instance.get_admin_url()
		# }
		# send_info_mail_to_admins(context)