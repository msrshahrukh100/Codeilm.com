from django.contrib import admin
from . import models as ramzaan_models
from emailmanager.tasks import send_ses_email
# Register your models here.


class RamzaanGroupOptionsInline(admin.StackedInline):
	model = ramzaan_models.RamzaanGroupOptions


class RamzaanUnitDescriptionInline(admin.TabularInline):
	model = ramzaan_models.RamzaanUnitDescription


class RamzaanGroupUserAdmin(admin.ModelAdmin):
	list_display = ['user', 'created_at', 'city', 'country_name', 'time_zone', 'region']
	actions = ['send_reminder_email']

	def send_reminder_email(self, request, queryset):
		user_ids = [ramzaangroupuser.user.id for ramzaangroupuser in queryset]
		sender = "Allywith <shahrukh@allywith.com>"
		send_ses_email(
			sender,
			"emails/reminder_email.html",
			{},
			user_ids,
			None,
			"%(user_full_name)s memorized the first 10 Ayat of Surah Kahf")
		self.message_user(request, "Reminder emails successfully sent")
	send_reminder_email.short_description = "Send reminder emails"

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


class RamzaanStatusUpdateAdmin(admin.ModelAdmin):
	list_display = ['user', 'content', 'created_at', 'updated_at']


class RamzaanGroupAdmin(admin.ModelAdmin):
	list_display = ['name', 'slug', 'target_statement']
	inlines = [
		RamzaanGroupOptionsInline,
		RamzaanUnitDescriptionInline
	]

	def save_model(self, request, obj, form, change):
		if change:
			obj.updated_by = request.user
		else:
			obj.created_by = request.user
			obj.updated_by = request.user
			obj.save()
		super().save_model(request, obj, form, change)


class RamzaanUserProgressAdmin(admin.ModelAdmin):
	list_display = [field.name for field in ramzaan_models.RamzaanUserProgress._meta.get_fields()]


admin.site.register(ramzaan_models.RamzaanGroupUser, RamzaanGroupUserAdmin)
admin.site.register(ramzaan_models.RamzaanStatusUpdate, RamzaanStatusUpdateAdmin)
admin.site.register(ramzaan_models.RamzaanGroup, RamzaanGroupAdmin)
admin.site.register(ramzaan_models.RamzaanUserProgress, RamzaanUserProgressAdmin)
admin.site.register(ramzaan_models.RamzaanUnitDescription)
admin.site.register(ramzaan_models.RamzaanGroupUserMotivation)
