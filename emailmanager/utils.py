from mainapp.models import SiteConfiguration
from . import tasks as emailmanager_tasks


def send_welcome_email(user):
    config = SiteConfiguration.objects.get()
    name = user.first_name if user.first_name else "Friend"
    personalization_obj = {"--name--": name}
    emailmanager_tasks.send_sendgrid_template_email(
        template_id=config.sendgrid_welcome_email_template_id,
        from_email=config.default_from_email_id,
        to_email=user.email,
        personalization_obj=personalization_obj)
    emailmanager_tasks.log_sent_email(user_id=user.id, email=user.email, template_id=config.sendgrid_welcome_email_template_id)
