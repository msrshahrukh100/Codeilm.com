from django.apps import AppConfig


class FeedbackConfig(AppConfig):
	name = 'feedback'

	def ready(self):
		import feedback.signals
