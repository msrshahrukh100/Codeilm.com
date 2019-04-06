from django.urls import path
from . import views as lovecode_views

urlpatterns = [
    # path('learn/', lovecode_views.learn, name="learn"),
    path('tutorials/', lovecode_views.TutorialList.as_view() , name="tutorials_list"),
    path('tutorials/<slug:hash_id>', lovecode_views.TutorialDetail.as_view(), name="tutorials_detail"),

]
