from rest_framework import serializers
from django.contrib.auth.models import User
from . import models as usermanagement_models
from lovecode.lovecodebackend import serializers as lovecode_serializers


class UserSimpleSerializer(serializers.ModelSerializer):
    user_profile_pic = serializers.CharField(read_only=True, source='user_profile.first.get_profile_pic_url')
    full_name = serializers.CharField(read_only=True, source='get_full_name')
    intro = serializers.CharField(source='user_profile.first.intro')

    class Meta:
        model = User
        fields = ['id', 'username', 'full_name', 'intro', 'user_profile_pic']

class FollowingConnectionsSerializer(serializers.ModelSerializer):
    following = UserSimpleSerializer()
    class Meta:
        model = usermanagement_models.Connections
        fields = ('id', 'user', 'following')

class FollowerConnectionsSerializer(serializers.ModelSerializer):
    user = UserSimpleSerializer()

    class Meta:
        model = usermanagement_models.Connections
        fields = ('id', 'user', 'following')


class UserProfilePageSerializer(serializers.ModelSerializer):
    user_profile_pic = serializers.CharField(read_only=True, source='user_profile.first.get_profile_pic_url')
    full_name = serializers.CharField(read_only=True, source='get_full_name')
    intro = serializers.CharField(source='user_profile.first.intro')
    my_profile = serializers.SerializerMethodField()
    following = serializers.SerializerMethodField()
    follower = serializers.SerializerMethodField()

    def get_following(self, obj):
        return FollowingConnectionsSerializer(obj.user_followings.all(), many=True).data

    def get_follower(self, obj):
        return FollowerConnectionsSerializer(obj.user_followers.all(), many=True).data

    def get_my_profile(self, obj):
        user = None
        request = self.context.get("request")
        if request and hasattr(request, "user"):
            request_user = request.user
            if request_user.is_authenticated and obj == request_user:
                return True
        return False

    def update(self, instance, validated_data):
        user_profile = instance.user_profile.first()
        user_profile.intro = validated_data.get('user_profile', {}).get('first', {}).get('intro', "")
        user_profile.save()
        return instance


    class Meta:
        model = User
        read_only_fields = ['id', 'username', 'full_name', 'last_login', 'date_joined']
        fields = ['id', 'username', 'full_name', 'intro', 'my_profile', 'user_profile_pic', 'following', 'follower', 'last_login', 'date_joined']
