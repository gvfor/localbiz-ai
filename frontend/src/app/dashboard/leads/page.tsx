'use client'
import { useEffect, useState } from 'react'
import { api } from '@/lib/api'

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
    <div className="space-y-8">
      <h1 className="text-3xl font-bold text-gray-900">Leads 🎯</h1>
      
      <div className="grid grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-xl border shadow-sm">
          <h3 className="text-gray-500 text-sm font-medium">Total</h3>
          <p className="text-3xl font-bold text-gray-900 mt-2">{loading ? '-' : leads.length}</p>
        </div>
        <div className="bg-white p-6 rounded-xl border shadow-sm">
          <h3 className="text-gray-500 text-sm font-medium">Website</h3>
          <p className="text-3xl font-bold text-gray-900 mt-2">{loading ? '-' : websiteCount}</p>
        </div>
        <div className="bg-white p-6 rounded-xl border shadow-sm">
          <h3 className="text-gray-500 text-sm font-medium">WhatsApp</h3>
          <p className="text-3xl font-bold text-gray-900 mt-2">{loading ? '-' : whatsappCount}</p>
        </div>
      </div>

      <div className="bg-white rounded-xl border shadow-sm overflow-hidden">
        <div className="p-4 border-b flex flex-col md:flex-row gap-4 justify-between items-center bg-gray-50">
          <div className="flex bg-gray-200 p-1 rounded-lg">
            {['All', 'Website', 'WhatsApp'].map(f => (
              <button 
                key={f}
                onClick={() => setFilter(f as any)}
                className={`px-4 py-1.5 text-sm font-medium rounded-md transition-colors ${filter === f ? 'bg-white text-gray-900 shadow-sm' : 'text-gray-600 hover:text-gray-900'}`}
              >
                {f}
              </button>
            ))}
          </div>
          <div className="w-full md:w-64 relative">
            <input 
              type="text" 
              placeholder="Search by name or phone..."
              value={search}
              onChange={e => setSearch(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border rounded-lg text-sm focus:ring-2 focus:ring-sky-500 outline-none"
            />
            <span className="absolute left-3 top-2.5 text-gray-400">🔍</span>
          </div>
        </div>

        {loading ? (
          <div className="p-12 text-center text-gray-500">Loading leads...</div>
        ) : filteredLeads.length === 0 ? (
          <div className="p-12 text-center text-gray-500">
            {leads.length === 0 ? 'No leads yet. Install the widget to start.' : 'No leads matching filter.'}
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-white text-sm text-gray-500">
                  <th className="px-6 py-4 font-medium border-b">Name</th>
                  <th className="px-6 py-4 font-medium border-b">Phone</th>
                  <th className="px-6 py-4 font-medium border-b">Query</th>
                  <th className="px-6 py-4 font-medium border-b">Source</th>
                  <th className="px-6 py-4 font-medium border-b">Time</th>
                </tr>
              </thead>
              <tbody className="divide-y">
                {filteredLeads.map((l, i) => (
                  <tr key={i} className="hover:bg-gray-50 text-sm text-gray-900">
                    <td className="px-6 py-4 font-medium">{l.name}</td>
                    <td className="px-6 py-4">{l.phone_number || l.phone}</td>
                    <td className="px-6 py-4 max-w-xs truncate" title={l.query}>{l.query}</td>
                    <td className="px-6 py-4">
                      <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium ${l.source === 'whatsapp' ? 'bg-blue-50 text-blue-700' : 'bg-green-50 text-green-700'}`}>
                        {l.source === 'whatsapp' ? 'WhatsApp' : 'Website'}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-gray-500">{new Date(l.created_at).toLocaleString()}</td>
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
