# Generated by Django 2.0.4 on 2019-05-17 06:52

from django.db import migrations
import django_mysql.models


class Migration(migrations.Migration):

    dependencies = [
        ('lovecodebackend', '0014_tutoriallike'),
    ]

    operations = [
        migrations.AddField(
            model_name='tutorial',
            name='like_data',
            field=django_mysql.models.JSONField(blank=True, default=dict, null=True),
        ),
    ]