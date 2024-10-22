"""Bismillah URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/2.0/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path, include, re_path
from django.conf import settings
from django.conf.urls.static import static
import notifications.urls
from mainapp.views import opensearch
from . import community_urls
from . import android_urls
from django.views.generic import TemplateView


handler404 = 'mainapp.views.redirect_to_page'
handler500 = 'mainapp.views.redirect_for_server_error'

urlpatterns = [
    re_path(r'^add-codeilm-to-your-site/', TemplateView.as_view(template_name='mainapp/addtosite.html')),
    re_path(r'^projects/', TemplateView.as_view(template_name='projects.html')),
    re_path(r'^p/', TemplateView.as_view(template_name='projects.html')),

    re_path(r'^u/', TemplateView.as_view(template_name='usermanagement.html')),
    re_path(r'^c/', TemplateView.as_view(template_name='usermanagement.html')),
    path('feedback/', include(('feedback.urls', 'feedback'), namespace="feedback")),
    path('grappelli/', include('grappelli.urls')),
    path('admin/', admin.site.urls),
    path('ally_search.xml/', opensearch, name="opensearch"),
    path('api/v1/', include(('lovecode.lovecodebackend.urls', 'lovecode'), namespace="lovecode")),
    path('', include(('mainapp.urls', 'mainapp'), namespace="mainapp")),
    path('', include((community_urls))),
    path('', include((android_urls))),
    path('accounts/', include('allauth.urls')),
    path('inbox/notifications/', include(notifications.urls, namespace='notifications')),
    path('api/usermanagement/', include(('usermanagement.urls', 'usermanagement'), namespace="usermanagement")),
    path('api/affiliates/', include(('affiliates.urls', 'affiliates'), namespace="affiliates")),
    path('api/projects/', include(('projects.urls', 'projects'), namespace="projects")),
    path('email/', include(('emailmanager.urls', 'emailmanager'), namespace="emailmanager")),
    path('api-auth/', include('rest_framework.urls')),
    path('impersonate/', include('impersonate.urls')),
    # urls for different communities
]

if settings.DEBUG:
    urlpatterns += static(settings.STATIC_URL, document_root=settings.STATIC_ROOT)
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
