from django.apps import AppConfig


class LovecodeConfig(AppConfig):
	name = 'lovecode.lovecodebackend'

	def ready(self):
		import lovecode.lovecodebackend.signals
