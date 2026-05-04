import uuid
from django.db import models
from pgvector.django import VectorField

class Business(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    name = models.CharField(max_length=255)
    phone_number = models.CharField(max_length=20)
    whatsapp_number = models.CharField(max_length=20)
    website_url = models.URLField(blank=True, null=True)
    is_active = models.BooleanField(default=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.name

class BusinessKnowledge(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    business = models.ForeignKey(Business, on_delete=models.CASCADE, related_name="knowledge_base")
    content = models.TextField()
    embedding = VectorField(dimensions=384)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"Knowledge for {self.business.name}"
