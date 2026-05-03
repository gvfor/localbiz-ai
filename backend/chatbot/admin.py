from django.contrib import admin
from .models import Conversation, Message

@admin.register(Conversation)
class ConversationAdmin(admin.ModelAdmin):
    list_display = ('session_id', 'business', 'source', 'created_at')
    search_fields = ('session_id', 'business__name')
    list_filter = ('source', 'business')

@admin.register(Message)
class MessageAdmin(admin.ModelAdmin):
    list_display = ('conversation', 'role', 'created_at')
    search_fields = ('conversation__session_id', 'content')
    list_filter = ('role',)
