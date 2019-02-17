from rest_framework import serializers
from . import models as gymapp_models

class ExerciseSerializer(serializers.ModelSerializer):
	exercise_hash_id = serializers.CharField(default="")
	class Meta:
		model = gymapp_models.Exercise
		fields = ('exercise_hash_id', 'name', 'image', 'exercise_for', 'description', 'created_at', 'updated_at')