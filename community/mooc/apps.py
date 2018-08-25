from django.apps import AppConfig

name = "complete-online-course"


class MoocConfig(AppConfig):
	name = 'community.mooc'

	def ready(self):
		import community.mooc.signals
