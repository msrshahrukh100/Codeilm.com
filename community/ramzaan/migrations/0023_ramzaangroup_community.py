# Generated by Django 2.0.4 on 2018-07-22 11:58

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('mainapp', '0006_community_community_base_url'),
        ('ramzaan', '0022_ramzaangroupcreationrequest'),
    ]

    operations = [
        migrations.AddField(
            model_name='ramzaangroup',
            name='community',
            field=models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.SET_NULL, to='mainapp.Community'),
        ),
    ]
