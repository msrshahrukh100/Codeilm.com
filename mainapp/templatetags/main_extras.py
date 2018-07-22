from django import template
from django.conf import settings
from django.contrib.staticfiles.templatetags.staticfiles import static
from mainapp.utils import get_user_display_name
register = template.Library()


@register.filter(name='static_absolute_uri')
def static_absolute_uri(value):
	return settings.BASE_URL + static(value)


@register.filter(name='absolute_uri')
def absolute_uri(value):
	return settings.BASE_URL + value


@register.filter(name='user_display_name')
def user_display_name(user):
	return get_user_display_name(user)


@register.filter(name='first_n_items')
def first_n_items(value, n):
	return value[:int(n)]


@register.simple_tag(name='get_settings')
def get_settings(value):
	return getattr(settings, value)