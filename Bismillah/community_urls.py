from django.urls import path, include

urlpatterns = [
    path('sealed-nector/', include(('community.ramzaan.urls', 'community.ramzaan'), namespace="ramzaan")),
    path('read-books/', include(('community.books.urls', 'community.books'), namespace="books")),
    path('complete-online-course/', include(('community.mooc.urls', 'community.mooc'), namespace="mooc")),
    path('coders-den/', include(('community.coding.urls', 'community.coding'), namespace="coding")),
    path('api/coding/', include(('community.coding.api.urls', 'coding_api'), namespace="coding_api")),
]
