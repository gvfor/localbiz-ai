from langchain.text_splitter import RecursiveCharacterTextSplitter
from langchain_openai import OpenAIEmbeddings, ChatOpenAI
from langchain.schema import HumanMessage, SystemMessage
from pgvector.django import CosineDistance

from businesses.models import Business, BusinessKnowledge
from chatbot.models import Conversation, Message
from leads.models import Lead

class LocalBizAI:
    def ingest_knowledge(self, business_id, text_content):
        # 1. Split text
        splitter = RecursiveCharacterTextSplitter(chunk_size=500, chunk_overlap=50)
        chunks = splitter.split_text(text_content)
        
        if not chunks:
            return 0
            
        # 2. Generate embeddings
        embeddings = OpenAIEmbeddings(model="text-embedding-ada-002")
        vectors = embeddings.embed_documents(chunks)
        
        # 3. Store in DB
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

    def get_ai_response(self, business_id, session_id, user_message, source="website"):
        business = Business.objects.get(id=business_id)
        
        # 1. Get or create conversation
        conversation, _ = Conversation.objects.get_or_create(
            business=business,
            session_id=session_id,
            defaults={'source': source}
        )
        
        # 2. Save user message
        Message.objects.create(
            conversation=conversation,
            role='user',
            content=user_message
        )
        
        # 3. Embed query
        embeddings = OpenAIEmbeddings(model="text-embedding-ada-002")
        query_embedding = embeddings.embed_query(user_message)
        
        # 4. Search pgvector
        knowledge_chunks = BusinessKnowledge.objects.filter(business=business)\
            .annotate(distance=CosineDistance('embedding', query_embedding))\
            .order_by('distance')[:5]
            
        # 5. Build context
        context = "\n\n".join([chunk.content for chunk in knowledge_chunks])
        
        system_prompt = f"""You are a helpful assistant for {business.name}. 
Use only the following information to answer:
{context}
If you don't know the answer, say: 
'I'll connect you with our team for more details.
Could you share your name and phone number?'
Be conversational, helpful and concise."""

        # 6. Call LLM
        chat = ChatOpenAI(model="gpt-4o-mini")
        messages = [
            SystemMessage(content=system_prompt),
            HumanMessage(content=user_message)
        ]
        
        response = chat.invoke(messages)
        assistant_text = response.content
        
        # 7. Save assistant response
        Message.objects.create(
            conversation=conversation,
            role='assistant',
            content=assistant_text
        )
        
        # 8. Check if lead capture is needed
        needs_lead_capture = "name and phone number" in assistant_text
        
        return assistant_text, needs_lead_capture

    def capture_lead(self, business_id, session_id, name, phone, query, source):
        business = Business.objects.get(id=business_id)
        
        # 1. Save Lead
        lead = Lead.objects.create(
            business=business,
            name=name,
            phone_number=phone,
            query=query,
            source=source,
            is_notified=True
        )
        
        # 2. Trigger notification
        self._notify_business_owner_whatsapp(business, lead)
        
        return lead

    def _notify_business_owner_whatsapp(self, business, lead):
        # Placeholder for Meta Cloud API integration
        print(f"Triggering WhatsApp notification to {business.phone_number} for lead: {lead.name}")
