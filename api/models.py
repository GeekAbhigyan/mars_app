from django.db import models

# create simple models mirroring the sample data used in the React frontend

class MasterDataRow(models.Model):
    code = models.CharField(max_length=20, unique=True)
    desc = models.CharField(max_length=255)
    cpp = models.IntegerField(null=True, blank=True)
    b1 = models.IntegerField(null=True, blank=True)
    b2 = models.IntegerField(null=True, blank=True)
    rule = models.IntegerField(null=True, blank=True)
    type = models.CharField(max_length=50, null=True, blank=True)
    rate = models.IntegerField(null=True, blank=True)
    donorCode = models.CharField(max_length=50, null=True, blank=True)
    usageStatus = models.CharField(max_length=50, null=True, blank=True)

    def __str__(self):
        return self.code


class MPSReportRow(models.Model):
    code = models.CharField(max_length=20, unique=True)
    description = models.TextField(blank=True)
    casePerPallet = models.CharField(max_length=100, blank=True)
    brand = models.CharField(max_length=50, blank=True)
    copackCode = models.CharField(max_length=20, blank=True)
    values = models.JSONField(default=dict)

    def __str__(self):
        return self.code
