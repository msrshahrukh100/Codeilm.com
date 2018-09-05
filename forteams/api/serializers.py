from rest_framework import serializers
from rest_framework.serializers import HyperlinkedIdentityField
from forteams.models import Team, TeamOption
from hashid_field.rest import HashidSerializerCharField

team_detail_url = HyperlinkedIdentityField(view_name='forteams_api:team-detail', lookup_field='slug')


class TeamOptionSerializer(serializers.ModelSerializer):

	class Meta:
		model = TeamOption
		fields = '__all__'


class TeamListSerializer(serializers.HyperlinkedModelSerializer):
	url = team_detail_url
	hash_id = HashidSerializerCharField(source_field='forteams.Team.hash_id')
	team_options = TeamOptionSerializer()

	class Meta:
		model = Team
		fields = '__all__'


class TeamDetailSerializer(serializers.ModelSerializer):
	url = team_detail_url

	class Meta:
		model = Team
		fields = ['name', 'url']
