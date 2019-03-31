from django.dispatch import receiver
from django.db.models.signals import post_save
from .models import GithubRepo
from .tasks import add_languages

@receiver(post_save, sender=GithubRepo)
def save_languages(sender, instance, **kwargs):

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
	add_languages(instance.id)
