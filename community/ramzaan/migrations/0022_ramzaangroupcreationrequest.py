# Generated by Django 2.0.4 on 2018-07-21 17:12

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('mainapp', '0005_auto_20180721_1209'),
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
        ('ramzaan', '0021_auto_20180721_1209'),
    ]

    operations = [
        migrations.CreateModel(
            name='RamzaanGroupCreationRequest',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('description', models.TextField()),
                ('notification_sent', models.BooleanField(default=False)),
                ('created_at', models.DateTimeField(auto_now_add=True)),
                ('updated_at', models.DateTimeField(auto_now=True)),
                ('community', models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.SET_NULL, to='mainapp.Community')),
                ('user', models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.SET_NULL, related_name='ramzaan_groupcreationrequests', to=settings.AUTH_USER_MODEL)),
            ],
            options={
                'abstract': False,
            },
        ),
    ]
