# Generated by Django 2.0.4 on 2018-05-28 03:51

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('ramzaan', '0003_ramzaangroup_users'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='ramzaanuserprogress',
            name='progress',
        ),
    ]