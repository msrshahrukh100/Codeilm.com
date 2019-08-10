from django.contrib.auth.models import User
from django.db import models
from django.contrib.staticfiles.templatetags.staticfiles import static
from sorl.thumbnail import ImageField
from django.conf import settings
from mainapp.utils import get_user_display_name
from autoslug import AutoSlugField

# Create your models here.


def upload_location(instance, filename):
	return "user_profile_images/%s/%s" % (get_user_display_name(instance.user), filename)


def upload_community_image(instance, filename):
	return "community_image/%s" % filename

class Community(models.Model):
	name = models.CharField(max_length=255)
	slug = AutoSlugField(populate_from='name', always_update=True, unique_with=['id'])
	description = models.TextField()
	profile_image = ImageField(
		upload_to=upload_community_image,
		null=True,
		blank=True,
		width_field="width_field",
		height_field="height_field", help_text="Image of the community")
	height_field = models.IntegerField(null=True, blank=True)
	width_field = models.IntegerField(null=True, blank=True)
	admins = models.ManyToManyField(User, related_name="community_admins", blank=True)
	members = models.ManyToManyField(User, related_name="community_members" ,blank=True)
	created_at = models.DateTimeField(auto_now_add=True)
	updated_at = models.DateTimeField(auto_now=True)

	def __str__(self):
		return str(self.id)



class UserProfile(models.Model):
	user = models.ForeignKey(User, related_name="user_profile", on_delete=models.CASCADE)
	gender = models.CharField(max_length=255, null=True, blank=True)
	intro = models.CharField(max_length=100, null=True, blank=True)
	profile_image = ImageField(
		upload_to=upload_location,
		null=True,
		blank=True,
		width_field="width_field",
		height_field="height_field", help_text="Profile Image of the user")
	height_field = models.IntegerField(null=True, blank=True)
	width_field = models.IntegerField(null=True, blank=True)
	locale = models.CharField(max_length=255, null=True, blank=True)

	def __str__(self):
		if self.user:
			return str(self.user.id)
		return "Deleted user"


	def get_profile_pic_url(self):
		if self.profile_image:
			return settings.BASE_URL + self.profile_image.url
		elif self.user.socialaccount_set.all().exists():
			return self.user.socialaccount_set.all().first().get_avatar_url()
		else:
			return settings.BASE_URL + static("images/default_profile_pic/default.png")


class UserSettings(models.Model):
	user = models.ForeignKey(User, related_name="user_settings", on_delete=models.CASCADE)

	def __str__(self):
		return self.user.username


# this user is following this

class Connections(models.Model):
	user = models.ForeignKey(User, related_name="user_followings", on_delete=models.CASCADE)
	following = models.ForeignKey(User, related_name="user_followers", on_delete=models.CASCADE)
	active = models.BooleanField(default=True)

	def __str__(self):
		return self.user.username + " is following " + self.following.username
