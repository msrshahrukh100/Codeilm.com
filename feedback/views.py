from django.shortcuts import render
from .models import FeedbackEvent
from django.shortcuts import get_object_or_404
from django.template import Template, Context
from . import utils
# Create your views here.


def feedback_page(request, id=None, slug=None):
	feedback_event = get_object_or_404(FeedbackEvent, id=id, slug=slug)
	if request.method == "POST":
		utils.save_feedback_response(request, feedback_event)
		return render(request, "feedback_thankyou.html", {})
	template = Template(feedback_event.click_response_html)
	context_for_click_response_html = Context({"feedback_event": feedback_event})
	context = {
		"feedback_event": feedback_event,
		"rendered_click_response_html": template.render(context_for_click_response_html)
	}

	return render(request, "feedback_page.html", context)


def store_click_response(request, id=None, slug=None):
	feedback_event = get_object_or_404(FeedbackEvent, id=id, slug=slug)
	if request.method == "POST":
		utils.save_click_response(request, feedback_event)
		return render(request, "feedback_thankyou.html", {})

