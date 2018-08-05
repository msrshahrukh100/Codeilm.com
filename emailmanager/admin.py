from django.contrib import admin
from . import models as emailmanager_models
# Register your models here.


class EmailTrackerAdmin(admin.ModelAdmin):
	list_display = ['user', 'email', 'sent', 'remarks', 'template_path', 'created_at', 'updated_at']


class UnsubscribedUserAdmin(admin.ModelAdmin):
	list_display = ['email', 'created_at', 'updated_at']


class SendSESEmailAdmin(admin.ModelAdmin):
	list_display = ['sender', 'template_path', 'subject']


admin.site.register(emailmanager_models.EmailTracker, EmailTrackerAdmin)
admin.site.register(emailmanager_models.UnsubscribedUser, UnsubscribedUserAdmin)
admin.site.register(emailmanager_models.SendSESEmail, SendSESEmailAdmin)
