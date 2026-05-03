from django.contrib import admin
from .models import Lead

@admin.register(Lead)
class LeadAdmin(admin.ModelAdmin):
    list_display = ('name', 'phone_number', 'business', 'source', 'is_notified', 'created_at')
    search_fields = ('name', 'phone_number', 'business__name', 'query')
    list_filter = ('source', 'is_notified', 'business')
