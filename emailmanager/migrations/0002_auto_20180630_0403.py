# Generated by Django 2.0.4 on 2018-06-30 04:03

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('emailmanager', '0001_initial'),
    ]

    operations = [
        migrations.RenameField(
            model_name='emailtracker',
            old_name='template_id',
            new_name='template_path',
        ),
    ]
