from django.contrib import admin
from . import models as gymapp_models
from guardian.admin import GuardedModelAdmin

# Register your models here.

class ScheduleAdmin(GuardedModelAdmin):
	list_display = ('user', 'name', 'last_performed', 'created_at', 'updated_at')


admin.site.register(gymapp_models.Exercise)
admin.site.register(gymapp_models.Schedule, ScheduleAdmin)
admin.site.register(gymapp_models.ScheduleExercise)
