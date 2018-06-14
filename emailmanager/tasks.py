import sendgrid
from sendgrid.helpers.mail import Email, Content, Substitution, Mail, TrackingSettings, SubscriptionTracking, ASM, Category
from django.conf import settings
import logging
from background_task import background
from . import models as emailmanager_models
from django.contrib.auth.models import User

logger = logging.getLogger(__name__)


@background(schedule=10)
def send_sendgrid_template_email(
        template_id,
        from_email,
        to_email,
        bcc=None,
        personalization_obj=None,
        cc=None,
        subject=None,
        subscription_tracking=True,
        group_id=None,
        category=None):
    sg = sendgrid.SendGridAPIClient(apikey=settings.SENDGRID_API_KEY)
    from_email = Email(from_email, from_email)

    if not subject:
        subject = "Allywith | Open with Smile"
    to_email = Email(to_email)
    content = Content("text/html", " ")
    mail = Mail(from_email, subject, to_email, content)
    mail.template_id = template_id
    if personalization_obj is not None:
        for key in personalization_obj:
            mail.personalizations[0].add_substitution(Substitution(key, personalization_obj[key]))
    if bcc:
        for bcc_email in bcc:
            mail.personalizations[0].add_bcc(Email(bcc_email))
    if cc:
        for cc_email in cc:
            mail.personalizations[0].add_cc(Email(cc_email))
    tracking_settings = TrackingSettings()
    tracking_settings.subscription_tracking = SubscriptionTracking(subscription_tracking)
    if subscription_tracking:
        mail.personalizations[0].add_substitution(Substitution("%Unsubscribe%", "<%asm_group_unsubscribe_url%>"))
        if group_id is not None:
            asm = ASM(group_id)
            mail.set_asm(asm)
    else:
        mail.personalizations[0].add_substitution(Substitution("%Unsubscribe%", ""))

    mail.tracking_settings = tracking_settings
    if category is not None:
        email_category = Category(category)
        mail.add_category(email_category)
    try:
        sg.client.mail.send.post(request_body=mail.get())
    except Exception as e:
        logger.info(e)


@background(schedule=10)
def log_sent_email(email, user_id=None, template_id=None):
    user = User.objects.get(id=user_id)
    emailmanager_models.EmailTracker.objects.create(user=user, email=email, template_id=template_id)
