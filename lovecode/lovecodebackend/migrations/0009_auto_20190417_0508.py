# Generated by Django 2.0.4 on 2019-04-17 05:08

from django.db import migrations, models
import django_mysql.models


class Migration(migrations.Migration):

    dependencies = [
        ('lovecodebackend', '0008_auto_20190414_0640'),
    ]

    operations = [
        migrations.RenameField(
            model_name='githubapiresponse',
            old_name='headers',
            new_name='response_headers',
        ),
        migrations.AddField(
            model_name='githubapiresponse',
            name='get_params',
            field=django_mysql.models.JSONField(blank=True, default=dict, null=True),
        ),
        migrations.AddField(
            model_name='githubapiresponse',
            name='post_params',
            field=django_mysql.models.JSONField(blank=True, default=dict, null=True),
        ),
        migrations.AlterField(
            model_name='githubapiresponse',
            name='etag',
            field=models.CharField(blank=True, max_length=150, null=True),
        ),
    ]
