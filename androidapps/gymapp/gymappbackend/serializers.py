from rest_framework import serializers
from . import models as gymapp_models
from django.contrib.auth.models import User


class UserSerializer(serializers.ModelSerializer):
	name = serializers.SerializerMethodField()
	user_profile_pic = serializers.SerializerMethodField()

	def get_user_profile_pic(self, obj):
		return obj.user_profile.first().get_profile_pic_url()

	def get_name(self, obj):
		name = obj.get_full_name()
		if name:
			return name
		return obj.username

	class Meta:
		model = User
		fields = ['username', 'email', 'name', 'user_profile_pic']

class ExerciseListSerializer(serializers.ModelSerializer):
	exercise_hash_id = serializers.CharField(default="")
	# url = serializers.ReadOnlyField(source='get_absolute_url', read_only=True)
	class Meta:
		model = gymapp_models.Exercise
		fields = ('exercise_hash_id', 'name', 'image', 'exercise_for', 'description')

class ExerciseDetailSerializer(serializers.ModelSerializer):
	exercise_hash_id = serializers.CharField(default="")
	class Meta:
		model = gymapp_models.Exercise
		fields = ('exercise_hash_id', 'name', 'image', 'exercise_for', 'description', 'created_at', 'updated_at')


class ScheduleListSerializer(serializers.ModelSerializer):
	schedule_hash_id = serializers.CharField(default="")
	last_performed_text = serializers.CharField(source='get_last_performed_text')
	user = UserSerializer()

	class Meta:
		model = gymapp_models.Schedule
		fields = ('schedule_hash_id', 'name', 'user', 'last_performed', 'last_performed_text')


class ScheduleExerciseListSerializer(serializers.ModelSerializer):
	schedule_exercise_hash_id = serializers.CharField(default="")
	exercise = ExerciseDetailSerializer(read_only=True)

	class Meta:
		model = gymapp_models.ScheduleExercise
		fields = ('id', 'exercise', 'schedule_exercise_hash_id', 'order', 'sets', 'created_at', 'updated_at')
		
		
class ScheduleDetailSerializer(serializers.ModelSerializer):
	schedule_hash_id = serializers.CharField(default="")
	user = UserSerializer(read_only=True)

	class Meta:
		model = gymapp_models.Schedule
		fields = ('schedule_hash_id', 'name', 'user', 'day_of_week')
