from .models import FeedbackResponse, ClickResponse
from mainapp.utils import save_request_ip_info
import emailmanager.utils as emailmanager_utils


def save_feedback_response(request, feedback_event_id):
	key = request.POST.get('key')
	value = request.POST.get('value')
	email = request.POST.get('email')
	if not key:
		key = request.GET.get('key')
	if not value:
		value = request.GET.get('value')
	if not email:
		email = request.GET.get('email')
	request_ip_info_object = save_request_ip_info(request)
	obj = FeedbackResponse.objects.create(event_id=feedback_event_id, key=key, value=value, email=email, request_ip_info=request_ip_info_object)
	obj.save()
	content = "A new value for %s is submitted \n %s " % (key, value)
	context = {
		"subject": "A new feedback response received",
		"url": obj.get_admin_url(),
		"content": content
	}
	emailmanager_utils.send_info_mail_to_admins(context)


def save_click_response(request, feedback_event):
	response = request.POST.get("value")
	email = request.POST.get("email")
	if not response:
		response = request.GET.get('value')
	if not email:
		email = request.GET.get('email')
	request_ip_info_object = save_request_ip_info(request)
	obj = ClickResponse.objects.create(event=feedback_event, response=response, email=email, request_ip_info=request_ip_info_object)
	obj.save()
	content = "A new click response submitted \n %s " % (response)
	context = {
		"subject": "A new feedback response received",
		"url": obj.get_admin_url(),
		"content": content
	}
	emailmanager_utils.send_info_mail_to_admins(context)