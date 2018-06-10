# Generated by Django 2.0.4 on 2018-06-10 14:34

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('ramzaan', '0004_remove_ramzaanuserprogress_progress'),
    ]

    operations = [
        migrations.AlterField(
            model_name='ramzaangroup',
            name='end_date',
            field=models.DateTimeField(blank=True, help_text='The end date for the task', null=True),
        ),
        migrations.AlterField(
            model_name='ramzaangroup',
            name='start_date',
            field=models.DateTimeField(blank=True, help_text='The start date for the task', null=True),
        ),
    ]
