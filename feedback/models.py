from django.db import models
from django.contrib.auth.models import User
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
