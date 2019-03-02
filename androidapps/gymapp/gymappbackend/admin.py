from django.contrib import admin
from . import models as gymapp_models
from guardian.admin import GuardedModelAdmin

# Register your models here.
class ExerciseInline(admin.TabularInline):
	model = gymapp_models.Exercise

class ScheduleInline(admin.TabularInline):
	model = gymapp_models.Schedule

class ScheduleExerciseInline(admin.TabularInline):
	raw_id_fields = ['user', 'exercise']
	model = gymapp_models.ScheduleExercise

class ScheduleExerciseAdmin(admin.ModelAdmin):
	list_display = ['exercise', 'user']

class ScheduleAdmin(GuardedModelAdmin):
	inlines = [ScheduleExerciseInline]
	raw_id_fields = ['user']
	list_display = ('user', 'name', 'last_performed', 'created_at', 'updated_at')

	def save_model(self, request, obj, form, change):
		obj.user = request.user
		super(ScheduleAdmin, self).save_model(request, obj, form, change)


class ExerciseAdmin(admin.ModelAdmin):
	inlines = [
		ScheduleExerciseInline
	]
	list_display = ['name']


admin.site.register(gymapp_models.Exercise, ExerciseAdmin)
admin.site.register(gymapp_models.Schedule, ScheduleAdmin)
admin.site.register(gymapp_models.ScheduleExercise, ScheduleExerciseAdmin)
