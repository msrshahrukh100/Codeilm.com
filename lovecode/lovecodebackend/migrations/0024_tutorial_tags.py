# Generated by Django 2.0.4 on 2019-06-22 13:02

from django.db import migrations
import django_mysql.models
import lovecode.lovecodebackend.models


class Migration(migrations.Migration):

    dependencies = [
        ('lovecodebackend', '0023_auto_20190613_0713'),
    ]

    operations = [
        migrations.AddField(
            model_name='tutorial',
            name='tags',
            field=django_mysql.models.JSONField(blank=True, default=lovecode.lovecodebackend.models.get_like_data_default),
        ),
    ]
