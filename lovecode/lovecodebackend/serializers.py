from rest_framework import serializers
from . import models as lovecode_model

class GithubRepoSerializer(serializers.ModelSerializer):
	hash_id = serializers.CharField(default="")
	class Meta:
		model = lovecode_model.GithubRepo
		fields = ('hash_id', 'user', 'repo_data', 'created_at', 'updated_at')

class TutorialListSerializer(serializers.ModelSerializer):
	id = serializers.CharField(default="")

	class Meta:
		model = lovecode_model.Tutorial
		fields = ('id', 'user', 'title','slug', 'read_time', 'created_at', 'updated_at')

class TutorialDetailSerializer(serializers.ModelSerializer):
	id = serializers.CharField(default="")

	class Meta:
		model = lovecode_model.Tutorial
		fields = ('id', 'user', 'tutorial_data',  'title','slug', 'read_time', 'created_at', 'updated_at')
