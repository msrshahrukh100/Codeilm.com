from django.contrib.auth.models import User
from django.db import models

# Create your models here.


def upload_location(instance, filename):
	return "user_profile_images/%s/%s" % (instance.name, filename)


class UserProfile(models.Model):
	user = models.ForeignKey(User, related_name="user_profile", on_delete=models.CASCADE)
	gender = models.CharField(max_length=255, null=True, blank=True)
	profile_image = models.ImageField(
		upload_to=upload_location,
		default='user_profile_images/default.png',
		width_field="width_field",
		height_field="height_field", help_text="Profile Image of the user")
	height_field = models.IntegerField(default=0)
	width_field = models.IntegerField(default=0)
	locale = models.CharField(max_length=255, null=True, blank=True)

	def __str__(self):
		return self.user.username


class UserSettings(models.Model):
	user = models.ForeignKey(User, related_name="user_settings", on_delete=models.CASCADE)

	def __str__(self):
		return self.user.username


# this user is following this

class Connections(models.Model):
	user = models.ForeignKey(User, related_name="user_followings", on_delete=models.CASCADE)
	following = models.ForeignKey(User, related_name="user_followers", on_delete=models.CASCADE)

	def __str__(self):
		return self.user.username + " is following " + self.following.username
