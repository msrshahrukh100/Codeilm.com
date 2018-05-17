from django.shortcuts import render
from .models import FeedbackEvent, ClickResponse, FeedbackResponse
from django.shortcuts import get_object_or_404
from django.template import Template, Context
# Create your views here.


def feedback_page(request, id=None, slug=None):
	feedback_event = get_object_or_404(FeedbackEvent, id=id, slug=slug)
	if request.method == "POST":
		key = request.POST.get('key')
		value = request.POST.get('value')
		obj = FeedbackResponse.objects.create(event=feedback_event, key=key, value=value)
		obj.save()
		return render(request, "feedback_thankyou.html", {})
	template = Template(feedback_event.click_response_html)
	context_for_click_response_html = Context({"feedback_event": feedback_event})
	context = {
		"feedback_event": feedback_event,
		"rendered_click_response_html": template.render(context_for_click_response_html)
	}

	return render(request, "feedback_page.html", context)


def store_click_response(request, id=None, slug=None):
	if request.method == "POST":
		print("reponse came")
		feedback_event = get_object_or_404(FeedbackEvent, id=id, slug=slug)
		response = request.POST.get("value")
		obj = ClickResponse.objects.create(event=feedback_event, response=response)
		obj.save()
		return render(request, "feedback_thankyou.html", {})

