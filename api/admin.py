from django.contrib import admin
from .models import MasterDataRow, MPSReportRow

# Register your models here.
admin.site.register(MasterDataRow)
admin.site.register(MPSReportRow)
