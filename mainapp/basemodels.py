from autoslug import AutoSlugField
from django.db import models
from django.contrib.auth.models import User
from . import models as main_models
from hashid_field import HashidField

# Create your models here.


def upload_to(instance, filename):
	return "group_banners/%s/%s/%s" % (instance.__class__.__name__, instance.name, filename)


class Group(models.Model):
	community = models.ForeignKey(main_models.Community, blank=True, null=True, on_delete=models.SET_NULL)
	name = models.CharField(max_length=255, help_text="The name of the individual group formed within a community")
	slug = AutoSlugField(populate_from='name')
	group_hash_id = HashidField(allow_int_lookup=True, null=True, blank=True, unique=True, editable=False)
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
	created_by = models.ForeignKey(User, editable=False, null=True, related_name="%(app_label)s_groupcreateduser", on_delete=models.SET_NULL)
	updated_by = models.ForeignKey(User, editable=False, null=True, related_name="%(app_label)s_groupupdateduser", on_delete=models.SET_NULL)

	class Meta:
		abstract = True


class GroupOption(models.Model):
	is_private = models.BooleanField(default=False, help_text="Whether the group is still private")
	is_active = models.BooleanField(default=True, help_text="Whether the group is still active, set to false when user deletes it")
	show_timer = models.BooleanField(default=False)
	has_extra_content_popup = models.BooleanField(default=False, help_text="Has content which needs to be shown in a popup window")
	extra_content_popup_cta = models.CharField(max_length=255, null=True, blank=True, help_text="The CTA of the modal display button")
	extra_content_popup_template = models.CharField(max_length=255, null=True, blank=True, help_text="The template of the pop")

	class Meta:
		abstract = True


class StatusUpdate(models.Model):
	user = models.ForeignKey(User, null=True, on_delete=models.SET_NULL, related_name="%(app_label)s_user_status_update", help_text="User's status update on a particular group")
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
	user = models.ForeignKey(User, null=True, related_name="%(app_label)s_userprogressuser", help_text="The user who makes the progress in the group", on_delete=models.SET_NULL)  # community - userprogress
	last_progress_made = models.DateTimeField(auto_now=True, help_text="The last date the user made progress")

	class Meta:
		abstract = True


class GroupUser(models.Model):
	user = models.ForeignKey(User, null=True, related_name="%(app_label)s_groupusers", help_text="The user in a particular group", on_delete=models.SET_NULL)
	request_ip_info = models.ForeignKey(main_models.RequestIpInfo, null=True, blank=True, related_name="%(app_label)s_requestipinfos", on_delete=models.SET_NULL)
	created_at = models.DateTimeField(auto_now_add=True)
	updated_at = models.DateTimeField(auto_now=True)

	class Meta:
		abstract = True


class GroupUserMotivation(models.Model):
	to_user = models.ForeignKey(User, null=True, related_name="%(app_label)s_tomotivation", help_text="The user to whom motivation is sent", on_delete=models.SET_NULL)
	from_user = models.ForeignKey(User, null=True, related_name="%(app_label)s_frommotivation", help_text="The user who sent motivations", on_delete=models.SET_NULL)
	created_at = models.DateTimeField(auto_now_add=True)
	updated_at = models.DateTimeField(auto_now=True)

	class Meta:
		abstract = True

