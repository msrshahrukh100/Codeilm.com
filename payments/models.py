from django.db import models
from hashid_field import HashidAutoField
# Create your models here.


class PaymentType(models.Model):
	id = HashidAutoField(primary_key=True)
	name = models.CharField(max_length=255)
	description = models.TextField()
	created_at = models.DateTimeField(auto_now_add=True)
	updated_at = models.DateTimeField(auto_now=True)

	def __str__(self):
		return self.name
