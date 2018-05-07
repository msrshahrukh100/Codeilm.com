import mainapp.basemodels as basemodels
from django.db import models
from django.urls import reverse
# Create your models here.


class RamzaanGroup(basemodels.Group):
	def __str__(self):
		return self.name

	def get_absolute_url(self):
		return reverse("ramzaan:group_detail", kwargs={"id": self.id, "slug": self.slug})


class RamzaanUserProgress(basemodels.UserProgress):
	group = models.ForeignKey(RamzaanGroup, related_name="ramzaan_userprogressgroup", help_text="The group in which the user make a progress", on_delete=models.CASCADE)

	def __str__(self):
		return self.user.user_name


class RamzaanUnitDescription(basemodels.UnitDescription):
	group = models.ForeignKey(RamzaanGroup, related_name="ramzaan_unitdescription", help_text="The group for which the unit description is entered", on_delete=models.CASCADE)

	def __str__(self):
		return self.group.name
