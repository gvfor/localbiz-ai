import uuid
from django.db import models
from businesses.models import Business

class Lead(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    business = models.ForeignKey(Business, on_delete=models.CASCADE, related_name="leads")
    name = models.CharField(max_length=255)
    phone_number = models.CharField(max_length=20)
    query = models.TextField()
    source = models.CharField(max_length=50, choices=[('website', 'Website'), ('whatsapp', 'WhatsApp')])
    is_notified = models.BooleanField(default=False)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.name} - {self.business.name}"
