from autoslug import AutoSlugField
from django.db import models
from django.contrib.auth.models import User
from .models import RequestIpInfo
# Create your models here.


def upload_to(instance, filename):
	return "group_banners/%s/%s/%s" % (instance.__class__.__name__, instance.name, filename)


class Group(models.Model):
	name = models.CharField(max_length=255, help_text="The name of the individual group formed within a community")
	slug = AutoSlugField(populate_from='name')
	description = models.TextField(help_text="The description for the group in the community")
	image = models.ImageField(
		upload_to=upload_to,
		null=True,
		blank=True,
		width_field="width_field",
		height_field="height_field", help_text="A image representing the Community")
	height_field = models.IntegerField(default=0, blank=True, null=True)
	width_field = models.IntegerField(default=0, blank=True, null=True)
	target_statement = models.TextField(help_text="What the user wants to achieve while forming this group")
	unit_name = models.CharField(max_length=255, help_text="Unit of work, eg. chapters when reading a book")
	total_units = models.PositiveIntegerField(help_text="The total number of units in the task")
	start_date = models.DateTimeField(blank=True, null=True, help_text="The start date for the task")
	end_date = models.DateTimeField(blank=True, null=True, help_text="The end date for the task")
	created_at = models.DateTimeField(auto_now_add=True)
	updated_at = models.DateTimeField(auto_now=True)
	created_by = models.ForeignKey(User, editable=False, related_name="%(app_label)s_groupcreateduser", on_delete=models.CASCADE)
	updated_by = models.ForeignKey(User, editable=False, related_name="%(app_label)s_groupupdateduser", on_delete=models.CASCADE)

	class Meta:
		abstract = True


class GroupOption(models.Model):
	is_private = models.BooleanField(default=False, help_text="Whether the group is still private")
	is_active = models.BooleanField(default=True, help_text="Whether the group is still active, set to false when user deletes it")
	show_timer = models.BooleanField(default=False)

	class Meta:
		abstract = True


class StatusUpdate(models.Model):
	user = models.ForeignKey(User, on_delete=models.CASCADE, related_name="%(app_label)s_user_status_update", help_text="User's status update on a particular group")
	content = models.TextField()
	created_at = models.DateTimeField(auto_now_add=True)
	updated_at = models.DateTimeField(auto_now=True)

	class Meta:
		abstract = True


class UnitDescription(models.Model):
	unit = models.PositiveIntegerField(default=0)
	unit_title = models.CharField(max_length=300)
	unit_text = models.TextField(null=True, blank=True)

	class Meta:
		abstract = True

	def get_unit_full_text(self):
		if self.unit_text:
			return self.unit_text
		return self.unit_title


class UserProgress(models.Model):
	user = models.ForeignKey(User, related_name="%(app_label)s_userprogressuser", help_text="The user who makes the progress in the group", on_delete=models.CASCADE)  # community - userprogress
	last_progress_made = models.DateTimeField(auto_now=True, help_text="The last date the user made progress")

	class Meta:
		abstract = True


class GroupUser(models.Model):
	user = models.ForeignKey(User, related_name="%(app_label)s_groupusers", help_text="The user in a particular group", on_delete=models.CASCADE)
	request_ip_info = models.ForeignKey(RequestIpInfo, null=True, blank=True, related_name="%(app_label)s_requestipinfos", on_delete=models.SET_NULL)
	created_at = models.DateTimeField(auto_now_add=True)
	updated_at = models.DateTimeField(auto_now=True)

	class Meta:
		abstract = True

