from django.apps import AppConfig


class RamzaanConfig(AppConfig):
	name = 'ramzaan'

	def ready(self):
		import ramzaan.signals
