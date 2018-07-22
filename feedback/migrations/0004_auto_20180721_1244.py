# Generated by Django 2.0.4 on 2018-07-21 12:44

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('feedback', '0003_auto_20180526_1150'),
    ]

    operations = [
        migrations.AlterField(
            model_name='clickresponse',
            name='event',
            field=models.ForeignKey(help_text='The event corresponding to which the click response is collected', null=True, on_delete=django.db.models.deletion.SET_NULL, to='feedback.FeedbackEvent'),
        ),
        migrations.AlterField(
            model_name='clickresponse',
            name='request_ip_info',
            field=models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.SET_NULL, related_name='click_response', to='mainapp.RequestIpInfo'),
        ),
        migrations.AlterField(
            model_name='feedbackevent',
            name='created_by',
            field=models.ForeignKey(editable=False, null=True, on_delete=django.db.models.deletion.SET_NULL, related_name='feedbackevent_created', to=settings.AUTH_USER_MODEL),
        ),
        migrations.AlterField(
            model_name='feedbackevent',
            name='modified_by',
            field=models.ForeignKey(editable=False, null=True, on_delete=django.db.models.deletion.SET_NULL, to=settings.AUTH_USER_MODEL),
        ),
        migrations.AlterField(
            model_name='feedbackresponse',
            name='event',
            field=models.ForeignKey(help_text='Form responses of feedback', null=True, on_delete=django.db.models.deletion.SET_NULL, to='feedback.FeedbackEvent'),
        ),
        migrations.AlterField(
            model_name='feedbackresponse',
            name='request_ip_info',
            field=models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.SET_NULL, related_name='feedback_response', to='mainapp.RequestIpInfo'),
        ),
        migrations.AlterField(
            model_name='useractivity',
            name='user',
            field=models.ForeignKey(help_text='The user whose activity is registered', null=True, on_delete=django.db.models.deletion.SET_NULL, related_name='user_activity', to=settings.AUTH_USER_MODEL),
        ),
    ]