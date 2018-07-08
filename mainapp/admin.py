from django.contrib import admin
from .models import Community, RequestIpInfo, SiteConfiguration
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


admin.site.register(Community, CommunityAdmin)
admin.site.register(RequestIpInfo, RequestIpInfoAdmin)
admin.site.register(SiteConfiguration, SingletonModelAdmin)