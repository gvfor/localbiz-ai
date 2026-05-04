from rest_framework import viewsets, status
from rest_framework.decorators import action
from rest_framework.response import Response
from .models import Business, BusinessKnowledge
from .serializers import BusinessSerializer, BusinessKnowledgeSerializer
from chatbot.services import LocalBizAI

class BusinessViewSet(viewsets.ModelViewSet):
    queryset = Business.objects.all()
    serializer_class = BusinessSerializer

    @action(detail=True, methods=['post'])
    def ingest(self, request, pk=None):
        business = self.get_object()
        content = request.data.get('content')
        if not content:
            return Response({"error": "Content is required"}, status=status.HTTP_400_BAD_REQUEST)
        
        try:
            ai_service = LocalBizAI()
            chunks_created = ai_service.ingest_knowledge(business.id, content)
            return Response({"message": f"Successfully ingested {chunks_created} chunks of knowledge."}, status=status.HTTP_201_CREATED)
        except Exception as e:
            return Response({"error": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

class BusinessKnowledgeViewSet(viewsets.ModelViewSet):
    serializer_class = BusinessKnowledgeSerializer

    def get_queryset(self):
        queryset = BusinessKnowledge.objects.all()
        business_id = self.kwargs.get('business_pk')
        if business_id:
            queryset = queryset.filter(business_id=business_id)
        return queryset
