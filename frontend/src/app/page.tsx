import Link from 'next/link'
import { MessageSquare, Users, Smartphone, ArrowRight } from 'lucide-react'

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <main className="flex-1 max-w-6xl mx-auto px-6 py-24 flex flex-col items-center text-center">
        <div className="inline-flex items-center space-x-2 bg-sky-100 text-sky-700 px-4 py-2 rounded-full mb-8">
          <span className="w-2 h-2 bg-sky-500 rounded-full animate-pulse"></span>
          <span className="text-sm font-medium">LocalBiz AI is Live</span>
        </div>
        
        <h1 className="text-6xl font-extrabold tracking-tight text-gray-900 mb-6">
          Give Your Business an <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-400 to-sky-600">AI Assistant</span>
        </h1>
        
        <p className="text-xl text-gray-600 mb-10 max-w-2xl">
          Capture leads 24/7 on website and WhatsApp. Zero cost. Automate your customer interactions and never miss a potential sale again.
        </p>

        <Link 
          href="/dashboard" 
          className="inline-flex items-center space-x-2 bg-sky-500 hover:bg-sky-600 text-white px-8 py-4 rounded-xl text-lg font-semibold transition-all hover:scale-105 hover:shadow-lg shadow-sky-500/30"
        >
          <span>Open Dashboard</span>
          <ArrowRight className="w-5 h-5" />
        </Link>

        <div className="grid md:grid-cols-3 gap-8 mt-24">
          <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 text-left hover:shadow-md transition-shadow">
            <div className="w-12 h-12 bg-sky-100 text-sky-500 rounded-xl flex items-center justify-center mb-6">
              <MessageSquare className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-3">AI Chat</h3>
            <p className="text-gray-600">Answers customer queries instantly using your custom knowledge base.</p>
          </div>
          
          <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 text-left hover:shadow-md transition-shadow">
            <div className="w-12 h-12 bg-green-100 text-green-500 rounded-xl flex items-center justify-center mb-6">
              <Users className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-3">Lead Capture</h3>
            <p className="text-gray-600">Never miss a potential customer. Automatically collect names and phones.</p>
          </div>

          <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 text-left hover:shadow-md transition-shadow">
            <div className="w-12 h-12 bg-emerald-100 text-emerald-500 rounded-xl flex items-center justify-center mb-6">
              <Smartphone className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-3">WhatsApp Bot</h3>
            <p className="text-gray-600">Works on WhatsApp automatically. Engage customers where they already are.</p>
          </div>
        </div>
      </main>
    </div>
  )
}
