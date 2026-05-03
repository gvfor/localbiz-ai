from django.conf import settings
from django.http import HttpResponse
from rest_framework.views import APIView
from rest_framework.response import Response
from django.core.cache import cache

from businesses.models import Business
from chatbot.services import LocalBizAI
from .services import send_whatsapp_message
from .lead_handler import handle_whatsapp_lead

class WhatsAppWebhookView(APIView):
    def get(self, request):
        mode = request.GET.get('hub.mode')
        token = request.GET.get('hub.verify_token')
        challenge = request.GET.get('hub.challenge')
        
        if mode == 'subscribe' and token == settings.VERIFY_TOKEN:
            return HttpResponse(challenge)
        return HttpResponse('Forbidden', status=403)
        
    def post(self, request):
        data = request.data
        
        if data.get('object') == 'whatsapp_business_account':
            for entry in data.get('entry', []):
                for change in entry.get('changes', []):
                    value = change.get('value', {})
                    if 'messages' in value:
                        metadata = value.get('metadata', {})
                        whatsapp_number = metadata.get('display_phone_number')
                        
                        business = Business.objects.filter(whatsapp_number=whatsapp_number).first()
                        if not business:
                            business = Business.objects.first()
                            
                        if not business:
                            continue
                            
                        for message in value['messages']:
                            if message.get('type') == 'text':
                                from_number = message['from']
                                message_text = message['text']['body']
                                
                                # Handle Lead Capture State Machine
                                handled = handle_whatsapp_lead(business, from_number, message_text)
                                if handled:
                                    continue
                                    
                                # Normal AI Chat Flow
                                ai_response, needs_lead_capture = LocalBizAI().get_ai_response(
                                    business_id=business.id,
                                    session_id=from_number,
                                    user_message=message_text,
                                    source="whatsapp"
                                )
                                
                                send_whatsapp_message(from_number, ai_response)
                                
                                if needs_lead_capture:
                                    send_whatsapp_message(
                                        from_number, 
                                        "Please share your name and phone number so our team can assist you better!"
                                    )
                                    cache.set(f"lead_state_{from_number}", {'step': 'waiting_for_name'}, timeout=3600)
                                    
        return Response('OK', status=200)
