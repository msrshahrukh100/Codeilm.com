from django.urls import path
from .views import feedback_page, store_click_response, save_feedback_response

urlpatterns = [
    path('<int:id>/<slug:slug>', feedback_page, name="feedback_page"),
    path('save-feedback-response', save_feedback_response, name="save_feedback_response"),
    path('click/response/<int:id>/<slug:slug>', store_click_response, name="store_click_response"),
]
