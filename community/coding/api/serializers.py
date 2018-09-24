from rest_framework import serializers
import community.coding.models as coding_models
from hashid_field.rest import HashidSerializerCharField


class CodingGroupSerializer(serializers.ModelSerializer):
	url = serializers.HyperlinkedIdentityField(
		view_name='coding-api:groups_detail',
		lookup_field='slug'
	)
	group_hash_id = HashidSerializerCharField(source_field='coding.CodingGroup.group_hash_id')

	class Meta:
		model = coding_models.CodingGroup
		fields = "__all__"
