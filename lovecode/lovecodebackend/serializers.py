from rest_framework import serializers
from . import models as lovecode_model

class GithubRepoSerializer(serializers.ModelSerializer):
	hash_id = serializers.CharField(default="")
	class Meta:
		model = lovecode_model.GithubRepo
		fields = ('hash_id', 'user', 'repo_data', 'created_at', 'updated_at')

class TutorialSerializer(serializers.ModelSerializer):
	hash_id = serializers.CharField(default="")
	repo = GithubRepoSerializer(read_only=True)

	class Meta:
		model = lovecode_model.Tutorial
		fields = ('hash_id', 'user', 'title','slug', 'repo', 'read_time', 'created_at', 'updated_at')
