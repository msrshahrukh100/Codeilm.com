# Generated by Django 2.0.4 on 2018-05-26 11:50

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('feedback', '0002_auto_20180520_1057'),
    ]

    operations = [
        migrations.AlterField(
            model_name='feedbackevent',
            name='created_by',
            field=models.ForeignKey(editable=False, on_delete=django.db.models.deletion.CASCADE, related_name='feedbackevent_created', to=settings.AUTH_USER_MODEL),
        ),
        migrations.AlterField(
            model_name='feedbackevent',
            name='modified_by',
            field=models.ForeignKey(editable=False, on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL),
        ),
    ]
