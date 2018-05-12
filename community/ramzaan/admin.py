from django.contrib import admin
from .models import RamzaanGroup, RamzaanUserProgress, RamzaanStatusUpdate
# Register your models here.


class RamzaanStatusUpdateAdmin(admin.ModelAdmin):
	list_display = ['user', 'content', 'on_unit', 'created_at', 'updated_at']


admin.site.register(RamzaanGroup)
admin.site.register(RamzaanUserProgress)
admin.site.register(RamzaanStatusUpdate, RamzaanStatusUpdateAdmin)
