from . import models as coding_models
from django.db.models.signals import post_save
from django.dispatch import receiver
from guardian.shortcuts import assign_perm
import logging

logger = logging.getLogger(__name__)


@receiver(post_save, sender=coding_models.CodingGroup)
def give_group_owner_permission(sender, instance, created, **kwargs):
	if created:
		assign_perm('owner_of_group', instance.created_by, instance)
		coding_models.CodingGroupOptions.objects.create(group=instance)
		logger.info("Added group permission to user")
	qs = coding_models.CodingGroup.objects.filter(id=instance.id)
	qs.update(group_hash_id=instance.id)
