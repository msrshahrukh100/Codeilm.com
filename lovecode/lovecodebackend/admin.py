from django.contrib import admin
from . import models as lovecode_model
# Register your models here.

class GithubRepoAdmin(admin.ModelAdmin):
	list_display = ['user', 'created_at', 'updated_at', 'hash_id']

class TutorialAdmin(admin.ModelAdmin):
	list_display = ['user', 'title', 'repository_name', 'branch_name', 'created_at', 'updated_at', 'id']


class GithubApiResponseAdmin(admin.ModelAdmin):
	list_display = ['user', 'url', 'etag', 'get_params']


class TutorialViewAdmin(admin.ModelAdmin):
	list_display = ['user', 'tutorial', 'ip', 'city', 'country_name', 'region', 'time_zone']

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

admin.site.register(lovecode_model.GithubRepo, GithubRepoAdmin)
admin.site.register(lovecode_model.Tutorial, TutorialAdmin)
admin.site.register(lovecode_model.GithubApiResponse, GithubApiResponseAdmin)
admin.site.register(lovecode_model.TutorialLike)
admin.site.register(lovecode_model.TutorialView, TutorialViewAdmin)
