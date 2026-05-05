'use client'
import { useEffect, useState } from 'react'
import { api } from '@/lib/api'

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
    <div className="space-y-8">
      <h1 className="text-3xl font-bold text-gray-900">Welcome back, Deals Wheels 👋</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded-xl border shadow-sm">
          <h3 className="text-gray-500 text-sm font-medium mb-2">Total Leads</h3>
          <p className="text-3xl font-bold text-gray-900">{loading ? <span className="animate-pulse bg-gray-200 w-12 h-8 rounded inline-block"></span> : leads.length}</p>
        </div>
        <div className="bg-white p-6 rounded-xl border shadow-sm">
          <h3 className="text-gray-500 text-sm font-medium mb-2">Today's Leads</h3>
          <p className="text-3xl font-bold text-gray-900">{loading ? <span className="animate-pulse bg-gray-200 w-12 h-8 rounded inline-block"></span> : todayLeads.length}</p>
        </div>
        <div className="bg-white p-6 rounded-xl border shadow-sm">
          <h3 className="text-gray-500 text-sm font-medium mb-2">Total Conversations</h3>
          <p className="text-3xl font-bold text-gray-900">{loading ? <span className="animate-pulse bg-gray-200 w-12 h-8 rounded inline-block"></span> : conversations.length}</p>
        </div>
        <div className="bg-white p-6 rounded-xl border shadow-sm flex flex-col justify-center">
          <h3 className="text-gray-500 text-sm font-medium mb-2">Status</h3>
          <p className="text-lg font-bold text-green-600 flex items-center gap-2">
            Active ✅
          </p>
        </div>
      </div>

      <div className="bg-white rounded-xl border shadow-sm overflow-hidden">
        <div className="px-6 py-4 border-b">
          <h2 className="text-lg font-semibold text-gray-900">Recent Leads</h2>
        </div>
        
        {loading ? (
          <div className="p-6 space-y-4">
            {[1,2,3].map(i => (
              <div key={i} className="animate-pulse flex gap-4 h-12 bg-gray-50 rounded"></div>
            ))}
          </div>
        ) : leads.length === 0 ? (
          <div className="p-12 text-center text-gray-500">
            No leads yet
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-gray-50 text-sm text-gray-500">
                  <th className="px-6 py-4 font-medium border-b">Name</th>
                  <th className="px-6 py-4 font-medium border-b">Phone</th>
                  <th className="px-6 py-4 font-medium border-b">Query</th>
                  <th className="px-6 py-4 font-medium border-b">Source</th>
                  <th className="px-6 py-4 font-medium border-b">Time</th>
                </tr>
              </thead>
              <tbody className="divide-y">
                {leads.slice(0, 5).map((l, i) => (
                  <tr key={i} className="hover:bg-gray-50 text-sm text-gray-900">
                    <td className="px-6 py-4">{l.name}</td>
                    <td className="px-6 py-4">{l.phone_number || l.phone}</td>
                    <td className="px-6 py-4 max-w-xs truncate">{l.query}</td>
                    <td className="px-6 py-4">
                      <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${l.source === 'whatsapp' ? 'bg-blue-50 text-blue-700' : 'bg-green-50 text-green-700'}`}>
                        {l.source}
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
