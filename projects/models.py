from django.db import models
from hashid_field import HashidAutoField
from django.contrib.auth.models import User
from usermanagement import models as usermanagement_models
from payments import models as payments_models
from autoslug import AutoSlugField
# Create your models here.

class Project(models.Model):
	id = HashidAutoField(primary_key=True)
	title = models.CharField(max_length=255)
	slug = AutoSlugField(populate_from='title', always_update=True)
	description = models.TextField(blank=True, null=True)
	poster = models.ForeignKey(User, related_name="postedprojects", null=True, on_delete=models.SET_NULL)
	company = models.ForeignKey(usermanagement_models.Community, blank=True, null=True, on_delete=models.SET_NULL)
	developers = models.ManyToManyField(User, related_name="developerprojects", blank=True)
	is_private = models.BooleanField(default=False)
	deadline = models.DateTimeField()
	payment_type = models.ForeignKey(payments_models.PaymentType, blank=True, null=True, on_delete=models.SET_NULL)
	created_at = models.DateTimeField(auto_now_add=True)
	updated_at = models.DateTimeField(auto_now=True)


	def __str__(self):
		return self.title


class Task(models.Model):
	id = HashidAutoField(primary_key=True)
	project = models.ForeignKey(Project, related_name="tasks", on_delete=models.CASCADE)
	text = models.CharField(max_length=255)
	order = models.IntegerField(default=0)
	deadline = models.DateTimeField()

	def __str__(self):
		return self.text


class Comment(models.Model):
	id = HashidAutoField(primary_key=True)
	user = models.ForeignKey(User, null=True, related_name="user_comment", on_delete=models.SET_NULL)
	project = models.ForeignKey(Project, null=True, related_name="project_comment", on_delete=models.SET_NULL)
	text = models.TextField()
	created_at = models.DateTimeField(auto_now_add=True)
	updated_at = models.DateTimeField(auto_now=True)

	def __str__(self):
		return str(self.id)