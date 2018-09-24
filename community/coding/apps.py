from django.apps import AppConfig


class CodingConfig(AppConfig):
	name = 'community.coding'

	def ready(self):
		import community.coding.signals
