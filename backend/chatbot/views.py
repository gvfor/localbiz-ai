from rest_framework import viewsets, status
from rest_framework.views import APIView
from rest_framework.response import Response
from .models import Conversation, Message
from .serializers import ConversationSerializer, MessageSerializer
from .services import LocalBizAI

class ConversationViewSet(viewsets.ModelViewSet):
    queryset = Conversation.objects.all()
    serializer_class = ConversationSerializer

class MessageViewSet(viewsets.ModelViewSet):
    queryset = Message.objects.all()
    serializer_class = MessageSerializer

class ChatMessageView(APIView):
    def post(self, request):
        business_id = request.data.get('business_id')
        session_id = request.data.get('session_id')
        message = request.data.get('message')
        source = request.data.get('source', 'website')
        
        if not all([business_id, session_id, message]):
            return Response(
                {"error": "business_id, session_id, and message are required"}, 
                status=status.HTTP_400_BAD_REQUEST
            )
            
        try:
            ai_service = LocalBizAI()
            response_text, needs_lead_capture = ai_service.get_ai_response(
                business_id, session_id, message, source
            )
            return Response({
                "response": response_text,
                "needs_lead_capture": needs_lead_capture
            }, status=status.HTTP_200_OK)
        except Exception as e:
            return Response({"error": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
