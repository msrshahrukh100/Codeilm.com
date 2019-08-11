# Generated by Django 2.0.4 on 2019-08-10 15:38

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('usermanagement', '0005_community'),
        ('lovecodebackend', '0028_auto_20190624_1048'),
    ]

    operations = [
        migrations.AddField(
            model_name='tutorial',
            name='community',
            field=models.ForeignKey(blank=True, help_text='Community this tutorial is part of', null=True, on_delete=django.db.models.deletion.SET_NULL, related_name='tutorial_community', to='usermanagement.Community'),
        ),
    ]