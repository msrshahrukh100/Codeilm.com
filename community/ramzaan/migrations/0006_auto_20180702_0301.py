# Generated by Django 2.0.4 on 2018-07-02 03:01

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('ramzaan', '0005_auto_20180610_1434'),
    ]

    operations = [
        migrations.AlterModelOptions(
            name='ramzaangroup',
            options={'permissions': (('owner', 'Owner of the group'),)},
        ),
    ]
