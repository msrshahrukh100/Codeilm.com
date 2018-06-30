from django.db import models
from django.contrib.auth.models import User
# Create your models here.


class EmailTracker(models.Model):
	user = models.ForeignKey(User, related_name="emails_sent", null=True, blank=True, on_delete=models.CASCADE)
	email = models.EmailField()
	template_path = models.CharField(max_length=200)
	created_at = models.DateTimeField(auto_now_add=True)
	updated_at = models.DateTimeField(auto_now=True)

	def __str__(self):
		return self.email
