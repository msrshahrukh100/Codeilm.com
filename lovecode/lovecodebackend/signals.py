from django.dispatch import receiver
from django.db.models.signals import post_save
from .models import GithubRepo, Tutorial, TutorialLike
from . import serializers as lovecode_serializers

@receiver(post_save, sender=GithubRepo)
def save_languages(sender, instance, created, **kwargs):
	if created:
		qs = GithubRepo.objects.filter(id=instance.id)
		qs.update(hash_id=instance.id)


@receiver(post_save, sender=TutorialLike)
def save_like_data(sender, instance, created, **kwargs):
	qs = instance.tutorial.user_likes.filter(liked=True)
	like_data = {
		"count": qs.count(),
		"user_ids": list(qs.values_list('user', flat=True)),
		"like_users": lovecode_serializers.TutorialLikeSerializer(qs[:4], many=True).data
	}
	instance.tutorial.like_data = like_data
	instance.tutorial.save()
