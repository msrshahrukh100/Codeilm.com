# Generated by Django 2.0.4 on 2018-08-06 07:29

from django.db import migrations, models
import django.utils.timezone


class Migration(migrations.Migration):

    dependencies = [
        ('emailmanager', '0006_sendsesemail'),
    ]

    operations = [
        migrations.AddField(
            model_name='sendsesemail',
            name='created_at',
            field=models.DateTimeField(auto_now_add=True, default=django.utils.timezone.now),
            preserve_default=False,
        ),
        migrations.AddField(
            model_name='sendsesemail',
            name='updated_at',
            field=models.DateTimeField(auto_now=True),
        ),
    ]
