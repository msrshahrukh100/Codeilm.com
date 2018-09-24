from rest_framework import generics
import community.coding.models as coding_models
from .serializers import CodingGroupSerializer


class CodingGroupsList(generics.ListAPIView):
	queryset = coding_models.CodingGroup.objects.all()
	serializer_class = CodingGroupSerializer


class CodingGroupDetail(generics.RetrieveAPIView):
	queryset = coding_models.CodingGroup.objects.all()
	serializer_class = CodingGroupSerializer
	lookup_field = 'slug'
