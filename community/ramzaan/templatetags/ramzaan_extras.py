from community.ramzaan.utils import get_post_age
from django import template
from usermanagement.models import UserProfile
register = template.Library()


@register.filter(name='check_age')
def check_age(value):
	return get_post_age(value)


@register.filter(name='profile_pic_url')
def profile_pic_url(user):
	social_account = user.socialaccount_set.all()
	if social_account.exists():
		social_account = social_account.first()
		return social_account.get_avatar_url()
	user_profile, created = UserProfile.objects.get_or_create(user=user)
	return user_profile.profile_image.url


@register.filter(name='get_followings')
def get_followings(user):
	qs = user.user_followings.all()
	return qs.values_list('following', flat=True)