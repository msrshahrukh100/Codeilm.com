from django.shortcuts import render
from django.http import Http404
from django.shortcuts import get_object_or_404
from usermanagement import models as usermanagement_models

# Create your views here.

def get_static_files(request):
	# gets the community id
	# embeds the community slug to the html
	# returns the html
	return render(request, "affiliate.html", {})


def get_affiliate_js(request):
	community_id = request.GET.get('community_id')
	if not community_id:
		raise Http404("File does not exists")
	community = get_object_or_404(usermanagement_models.Community, id=community_id)
	context = {
		'community_slug': community.slug
	}
	return render(request, 'affiliate.js', context)