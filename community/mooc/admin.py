from django.contrib import admin
from . import models as mooc_models
from emailmanager.tasks import send_ses_email
# Register your models here.


class MoocGroupOptionsInline(admin.StackedInline):
	model = mooc_models.MoocGroupOptions


class MoocUnitDescriptionInline(admin.TabularInline):
	model = mooc_models.MoocUnitDescription


class MoocGroupUserAdmin(admin.ModelAdmin):
	list_display = ['user', 'created_at', 'city', 'country_name', 'time_zone', 'region']
	# actions = ['send_reminder_email']

	# def send_reminder_email(self, request, queryset):
	# 	user_ids = [ramzaangroupuser.user.id for ramzaangroupuser in queryset]
	# 	sender = "Allywith <shahrukh@allywith.com>"
	# 	send_ses_email(
	# 		sender,
	# 		"emails/reminder_email.html",
	# 		{},
	# 		user_ids,
	# 		None,
	# 		"%(user_full_name)s memorized the first 10 Ayat of Surah Kahf")
	# 	self.message_user(request, "Reminder emails successfully sent")
	# send_reminder_email.short_description = "Send reminder emails"

	def city(self, obj):
		if obj.request_ip_info:
			return obj.request_ip_info.city
		return None

	def country_name(self, obj):
		if obj.request_ip_info:
			return obj.request_ip_info.country_name
		return None

	def region(self, obj):
		if obj.request_ip_info:
			return obj.request_ip_info.region
		return None

	def time_zone(self, obj):
		if obj.request_ip_info:
			return obj.request_ip_info.time_zone
		return None


class MoocStatusUpdateAdmin(admin.ModelAdmin):
	list_display = ['user', 'content', 'created_at', 'updated_at']


class MoocGroupAdmin(admin.ModelAdmin):
	list_display = ['name', 'slug', 'group_hash_id', 'target_statement']
	inlines = [
		MoocGroupOptionsInline,
		MoocUnitDescriptionInline
	]

	def save_model(self, request, obj, form, change):
		if change:
			obj.updated_by = request.user
		else:
			obj.created_by = request.user
			obj.updated_by = request.user
			obj.save()
		super().save_model(request, obj, form, change)


class MoocUserProgressAdmin(admin.ModelAdmin):
	list_display = [field.name for field in mooc_models.MoocUserProgress._meta.get_fields()]


class MoocUnitDescriptionAdmin(admin.ModelAdmin):
	list_display = ['group', 'unit', 'unit_title']


# admin.site.register(mooc_models.MoocGroupUser, MoocGroupUserAdmin)
# admin.site.register(mooc_models.MoocStatusUpdate, MoocStatusUpdateAdmin)
# admin.site.register(mooc_models.MoocGroup, MoocGroupAdmin)
# admin.site.register(mooc_models.MoocUserProgress, MoocUserProgressAdmin)
# admin.site.register(mooc_models.MoocUnitDescription, MoocUnitDescriptionAdmin)
# admin.site.register(mooc_models.MoocGroupUserMotivation)
