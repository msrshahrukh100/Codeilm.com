from django.contrib import admin
from . import models as gymapp_models
# Register your models here.

admin.site.register(gymapp_models.Exercise)
admin.site.register(gymapp_models.Schedule)
admin.site.register(gymapp_models.ScheduleExercise)
