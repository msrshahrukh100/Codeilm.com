from django.contrib import admin
from . import models as forteams_models
# Register your models here.
admin.site.register(forteams_models.Team)
admin.site.register(forteams_models.TeamOption)