from django.shortcuts import render
from feedback.models import FeedbackEvent
from django.conf import settings
import mainapp.models as mainapp_models
# Create your views here.


def group_list(request):
	groups = []
	community = mainapp_models.Community.objects.get(id=settings.MOOC_COMMUNITY_ID)
	context = {
		"groups": groups,
		"community": community
	}
	if len(groups) == 0:
		feedback_event = FeedbackEvent.objects.filter(id=3)
		if feedback_event.exists():
			context["feedback_event"] = feedback_event.first()

	return render(request, "group_list.html", context)
