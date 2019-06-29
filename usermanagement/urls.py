from django.urls import path
from . import views as usermanagementviews

urlpatterns = [
    # path('add-following/<int:user_id>', usermanagementviews.add_user_following, name="add_user_following"),
    path('users/<int:id>', usermanagementviews.UserProfile.as_view(), name="user_profile"),
    path('users/', usermanagementviews.UsersList.as_view(), name="users"),
    path('users/follow-unfollow', usermanagementviews.FollowUnfollowUser.as_view(), name="follow_unfollow"),
]
