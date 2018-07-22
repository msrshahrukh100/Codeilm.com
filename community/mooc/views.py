from django.shortcuts import render
from feedback.models import FeedbackEvent
# Create your views here.


def group_list(request):
	groups = []
	context = {
		"groups": groups,
	}
	if len(groups) == 0:
		feedback_event = FeedbackEvent.objects.filter(id=3)
		if feedback_event.exists():
			context["feedback_event"] = feedback_event.first()

	return render(request, "group_list.html", context)
