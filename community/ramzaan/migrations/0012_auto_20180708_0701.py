# Generated by Django 2.0.4 on 2018-07-08 07:01

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('ramzaan', '0011_auto_20180708_0626'),
    ]

    operations = [
        migrations.AlterField(
            model_name='ramzaanuserprogress',
            name='user',
            field=models.OneToOneField(help_text='The user who makes the progress in the group', on_delete=django.db.models.deletion.CASCADE, related_name='ramzaan_userprogressuser', to=settings.AUTH_USER_MODEL),
        ),
    ]
