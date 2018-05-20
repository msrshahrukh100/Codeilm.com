from .models import FeedbackResponse, ClickResponse
from mainapp.utils import save_request_ip_info


def save_feedback_response(request, feedback_event):
	key = request.POST.get('key')
	value = request.POST.get('value')
	request_ip_info_object = save_request_ip_info(request)
	if request_ip_info_object:
		obj = FeedbackResponse.objects.create(event=feedback_event, key=key, value=value, request_ip_info=request_ip_info_object)
	else:
		obj = FeedbackResponse.objects.create(event=feedback_event, key=key, value=value)
	obj.save()


def save_click_response(request, feedback_event):
	response = request.POST.get("value")
	request_ip_info_object = save_request_ip_info(request)
	if request_ip_info_object:
		obj = ClickResponse.objects.create(event=feedback_event, response=response, request_ip_info=request_ip_info_object)
	else:
		obj = ClickResponse.objects.create(event=feedback_event, response=response)
	obj.save()