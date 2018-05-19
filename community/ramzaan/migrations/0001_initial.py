# Generated by Django 2.0.4 on 2018-05-19 10:00

import autoslug.fields
from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion
import mainapp.basemodels


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
    ]

    operations = [
        migrations.CreateModel(
            name='RamzaanGroup',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(help_text='The name of the individual group formed within a community', max_length=255)),
                ('slug', autoslug.fields.AutoSlugField(editable=False, populate_from='name')),
                ('description', models.TextField(help_text='The description for the group in the community')),
                ('image', models.ImageField(blank=True, height_field='height_field', help_text='A image representing the Community', null=True, upload_to=mainapp.basemodels.upload_to, width_field='width_field')),
                ('height_field', models.IntegerField(blank=True, default=0, null=True)),
                ('width_field', models.IntegerField(blank=True, default=0, null=True)),
                ('target_statement', models.TextField(help_text='What the user wants to achieve while forming this group')),
                ('unit_name', models.CharField(help_text='Unit of work, eg. chapters when reading a book', max_length=255)),
                ('total_units', models.PositiveIntegerField(help_text='The total number of units in the task')),
                ('start_date', models.DateTimeField(help_text='The start date for the task')),
                ('end_date', models.DateTimeField(help_text='The end date for the task')),
                ('is_private', models.BooleanField(default=False, help_text='Whether the group is still private')),
                ('is_active', models.BooleanField(default=True, help_text='Whether the group is still active, set to false when user deletes it')),
                ('created_at', models.DateTimeField(auto_now_add=True)),
                ('updated_at', models.DateTimeField(auto_now=True)),
                ('created_by', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='ramzaan_groupcreateduser', to=settings.AUTH_USER_MODEL)),
                ('updated_by', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='ramzaan_groupupdateduser', to=settings.AUTH_USER_MODEL)),
                ('users', models.ManyToManyField(help_text='The users who are part of this group', related_name='ramzaan_groupusers', to=settings.AUTH_USER_MODEL)),
            ],
            options={
                'abstract': False,
            },
        ),
        migrations.CreateModel(
            name='RamzaanStatusUpdate',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('content', models.TextField()),
                ('created_at', models.DateTimeField(auto_now_add=True)),
                ('updated_at', models.DateTimeField(auto_now=True)),
                ('on_unit', models.PositiveIntegerField()),
                ('group', models.ForeignKey(help_text='The group corresponding to which the status was updated', on_delete=django.db.models.deletion.CASCADE, related_name='status_updates', to='ramzaan.RamzaanGroup')),
                ('user', models.ForeignKey(help_text="User's status update on a particular group", on_delete=django.db.models.deletion.CASCADE, related_name='ramzaan_user_status_update', to=settings.AUTH_USER_MODEL)),
            ],
            options={
                'ordering': ['-created_at'],
            },
        ),
        migrations.CreateModel(
            name='RamzaanUnitDescription',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('unit', models.PositiveIntegerField(default=0)),
                ('unit_title', models.CharField(max_length=300)),
                ('group', models.ForeignKey(help_text='The group for which the unit description is entered', on_delete=django.db.models.deletion.CASCADE, related_name='ramzaan_unitdescription', to='ramzaan.RamzaanGroup')),
            ],
            options={
                'abstract': False,
            },
        ),
        migrations.CreateModel(
            name='RamzaanUserProgress',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('progress', models.FloatField(default=0, help_text='The progress of the user')),
                ('at_unit', models.PositiveIntegerField(default=0, help_text='The current state of the user, eg. at chapter 2')),
                ('last_progress_made', models.DateTimeField(auto_now=True, help_text='The last date the user made progress')),
                ('group', models.ForeignKey(help_text='The group in which the user make a progress', on_delete=django.db.models.deletion.CASCADE, related_name='ramzaan_userprogressgroup', to='ramzaan.RamzaanGroup')),
                ('user', models.ForeignKey(help_text='The user who makes the progress in the group', on_delete=django.db.models.deletion.CASCADE, related_name='ramzaan_userprogressuser', to=settings.AUTH_USER_MODEL)),
            ],
            options={
                'abstract': False,
            },
        ),
    ]
