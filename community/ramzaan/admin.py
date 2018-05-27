from django.contrib import admin
from .models import RamzaanGroup, RamzaanUserProgress, RamzaanStatusUpdate, RamzaanGroupUser
# Register your models here.


class RamzaanStatusUpdateAdmin(admin.ModelAdmin):
	list_display = ['user', 'content', 'on_unit', 'created_at', 'updated_at']


class RamzaanGroupUserAdmin(admin.ModelAdmin):
	list_display = ['user', 'created_at', 'city', 'country_name', 'time_zone', 'region']

	def city(self, obj):
		if obj.request_ip_info:
			return obj.request_ip_info.city
		return None

	def country_name(self, obj):
		if obj.request_ip_info:
			return obj.request_ip_info.country_name
		return None

	def time_zone(self, obj):
		if obj.request_ip_info:
			return obj.request_ip_info.time_zone
		return None

	def region(self, obj):
		if obj.request_ip_info:
			return obj.request_ip_info.region
		return None


admin.site.register(RamzaanGroup)
admin.site.register(RamzaanStatusUpdate, RamzaanStatusUpdateAdmin)
admin.site.register(RamzaanUserProgress)
admin.site.register(RamzaanGroupUser, RamzaanGroupUserAdmin)
