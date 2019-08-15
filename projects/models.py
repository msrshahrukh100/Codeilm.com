from django.db import models
from hashid_field import HashidAutoField
from django.contrib.auth.models import User
from usermanagement import models as usermanagement_models
from payments import models as payments_models
# Create your models here.

class Project(models.Model):
	id = HashidAutoField(primary_key=True)
	title = models.CharField(max_length=255)
	description = models.TextField(blank=True, null=True)
	poster = models.ForeignKey(User, related_name="postedprojects", null=True, on_delete=models.SET_NULL)
	company = models.ForeignKey(usermanagement_models.Community, null=True, on_delete=models.SET_NULL)
	developers = models.ManyToManyField(User, related_name="developerprojects", blank=True)
	is_private = models.BooleanField(default=False)
	deadline = models.DateTimeField()
	payment_type = models.ForeignKey(payments_models.PaymentType, null=True, on_delete=models.SET_NULL)
	created_at = models.DateTimeField(auto_now_add=True)
	updated_at = models.DateTimeField(auto_now=True)


	def __str__(self):
		return self.title


class Task(models.Model):
	project = models.ForeignKey(Project, related_name="tasks", on_delete=models.CASCADE)
	text = models.CharField(max_length=255)
	deadline = models.DateTimeField()

	def __str__(self):
		return self.text