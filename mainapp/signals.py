from django.db.models.signals import pre_save
from django.dispatch import receiver
from .models import Community


@receiver(pre_save, sender=Community)
def save_community(sender, instance, **kwargs):
    instance.profile.save()