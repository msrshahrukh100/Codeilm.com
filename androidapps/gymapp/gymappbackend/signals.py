from . import models as gymapp_models
from django.db.models.signals import post_save
from django.dispatch import receiver
from guardian.shortcuts import assign_perm
import logging

logger = logging.getLogger(__name__)


@receiver(post_save, sender=gymapp_models.Exercise)
def save_hash_id_for_exercise(sender, instance, created, **kwargs):
	logger.info("Saving hash id of the exercise")
	qs = gymapp_models.Exercise.objects.filter(id=instance.id)
	qs.update(exercise_hash_id=instance.id)


@receiver(post_save, sender=gymapp_models.Schedule)
def save_hash_id_for_schedule(sender, instance, created, **kwargs):
	logger.info("Saving hash id of the Schedule")
	qs = gymapp_models.Schedule.objects.filter(id=instance.id)
	qs.update(schedule_hash_id=instance.id)


@receiver(post_save, sender=gymapp_models.ScheduleExercise)
def save_hash_id_for_schedule_exercise(sender, instance, created, **kwargs):
	logger.info("Saving hash id of the ScheduleExercise")
	qs = gymapp_models.ScheduleExercise.objects.filter(id=instance.id)
	qs.update(schedule_exercise_hash_id=instance.id)
