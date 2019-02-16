from django.urls import path, include

urlpatterns = [
    path('android/', include(('androidapps.gymapp.gymappbackend.urls', 'androidapps.gymapp.gymappbackend'), namespace="gymapp")),
]
