from django.db import models
from django.contrib.auth.models import User
from django_mysql.models import JSONField, Model
from autoslug import AutoSlugField
from hashid_field import HashidField


# Create your models here.
class GithubRepo(Model):
	hash_id = HashidField(allow_int_lookup=True, null=True, blank=True, unique=True, editable=False)
	user = models.ForeignKey(User, null=True, on_delete=models.SET_NULL)
	repo_data = JSONField()
	created_at = models.DateTimeField(auto_now_add=True)
	updated_at = models.DateTimeField(auto_now=True)

	def __str__(self):
		return self.user.username


class Tutorial(Model):
	hash_id = HashidField(allow_int_lookup=True, null=True, blank=True, unique=True, editable=False)
	user = models.ForeignKey(User, null=True, on_delete=models.SET_NULL)
	repo = models.ForeignKey(GithubRepo, null=True, on_delete=models.SET_NULL)
	title = models.CharField(max_length=300)
	slug = AutoSlugField(populate_from='title')
	tutorial_data = JSONField(null=True, blank=True)
	read_time = models.CharField(max_length=20, null=True, blank=True)
	created_at = models.DateTimeField(auto_now_add=True)
	updated_at = models.DateTimeField(auto_now=True)

	def __str__(self):
		return self.user.username

class GithubApiResponse(Model):
	user = models.ForeignKey(User, related_name="user_github_api", null=True, on_delete=models.SET_NULL)
	etag = models.CharField(max_length=150)
	response = JSONField(null=True, blank=True)
	headers = JSONField(null=True, blank=True)
	url = models.URLField(null=True, blank=True)
	created_at = models.DateTimeField(auto_now_add=True)
	updated_at = models.DateTimeField(auto_now=True)

	def __str__(self):
		return self.user.username



