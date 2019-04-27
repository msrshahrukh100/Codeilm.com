from django.contrib import admin
from . import models as lovecode_model
# Register your models here.

class GithubRepoAdmin(admin.ModelAdmin):
	list_display = ['user', 'created_at', 'updated_at', 'hash_id']

class TutorialAdmin(admin.ModelAdmin):
	list_display = ['user', 'created_at', 'updated_at', 'id']


class GithubApiResponseAdmin(admin.ModelAdmin):
	list_display = ['user', 'url', 'etag', 'get_params']

admin.site.register(lovecode_model.GithubRepo, GithubRepoAdmin)
admin.site.register(lovecode_model.Tutorial, TutorialAdmin)
admin.site.register(lovecode_model.GithubApiResponse, GithubApiResponseAdmin)

