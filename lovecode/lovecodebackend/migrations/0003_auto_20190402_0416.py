# Generated by Django 2.0.4 on 2019-04-02 04:16

import autoslug.fields
import datetime
from django.db import migrations
from django.utils.timezone import utc
import hashid_field.field


class Migration(migrations.Migration):

    dependencies = [
        ('lovecodebackend', '0002_auto_20190331_1440'),
    ]

    operations = [
        migrations.AddField(
            model_name='githubrepo',
            name='hash_id',
            field=hashid_field.field.HashidField(alphabet='abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890', blank=True, editable=False, min_length=7, null=True, unique=True),
        ),
        migrations.AddField(
            model_name='tutorial',
            name='hash_id',
            field=hashid_field.field.HashidField(alphabet='abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890', blank=True, editable=False, min_length=7, null=True, unique=True),
        ),
        migrations.AddField(
            model_name='tutorial',
            name='slug',
            field=autoslug.fields.AutoSlugField(default=datetime.datetime(2019, 4, 2, 4, 16, 18, 177608, tzinfo=utc), editable=False, populate_from='title'),
            preserve_default=False,
        ),
    ]