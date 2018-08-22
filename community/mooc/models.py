from django.db import models
from django.urls import reverse

import mainapp.basemodels as basemodels
# Create your models here.


class MoocGroupUser(basemodels.GroupUser):

	def __str__(self):
		if self.user:
			return str(self.user.id)
		return "Deleted user"


class MoocGroup(basemodels.Group):
	users = models.ManyToManyField(MoocGroupUser, blank=True, related_name="mooc_groupusers", help_text="The users who are part of this group")

	def __str__(self):
		return self.name

	# def get_absolute_url(self):
	# 	return reverse("ramzaan:group_detail", kwargs={"id": self.id, "slug": self.slug})

	# def get_community_name(self):
	# 	return "Sealed Nector"

	# class Meta:
	# 	permissions = (
	# 		('owner_of_group', 'Owner of group'),
	# 	)


class MoocGroupOptions(basemodels.GroupOption):
	group = models.OneToOneField(MoocGroup, related_name="mooc_groupoptions", help_text="The group for which the group options is entered", on_delete=models.CASCADE)

	def __str__(self):
		return str(self.id)


class MoocUnitDescription(basemodels.UnitDescription):
	group = models.ForeignKey(MoocGroup, related_name="mooc_unitdescription", help_text="The group for which the unit description is entered", on_delete=models.CASCADE)

	def __str__(self):
		return str(self.id)


class MoocUserProgress(basemodels.UserProgress):
	group = models.ForeignKey(MoocGroup, related_name="mooc_userprogressgroup", help_text="The group in which the user make a progress", on_delete=models.CASCADE)
	at_unit = models.ForeignKey(MoocUnitDescription, null=True, on_delete=models.SET_NULL, help_text="The current state of the user, eg. at chapter 2")

	def __str__(self):
		if self.user:
			return str(self.user.id)
		return "Deleted user"

	def get_progress(self):
		if self.at_unit:
			return int((self.at_unit.unit / self.group.total_units) * 100)
		return 0

	# def get_motivate_url(self):
	# 	return reverse("ramzaan:send_motivation", kwargs={"group_id": self.group.id, "group_slug": self.group.slug, "to_user_id": self.user.id})


class MoocStatusUpdate(basemodels.StatusUpdate):
	group = models.ForeignKey(MoocGroup, related_name="status_updates", on_delete=models.CASCADE, help_text="The group corresponding to which the status was updated")
	at_unit = models.ForeignKey(MoocUnitDescription, null=True, on_delete=models.SET_NULL, help_text="The current state of the user, eg. at chapter 2")

	def __str__(self):
		if self.user:
			return str(self.user.id)
		return "Deleted user"

	class Meta:
		ordering = ['-created_at']


class MoocGroupUserMotivation(basemodels.GroupUserMotivation):
	group = models.ForeignKey(MoocGroup, related_name="motivation_sent", on_delete=models.CASCADE, help_text="The group corresponding to which the motivation was sent")

	def __str__(self):
		return str(self.to_user) + " motivated by " + str(self.from_user)

