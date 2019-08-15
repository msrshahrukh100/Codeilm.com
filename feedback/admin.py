from django.contrib import admin
from .models import UserActivity, FeedbackEvent, ClickResponse, FeedbackResponse, LeadCaptureEmail
# Register your models here.


class UserActivityAdmin(admin.ModelAdmin):
	list_display = ['user', 'activity', 'created_at', 'updated_at']
	list_filter = ['user', 'activity', 'created_at', 'updated_at']


class FeedbackEventAdmin(admin.ModelAdmin):
	list_display = ['name', 'slug', 'question', 'feedback_url', 'created_by', 'created_at', 'modified_by', 'updated_at']

	def save_model(self, request, obj, form, change):
		if obj.id:
			obj.feedback_url = request.build_absolute_uri(obj.get_feedback_page_url())
		if change:
			obj.modified_by = request.user
		else:
			obj.created_by = request.user
			obj.modified_by = request.user
		obj.save()


class ClickResponseAdmin(admin.ModelAdmin):
	list_display = ['event', 'response', 'email', 'city', 'country_name', 'time_zone', 'region', 'created_at']
	list_filter = ['event', 'response', 'created_at']

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


class FeedbackResponseAdmin(admin.ModelAdmin):
	list_display = ['event', 'key', 'value', 'city', 'country_name', 'time_zone', 'region', 'created_at', 'updated_at']
	list_filter = ['event', 'updated_at']

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


# admin.site.register(UserActivity, UserActivityAdmin)
# admin.site.register(FeedbackEvent, FeedbackEventAdmin)
# admin.site.register(ClickResponse, ClickResponseAdmin)
# admin.site.register(FeedbackResponse, FeedbackResponseAdmin)


admin.site.register(LeadCaptureEmail)