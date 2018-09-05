from django.db import models
from django.contrib.auth.models import User
from autoslug import AutoSlugField
from hashid_field import HashidField
# Create your models here.


def upload_to(instance, filename):
	return "team_images/%s/%s/%s" % (instance.__class__.__name__, instance.name, filename)


class Team(models.Model):
	name = models.CharField(max_length=255, help_text="Name of the company")
	hash_id = HashidField(allow_int_lookup=True, null=True, blank=True, unique=True, editable=False)
	slug = AutoSlugField(populate_from='name')
	description = models.TextField(null=True, blank=True)
	location = models.CharField(max_length=255, null=True, blank=True)
	image = models.ImageField(
		upload_to=upload_to,
		null=True,
		blank=True,
		width_field="width_field",
		height_field="height_field", help_text="A image representing the Team")
	height_field = models.IntegerField(default=0, blank=True, null=True)
	width_field = models.IntegerField(default=0, blank=True, null=True)
	created_at = models.DateTimeField(auto_now_add=True)
	updated_at = models.DateTimeField(auto_now=True)
	created_by = models.ForeignKey(User, editable=False, null=True, related_name="teamcreated", on_delete=models.SET_NULL)
	updated_by = models.ForeignKey(User, editable=False, null=True, related_name="teamupdated", on_delete=models.SET_NULL)

	def __str__(self):
		return self.name


class TeamOption(models.Model):
	team = models.OneToOneField(Team, related_name="team_options", on_delete=models.CASCADE)
	is_active = models.BooleanField(default=True)
	show_employees = models.BooleanField(default=True)
	show_team_page = models.BooleanField(default=True)
	show_description = models.BooleanField(default=True)
	show_location = models.BooleanField(default=True)

	def __str__(self):
		return self.team.name

