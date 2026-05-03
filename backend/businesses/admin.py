from django.contrib import admin
from .models import Business, BusinessKnowledge

@admin.register(Business)
class BusinessAdmin(admin.ModelAdmin):
    list_display = ('name', 'phone_number', 'whatsapp_number', 'is_active', 'created_at')
    search_fields = ('name', 'phone_number', 'whatsapp_number')
    list_filter = ('is_active',)

@admin.register(BusinessKnowledge)
class BusinessKnowledgeAdmin(admin.ModelAdmin):
    list_display = ('business', 'created_at')
    search_fields = ('business__name',)
