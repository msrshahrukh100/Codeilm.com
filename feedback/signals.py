from django.db.models.signals import post_save
from django.dispatch import receiver
from .models import FeedbackEvent


@receiver(post_save, sender=FeedbackEvent)
def save_url(sender, instance, **kwargs):
	pass
    # instance.feedback_url = instance.get_feedback_page_url()
    # print("url is", instance.feedback_url)
    # instance.save(update_fields=['feedback_url'])
