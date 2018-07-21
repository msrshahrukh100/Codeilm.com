# Generated by Django 2.0.4 on 2018-07-21 12:09

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('ramzaan', '0020_ramzaangroupusermotivation'),
    ]

    operations = [
        migrations.AlterField(
            model_name='ramzaangroup',
            name='created_by',
            field=models.ForeignKey(editable=False, null=True, on_delete=django.db.models.deletion.SET_NULL, related_name='ramzaan_groupcreateduser', to=settings.AUTH_USER_MODEL),
        ),
        migrations.AlterField(
            model_name='ramzaangroup',
            name='updated_by',
            field=models.ForeignKey(editable=False, null=True, on_delete=django.db.models.deletion.SET_NULL, related_name='ramzaan_groupupdateduser', to=settings.AUTH_USER_MODEL),
        ),
        migrations.AlterField(
            model_name='ramzaangroupuser',
            name='user',
            field=models.ForeignKey(help_text='The user in a particular group', null=True, on_delete=django.db.models.deletion.SET_NULL, related_name='ramzaan_groupusers', to=settings.AUTH_USER_MODEL),
        ),
        migrations.AlterField(
            model_name='ramzaangroupusermotivation',
            name='from_user',
            field=models.ForeignKey(help_text='The user who sent motivations', null=True, on_delete=django.db.models.deletion.SET_NULL, related_name='ramzaan_frommotivation', to=settings.AUTH_USER_MODEL),
        ),
        migrations.AlterField(
            model_name='ramzaangroupusermotivation',
            name='to_user',
            field=models.ForeignKey(help_text='The user to whom motivation is sent', null=True, on_delete=django.db.models.deletion.SET_NULL, related_name='ramzaan_tomotivation', to=settings.AUTH_USER_MODEL),
        ),
        migrations.AlterField(
            model_name='ramzaanstatusupdate',
            name='user',
            field=models.ForeignKey(help_text="User's status update on a particular group", null=True, on_delete=django.db.models.deletion.SET_NULL, related_name='ramzaan_user_status_update', to=settings.AUTH_USER_MODEL),
        ),
        migrations.AlterField(
            model_name='ramzaanuserprogress',
            name='user',
            field=models.ForeignKey(help_text='The user who makes the progress in the group', null=True, on_delete=django.db.models.deletion.SET_NULL, related_name='ramzaan_userprogressuser', to=settings.AUTH_USER_MODEL),
        ),
    ]
