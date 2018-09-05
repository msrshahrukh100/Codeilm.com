from rest_framework import generics
from .serializers import TeamListSerializer, TeamDetailSerializer
from forteams import models as forteams_models
from rest_framework.permissions import AllowAny


class TeamList(generics.ListCreateAPIView):
	queryset = forteams_models.Team.objects.all()
	serializer_class = TeamListSerializer
	# permission_classes = (IsAdminUser,)


class TeamDetail(generics.RetrieveAPIView):
	queryset = forteams_models.Team.objects.all()
	serializer_class = TeamDetailSerializer
	lookup_field = 'slug'
	permission_classes = [AllowAny]
