from django.db import models
from django.contrib.auth.models import User
from autoslug import AutoSlugField
from django.urls import reverse
from solo.models import SingletonModel


class SiteConfiguration(SingletonModel):
	sendgrid_welcome_email_template_id = models.CharField(max_length=255, null=True, blank=True)
	default_from_email_id = models.EmailField(blank=True, null=True)

	def __str__(self):
		return u"Site Configuration"

	class Meta:
		verbose_name = "Site Configuration"


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
	height_field = models.IntegerField(null=True, blank=True)
	width_field = models.IntegerField(null=True, blank=True)
	description = models.TextField()
	created_at = models.DateTimeField(auto_now_add=True)
	updated_at = models.DateTimeField(auto_now=True)
	created_by = models.ForeignKey(User, editable=False, related_name="communitycreated", on_delete=models.CASCADE)
	updated_by = models.ForeignKey(User, editable=False, on_delete=models.CASCADE)

	def __str__(self):
		return self.name

	def get_community_url(self):
		return reverse('mainapp:community_mapper', slug=self.slug)


class RequestIpInfo(models.Model):
	city = models.CharField(max_length=255, null=True, blank=True)
	country_code = models.CharField(max_length=255, null=True, blank=True)
	country_name = models.CharField(max_length=255, null=True, blank=True)
	dma_code = models.CharField(max_length=255, null=True, blank=True)
	latitude = models.CharField(max_length=255, null=True, blank=True)
	longitude = models.CharField(max_length=255, null=True, blank=True)
	postal_code = models.CharField(max_length=255, null=True, blank=True)
	region = models.CharField(max_length=255, null=True, blank=True)
	time_zone = models.CharField(max_length=255, null=True, blank=True)

	def __str__(self):
		return self.city

	def get_city(self):
		return self.city
