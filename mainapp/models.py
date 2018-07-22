from django.db import models
from django.contrib.auth.models import User
from autoslug import AutoSlugField
from django.urls import reverse
from solo.models import SingletonModel
from django.contrib.contenttypes.models import ContentType
from django.conf import settings


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
	community_base_url = models.CharField(max_length=255)
	created_at = models.DateTimeField(auto_now_add=True)
	updated_at = models.DateTimeField(auto_now=True)
	created_by = models.ForeignKey(User, null=True, editable=False, related_name="communitycreated", on_delete=models.SET_NULL)
	updated_by = models.ForeignKey(User, null=True, editable=False, on_delete=models.SET_NULL)

	def __str__(self):
		return self.name


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
		return str(self.id)

	def get_city(self):
		return self.city


class GroupCreationRequest(models.Model):
	user = models.ForeignKey(User, on_delete=models.SET_NULL, null=True, blank=True, related_name="%(app_label)s_groupcreationrequests")
	community = models.ForeignKey(Community, on_delete=models.SET_NULL, null=True, blank=True)
	description = models.TextField()
	request_ip_info = models.ForeignKey(RequestIpInfo, on_delete=models.SET_NULL, related_name="group_creation_request", null=True, blank=True)
	notification_sent = models.BooleanField(default=False)
	created_at = models.DateTimeField(auto_now_add=True)
	updated_at = models.DateTimeField(auto_now=True)

	def __str__(self):
		return str(self.id)

	def get_admin_url(self):
		content_type = ContentType.objects.get_for_model(self.__class__)
		return settings.BASE_URL + reverse("admin:%s_%s_change" % (content_type.app_label, content_type.model), args=(self.id,))