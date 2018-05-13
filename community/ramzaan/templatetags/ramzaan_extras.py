from community.ramzaan.utils import get_post_age
from django import template
register = template.Library()


@register.filter(name='check_age')
def check_age(value):
    return get_post_age(value)