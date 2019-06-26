from rest_framework import serializers
from django.contrib.auth.models import User
from lovecode.lovecodebackend import serializers as lovecode_serializers


class UserProfilePageSerializer(serializers.ModelSerializer):
    user_profile_pic = serializers.CharField(read_only=True, source='user_profile.first.get_profile_pic_url')
    full_name = serializers.CharField(read_only=True, source='get_full_name')
    intro = serializers.CharField(source='user_profile.first.intro')
    tutorials = serializers.SerializerMethodField()
    my_profile = serializers.SerializerMethodField()


    def get_my_profile(self, obj):
        user = None
        request = self.context.get("request")
        if request and hasattr(request, "user"):
            request_user = request.user
            if request_user.is_authenticated and obj == request_user:
                return True
        return False

    def get_tutorials(self, obj):
        is_my_profile = self.get_my_profile(obj)
        print(is_my_profile)
        if is_my_profile:
            print("is_same")
            tutorials = obj.user_tutorials.all()
        else:
            print("is not same")
            tutorials = obj.user_tutorials.filter(is_published=True)

        
        return lovecode_serializers.TutorialListSerializer(tutorials, many=True).data

    def update(self, instance, validated_data):
        user_profile = instance.user_profile.first()
        user_profile.intro = validated_data.get('user_profile', {}).get('first', {}).get('intro', "")
        user_profile.save()
        return instance


    class Meta:
        model = User
        read_only_fields = ['id', 'username', 'full_name', 'last_login', 'date_joined']
        fields = ['id', 'username', 'full_name', 'intro', 'my_profile', 'user_profile_pic', 'tutorials', 'last_login', 'date_joined']
