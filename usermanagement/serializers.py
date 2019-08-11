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


class CommunitySerializer(serializers.ModelSerializer):
    id = serializers.CharField(default="", read_only=True)
    admins = UserSimpleSerializer(read_only=True, many=True)
    members = UserSimpleSerializer(read_only=True, many=True)

    class Meta:
        model = usermanagement_models.Community
        fields = ('id', 'name', 'slug', 'description', 'profile_image', 'admins', 'members')


class ConnectionsSerializer(serializers.ModelSerializer):
    user = UserSimpleSerializer()
    following = UserSimpleSerializer()

    class Meta:
        model = usermanagement_models.Connections
        fields = ('user', 'following', 'active')


class UserProfilePageSerializer(serializers.ModelSerializer):
    user_profile_pic = serializers.CharField(read_only=True, source='user_profile.first.get_profile_pic_url')
    full_name = serializers.CharField(read_only=True, source='get_full_name')
    intro = serializers.CharField(source='user_profile.first.intro')
    tutorial_count = serializers.CharField(read_only=True, source='user_tutorials.all.count')
    my_profile = serializers.SerializerMethodField()
    following = serializers.SerializerMethodField()
    follower = serializers.SerializerMethodField()
    connection_with_logged_in_user = serializers.SerializerMethodField()

    def get_connection_with_logged_in_user(self, obj):
        user = None
        request = self.context.get("request")
        if request and hasattr(request, "user"):
            request_user = request.user
            if request_user.is_authenticated and obj != request_user:
                connection = usermanagement_models.Connections.objects.filter(user=request_user, following=obj)
                if connection.exists():
                    return ConnectionsSerializer(connection.first()).data
        return None


    def get_following(self, obj):
        user = None
        request = self.context.get("request")
        if request and hasattr(request, "user"):
            request_user = request.user
            if request_user.is_authenticated:
                user = request_user

        following = obj.user_followings.filter(active=True)
        data = []
        for connection in following:
            data.append({
                'connection_with_logged_in_user': ConnectionsSerializer(connection.following.user_followers.filter(user=user).first()).data,
                'connection': ConnectionsSerializer(connection).data
            })
        return data

    def get_follower(self, obj):
        user = None
        request = self.context.get("request")
        if request and hasattr(request, "user"):
            request_user = request.user
            if request_user.is_authenticated:
                user = request_user

        follower = obj.user_followers.filter(active=True)
        data = []
        for connection in follower:
            data.append({
                'connection_with_logged_in_user': ConnectionsSerializer(connection.user.user_followers.filter(user=user).first()).data,
                'connection': ConnectionsSerializer(connection).data
            })
        return data

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
        fields = ['id', 'username', 'full_name', 'intro', 'my_profile', 'tutorial_count', 'connection_with_logged_in_user', 'user_profile_pic', 'following', 'follower', 'last_login', 'date_joined']
