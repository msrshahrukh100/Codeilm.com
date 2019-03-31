from django.db import models
from django.contrib.auth.models import User
from django_mysql.models import JSONField, Model

# Create your models here.
class GithubRepo(Model):
	user = models.ForeignKey(User, null=True, on_delete=models.SET_NULL)
	repo_data = JSONField()
	languages = JSONField(null=True, blank=True)
	created_at = models.DateTimeField(auto_now_add=True)
	updated_at = models.DateTimeField(auto_now=True)

	def __str__(self):
		return self.user.username


class Tutorial(Model):
	user = models.ForeignKey(User, null=True, on_delete=models.SET_NULL)
	repo = models.ForeignKey(GithubRepo, null=True, on_delete=models.SET_NULL)
	title = models.CharField(max_length=300)
	read_time = models.CharField(max_length=20, null=True, blank=True)
	created_at = models.DateTimeField(auto_now_add=True)
	updated_at = models.DateTimeField(auto_now=True)

	def __str__(self):
		return self.user.username

