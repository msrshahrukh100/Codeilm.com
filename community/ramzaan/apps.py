from django.apps import AppConfig

name = "sealed-nector"


class RamzaanConfig(AppConfig):
	name = 'community.ramzaan'

	def ready(self):
		import community.ramzaan.signals
