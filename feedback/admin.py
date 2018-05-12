from django.contrib import admin
from .models import UserActivity
# Register your models here.


class UserActivityAdmin(admin.ModelAdmin):
	list_display = ['user', 'activity', 'created_at', 'updated_at']
	list_filter = ['user', 'activity', 'created_at', 'updated_at']


admin.site.register(UserActivity, UserActivityAdmin)
