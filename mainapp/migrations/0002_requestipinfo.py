# Generated by Django 2.0.4 on 2018-05-20 10:57

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('mainapp', '0001_initial'),
    ]

    operations = [
        migrations.CreateModel(
            name='RequestIpInfo',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('city', models.CharField(blank=True, max_length=255, null=True)),
                ('country_code', models.CharField(blank=True, max_length=255, null=True)),
                ('country_name', models.CharField(blank=True, max_length=255, null=True)),
                ('dma_code', models.CharField(blank=True, max_length=255, null=True)),
                ('latitude', models.CharField(blank=True, max_length=255, null=True)),
                ('longitude', models.CharField(blank=True, max_length=255, null=True)),
                ('postal_code', models.CharField(blank=True, max_length=255, null=True)),
                ('region', models.CharField(blank=True, max_length=255, null=True)),
                ('time_zone', models.CharField(blank=True, max_length=255, null=True)),
            ],
        ),
    ]
