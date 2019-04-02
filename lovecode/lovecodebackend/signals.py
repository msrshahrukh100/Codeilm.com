from django.dispatch import receiver
from django.db.models.signals import post_save
from .models import GithubRepo, Tutorial

@receiver(post_save, sender=GithubRepo)
def save_languages(sender, instance, created, **kwargs):
	if created:
		qs = GithubRepo.objects.filter(id=instance.id)
		qs.update(hash_id=instance.id)


@receiver(post_save, sender=Tutorial)
def save_hashid(sender, instance, created, **kwargs):
	if created:
		qs = Tutorial.objects.filter(id=instance.id)
		qs.update(hash_id=instance.id)

