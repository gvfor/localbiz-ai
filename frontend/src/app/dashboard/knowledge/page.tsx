'use client'
import { useState } from 'react'
import { api } from '@/lib/api'

export default function KnowledgePage() {
  const [content, setContent] = useState('')
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState('')

  const handleTrain = async () => {
    if (!content.trim()) return
    setLoading(true)
    setSuccess('')
    try {
      const res = await api.ingestKnowledge(content)
      setSuccess(`✅ AI trained successfully with ${res.chunks || 'multiple'} chunks`)
      setContent('')
    } catch (e) {
      alert("Failed to train AI")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="max-w-4xl space-y-8">
      <h1 className="text-3xl font-bold text-gray-900">Train Your AI 🧠</h1>
      
      <div className="bg-blue-50 text-blue-800 p-4 rounded-lg border border-blue-100 flex gap-3 items-start">
        <span className="text-xl">ℹ️</span>
        <div>
          <p className="font-medium">Your AI will only answer based on what you train it with. Be detailed.</p>
        </div>
      </div>

      <div className="bg-white p-6 rounded-xl border shadow-sm space-y-4">
        <textarea 
          className="w-full h-64 p-4 border rounded-lg focus:ring-2 focus:ring-sky-500 focus:border-sky-500 outline-none text-gray-800 resize-none"
          placeholder="Paste your business info here...&#10;Include: services, pricing, FAQs, opening hours, location, contact info"
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />
        <div className="flex justify-between items-center text-sm text-gray-500">
          <span>{content.length} characters</span>
          <button 
            onClick={handleTrain}
            disabled={loading || !content.trim()}
            className="bg-gray-900 hover:bg-gray-800 disabled:opacity-50 text-white px-6 py-2.5 rounded-lg font-medium transition-colors"
          >
            {loading ? 'Training...' : 'Train AI 🚀'}
          </button>
        </div>
      </div>
      
      {success && (
        <div className="bg-green-50 text-green-800 p-4 rounded-lg border border-green-200">
          {success}
        </div>
      )}
    </div>
  )
}
