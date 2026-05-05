'use client'
import { useState } from 'react'
import { api } from '@/lib/api'
import { Brain, Info, CheckCircle2 } from 'lucide-react'

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
      setSuccess(`AI trained successfully with ${res.chunks || 'multiple'} chunks`)
      setContent('')
    } catch (e) {
      alert("Failed to train AI")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="max-w-4xl space-y-8">
      <div className="space-y-2">
        <h1 className="text-3xl font-bold text-white tracking-tight flex items-center gap-3">
          Train Your AI <Brain className="text-indigo-400 w-8 h-8" />
        </h1>
        <p className="text-slate-400">Give your AI the knowledge it needs to assist your customers.</p>
      </div>
      
      <div className="bg-[#12121a]/80 backdrop-blur-xl border-l-4 border-indigo-500 border-y border-r border-y-white/[0.08] border-r-white/[0.08] p-5 rounded-r-xl flex gap-4 items-start shadow-lg">
        <Info className="w-6 h-6 text-indigo-400 shrink-0 mt-0.5" />
        <div>
          <h3 className="text-white font-medium mb-1">Knowledge is power</h3>
          <p className="text-slate-400 text-sm leading-relaxed">Your AI will only answer based on what you train it with. Be detailed. Include: services, pricing, FAQs, opening hours, location, and contact info.</p>
        </div>
      </div>

      <div className="bg-[#12121a]/80 backdrop-blur-xl p-1 rounded-2xl border border-white/[0.08] shadow-xl group focus-within:border-indigo-500/50 focus-within:shadow-[0_0_30px_rgba(99,102,241,0.15)] transition-all duration-300">
        <div className="bg-[#0a0a0f] rounded-xl overflow-hidden flex flex-col">
          <textarea 
            className="w-full h-80 p-6 bg-transparent text-slate-200 placeholder-slate-600 outline-none resize-none text-base leading-relaxed"
            placeholder="Paste your business info here...&#10;&#10;Example:&#10;Deals Wheels is a vehicle dealership in Kerala.&#10;Services: Court fine clearance, Blacklist removal...&#10;Open Monday to Saturday 9am to 6pm."
            value={content}
            onChange={(e) => setContent(e.target.value)}
          />
          <div className="px-6 py-4 bg-white/[0.02] border-t border-white/[0.05] flex justify-between items-center">
            <span className="text-sm font-mono text-slate-500">{content.length} characters</span>
            <button 
              onClick={handleTrain}
              disabled={loading || !content.trim()}
              className="relative overflow-hidden group bg-slate-800 disabled:opacity-50 text-white px-8 py-2.5 rounded-lg font-medium transition-all"
            >
              {!loading && content.trim() && (
                <div className="absolute inset-0 bg-gradient-to-r from-indigo-500 to-purple-600 opacity-90 group-hover:opacity-100 transition-opacity"></div>
              )}
              <span className="relative z-10 flex items-center gap-2">
                {loading ? 'Training...' : 'Train AI 🚀'}
              </span>
            </button>
          </div>
        </div>
      </div>
      
      {success && (
        <div className="bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 p-5 rounded-xl flex items-center gap-3 shadow-[0_0_20px_rgba(16,185,129,0.1)] animate-in fade-in slide-in-from-bottom-4">
          <CheckCircle2 className="w-5 h-5 shrink-0" />
          <span className="font-medium">{success}</span>
        </div>
      )}
    </div>
  )
}
