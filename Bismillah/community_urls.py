from django.urls import path, include

urlpatterns = [
    path('sealed-nector/', include(('community.ramzaan.urls', 'community.ramzaan'), namespace="ramzaan")),
    path('read-books/', include(('community.books.urls', 'community.books'), namespace="books")),
    path('complete-online-course/', include(('community.mooc.urls', 'community.mooc'), namespace="mooc")),
]
