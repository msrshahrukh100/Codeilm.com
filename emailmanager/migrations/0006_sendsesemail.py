# Generated by Django 2.0.4 on 2018-08-05 06:01

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('emailmanager', '0005_auto_20180721_1244'),
    ]

    operations = [
        migrations.CreateModel(
            name='SendSESEmail',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('sender', models.CharField(max_length=255)),
                ('template_path', models.CharField(max_length=255)),
                ('context', models.TextField(default='{}')),
                ('receipient_json_data', models.TextField()),
                ('subject', models.CharField(max_length=255)),
            ],
        ),
    ]
