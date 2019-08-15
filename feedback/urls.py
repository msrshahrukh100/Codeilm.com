from django.urls import path
from .views import feedback_page, store_click_response, save_feedback_response, feed_back_thankyou_page, save_leadcapture_email

urlpatterns = [
    path('<int:id>/<slug:slug>', feedback_page, name="feedback_page"),
    path('save-feedback-response', save_feedback_response, name="save_feedback_response"),
    path('thankyou/', feed_back_thankyou_page, name="feed_back_thankyou_page"),
    path('click/response/<int:id>/<slug:slug>', store_click_response, name="store_click_response"),

    path('save-leadcapture-email/', save_leadcapture_email, name="save_leadcapture_email"),
]
