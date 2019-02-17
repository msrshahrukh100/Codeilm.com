from django.shortcuts import render
from django.contrib.auth.models import User
from rest_framework import generics
from rest_framework.permissions import IsAdminUser
from . import serializers as gymapp_serializers
from . import models as gymapp_models

# Create your views here.

def home(request):
	return render(request, "gym_index.html", {})



class ExerciseList(generics.ListCreateAPIView):
    queryset = gymapp_models.Exercise.objects.all()
    serializer_class = gymapp_serializers.ExerciseSerializer
    # permission_classes = (IsAdminUser,)