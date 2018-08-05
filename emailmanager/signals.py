from django.dispatch import receiver
from django.db.models.signals import post_save
from .models import SendSESEmail
from emailmanager.tasks import send_ses_email
import ast


@receiver(post_save, sender=SendSESEmail)
def user_signed_up(sender, instance, created, **kwargs):

	'''
		receipient_json_data = {
			"recipients" : [
				{
					"name" : "Mohammad Shahrukh",
					"email": "msr.concordfly@gmail.com",
					"extra_info": {}
				},
				{
					"name": ".....",
					"email": "....",
					"extra_info": {}
				},
				...
			]
		}
	'''
	sender = instance.sender
	template_path = instance.template_path
	subject = instance.subject
	context = ast.literal_eval(instance.context)
	receipient_json_data = ast.literal_eval(instance.receipient_json_data)
	recipients_data = receipient_json_data.get('recipients')
	if recipients_data:
		recipients = [(recipient["name"], recipient["email"]) for recipient in recipients_data]
	send_ses_email(
		sender,
		template_path,
		context,
		None,
		recipients,
		subject
	)