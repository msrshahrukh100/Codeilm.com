from django.contrib import admin
from .models import UserProfile, Connections
# Register your models here.


class UserProfileAdmin(admin.ModelAdmin):
	list_display = ['user', 'gender']


class ConnectionsAdmin(admin.ModelAdmin):
	list_display = ['__str__', 'user', 'following']


admin.site.register(UserProfile, UserProfileAdmin)
admin.site.register(Connections, ConnectionsAdmin)