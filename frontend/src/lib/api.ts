const API_URL = process.env.NEXT_PUBLIC_API_URL
const BUSINESS_ID = process.env.NEXT_PUBLIC_BUSINESS_ID

export const api = {
  getLeads: () => fetch(`${API_URL}/api/leads/`).then(r => r.json()),
  getConversations: () => fetch(`${API_URL}/api/chat/conversations/`).then(r => r.json()),
  ingestKnowledge: (content: string) => fetch(`${API_URL}/api/businesses/${BUSINESS_ID}/ingest/`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ content })
  }).then(r => r.json()),
}
