from rest_framework import serializers
from django.contrib.auth.models import User
from lovecode.lovecodebackend import serializers as lovecode_serializers

class UserProfilePageSerializer(serializers.ModelSerializer):
    user_profile_pic = serializers.CharField(read_only=True, source='user_profile.first.get_profile_pic_url')
    full_name = serializers.CharField(read_only=True, source='get_full_name')
    intro = serializers.CharField(source='user_profile.first.intro')
    tutorials = serializers.SerializerMethodField()

    def get_tutorials(self, obj):
        tutorials = obj.user_tutorials.all()
        return lovecode_serializers.TutorialListSerializer(tutorials, many=True).data

    def update(self, instance, validated_data):
        user_profile = instance.user_profile.first()
        user_profile.intro = validated_data.get('user_profile', {}).get('first', {}).get('intro', "")
        user_profile.save()
        return instance


    class Meta:
        model = User
        read_only_fields = ['id', 'username', 'full_name', 'last_login', 'date_joined']
        fields = ['id', 'username', 'full_name', 'intro', 'user_profile_pic', 'tutorials', 'last_login', 'date_joined']
