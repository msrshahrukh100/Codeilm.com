# Generated by Django 2.0.4 on 2019-08-10 15:38

import autoslug.fields
from django.conf import settings
from django.db import migrations, models
import sorl.thumbnail.fields
import usermanagement.models


class Migration(migrations.Migration):

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
        ('usermanagement', '0004_userprofile_intro'),
    ]

    operations = [
        migrations.CreateModel(
            name='Community',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=255)),
                ('slug', autoslug.fields.AutoSlugField(always_update=True, editable=False, populate_from='title')),
                ('description', models.TextField()),
                ('profile_image', sorl.thumbnail.fields.ImageField(blank=True, height_field='height_field', help_text='Image of the community', null=True, upload_to=usermanagement.models.upload_community_image, width_field='width_field')),
                ('height_field', models.IntegerField(blank=True, null=True)),
                ('width_field', models.IntegerField(blank=True, null=True)),
                ('created_at', models.DateTimeField(auto_now_add=True)),
                ('updated_at', models.DateTimeField(auto_now=True)),
                ('admins', models.ManyToManyField(blank=True, related_name='community_admins', to=settings.AUTH_USER_MODEL)),
                ('members', models.ManyToManyField(blank=True, related_name='community_members', to=settings.AUTH_USER_MODEL)),
            ],
        ),
    ]
