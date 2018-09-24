from django.db import models
from django.urls import reverse

import mainapp.basemodels as basemodels
# Create your models here.


class CodingGroupUser(basemodels.GroupUser):

	def __str__(self):
		if self.user:
			return str(self.user.id)
		return "Deleted user"


class CodingGroup(basemodels.Group):
	users = models.ManyToManyField(CodingGroupUser, blank=True, related_name="coding_groupusers", help_text="The users who are part of this group")

	def __str__(self):
		return self.name

	# def get_absolute_url(self):
	# 	return reverse("mooc:group_detail", kwargs={"id": self.id, "slug": self.slug})

	# def get_community_name(self):
	# 	return "Complete online courses"

	# def get_post_status_update_url(self):
	# 	return reverse("mooc:post_status_update", kwargs={"id": self.id, "slug": self.slug})

	# def get_status_updates_url(self):
	# 	return reverse("mooc:get_status_updates")

	class Meta:
		permissions = (
			('owner_of_group', 'Owner of group'),
		)


class CodingGroupOptions(basemodels.GroupOption):
	group = models.OneToOneField(CodingGroup, related_name="coding_groupoptions", help_text="The group for which the group options is entered", on_delete=models.CASCADE)

	def __str__(self):
		return str(self.id)


class CodingGroupUserMotivation(basemodels.GroupUserMotivation):
	group = models.ForeignKey(CodingGroup, related_name="motivation_sent", on_delete=models.CASCADE, help_text="The group corresponding to which the motivation was sent")

	def __str__(self):
		return str(self.to_user) + " motivated by " + str(self.from_user)

