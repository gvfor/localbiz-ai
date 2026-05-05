'use client'
import { useEffect, useState } from 'react'
import { api } from '@/lib/api'
import { MessageSquare, Users, TrendingUp } from 'lucide-react'

export default function DashboardPage() {
  const [leads, setLeads] = useState<any[]>([])
  const [conversations, setConversations] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    Promise.all([
      api.getLeads().catch(() => []), 
      api.getConversations().catch(() => [])
    ]).then(([l, c]) => {
      setLeads(Array.isArray(l) ? l : [])
      setConversations(Array.isArray(c) ? c : [])
      setLoading(false)
    })
  }, [])

  const todayStr = new Date().toISOString().split('T')[0]
  const todayLeads = leads.filter(l => l.created_at && l.created_at.startsWith(todayStr))

  return (
    <div className="max-w-6xl space-y-10">
      <div className="space-y-2">
        <h1 className="text-3xl font-bold text-white tracking-tight">Welcome back, Deals Wheels 👋</h1>
        <p className="text-slate-400">Here's what's happening with your AI assistant today.</p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-[#12121a]/80 backdrop-blur-xl p-6 rounded-2xl border border-white/[0.08] shadow-xl relative overflow-hidden group">
          <div className="absolute top-0 right-0 p-4 opacity-50 group-hover:opacity-100 transition-opacity">
            <div className="w-10 h-10 bg-indigo-500/10 rounded-full flex items-center justify-center">
              <Users className="w-5 h-5 text-indigo-400" />
            </div>
          </div>
          <h3 className="text-slate-400 text-sm font-medium mb-4">Total Leads</h3>
          <p className="text-4xl font-bold text-white tracking-tight">{loading ? <span className="animate-pulse bg-white/5 w-16 h-10 rounded block"></span> : leads.length}</p>
        </div>

        <div className="bg-[#12121a]/80 backdrop-blur-xl p-6 rounded-2xl border border-white/[0.08] shadow-xl relative overflow-hidden group">
          <div className="absolute top-0 right-0 p-4 opacity-50 group-hover:opacity-100 transition-opacity">
            <div className="w-10 h-10 bg-purple-500/10 rounded-full flex items-center justify-center">
              <TrendingUp className="w-5 h-5 text-purple-400" />
            </div>
          </div>
          <h3 className="text-slate-400 text-sm font-medium mb-4">Today's Leads</h3>
          <p className="text-4xl font-bold text-white tracking-tight">{loading ? <span className="animate-pulse bg-white/5 w-16 h-10 rounded block"></span> : todayLeads.length}</p>
        </div>

        <div className="bg-[#12121a]/80 backdrop-blur-xl p-6 rounded-2xl border border-white/[0.08] shadow-xl relative overflow-hidden group">
          <div className="absolute top-0 right-0 p-4 opacity-50 group-hover:opacity-100 transition-opacity">
            <div className="w-10 h-10 bg-blue-500/10 rounded-full flex items-center justify-center">
              <MessageSquare className="w-5 h-5 text-blue-400" />
            </div>
          </div>
          <h3 className="text-slate-400 text-sm font-medium mb-4">Conversations</h3>
          <p className="text-4xl font-bold text-white tracking-tight">{loading ? <span className="animate-pulse bg-white/5 w-16 h-10 rounded block"></span> : conversations.length}</p>
        </div>

        <div className="bg-[#12121a]/80 backdrop-blur-xl p-6 rounded-2xl border border-white/[0.08] shadow-xl relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/5 to-transparent pointer-events-none"></div>
          <h3 className="text-slate-400 text-sm font-medium mb-4">System Status</h3>
          <div className="flex items-center gap-3 mt-2">
            <div className="relative flex h-4 w-4">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-4 w-4 bg-emerald-500 shadow-[0_0_15px_rgba(16,185,129,0.5)]"></span>
            </div>
            <span className="text-xl font-bold text-emerald-400">Active</span>
          </div>
        </div>
      </div>

      <div className="bg-[#12121a]/80 backdrop-blur-xl rounded-2xl border border-white/[0.08] shadow-xl overflow-hidden">
        <div className="px-6 py-5 border-b border-white/[0.05] bg-white/[0.02]">
          <h2 className="text-lg font-semibold text-white">Recent Leads</h2>
        </div>
        
        {loading ? (
          <div className="p-6 space-y-4">
            {[1,2,3].map(i => (
              <div key={i} className="animate-pulse flex gap-4 h-14 bg-white/5 rounded-xl"></div>
            ))}
          </div>
        ) : leads.length === 0 ? (
          <div className="p-16 text-center flex flex-col items-center justify-center">
            <div className="w-16 h-16 bg-white/5 rounded-full flex items-center justify-center mb-4">
              <Users className="w-8 h-8 text-slate-500" />
            </div>
            <h3 className="text-lg font-medium text-white mb-1">No leads yet</h3>
            <p className="text-slate-400">Leads from your widget or WhatsApp will appear here.</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-white/[0.02] text-xs uppercase tracking-wider text-slate-400 font-semibold">
                  <th className="px-6 py-4 border-b border-white/[0.05]">Name</th>
                  <th className="px-6 py-4 border-b border-white/[0.05]">Phone</th>
                  <th className="px-6 py-4 border-b border-white/[0.05]">Query</th>
                  <th className="px-6 py-4 border-b border-white/[0.05]">Source</th>
                  <th className="px-6 py-4 border-b border-white/[0.05]">Time</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/[0.05]">
                {leads.slice(0, 5).map((l, i) => (
                  <tr key={i} className="hover:bg-white/[0.02] transition-colors text-sm text-slate-300">
                    <td className="px-6 py-4 font-medium text-white">{l.name}</td>
                    <td className="px-6 py-4 font-mono text-slate-400">{l.phone_number || l.phone}</td>
                    <td className="px-6 py-4 max-w-xs truncate">{l.query}</td>
                    <td className="px-6 py-4">
                      <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium border ${l.source === 'whatsapp' ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20 shadow-[0_0_10px_rgba(16,185,129,0.1)]' : 'bg-indigo-500/10 text-indigo-400 border-indigo-500/20 shadow-[0_0_10px_rgba(99,102,241,0.1)]'}`}>
                        {l.source}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-slate-500">{new Date(l.created_at).toLocaleString()}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  )
}
