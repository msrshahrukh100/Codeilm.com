# Generated by Django 2.0.4 on 2018-09-06 03:51

import autoslug.fields
from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion
import hashid_field.field
import mainapp.basemodels


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        ('mainapp', '0008_groupcreationrequest_request_ip_info'),
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
    ]

    operations = [
        migrations.CreateModel(
            name='CodingGroup',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(help_text='The name of the individual group formed within a community', max_length=255)),
                ('slug', autoslug.fields.AutoSlugField(editable=False, populate_from='name')),
                ('group_hash_id', hashid_field.field.HashidField(alphabet='abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890', blank=True, editable=False, min_length=7, null=True, unique=True)),
                ('description', models.TextField(help_text='The description for the group in the community')),
                ('image', models.ImageField(blank=True, height_field='height_field', help_text='A image representing the Community', null=True, upload_to=mainapp.basemodels.upload_to, width_field='width_field')),
                ('height_field', models.IntegerField(blank=True, default=0, null=True)),
                ('width_field', models.IntegerField(blank=True, default=0, null=True)),
                ('target_statement', models.TextField(help_text='What the user wants to achieve while forming this group')),
                ('unit_name', models.CharField(help_text='Unit of work, eg. chapters when reading a book', max_length=255)),
                ('total_units', models.PositiveIntegerField(help_text='The total number of units in the task')),
                ('start_date', models.DateTimeField(blank=True, help_text='The start date for the task', null=True)),
                ('end_date', models.DateTimeField(blank=True, help_text='The end date for the task', null=True)),
                ('created_at', models.DateTimeField(auto_now_add=True)),
                ('updated_at', models.DateTimeField(auto_now=True)),
                ('community', models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.SET_NULL, to='mainapp.Community')),
                ('created_by', models.ForeignKey(editable=False, null=True, on_delete=django.db.models.deletion.SET_NULL, related_name='coding_groupcreateduser', to=settings.AUTH_USER_MODEL)),
                ('updated_by', models.ForeignKey(editable=False, null=True, on_delete=django.db.models.deletion.SET_NULL, related_name='coding_groupupdateduser', to=settings.AUTH_USER_MODEL)),
            ],
            options={
                'permissions': (('owner_of_group', 'Owner of group'),),
            },
        ),
        migrations.CreateModel(
            name='CodingGroupOptions',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('is_private', models.BooleanField(default=False, help_text='Whether the group is still private')),
                ('is_active', models.BooleanField(default=True, help_text='Whether the group is still active, set to false when user deletes it')),
                ('show_timer', models.BooleanField(default=False)),
                ('has_extra_content_popup', models.BooleanField(default=False, help_text='Has content which needs to be shown in a popup window')),
                ('extra_content_popup_cta', models.CharField(blank=True, help_text='The CTA of the modal display button', max_length=255, null=True)),
                ('extra_content_popup_template', models.CharField(blank=True, help_text='The template of the pop', max_length=255, null=True)),
                ('group', models.OneToOneField(help_text='The group for which the group options is entered', on_delete=django.db.models.deletion.CASCADE, related_name='coding_groupoptions', to='coding.CodingGroup')),
            ],
            options={
                'abstract': False,
            },
        ),
        migrations.CreateModel(
            name='CodingGroupUser',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('created_at', models.DateTimeField(auto_now_add=True)),
                ('updated_at', models.DateTimeField(auto_now=True)),
                ('request_ip_info', models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.SET_NULL, related_name='coding_requestipinfos', to='mainapp.RequestIpInfo')),
                ('user', models.ForeignKey(help_text='The user in a particular group', null=True, on_delete=django.db.models.deletion.SET_NULL, related_name='coding_groupusers', to=settings.AUTH_USER_MODEL)),
            ],
            options={
                'abstract': False,
            },
        ),
        migrations.CreateModel(
            name='CodingGroupUserMotivation',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('created_at', models.DateTimeField(auto_now_add=True)),
                ('updated_at', models.DateTimeField(auto_now=True)),
                ('from_user', models.ForeignKey(help_text='The user who sent motivations', null=True, on_delete=django.db.models.deletion.SET_NULL, related_name='coding_frommotivation', to=settings.AUTH_USER_MODEL)),
                ('group', models.ForeignKey(help_text='The group corresponding to which the motivation was sent', on_delete=django.db.models.deletion.CASCADE, related_name='motivation_sent', to='coding.CodingGroup')),
                ('to_user', models.ForeignKey(help_text='The user to whom motivation is sent', null=True, on_delete=django.db.models.deletion.SET_NULL, related_name='coding_tomotivation', to=settings.AUTH_USER_MODEL)),
            ],
            options={
                'abstract': False,
            },
        ),
        migrations.AddField(
            model_name='codinggroup',
            name='users',
            field=models.ManyToManyField(blank=True, help_text='The users who are part of this group', related_name='coding_groupusers', to='coding.CodingGroupUser'),
        ),
    ]
