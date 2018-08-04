from django.shortcuts import render
from .models import FeedbackEvent
from django.shortcuts import get_object_or_404, redirect
from django.template import Template, Context
from . import utils
import logging
from django.contrib import messages
from django.urls import reverse
# Create your views here.

logger = logging.getLogger(__name__)


def feedback_page(request, id=None, slug=None):
	feedback_event = get_object_or_404(FeedbackEvent, id=id)
	logger.info("Feedback page request reached")
	if request.method == "POST":
		logger.info("POST request in the feedback_page view")
		utils.save_feedback_response(request, feedback_event.id)
		logger.info("Feedback response saved")
		return render(request, "feedback_thankyou.html", {"feedback_event": feedback_event})
	template = Template(feedback_event.click_response_html)
	context_for_click_response_html = Context({"feedback_event": feedback_event})
	context = {
		"feedback_event": feedback_event,
		"rendered_click_response_html": template.render(context_for_click_response_html)
	}

	return render(request, "feedback_page.html", context)


def feed_back_thankyou_page(request):
	return render(request, "feedback_thankyou.html", {})


def store_click_response(request, id=None, slug=None):
	feedback_event = get_object_or_404(FeedbackEvent, id=id, slug=slug)
	utils.save_click_response(request, feedback_event)
	return redirect(reverse('feedback:feed_back_thankyou_page'))


def save_feedback_response(request):
	feedback_event_id = request.POST.get('event_id')
	utils.save_feedback_response(request, feedback_event_id)
	messages.info(request, 'We have received your interest and will get back to you shortly')
	return redirect('mainapp:home')

