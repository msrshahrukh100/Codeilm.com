import logging
from background_task import background
from . import models as emailmanager_models
from django.contrib.auth.models import User
import boto3
from botocore.exceptions import ClientError
from django.template.loader import render_to_string
from mainapp.utils import get_user_display_name


logger = logging.getLogger(__name__)


def ses_email_helper(email, sender, template_path, subject, context):
    print("reached function")
    AWS_REGION = "us-west-2"
    CHARSET = "UTF-8"
    BODY_HTML = render_to_string(template_path, context)
    BODY_TEXT = ("Sent with love from Codeilm\r\n"
                 "This email was sent with Amazon SES")
    print("making client pbje")
    client = boto3.client('ses', region_name=AWS_REGION)
    print(client)
    try:
        response = client.send_email(
            Destination={
                'ToAddresses': [email],
            },
            Message={
                'Body': {
                    'Html': {
                        'Charset': CHARSET,
                        'Data': BODY_HTML,
                    },
                    'Text': {
                        'Charset': CHARSET,
                        'Data': BODY_TEXT,
                    },
                },
                'Subject': {
                    'Charset': CHARSET,
                    'Data': subject,
                },
            },
            Source=sender,
        )

    except ClientError as e:
        print(e.response['Error']['Message'])
        return False
    else:
        print("Email sent! Message ID:"),
        print(response['MessageId'])
        return True


@background(schedule=10)
def send_ses_email(
        sender,
        template_path,
        context={},
        user_ids=None,
        recipients=None,
        subject=None):

    '''
    Pass user_ids of the users to whom you want to send email or else provide the emails to whom you
    want to send email. 
    If receipients are provided than user ids won't be considered.
    '''

    if not user_ids and not recipients:
        raise Exception("Please provide at least user id or recipients")

    unsubscribed_emails = emailmanager_models.UnsubscribedUser.objects.values_list('email', flat=True)

    users = None
    if not recipients:
        users = User.objects.filter(id__in=user_ids)

    if users:
        for user in users:
            if user.email in unsubscribed_emails:
                emailmanager_models.EmailTracker.objects.create(
                    user=user,
                    email=user.email,
                    sent=False,
                    remarks="Not sent as email in Unsubscribed list",
                    template_path=template_path)
            else:
                context["name"] = get_user_display_name(user)
                context["email"] = user.email
                logger.info("-----------------*************--------------")
                logger.info("subject is")
                logger.info(subject)
                if '%' in subject:
                    subject = subject % {'user_full_name': get_user_display_name(user)}
                response = ses_email_helper(user.email, sender, template_path, subject, context)
                if response:
                    emailmanager_models.EmailTracker.objects.create(
                        user=user,
                        email=user.email,
                        sent=True,
                        remarks="Email sent successfully",
                        template_path=template_path)

    else:
        for recipient in recipients:
            if recipient[1] in unsubscribed_emails:
                emailmanager_models.EmailTracker.objects.create(
                    email=recipient[1],
                    sent=False,
                    remarks="Not sent as email in Unsubscribed list",
                    template_path=template_path)
            else:
                context["name"] = recipient[0]
                context["email"] = recipient[1]
                if '%' in subject:
                    subject = subject % {'user_full_name': context["name"]}
                response = ses_email_helper(recipient[1], sender, template_path, subject, context)
                if response:
                    emailmanager_models.EmailTracker.objects.create(
                        email=recipient[1],
                        sent=True,
                        remarks="Email sent successfully",
                        template_path=template_path)
