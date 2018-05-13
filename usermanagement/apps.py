from django.apps import AppConfig


class UsermanagementConfig(AppConfig):
    name = 'usermanagement'

    def ready(self):
        import usermanagement.signals