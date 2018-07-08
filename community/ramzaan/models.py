from django.db import models
from django.urls import reverse

import mainapp.basemodels as basemodels
# Create your models here.


class RamzaanGroupUser(basemodels.GroupUser):

	def __str__(self):
		return self.user.username


class RamzaanGroup(basemodels.Group):
	users = models.ManyToManyField(RamzaanGroupUser, blank=True, related_name="ramzaan_groupusers", help_text="The users who are part of this group")

	def __str__(self):
		return self.name

	def get_absolute_url(self):
		return reverse("ramzaan:group_detail", kwargs={"id": self.id, "slug": self.slug})


	class Meta:
		permissions = (
			('owner_of_group', 'Owner of group'),
		)


class RamzaanGroupOptions(basemodels.GroupOption):
	group = models.OneToOneField(RamzaanGroup, related_name="ramzaan_groupoptions", help_text="The group for which the group options is entered", on_delete=models.CASCADE)

	def __str__(self):
		return str(self.id)


class RamzaanUnitDescription(basemodels.UnitDescription):
	group = models.ForeignKey(RamzaanGroup, related_name="ramzaan_unitdescription", help_text="The group for which the unit description is entered", on_delete=models.CASCADE)

	def __str__(self):
		return self.group.name


class RamzaanUserProgress(basemodels.UserProgress):
	group = models.ForeignKey(RamzaanGroup, related_name="ramzaan_userprogressgroup", help_text="The group in which the user make a progress", on_delete=models.CASCADE)

	def __str__(self):
		return self.user.username

	def get_progress(self):
		return int((self.at_unit / self.group.total_units) * 100)

	def get_motivate_url(self):
		return reverse("ramzaan:send_motivation", kwargs={"id": self.group.id, "slug": self.group.slug, "to_user_id": self.user.id})


class RamzaanStatusUpdate(basemodels.StatusUpdate):
	on_unit = models.PositiveIntegerField()
	group = models.ForeignKey(RamzaanGroup, related_name="status_updates", on_delete=models.CASCADE, help_text="The group corresponding to which the status was updated")

	def __str__(self):
		return self.user.username

	class Meta:
		ordering = ['-created_at']
