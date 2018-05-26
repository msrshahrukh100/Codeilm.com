# Generated by Django 2.0.4 on 2018-05-26 11:50

from django.db import migrations, models
import sorl.thumbnail.fields
import usermanagement.models


class Migration(migrations.Migration):

    dependencies = [
        ('usermanagement', '0001_initial'),
    ]

    operations = [
        migrations.AlterField(
            model_name='userprofile',
            name='height_field',
            field=models.IntegerField(blank=True, null=True),
        ),
        migrations.AlterField(
            model_name='userprofile',
            name='profile_image',
            field=sorl.thumbnail.fields.ImageField(blank=True, height_field='height_field', help_text='Profile Image of the user', null=True, upload_to=usermanagement.models.upload_location, width_field='width_field'),
        ),
        migrations.AlterField(
            model_name='userprofile',
            name='width_field',
            field=models.IntegerField(blank=True, null=True),
        ),
    ]
