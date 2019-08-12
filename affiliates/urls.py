from django.urls import path
from .views import get_static_files, get_affiliate_js

urlpatterns = [
    path('get-static-files/', get_static_files, name="get_static_files"),
    path('affiliate.js', get_affiliate_js, name="get_affiliate_js"),
]
