# Generated by Django 2.0.4 on 2018-07-13 03:57

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('ramzaan', '0018_remove_ramzaanstatusupdate_on_unit'),
    ]

    operations = [
        migrations.AddField(
            model_name='ramzaanstatusupdate',
            name='at_unit',
            field=models.ForeignKey(help_text='The current state of the user, eg. at chapter 2', null=True, on_delete=django.db.models.deletion.SET_NULL, to='ramzaan.RamzaanUnitDescription'),
        ),
    ]