from django.contrib.gis.geoip2 import GeoIP2
from .models import RequestIpInfo
import logging
from django.utils import timezone

logger = logging.getLogger(__name__)


def get_post_age(date):
	old_post = 0
	time_delta = timezone.now() - date
	if time_delta > timezone.timedelta(days=1) and time_delta < timezone.timedelta(days=7):
		old_post = 1
	elif time_delta > timezone.timedelta(days=7):
		old_post = 2
	return str(old_post)


def get_client_ip(request):
	x_forwarded_for = request.META.get('HTTP_X_FORWARDED_FOR')
	if x_forwarded_for:
		ip = x_forwarded_for.split(',')[0]
	else:
		ip = request.META.get('REMOTE_ADDR')
	return ip


def get_ip_info(request):
	ip = get_client_ip(request)
	g = GeoIP2()
	try:
		data = g.city(ip)
	except Exception as e:
		logger.error(e)
		data = None
	return data

def create_request_ip_info_object(data):
	obj = RequestIpInfo.objects.create(
		city=data.get('city'),
		country_code=data.get('country_code'),
		country_name=data.get('country_name'),
		dma_code=str(data.get('dma_code')),
		latitude=str(data.get('latitude')),
		longitude=str(data.get('longitude')),
		postal_code=data.get('postal_code'),
		region=data.get('region'),
		time_zone=data.get('time_zone')
	)
	obj.save()
	return obj


def save_request_ip_info(request):
	data = get_ip_info(request)
	if not data:
		return None
	return create_request_ip_info_object(data)


def get_user_display_name(user):
	if user.get_full_name():
		return user.get_full_name()
	return user.get_username()
