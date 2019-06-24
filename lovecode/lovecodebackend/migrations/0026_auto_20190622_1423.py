# Generated by Django 2.0.4 on 2019-06-22 14:23

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('lovecodebackend', '0025_tutorialtags'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='tutorial',
            name='tags',
        ),
        migrations.AddField(
            model_name='tutorial',
            name='tags',
            field=models.ManyToManyField(blank=True, null=True, to='lovecodebackend.TutorialTags'),
        ),
    ]