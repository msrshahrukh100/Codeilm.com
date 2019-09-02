from django.contrib import admin
from .models import Project, Task, Comment
# Register your models here.


class TaskAdmin(admin.ModelAdmin):
	list_display = ["text", "order", "done"]

	class Meta:
		model = Task

class ProjectAdmin(admin.ModelAdmin):
	list_display = ["poster", "title", "deadline", "completed"]
	raw_id_fields = ["developers"]

admin.site.register(Project, ProjectAdmin)
admin.site.register(Task, TaskAdmin)
admin.site.register(Comment)