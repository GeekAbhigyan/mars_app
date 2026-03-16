from rest_framework import serializers
from .models import MasterDataRow, MPSReportRow


class MasterDataRowSerializer(serializers.ModelSerializer):
    class Meta:
        model = MasterDataRow
        fields = '__all__'


class MPSReportRowSerializer(serializers.ModelSerializer):
    class Meta:
        model = MPSReportRow
        fields = '__all__'
