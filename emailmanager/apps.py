from django.apps import AppConfig


class EmailmanagerConfig(AppConfig):
    name = 'emailmanager'

    def ready(self):
        import emailmanager.signals
