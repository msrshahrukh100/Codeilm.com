from django.contrib import admin
from .models import Project, Task, Comment
# Register your models here.


class TaskAdmin(admin.ModelAdmin):
	list_display = ["text", "order", "done"]

	class Meta:
		model = Task

admin.site.register(Project)
admin.site.register(Task, TaskAdmin)
admin.site.register(Comment)