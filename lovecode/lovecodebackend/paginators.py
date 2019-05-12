from rest_framework.pagination import PageNumberPagination
from collections import OrderedDict
from rest_framework.response import Response

class TutorialListPaginator(PageNumberPagination):
    page_size = 7

    def get_paginated_response(self, data):
        return Response(OrderedDict([
            ('count', self.page.paginator.count),
            ('next', self.get_next_link()),
            ('next_page_number', self.page.next_page_number() if self.page.has_next() else None),
            ('previous', self.get_previous_link()),
            ('results', data)
        ]))
