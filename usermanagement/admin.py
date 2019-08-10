from django.contrib import admin
from .models import UserProfile, Connections, Community
# Register your models here.


class UserProfileAdmin(admin.ModelAdmin):
	list_display = ['user', 'gender', 'profile_image']


class ConnectionsAdmin(admin.ModelAdmin):
	list_display = ['__str__', 'user', 'following']


class CommunityAdmin(admin.ModelAdmin):
	list_display = ['name', 'slug']
	raw_id_fields = ['admins', 'members']

admin.site.register(UserProfile, UserProfileAdmin)
admin.site.register(Connections, ConnectionsAdmin)
admin.site.register(Community, CommunityAdmin)