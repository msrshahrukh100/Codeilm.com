from django.contrib import admin
from . import models as emailmanager_models
# Register your models here.


class EmailTrackerAdmin(admin.ModelAdmin):
	list_display = ['user', 'email', 'template_path', 'created_at', 'updated_at']


admin.site.register(emailmanager_models.EmailTracker, EmailTrackerAdmin)
