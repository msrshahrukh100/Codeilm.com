from django.contrib import admin
from . import models as lovecode_model
# Register your models here.

class GithubRepoAdmin(admin.ModelAdmin):
	list_display = ['user', 'created_at', 'updated_at']

admin.site.register(lovecode_model.GithubRepo, GithubRepoAdmin)
admin.site.register(lovecode_model.Tutorial)

