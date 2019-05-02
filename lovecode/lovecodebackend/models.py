from django.db import models
from django.contrib.auth.models import User
from django_mysql.models import JSONField, Model
from autoslug import AutoSlugField
from hashid_field import HashidAutoField, HashidField
from lovecode.lovecodebackend.parser.learnmdparser import LearnMdParser

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
	id = HashidAutoField(primary_key=True)
	user = models.ForeignKey(User, null=True, on_delete=models.SET_NULL)
	title = models.CharField(max_length=300, null=True, blank=True)
	slug = AutoSlugField(populate_from='title')
	tutorial_data = JSONField(null=True, blank=True)
	learn_md_content = models.TextField(null=True, blank=True)
	read_time = models.CharField(max_length=20, null=True, blank=True)
	is_published = models.BooleanField(default=False)
	repository_name = models.CharField(max_length=200, null=True, blank=True)
	branch_name = models.CharField(max_length=150, null=True, blank=True)
	created_at = models.DateTimeField(auto_now_add=True)
	updated_at = models.DateTimeField(auto_now=True)

	def __str__(self):
		return self.user.username

	def save(self, *args, **kwargs):
		parser = LearnMdParser()
		try:
			self.tutorial_data = parser.get_parsed_content(self.learn_md_content)
		except Exception as e:
			self.tutorial_data = {"error": str(e)}
		super().save(*args, **kwargs)


class GithubApiResponse(Model):
	user = models.ForeignKey(User, related_name="user_github_api", null=True, on_delete=models.SET_NULL)
	etag = models.CharField(max_length=150, null=True, blank=True)
	response = JSONField(null=True, blank=True)
	response_headers = JSONField(null=True, blank=True)
	request_headers = JSONField(null=True, blank=True)
	get_params = JSONField(null=True, blank=True)
	post_params = JSONField(null=True, blank=True)
	url = models.URLField(null=True, blank=True)
	created_at = models.DateTimeField(auto_now_add=True)
	updated_at = models.DateTimeField(auto_now=True)

	def __str__(self):
		return self.user.username



