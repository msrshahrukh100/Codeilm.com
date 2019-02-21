from rest_framework import serializers
from . import models as gymapp_models


class ScheduleListSerializer(serializers.ModelSerializer):
	schedule_hash_id = serializers.CharField(default="")

	class Meta:
		model = gymapp_models.Schedule
		fields = ('schedule_hash_id', 'name', 'user', 'day_of_week')


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