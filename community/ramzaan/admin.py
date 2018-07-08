from django.contrib import admin
from .models import RamzaanGroup, RamzaanUserProgress, RamzaanStatusUpdate, RamzaanGroupUser, RamzaanGroupOptions, RamzaanUnitDescription
# Register your models here.


class RamzaanGroupOptionsInline(admin.StackedInline):
	model = RamzaanGroupOptions


class RamzaanUnitDescriptionInline(admin.TabularInline):
	model = RamzaanUnitDescription


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
	list_display = ['user', 'content', 'on_unit', 'created_at', 'updated_at']


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


admin.site.register(RamzaanGroupUser, RamzaanGroupUserAdmin)
admin.site.register(RamzaanStatusUpdate, RamzaanStatusUpdateAdmin)
admin.site.register(RamzaanGroup, RamzaanGroupAdmin)
admin.site.register(RamzaanUserProgress)
admin.site.register(RamzaanUnitDescription)
