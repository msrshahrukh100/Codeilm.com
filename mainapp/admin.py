from django.contrib import admin
from .models import Community
# Register your models here.


class CommunityAdmin(admin.ModelAdmin):
	list_display = ['name', 'slug', 'heading', 'created_by', 'created_at', 'updated_at', 'updated_by']

	def save_model(self, request, obj, form, change):
		if change:
			obj.updated_by = request.user
		else:
			obj.created_by = request.user
			obj.updated_by = request.user
			obj.save()


admin.site.register(Community, CommunityAdmin)
