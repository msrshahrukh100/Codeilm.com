from django.urls import path
from .views import feedback_page, store_click_response

urlpatterns = [
    path('<int:id>/<slug:slug>', feedback_page, name="feedback_page"),
    path('click/response/<int:id>/<slug:slug>', store_click_response, name="store_click_response"),
]
