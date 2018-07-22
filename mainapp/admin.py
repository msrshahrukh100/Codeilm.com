from django.contrib import admin
from .models import Community, RequestIpInfo, SiteConfiguration, GroupCreationRequest
from solo.admin import SingletonModelAdmin


# Register your models here.


class CommunityAdmin(admin.ModelAdmin):
	list_display = ['name', 'slug', 'created_by', 'created_at', 'updated_at', 'updated_by']

	def save_model(self, request, obj, form, change):
		if change:
			obj.updated_by = request.user
		else:
			obj.created_by = request.user
			obj.updated_by = request.user
			obj.save()
		super().save_model(request, obj, form, change)


class RequestIpInfoAdmin(admin.ModelAdmin):
	list_display = ['city', 'country_code', 'country_name', 'dma_code', 'latitude', 'longitude', 'postal_code', 'region', 'time_zone']
	list_filter = ['city', 'country_code']


class GroupCreationRequestAdmin(admin.ModelAdmin):
	list_display = ['user', 'community', 'description', 'city', 'country_name', 'time_zone', 'region', 'notification_sent', 'created_at', 'updated_at']

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

admin.site.register(Community, CommunityAdmin)
admin.site.register(RequestIpInfo, RequestIpInfoAdmin)
admin.site.register(SiteConfiguration, SingletonModelAdmin)
admin.site.register(GroupCreationRequest, GroupCreationRequestAdmin)