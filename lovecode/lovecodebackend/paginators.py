from rest_framework.pagination import PageNumberPagination

class TutorialListPaginator(PageNumberPagination):
    page_size = 10
