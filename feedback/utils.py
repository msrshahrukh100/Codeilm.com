from .models import FeedbackResponse, ClickResponse
from mainapp.utils import save_request_ip_info


def save_feedback_response(request, feedback_event_id):
	key = request.POST.get('key')
	value = request.POST.get('value')
	request_ip_info_object = save_request_ip_info(request)
	obj = FeedbackResponse.objects.create(event_id=feedback_event_id, key=key, value=value, request_ip_info=request_ip_info_object)
	obj.save()


def save_click_response(request, feedback_event):
	response = request.POST.get("value")
	request_ip_info_object = save_request_ip_info(request)
	obj = ClickResponse.objects.create(event=feedback_event, response=response, request_ip_info=request_ip_info_object)
	obj.save()