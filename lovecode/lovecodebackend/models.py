from django.db import models
from django.contrib.auth.models import User
from django_mysql.models import JSONField, Model
from autoslug import AutoSlugField
from hashid_field import HashidAutoField, HashidField
from lovecode.lovecodebackend.parser.learnmdparser import LearnMdParser
from mainapp import models as main_models
from django.utils import timezone
from django.conf import settings
from datetime import datetime
from usermanagement.models import Community

# Create your models here.
class GithubRepo(Model):
	hash_id = HashidField(allow_int_lookup=True, null=True, blank=True, unique=True, editable=False)
	user = models.ForeignKey(User, null=True, on_delete=models.SET_NULL)
	repo_data = JSONField()
	created_at = models.DateTimeField(auto_now_add=True)
	updated_at = models.DateTimeField(auto_now=True)

	def __str__(self):
		return self.user.username

def get_default_rank():
	return (timezone.now().date() - datetime.strptime(settings.CODEILM_LAUNCH_DATE, "%Y %m %d").date()).days + timezone.now().hour / 10000


def get_view_data_default():
	return {
		"views_count": 0,
		"anonymous_views_count": 0
	}

def get_like_data_default():
	return {}


class TutorialTags(models.Model):
	value = models.CharField(max_length=50)
	label = models.CharField(max_length=50)
	created_at = models.DateTimeField(auto_now_add=True)
	updated_at = models.DateTimeField(auto_now=True)

	def __str__(self):
		return str(self.id)

def upload_location(instance, filename):
	return "tutorial_image/%s/%s" % (instance.name, filename)

class Tutorial(Model):
	id = HashidAutoField(primary_key=True)
	user = models.ForeignKey(User, null=True, related_name="user_tutorials", on_delete=models.SET_NULL)
	share_image = models.ImageField(
		upload_to=upload_location,
		null=True,
		blank=True,
		width_field="width_field",
		height_field="height_field", help_text="A image representing the tutorial")
	height_field = models.IntegerField(null=True, blank=True)
	width_field = models.IntegerField(null=True, blank=True)
	title = models.CharField(max_length=300, null=True, blank=True)
	slug = AutoSlugField(populate_from='title', always_update=True)
	tutorial_data = JSONField(null=True, blank=True)
	like_data = JSONField(blank=True, default=get_like_data_default)
	view_data = JSONField(blank=True, default=get_view_data_default)
	learn_md_content = models.TextField(null=True, blank=True)
	tags = models.ManyToManyField(TutorialTags, blank=True)
	community = models.ForeignKey(Community, help_text="Community this tutorial is part of", blank=True, null=True, on_delete=models.SET_NULL, related_name="tutorial_community")
	read_time = models.CharField(max_length=20, null=True, blank=True)
	is_published = models.BooleanField(default=False)
	repository_name = models.CharField(max_length=200, null=True, blank=True)
	repository_data = JSONField(null=True, blank=True)
	branch_name = models.CharField(max_length=150, null=True, blank=True)
	rank = models.FloatField(default=get_default_rank, editable=False)
	created_at = models.DateTimeField(auto_now_add=True)
	updated_at = models.DateTimeField(auto_now=True)

	def __str__(self):
		return str(self.id)

	# def save(self, *args, **kwargs):
	# 	parser = LearnMdParser()
	# 	try:
	# 		self.tutorial_data = parser.get_parsed_content(self.learn_md_content)
	# 	except Exception as e:
	# 		self.tutorial_data = {"error": str(e)}
	# 	super().save(*args, **kwargs)
	def get_absolute_url(self):
		return "/stories/%s/%s" % (self.id, self.slug)

	class Meta:
		ordering = ["-rank"]


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
		return str(self.user)


class TutorialLike(models.Model):
	user = models.ForeignKey(User, related_name="user_tutorial_likes", null=True, on_delete=models.SET_NULL)
	tutorial = models.ForeignKey(Tutorial, related_name="user_likes", on_delete=models.CASCADE)
	liked = models.BooleanField(default=True)
	created_at = models.DateTimeField(auto_now_add=True)
	updated_at = models.DateTimeField(auto_now=True)

	def __str__(self):
		return str(self.user)

	class Meta:
		ordering = ["-id"]


class TutorialView(models.Model):
	user = models.ForeignKey(User, related_name="user_tutorial_views", null=True, on_delete=models.SET_NULL)
	tutorial = models.ForeignKey(Tutorial, related_name="user_views", on_delete=models.CASCADE)
	ip = models.CharField(max_length=100)
	session = models.CharField(max_length=100, null=True, blank=True)
	request_ip_info = models.ForeignKey(main_models.RequestIpInfo, null=True, blank=True, related_name="%(app_label)s_requestipinfos", on_delete=models.SET_NULL)
	created_at = models.DateTimeField(auto_now_add=True)
	updated_at = models.DateTimeField(auto_now=True)

	def __str__(self):
		return str(self.id)
