# Generated by Django 2.0.4 on 2018-08-05 14:31

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('feedback', '0006_auto_20180804_0729'),
    ]

    operations = [
        migrations.AddField(
            model_name='feedbackevent',
            name='redirect_url',
            field=models.URLField(blank=True, null=True),
        ),
    ]
