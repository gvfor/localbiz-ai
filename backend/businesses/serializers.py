from rest_framework import serializers
from .models import Business, BusinessKnowledge

class BusinessSerializer(serializers.ModelSerializer):
    class Meta:
        model = Business
        fields = '__all__'

class BusinessKnowledgeSerializer(serializers.ModelSerializer):
    class Meta:
        model = BusinessKnowledge
        fields = '__all__'
