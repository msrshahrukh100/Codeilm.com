from django.shortcuts import render
from django.contrib.auth.models import User
from rest_framework import generics
from rest_framework.permissions import IsAdminUser
from . import serializers as gymapp_serializers
from . import models as gymapp_models
from django.contrib.auth.decorators import login_required
from guardian.shortcuts import get_objects_for_user
from allauth.account.forms import LoginForm
# Create your views here.

@login_required(login_url='/android/login')
def home(request):
	return render(request, "gym_index.html", {})

def login(request):
	context = {
		'form': LoginForm()
	}
	return render(request, "gymlogin.html", context)


class ScheduleList(generics.ListCreateAPIView):
	serializer_class = gymapp_serializers.ScheduleListSerializer
	queryset = gymapp_models.Schedule.objects.all()
	# def get_queryset(self):
	# 	user = self.request.user
	# 	return get_objects_for_user(
	# 		user=user,
	# 		perms=['owner', 'see_shared'],
	# 		any_perm=True,
	# 		klass=gymapp_models.Schedule
	# 	)


class ScheduleExerciseList(generics.ListAPIView):
	serializer_class = gymapp_serializers.ScheduleExerciseListSerializer
	lookup_field = "schedule_hash_id"

	def get_queryset(self):
		schedule_hash_id = self.kwargs['schedule_hash_id']
		schedule_obj = gymapp_models.Schedule.objects.get(schedule_hash_id=schedule_hash_id)
		queryset = schedule_obj.schedule_exercise_schedule.all()

		return queryset




class ScheduleDetail(generics.RetrieveAPIView):
	serializer_class = gymapp_serializers.ScheduleDetailSerializer
	lookup_field = "schedule_hash_id"

	def get_queryset(self):
		user = self.request.user
		return get_objects_for_user(
			user=user,
			perms=['owner', 'see_shared'],
			any_perm=True,
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