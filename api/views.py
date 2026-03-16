from rest_framework import generics
from rest_framework.response import Response

from .models import MasterDataRow, MPSReportRow
from .serializers import MasterDataRowSerializer, MPSReportRowSerializer

# sample data copied from the React constants file so that the database can be seeded automatically
MASTER_DATA_SAMPLE = [
    {
        "code": "10071863",
        "desc": "CES TERRINE OF BFCHDILL 8* (3*100G)",
        "cpp": 180,
        "b1": 180,
        "b2": 90,
        "rule": 2,
        "type": "Copack",
        "rate": 574,
        "donorCode": "D001",
        "usageStatus": "Active",
    },
    {
        "code": "10061484",
        "desc": "SNICKERS FUNSIZE COSTCO 12*1361G",
        "cpp": 180,
        "b1": 180,
        "b2": 90,
        "rule": 3,
        "type": "Copack",
        "rate": 215,
        "donorCode": "D002",
        "usageStatus": "Active",
    },
    {
        "code": "10086648",
        "desc": "CESAR BEEF & CHEESE 24*100G",
        "cpp": 180,
        "b1": 180,
        "b2": 90,
        "rule": 2,
        "type": "Copack",
        "rate": 496,
        "donorCode": "D003",
        "usageStatus": "Inactive",
    },
    {
        "code": "10086649",
        "desc": "CESAR BEEF & CHICKEN 24*100G",
        "cpp": 180,
        "b1": 180,
        "b2": 90,
        "rule": 2,
        "type": "Standard",
        "rate": 374,
        "donorCode": "D001",
        "usageStatus": "Active",
    },
    {
        "code": "10086651",
        "desc": "CESAR BULGOGI 24*100G",
        "cpp": 180,
        "b1": 180,
        "b2": 90,
        "rule": 3,
        "type": "Standard",
        "rate": 319,
        "donorCode": "D002",
        "usageStatus": "Inactive",
    },
    {
        "code": "10086652",
        "desc": "CESAR LAMB 24*100",
        "cpp": 180,
        "b1": 180,
        "b2": 90,
        "rule": 2,
        "type": "Copack",
        "rate": 268,
        "donorCode": "D003",
        "usageStatus": "Active",
    },
]

MPS_REPORT_SAMPLE = [
    {
        "code": "10071863",
        "description": "SNICKERS FUNSIZE\nCOSTCO 12*1361G",
        "casePerPallet": "180\n(8.33)\nSafety Stock: 3",
        "brand": "Snickers",
        "copackCode": "10071863",
        "values": {
            "onHand": ["300", "", "", "", "", "", "", "", "", ""],
            "demand": ["20", "33", "24", "24", "24", "24", "25", "25", "25", "25"],
            "production": ["0", "0", "0", "0", "0", "0", "0", "0", "0", "100"],
            "balance": ["200", "247", "223", "199", "175", "151", "126", "101", "76", "231"],
        },
    },
    {
        "code": "10107227",
        "description": "CES TERRINE OF\nBFCHDILL 8*\n(3*100G)",
        "casePerPallet": "224\n(66.78)\nSafety Stock: 2",
        "brand": "Cesar",
        "copackCode": "10107227",
        "values": {
            "onHand": ["169", "", "", "", "", "", "", "", "", ""],
            "demand": ["90", "49", "37", "37", "37", "37", "100", "100", "100", "100"],
            "production": ["0", "0", "0", "0", "0", "224", "0", "0", "0", "0"],
            "balance": ["129", "80", "267", "230", "193", "360", "260", "404", "304", "204"],
        },
    },
    {
        "code": "10107228",
        "description": "CESAR BEEF &\nCHEESE 24*100G",
        "casePerPallet": "224\n(53.69)\nSafety Stock: 2",
        "brand": "Cesar",
        "copackCode": "10107228",
        "values": {
            "onHand": ["142", "", "", "", "", "", "", "", "", ""],
            "demand": ["58", "63", "62", "62", "62", "62", "93", "93", "93", "93"],
            "production": ["0", "224", "0", "0", "224", "0", "224", "0", "0", "224"],
            "balance": ["104", "265", "203", "141", "303", "241", "372", "279", "156", "931"],
        },
    },
]


def ensure_seeded():
    if MasterDataRow.objects.count() == 0:
        for item in MASTER_DATA_SAMPLE:
            MasterDataRow.objects.create(**item)
    if MPSReportRow.objects.count() == 0:
        for item in MPS_REPORT_SAMPLE:
            MPSReportRow.objects.create(**item)


class MasterDataList(generics.ListAPIView):
    serializer_class = MasterDataRowSerializer

    def get_queryset(self):
        ensure_seeded()
        return MasterDataRow.objects.all()


class MPSReportList(generics.ListAPIView):
    serializer_class = MPSReportRowSerializer

    def get_queryset(self):
        ensure_seeded()
        return MPSReportRow.objects.all()
