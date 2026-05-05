'use client'
import { useEffect, useState } from 'react'
import { api } from '@/lib/api'
import { Search, Target, Users } from 'lucide-react'

export default function LeadsPage() {
  const [leads, setLeads] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [filter, setFilter] = useState<'All' | 'Website' | 'WhatsApp'>('All')
  const [search, setSearch] = useState('')

  useEffect(() => {
    api.getLeads().catch(() => []).then(l => {
      setLeads(Array.isArray(l) ? l : [])
      setLoading(false)
    })
  }, [])

  const websiteCount = leads.filter(l => l.source !== 'whatsapp').length
  const whatsappCount = leads.filter(l => l.source === 'whatsapp').length

  const filteredLeads = leads.filter(l => {
    if (filter === 'Website' && l.source === 'whatsapp') return false
    if (filter === 'WhatsApp' && l.source !== 'whatsapp') return false
    
    if (search) {
      const q = search.toLowerCase()
      const name = (l.name || '').toLowerCase()
      const phone = (l.phone_number || l.phone || '').toLowerCase()
      return name.includes(q) || phone.includes(q)
    }
    return true
  })

  return (
    <div className="max-w-6xl space-y-8">
      <div className="space-y-2">
        <h1 className="text-3xl font-bold text-white tracking-tight flex items-center gap-3">
          Leads <Target className="text-indigo-400 w-8 h-8" />
        </h1>
        <p className="text-slate-400">Manage and track your captured leads.</p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-[#12121a]/80 backdrop-blur-xl p-6 rounded-2xl border border-white/[0.08] shadow-xl">
          <h3 className="text-slate-400 text-sm font-medium">Total Captured</h3>
          <p className="text-4xl font-bold text-white mt-3 tracking-tight">{loading ? '-' : leads.length}</p>
        </div>
        <div className="bg-[#12121a]/80 backdrop-blur-xl p-6 rounded-2xl border border-white/[0.08] shadow-xl relative overflow-hidden">
          <div className="absolute top-0 right-0 p-6 opacity-20"><Target className="w-12 h-12 text-indigo-400" /></div>
          <h3 className="text-slate-400 text-sm font-medium">From Website</h3>
          <p className="text-4xl font-bold text-white mt-3 tracking-tight">{loading ? '-' : websiteCount}</p>
        </div>
        <div className="bg-[#12121a]/80 backdrop-blur-xl p-6 rounded-2xl border border-white/[0.08] shadow-xl relative overflow-hidden">
          <div className="absolute top-0 right-0 p-6 opacity-20"><Target className="w-12 h-12 text-emerald-400" /></div>
          <h3 className="text-slate-400 text-sm font-medium">From WhatsApp</h3>
          <p className="text-4xl font-bold text-white mt-3 tracking-tight">{loading ? '-' : whatsappCount}</p>
        </div>
      </div>

      <div className="bg-[#12121a]/80 backdrop-blur-xl rounded-2xl border border-white/[0.08] shadow-xl overflow-hidden">
        <div className="p-5 border-b border-white/[0.05] flex flex-col md:flex-row gap-4 justify-between items-center bg-white/[0.02]">
          <div className="flex bg-black/50 p-1.5 rounded-xl border border-white/[0.05]">
            {['All', 'Website', 'WhatsApp'].map(f => (
              <button 
                key={f}
                onClick={() => setFilter(f as any)}
                className={`px-5 py-2 text-sm font-medium rounded-lg transition-all ${
                  filter === f 
                  ? 'bg-gradient-to-r from-indigo-500 to-purple-600 text-white shadow-lg' 
                  : 'text-slate-400 hover:text-white hover:bg-white/5'
                }`}
              >
                {f}
              </button>
            ))}
          </div>
          <div className="w-full md:w-80 relative group">
            <input 
              type="text" 
              placeholder="Search by name or phone..."
              value={search}
              onChange={e => setSearch(e.target.value)}
              className="w-full pl-11 pr-4 py-2.5 bg-black/50 border border-white/[0.1] rounded-xl text-sm text-white focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 outline-none transition-all placeholder-slate-500"
            />
            <Search className="absolute left-4 top-3 text-slate-500 w-4 h-4 group-focus-within:text-indigo-400 transition-colors" />
          </div>
        </div>

        {loading ? (
          <div className="p-16 text-center text-slate-500">Loading leads...</div>
        ) : filteredLeads.length === 0 ? (
          <div className="p-20 text-center flex flex-col items-center justify-center">
            <div className="w-16 h-16 bg-white/5 rounded-full flex items-center justify-center mb-4">
              <Users className="w-8 h-8 text-slate-600" />
            </div>
            <h3 className="text-lg font-medium text-white mb-1">No leads found</h3>
            <p className="text-slate-400">
              {leads.length === 0 ? 'No leads yet. Install the widget to start capturing.' : 'No leads match your current filter.'}
            </p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-white/[0.02] text-xs uppercase tracking-wider text-slate-400 font-semibold border-b border-white/[0.05]">
                  <th className="px-6 py-4 font-medium">Name</th>
                  <th className="px-6 py-4 font-medium">Phone</th>
                  <th className="px-6 py-4 font-medium">Query</th>
                  <th className="px-6 py-4 font-medium">Source</th>
                  <th className="px-6 py-4 font-medium">Time</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/[0.05]">
                {filteredLeads.map((l, i) => (
                  <tr key={i} className="hover:bg-white/[0.02] transition-colors text-sm text-slate-300">
                    <td className="px-6 py-4 font-medium text-white">{l.name}</td>
                    <td className="px-6 py-4 font-mono text-slate-400">{l.phone_number || l.phone}</td>
                    <td className="px-6 py-4 max-w-xs truncate" title={l.query}>{l.query}</td>
                    <td className="px-6 py-4">
                      <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium border ${l.source === 'whatsapp' ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20 shadow-[0_0_10px_rgba(16,185,129,0.1)]' : 'bg-indigo-500/10 text-indigo-400 border-indigo-500/20 shadow-[0_0_10px_rgba(99,102,241,0.1)]'}`}>
                        {l.source === 'whatsapp' ? 'WhatsApp' : 'Website'}
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
