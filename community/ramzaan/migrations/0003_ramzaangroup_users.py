# Generated by Django 2.0.4 on 2018-05-27 14:28

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('ramzaan', '0002_auto_20180527_1422'),
    ]

    operations = [
        migrations.AddField(
            model_name='ramzaangroup',
            name='users',
            field=models.ManyToManyField(help_text='The users who are part of this group', related_name='ramzaan_groupusers', to='ramzaan.RamzaanGroupUser'),
        ),
    ]
