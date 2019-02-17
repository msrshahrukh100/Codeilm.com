from django.apps import AppConfig

# name = "gymapp"

class GymappConfig(AppConfig):
	name = 'androidapps.gymapp.gymappbackend'

	def ready(self):
		import androidapps.gymapp.gymappbackend.signals
