# Generated by Django 2.0.4 on 2019-08-24 14:19

from django.db import migrations
import django_mysql.models


class Migration(migrations.Migration):

    dependencies = [
        ('feedback', '0008_leadcaptureemail'),
    ]

    operations = [
        migrations.AddField(
            model_name='leadcaptureemail',
            name='extra_data',
            field=django_mysql.models.JSONField(default=dict),
        ),
    ]
