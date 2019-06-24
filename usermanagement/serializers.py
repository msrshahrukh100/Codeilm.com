from rest_framework import serializers
from django.contrib.auth.models import User

class UserProfilePageSerializer(serializers.ModelSerializer):
    user_profile_pic = serializers.SerializerMethodField()
    full_name = serializers.SerializerMethodField()
    intro = serializers.SerializerMethodField()

    def get_intro(self, obj):
        return obj.user_profile.first().intro

    def get_full_name(self, obj):
        return obj.get_full_name()

    def get_user_profile_pic(self, obj):
        return obj.user_profile.first().get_profile_pic_url()

    class Meta:
        model = User
        fields = ['id', 'username', 'full_name', 'intro', 'user_profile_pic', 'last_login', 'date_joined']
