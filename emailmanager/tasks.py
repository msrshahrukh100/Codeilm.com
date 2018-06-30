import logging
from background_task import background
from . import models as emailmanager_models
from django.contrib.auth.models import User
import boto3
from botocore.exceptions import ClientError
from django.template.loader import render_to_string


logger = logging.getLogger(__name__)


@background(schedule=10)
def send_ses_email(
        sender,
        template_path="emails/welcome_email.html",
        context={},
        user_ids=None,
        recipients=None,
        subject=None,
        body_text=None):

    # Replace recipient@example.com with a "To" address. If your account
    # is still in the sandbox, this address must be verified.
    if not user_ids and not recipients:
        raise Exception("Please provide at least user id or recipients")

    users = None
    if not recipients:
        users = User.objects.filter(id__in=user_ids)
        recipients = users.values_list('email', flat=True)

    # If necessary, replace us-west-2 with the AWS Region you're using for Amazon SES.
    AWS_REGION = "us-west-2"

    # The email body for recipients with non-HTML email clients.
    if body_text:
        BODY_TEXT = body_text
    else:
        BODY_TEXT = ("Sent with love from Allywith\r\n"
                     "This email was sent with Amazon SES")

    BODY_HTML = render_to_string(template_path, context)

    # The character encoding for the email.
    CHARSET = "UTF-8"

    # Create a new SES resource and specify a region.
    client = boto3.client('ses', region_name=AWS_REGION)

    # Try to send the email.
    try:
        #Provide the contents of the email.
        response = client.send_email(
            Destination={
                'ToAddresses': list(recipients),
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
    # Display an error if something goes wrong
    except ClientError as e:
        print(e.response['Error']['Message'])
    else:
        print("Email sent! Message ID:"),
        print(response['MessageId'])

        if users:
            for user in users:
                emailmanager_models.EmailTracker.objects.create(user=user, email=user.email, template_path=template_path)
        else:
            for recipient in recipients:
                emailmanager_models.EmailTracker.objects.create(email=recipient, template_path=template_path)
