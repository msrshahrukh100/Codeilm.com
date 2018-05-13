# Generated by Django 2.0.4 on 2018-05-13 14:46

from django.db import migrations, models
import usermanagement.models


class Migration(migrations.Migration):

    dependencies = [
        ('usermanagement', '0002_remove_userprofile_profile_image_path'),
    ]

    operations = [
        migrations.AlterField(
            model_name='userprofile',
            name='profile_image',
            field=models.ImageField(default='user_profile_images/default.png', height_field='height_field', help_text='Profile Image of the user', upload_to=usermanagement.models.upload_location, width_field='width_field'),
        ),
    ]
