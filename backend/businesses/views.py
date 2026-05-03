from rest_framework import viewsets
from .models import Business, BusinessKnowledge
from .serializers import BusinessSerializer, BusinessKnowledgeSerializer

class BusinessViewSet(viewsets.ModelViewSet):
    queryset = Business.objects.all()
    serializer_class = BusinessSerializer

class BusinessKnowledgeViewSet(viewsets.ModelViewSet):
    serializer_class = BusinessKnowledgeSerializer

    def get_queryset(self):
        queryset = BusinessKnowledge.objects.all()
        business_id = self.kwargs.get('business_pk')
        if business_id:
            queryset = queryset.filter(business_id=business_id)
        return queryset
