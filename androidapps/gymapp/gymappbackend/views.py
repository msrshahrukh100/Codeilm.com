from django.shortcuts import render
from django.contrib.auth.models import User
from rest_framework import generics
from rest_framework.permissions import IsAdminUser
from . import serializers as gymapp_serializers
from . import models as gymapp_models
from django.contrib.auth.decorators import login_required
from guardian.shortcuts import get_objects_for_user
# Create your views here.

@login_required(login_url='/android/login')
def home(request):
	return render(request, "gym_index.html", {})

def login(request):
	return render(request, "gymlogin.html", {})


class ScheduleList(generics.ListCreateAPIView):

	def get_queryset(self):
		user = self.request.user
		return get_objects_for_user(
			user=user,
			perms=['owner', 'shared'],
			klass=gymapp_models.Schedule
		)


class ExerciseList(generics.ListCreateAPIView):
    queryset = gymapp_models.Exercise.objects.all()
    serializer_class = gymapp_serializers.ExerciseListSerializer
    lookup_field = "exercise_hash_id"
    # permission_classes = (IsAdminUser,)

class ExerciseDetail(generics.RetrieveAPIView):
	queryset = gymapp_models.Exercise.objects.all()
	serializer_class = gymapp_serializers.ExerciseDetailSerializer
	lookup_field = "exercise_hash_id"