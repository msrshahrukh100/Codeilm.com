from django import template
from django.conf import settings
from django.contrib.staticfiles.templatetags.staticfiles import static

register = template.Library()


@register.filter(name='static_absolute_uri')
def static_absolute_uri(value):
    return settings.BASE_URL + static(value)