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
from django.urls import path, include
from django.conf import settings
from django.conf.urls.static import static
import notifications.urls
from mainapp.views import opensearch

handler404 = 'mainapp.views.redirect_to_page'

urlpatterns = [

    path('feedback/', include(('feedback.urls', 'feedback'), namespace="feedback")),
    path('admin/', admin.site.urls),
    path('open-search.xml', opensearch, name="opensearch"),
    path('', include(('mainapp.urls', 'mainapp'), namespace="mainapp")),
    path('accounts/', include('allauth.urls')),
]

if settings.DEBUG:
    urlpatterns += static(settings.STATIC_URL, document_root=settings.STATIC_ROOT)
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
    urlpatterns += path('inbox/notifications/', include(notifications.urls, namespace='notifications'))
    urlpatterns += path('ramzaan/', include(('community.ramzaan.urls', 'community.ramzaan'), namespace="ramzaan"))
    urlpatterns += path('user-management/', include(('usermanagement.urls', 'usermanagement'), namespace="usermanagement"))