from . import models as ramzaan_models
from django.db.models.signals import post_save
from django.dispatch import receiver
from guardian.shortcuts import assign_perm
import logging

logger = logging.getLogger(__name__)


@receiver(post_save, sender=ramzaan_models.RamzaanGroup)
def give_group_owner_permission(sender, instance, created, **kwargs):
	if created:
		assign_perm('owner_of_group', instance.created_by, instance)
		ramzaan_models.RamzaanGroupOptions.objects.create(group=instance)
		logger.info("Added group permission to user")
		qs = ramzaan_models.RamzaanGroup.objects.filter(id=instance.id)
		qs.update(group_hash_id=instance.id)
