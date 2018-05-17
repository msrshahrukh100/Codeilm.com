from autoslug import AutoSlugField
from django.contrib.auth.models import User
from django.db import models
from django.urls import reverse
# Create your models here.
# Possible activities
# ramzaan-status-update --> Status Updated in the ramzaan app
# ramzaan-motivation-sent --> When a user sends a motivation
# ramzaan-motivation-received --> When a user receives a motivation


class UserActivity(models.Model):
	user = models.ForeignKey(User, related_name="user_activity", on_delete=models.CASCADE, help_text="The user whose activity is registered")
	activity = models.CharField(max_length=255)
	created_at = models.DateTimeField(auto_now_add=True)
	updated_at = models.DateTimeField(auto_now=True)

	def __str__(self):
		return self.activity


def upload_location(instance, filename):
	return "feedback_even_banners/%s/%s" % (instance.name, filename)


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
	click_response_html = models.TextField(help_text="HTML for the click responses")
	feedback_url = models.URLField(null=True, blank=True)
	created_at = models.DateTimeField(auto_now_add=True)
	updated_at = models.DateTimeField(auto_now=True)
	created_by = models.ForeignKey(User, related_name="feedbackevent_created", on_delete=models.CASCADE)
	modified_by = models.ForeignKey(User, on_delete=models.CASCADE)

	def __str__(self):
		return self.name

	def get_feedback_page_url(self):
		return reverse("feedback:feedback_page", kwargs={"id": self.id, "slug": self.slug})


class ClickResponse(models.Model):
	# holds the click response
	event = models.ForeignKey(FeedbackEvent, on_delete=models.CASCADE, help_text="The event corresponding to which the click response is collected")
	response = models.CharField(max_length=255, null=True, blank=True)
	created_at = models.DateTimeField(auto_now_add=True)
	updated_at = models.DateTimeField(auto_now=True)

	def __str__(self):
		return self.event.name


class FeedbackResponse(models.Model):
	event = models.ForeignKey(FeedbackEvent, on_delete=models.CASCADE, help_text="Form responses of feedback")
	key = models.TextField()
	value = models.TextField()
	created_at = models.DateTimeField(auto_now_add=True)
	updated_at = models.DateTimeField(auto_now=True)

	def __str__(self):
		return self.event.name
