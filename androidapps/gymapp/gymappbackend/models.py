from django.db import models
from django.contrib.auth.models import User
from hashid_field import HashidField
from django.urls import reverse
from django.utils.timesince import timesince
# Create your models here.

def upload_to(instance, filename):
	return "exercise_images/%s/%s/%s" % (instance.__class__.__name__, instance.name, filename)

class Exercise(models.Model):
	exercise_hash_id = HashidField(allow_int_lookup=True, null=True, blank=True, unique=True, editable=False)
	name = models.CharField(max_length=100)
	exercise_for = models.CharField(max_length=50, null=True, blank=True)
	description = models.TextField(null=True, blank=True)
	image = models.ImageField(
		upload_to=upload_to,
		null=True,
		blank=True,
		width_field="width_field",
		height_field="height_field", help_text="A image of the exercise")
	height_field = models.IntegerField(default=0, blank=True, null=True)
	width_field = models.IntegerField(default=0, blank=True, null=True)
	created_at = models.DateTimeField(auto_now_add=True)
	updated_at = models.DateTimeField(auto_now=True)

	def __str__(self):
		return self.name

	@property
	def get_absolute_url(self):
		return reverse("gymapp:exercise-detail", kwargs={"exercise_hash_id": self.exercise_hash_id})


class Schedule(models.Model):
	schedule_hash_id = HashidField(allow_int_lookup=True, null=True, blank=True, unique=True, editable=False)
	name = models.CharField(max_length=100)
	user = models.ForeignKey(User, null=True, related_name="user_schedule", on_delete=models.SET_NULL)
	day_of_week = models.IntegerField(null=True, blank=True)
	last_performed = models.DateTimeField(null=True, blank=True)
	created_at = models.DateTimeField(auto_now_add=True)
	updated_at = models.DateTimeField(auto_now=True)

	def __str__(self):
		return self.name

	def get_last_performed_text(self):
		if self.last_performed:
			return "Last performed %s ago" % timesince(self.last_performed)
		return ""

	class Meta:
		permissions = (
			('owner', 'owner'),
			('see_shared', 'see_shared')
		)


class ScheduleExercise(models.Model):
	schedule_exercise_hash_id = HashidField(allow_int_lookup=True, null=True, blank=True, unique=True, editable=False)
	schedule = models.ForeignKey(Schedule, null=True, related_name="schedule_exercise_schedule", on_delete=models.SET_NULL)
	exercise = models.ForeignKey(Exercise, null=True, related_name="schedule_exercise", on_delete=models.SET_NULL)
	user = models.ForeignKey(User, null=True, related_name="user_schedule_exercise", on_delete=models.SET_NULL)
	order = models.IntegerField(default=0)
	sets = models.PositiveIntegerField(default=0)
	reps = models.PositiveIntegerField(default=0)
	last_performed = models.DateTimeField(null=True, blank=True)
	created_at = models.DateTimeField(auto_now_add=True)
	updated_at = models.DateTimeField(auto_now=True)

	def __str__(self):
		return str(self.schedule.id)






