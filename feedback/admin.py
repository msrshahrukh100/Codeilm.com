from django.contrib import admin
from .models import UserActivity, FeedbackEvent, ClickResponse, FeedbackResponse
# Register your models here.


class UserActivityAdmin(admin.ModelAdmin):
	list_display = ['user', 'activity', 'created_at', 'updated_at']
	list_filter = ['user', 'activity', 'created_at', 'updated_at']


class FeedbackEventAdmin(admin.ModelAdmin):
	list_display = ['name', 'question', 'feedback_url', 'created_by', 'created_at', 'modified_by', 'updated_at']

	def save_model(self, request, obj, form, change):
		obj.feedback_url = request.build_absolute_uri(obj.get_feedback_page_url())
		if change:
			obj.modified_by = request.user
		else:
			obj.created_by = request.user
			obj.modified_by = request.user
		obj.save()


class ClickResponseAdmin(admin.ModelAdmin):
	list_display = ['event', 'response', 'city', 'country_name', 'time_zone', 'region', 'created_at']
	list_filter = ['event', 'response', 'created_at']

	def city(self, obj):
		return obj.request_ip_info.city

	def country_name(self, obj):
		return obj.request_ip_info.country_name

	def time_zone(self, obj):
		return obj.request_ip_info.time_zone

	def region(self, obj):
		return obj.request_ip_info.region


class FeedbackResponseAdmin(admin.ModelAdmin):
	list_display = ['event', 'key', 'value', 'city', 'country_name', 'time_zone', 'region', 'created_at', 'updated_at']
	list_filter = ['event', 'updated_at']

	def city(self, obj):
		return obj.request_ip_info.city

	def country_name(self, obj):
		return obj.request_ip_info.country_name

	def time_zone(self, obj):
		return obj.request_ip_info.time_zone

	def region(self, obj):
		return obj.request_ip_info.region



admin.site.register(UserActivity, UserActivityAdmin)
admin.site.register(FeedbackEvent, FeedbackEventAdmin)
admin.site.register(ClickResponse, ClickResponseAdmin)
admin.site.register(FeedbackResponse, FeedbackResponseAdmin)
