from django.contrib import admin
from . import models as ramzaan_models
# Register your models here.


class RamzaanGroupOptionsInline(admin.StackedInline):
	model = ramzaan_models.RamzaanGroupOptions


class RamzaanUnitDescriptionInline(admin.TabularInline):
	model = ramzaan_models.RamzaanUnitDescription


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


admin.site.register(ramzaan_models.RamzaanGroupUser, RamzaanGroupUserAdmin)
admin.site.register(ramzaan_models.RamzaanStatusUpdate, RamzaanStatusUpdateAdmin)
admin.site.register(ramzaan_models.RamzaanGroup, RamzaanGroupAdmin)
admin.site.register(ramzaan_models.RamzaanUserProgress)
admin.site.register(ramzaan_models.RamzaanUnitDescription)
admin.site.register(ramzaan_models.RamzaanGroupUserMotivation)
