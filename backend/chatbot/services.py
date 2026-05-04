from langchain.text_splitter import RecursiveCharacterTextSplitter
from langchain_community.embeddings import HuggingFaceEmbeddings
from langchain_groq import ChatGroq
from langchain_core.messages import HumanMessage, SystemMessage
from pgvector.django import CosineDistance
from django.conf import settings
from businesses.models import Business, BusinessKnowledge
from chatbot.models import Conversation, Message
from leads.models import Lead

class LocalBizAI:
    def __init__(self):
        self.embeddings = HuggingFaceEmbeddings(
            model_name="all-MiniLM-L6-v2"
        )
        self.chat = ChatGroq(
            model="llama-3.1-8b-instant",
            api_key=settings.GROQ_API_KEY
        )

    def ingest_knowledge(self, business_id, text_content):
        splitter = RecursiveCharacterTextSplitter(
            chunk_size=500, chunk_overlap=50
        )
        chunks = splitter.split_text(text_content)
        if not chunks:
            return 0
        vectors = self.embeddings.embed_documents(chunks)
        business = Business.objects.get(id=business_id)
        objects_to_create = []
        for chunk, vector in zip(chunks, vectors):
            objects_to_create.append(
                BusinessKnowledge(
                    business=business,
                    content=chunk,
                    embedding=vector
                )
            )
        BusinessKnowledge.objects.bulk_create(objects_to_create)
        return len(objects_to_create)

    def get_ai_response(self, business_id, session_id, 
                        user_message, source="website"):
        business = Business.objects.get(id=business_id)
        conversation, _ = Conversation.objects.get_or_create(
            business=business,
            session_id=session_id,
            defaults={'source': source}
        )
        Message.objects.create(
            conversation=conversation,
            role='user',
            content=user_message
        )
        query_embedding = self.embeddings.embed_query(user_message)
        knowledge_chunks = BusinessKnowledge.objects.filter(
            business=business
        ).annotate(
            distance=CosineDistance('embedding', query_embedding)
        ).order_by('distance')[:5]
        context = "\n\n".join([chunk.content for chunk in knowledge_chunks])
        system_prompt = f"""You are a helpful assistant for {business.name}. 
Use only the following information to answer:
{context}
If you don't know the answer, say: 
'I'll connect you with our team for more details.
Could you share your name and phone number?'
Be conversational, helpful and concise."""
        messages = [
            SystemMessage(content=system_prompt),
            HumanMessage(content=user_message)
        ]
        response = self.chat.invoke(messages)
        assistant_text = response.content
        Message.objects.create(
            conversation=conversation,
            role='assistant',
            content=assistant_text
        )
        needs_lead_capture = "name and phone number" in assistant_text
        return assistant_text, needs_lead_capture

    def capture_lead(self, business_id, session_id, 
                     name, phone, query, source):
        business = Business.objects.get(id=business_id)
        lead = Lead.objects.create(
            business=business,
            name=name,
            phone_number=phone,
            query=query,
            source=source,
            is_notified=True
        )
        self._notify_business_owner_whatsapp(business, lead)
        return lead

    def _notify_business_owner_whatsapp(self, business, lead):
        print(f"WhatsApp notification to {business.phone_number} for {lead.name}")
