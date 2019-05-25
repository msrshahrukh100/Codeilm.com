from django.shortcuts import render, redirect, get_object_or_404
from .models import Community
from django.http import JsonResponse, HttpResponseRedirect, HttpResponse
from django.contrib.auth.decorators import login_required
from django.urls import reverse
import logging
from django.contrib import messages
import community.ramzaan.models as ramzaan_models
import community.mooc.models as mooc_models
import community.ramzaan.utils as ramzaan_utils
import community.mooc.utils as mooc_utils
from . import community_utils
from . import models as main_models
from .utils import save_request_ip_info
from emailmanager.utils import send_info_mail_to_admins
from allauth.socialaccount.providers.github.views import GitHubOAuth2Adapter
from allauth.socialaccount.providers.oauth2.client import OAuth2Client
from rest_auth.registration.views import SocialLoginView
from rest_framework.response import Response
from rest_auth.utils import jwt_encode
from rest_auth.app_settings import create_token
from django.conf import settings
from rest_framework import status

logger = logging.getLogger(__name__)
# Create your views here.



class GithubLogin(SocialLoginView):
    adapter_class = GitHubOAuth2Adapter
    callback_url = 'https://allywith.com/accounts/github/login/callback/'
    client_class = OAuth2Client


class GetGithubToken(SocialLoginView):
	adapter_class = GitHubOAuth2Adapter
	callback_url = 'https://allywith.com/accounts/github/login/callback/'
	client_class = OAuth2Client

	def get(self, request, *args, **kwargs):
		if not request.user.is_authenticated:
			return Response({"msg": "Not authorized"}, status=status.HTTP_401_UNAUTHORIZED)
		self.user = request.user
		if getattr(settings, 'REST_USE_JWT', False):
			self.token = jwt_encode(self.user)
		else:
			self.token = create_token(self.token_model, self.user, self.serializer)
		return Response({"token": self.token})


def opensearch(request):
	return render(request, 'open_search.xml', content_type="application/xhtml+xml")


def how_it_works(request):
	context = {
		"video_id_list": ['aCpiaYshXNY', 'aCpiaYshXNY']
	}
	return render(request, 'howdoesitwork.html', context)

@login_required
def group_join(request, id, slug, community):
	user = request.user

	if community == "sealed-nector":
		group = get_object_or_404(ramzaan_models.RamzaanGroup, id=id)
		is_member = community_utils.check_user_in_group(request, group)
		if is_member:
			messages.info(request, 'You are already part of this group')
		else:
			ramzaan_utils.add_user_to_group(request, user, group)

		return HttpResponseRedirect(reverse("ramzaan:group_detail", kwargs={"id": id, "slug": slug}))

	if community == "complete-online-course-together":
		group = get_object_or_404(mooc_models.MoocGroup, id=id)
		is_member = community_utils.check_user_in_group(request, group)
		if is_member:
			messages.info(request, 'You are already part of this group')
		else:
			mooc_utils.add_user_to_group(request, user, group)

		return HttpResponseRedirect(reverse("mooc:group_detail", kwargs={"id": id, "slug": slug}))
	return HttpResponse(status=404)


def home(request):
	communities = Community.objects.all()
	logger.info("The communities queryset exists")
	logger.info(communities.exists())
	context = {
		"communities": communities
	}

	return render(request, "index.html", context)


@login_required
def mark_notifications_read(request):
	if request.method == "POST":
		user = request.user
		qs = user.notifications.unread()
		if qs.exists():
			qs.mark_all_as_read()
		return JsonResponse({"status": "success", "msg": "Marked as read"})


def save_group_creation_request(request):
	if request.method == "POST":
		data = request.POST.dict()
		data.pop('csrfmiddlewaretoken')
		data.pop('action')
		if data['user_id'] == 'None':
			data.pop('user_id')
		obj = main_models.GroupCreationRequest.objects.create(**data)
		obj.request_ip_info = save_request_ip_info(request)
		obj.save()
		content = "A new group creation request from <br>User: <b>%s</b><br> On the community: <b>%s</b> <br>With the description: <br><b>%s</b>" % (obj.user, obj.community, obj.description)
		context = {
			"subject": "New Group creation request",
			"content": content,
			"url": obj.get_admin_url()
		}
		send_info_mail_to_admins(context)
		messages.info(request, 'We have received your interest and will get back to you shortly')
	return redirect('mainapp:home')


def redirect_to_page(request, exception, template_name="feedback_page.html"):
	return redirect(reverse("feedback:feedback_page", kwargs={"id": 1, "slug": "join-the-community"}))


def redirect_for_server_error(request, template_name="500errorpage.html"):
	return render(request, '500errorpage.html', {})
