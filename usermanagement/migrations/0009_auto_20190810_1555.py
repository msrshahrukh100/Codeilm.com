# Generated by Django 2.0.4 on 2019-08-10 15:55

import autoslug.fields
from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('usermanagement', '0008_auto_20190810_1553'),
    ]

    operations = [
        migrations.AlterField(
            model_name='community',
            name='slug',
            field=autoslug.fields.AutoSlugField(always_update=True, editable=False, populate_from='name', unique_with=['id']),
        ),
    ]
