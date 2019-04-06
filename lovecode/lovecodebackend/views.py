from django.shortcuts import render
from django.contrib.auth.models import User
from . import serializers as lovecode_serializers
from . import models as lovecode_models
from rest_framework import generics
from rest_framework.permissions import IsAdminUser
from .paginators import TutorialListPaginator

# Create your views here.

def learn(request):
	return render(request, 'index.html', {})


class TutorialList(generics.ListCreateAPIView):
	queryset = lovecode_models.Tutorial.objects.all()
	serializer_class = lovecode_serializers.TutorialListSerializer
	pagination_class = TutorialListPaginator


class TutorialDetail(generics.RetrieveAPIView):
	queryset = lovecode_models.Tutorial.objects.all()
	serializer_class = lovecode_serializers.TutorialDetailSerializer
	lookup_field = "hash_id"