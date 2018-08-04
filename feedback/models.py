from autoslug import AutoSlugField
from django.contrib.auth.models import User
from django.db import models
from django.urls import reverse
from mainapp.models import RequestIpInfo
from django.conf import settings
from django.contrib.contenttypes.models import ContentType

# Create your models here.
# Possible activities
# ramzaan-status-update --> Status Updated in the ramzaan app
# ramzaan-motivation-sent --> When a user sends a motivation
# ramzaan-motivation-received --> When a user receives a motivation


class UserActivity(models.Model):
	user = models.ForeignKey(User, null=True, related_name="user_activity", on_delete=models.SET_NULL, help_text="The user whose activity is registered")
	activity = models.CharField(max_length=255)
	created_at = models.DateTimeField(auto_now_add=True)
	updated_at = models.DateTimeField(auto_now=True)

	def __str__(self):
		return self.activity


def upload_location(instance, filename):
	return "feedback_event_banners/%s/%s" % (instance.name, filename)


class FeedbackEvent(models.Model):
	name = models.CharField(max_length=300)
	slug = AutoSlugField(populate_from='name')
	question = models.TextField(null=True, blank=True)
	image = models.ImageField(
		upload_to=upload_location,
		null=True,
		blank=True,
		width_field="width_field",
		height_field="height_field", help_text="A image representing the feedback event")
	height_field = models.IntegerField(default=0)
	width_field = models.IntegerField(default=0)
	click_response_html = models.TextField(null=True, blank=True, help_text="HTML for the click responses")
	feedback_url = models.URLField(null=True, blank=True)
	created_at = models.DateTimeField(auto_now_add=True)
	updated_at = models.DateTimeField(auto_now=True)
	created_by = models.ForeignKey(User, null=True, editable=False, related_name="feedbackevent_created", on_delete=models.SET_NULL)
	modified_by = models.ForeignKey(User, null=True, editable=False, on_delete=models.SET_NULL)

	def __str__(self):
		return self.name

	def get_feedback_page_url(self):
		return reverse("feedback:feedback_page", kwargs={"id": self.id, "slug": self.slug})


class ClickResponse(models.Model):
	# holds the click response
	event = models.ForeignKey(FeedbackEvent, null=True, on_delete=models.SET_NULL, help_text="The event corresponding to which the click response is collected")
	email = models.EmailField(null=True, blank=True)
	response = models.CharField(max_length=255, null=True, blank=True)
	request_ip_info = models.ForeignKey(RequestIpInfo, on_delete=models.SET_NULL, related_name="click_response", null=True, blank=True)
	created_at = models.DateTimeField(auto_now_add=True)
	updated_at = models.DateTimeField(auto_now=True)

	def __str__(self):
		return str(self.id)

	def get_admin_url(self):
		content_type = ContentType.objects.get_for_model(self.__class__)
		return settings.BASE_URL + reverse("admin:%s_%s_change" % (content_type.app_label, content_type.model), args=(self.id,))


class FeedbackResponse(models.Model):
	event = models.ForeignKey(FeedbackEvent, null=True, on_delete=models.SET_NULL, help_text="Form responses of feedback")
	key = models.TextField()
	value = models.TextField()
	email = models.EmailField(null=True, blank=True)
	request_ip_info = models.ForeignKey(RequestIpInfo, on_delete=models.SET_NULL, related_name="feedback_response", null=True, blank=True)
	created_at = models.DateTimeField(auto_now_add=True)
	updated_at = models.DateTimeField(auto_now=True)

	def __str__(self):
		return str(self.id)

	def get_admin_url(self):
		content_type = ContentType.objects.get_for_model(self.__class__)
		return settings.BASE_URL + reverse("admin:%s_%s_change" % (content_type.app_label, content_type.model), args=(self.id,))
