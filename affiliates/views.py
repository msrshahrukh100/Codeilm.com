from django.shortcuts import render
from django.http import Http404
from django.shortcuts import get_object_or_404
from usermanagement import models as usermanagement_models
from django.contrib.staticfiles.templatetags.staticfiles import static
# Create your views here.

def get_static_files(request):
	# gets the community id
	# embeds the community slug to the html
	# returns the html
	return render(request, "affiliate.html", {})


def get_affiliate_js(request):
	community = None
	user = None
	community_id = request.GET.get('community_id')

	if community_id:
		community = get_object_or_404(usermanagement_models.Community, id=community_id)

	context = {
		'community_slug': community.slug if community else None,
		'user_id': request.GET.get('user_id'),
		'js_file': request.build_absolute_uri(static('js/main.affiliates.js')),
		'css_file': request.build_absolute_uri(static('css/main.affiliates.css'))
	}
	return render(request, 'affiliate.min.js', context, content_type="application/javascript")