from django.contrib import admin
from django.urls import path, include
from rest_framework.routers import DefaultRouter
from businesses.views import BusinessViewSet, BusinessKnowledgeViewSet
from leads.views import LeadViewSet
from chatbot.views import ConversationViewSet, MessageViewSet
from whatsapp.views import WhatsAppWebhookView

router = DefaultRouter()
router.register(r'businesses', BusinessViewSet, basename='business')
router.register(r'businesses/(?P<business_pk>[^/.]+)/knowledge', BusinessKnowledgeViewSet, basename='business-knowledge')
router.register(r'leads', LeadViewSet, basename='lead')
router.register(r'chat/conversations', ConversationViewSet, basename='conversation')
router.register(r'chat/messages', MessageViewSet, basename='message')

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/whatsapp/webhook/', WhatsAppWebhookView.as_view(), name='whatsapp_webhook'),
    path('api/', include(router.urls)),
]
