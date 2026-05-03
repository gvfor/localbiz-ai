from rest_framework import viewsets
from .models import Lead
from .serializers import LeadSerializer

class LeadViewSet(viewsets.ReadOnlyModelViewSet):
    """
    ViewSet for viewing leads (list and retrieve only).
    """
    queryset = Lead.objects.all()
    serializer_class = LeadSerializer
