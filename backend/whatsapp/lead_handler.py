from django.core.cache import cache
from chatbot.services import LocalBizAI
from .services import send_whatsapp_message

def handle_whatsapp_lead(business, from_number, user_message):
    cache_key = f"lead_state_{from_number}"
    state = cache.get(cache_key)
    
    if not state:
        return False
        
    if state['step'] == 'waiting_for_name':
        state['name'] = user_message
        state['step'] = 'waiting_for_phone'
        cache.set(cache_key, state, timeout=3600)
        send_whatsapp_message(from_number, "Thank you! Please share your phone number.")
        return True
        
    elif state['step'] == 'waiting_for_phone':
        state['phone'] = user_message
        LocalBizAI().capture_lead(
            business_id=business.id,
            session_id=from_number,
            name=state['name'],
            phone=state['phone'],
            query="Lead captured via WhatsApp",
            source="whatsapp"
        )
        cache.delete(cache_key)
        send_whatsapp_message(from_number, "Thanks! Our team will get back to you shortly.")
        return True
    
    return False
