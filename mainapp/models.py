from django.db import models
from django.contrib.auth.models import User
from autoslug import AutoSlugField
from django.urls import reverse

# Create your models here.


class UserProfile(models.Model):
	pass


def upload_location(instance, filename):
	return "community_banners/%s/%s" % (instance.name, filename)


class Community(models.Model):
	name = models.CharField(max_length=300)
	slug = AutoSlugField(populate_from='name')
	external_image_path = models.URLField(null=True, blank=True)
	image = models.ImageField(
		upload_to=upload_location,
		null=True,
		blank=True,
		width_field="width_field",
		height_field="height_field", help_text="A image representing the Community")
	height_field = models.IntegerField(default=0)
	width_field = models.IntegerField(default=0)
	description = models.TextField()
	heading = models.CharField(max_length=255)  # remove it
	created_at = models.DateTimeField(auto_now_add=True)
	updated_at = models.DateTimeField(auto_now=True)
	created_by = models.ForeignKey(User, related_name="communitycreated", on_delete=models.CASCADE)
	updated_by = models.ForeignKey(User, on_delete=models.CASCADE)

	def __str__(self):
		return self.name

	def get_community_url(self):
		return reverse('mainapp:community_mapper', slug=self.slug)
