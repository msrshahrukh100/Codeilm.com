# Generated by Django 2.0.4 on 2019-08-18 13:27

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('projects', '0005_auto_20190818_1302'),
    ]

    operations = [
        migrations.RenameField(
            model_name='task',
            old_name='id',
            new_name='hash_id',
        ),
    ]
