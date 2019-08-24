# Generated by Django 2.0.4 on 2019-08-22 04:58

from django.db import migrations
import hashid_field.field


class Migration(migrations.Migration):

    dependencies = [
        ('usermanagement', '0011_community_is_company'),
    ]

    operations = [
        migrations.AlterField(
            model_name='userprofile',
            name='id',
            field=hashid_field.field.HashidAutoField(alphabet='abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890', min_length=7, primary_key=True, serialize=False),
        ),
    ]