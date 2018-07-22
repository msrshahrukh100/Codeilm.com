from django.urls import path, include

urlpatterns = [
    path('sealed-nector/', include(('community.ramzaan.urls', 'community.ramzaan'), namespace="ramzaan")),
]
