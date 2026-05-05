'use client'
import { useState } from 'react'
import { Code2, Copy, Check, Terminal } from 'lucide-react'

export default function WidgetPage() {
  const [copied, setCopied] = useState(false)
  
  const scriptCode = `<script 
  src="http://localhost:8000/widget/localbiz-widget.js"
  data-business-id="4efd842d-6abe-4fad-bebf-f1a01ca8675f"
  data-business-name="Deals Wheels"
  data-primary-color="#6366f1"
  data-api-url="http://localhost:8000">
</script>`

  const handleCopy = () => {
    navigator.clipboard.writeText(scriptCode)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="max-w-4xl space-y-8">
      <div className="space-y-2">
        <h1 className="text-3xl font-bold text-white tracking-tight flex items-center gap-3">
          Install Widget <Code2 className="text-indigo-400 w-8 h-8" />
        </h1>
        <p className="text-slate-400">Embed the AI assistant directly into your website.</p>
      </div>
      
      <div className="bg-[#12121a]/80 backdrop-blur-xl p-8 rounded-2xl border border-white/[0.08] shadow-xl space-y-8">
        <h2 className="text-xl font-semibold text-white">Quick Install Guide</h2>
        
        <div className="space-y-8 relative before:absolute before:inset-0 before:ml-5 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-indigo-500/20 before:via-purple-500/20 before:to-transparent">
          
          <div className="relative flex items-start gap-6 md:justify-between">
            <div className="absolute left-0 md:left-1/2 flex h-10 w-10 -translate-x-1/2 items-center justify-center rounded-full bg-[#12121a] border border-white/10 shadow-[0_0_15px_rgba(99,102,241,0.2)]">
              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-white font-bold">1</div>
            </div>
            <div className="ml-12 md:ml-0 md:w-[calc(50%-3rem)] md:text-right pt-2">
              <p className="font-semibold text-white mb-2">Copy the script tag</p>
              <p className="text-slate-400 text-sm">This snippet contains your unique business ID and configuration.</p>
            </div>
            <div className="hidden md:block md:w-[calc(50%-3rem)] pt-2">
              <div className="relative group rounded-xl overflow-hidden border border-white/[0.08] bg-[#0a0a0f]">
                <div className="flex items-center justify-between px-4 py-2 bg-white/[0.02] border-b border-white/[0.05]">
                  <div className="flex items-center gap-2 text-slate-400 text-xs font-mono">
                    <Terminal className="w-3.5 h-3.5" /> html
                  </div>
                  <button 
                    onClick={handleCopy}
                    className="flex items-center gap-1.5 text-xs font-medium text-slate-400 hover:text-white transition-colors"
                  >
                    {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                    {copied ? 'Copied' : 'Copy'}
                  </button>
                </div>
                <pre className="p-4 text-sm overflow-x-auto text-emerald-400 font-mono">
                  <code>{scriptCode}</code>
                </pre>
              </div>
            </div>
          </div>

          <div className="ml-12 md:hidden relative group rounded-xl overflow-hidden border border-white/[0.08] bg-[#0a0a0f]">
            <div className="flex items-center justify-between px-4 py-2 bg-white/[0.02] border-b border-white/[0.05]">
              <div className="flex items-center gap-2 text-slate-400 text-xs font-mono">
                <Terminal className="w-3.5 h-3.5" /> html
              </div>
              <button 
                onClick={handleCopy}
                className="flex items-center gap-1.5 text-xs font-medium text-slate-400 hover:text-white transition-colors"
              >
                {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                {copied ? 'Copied' : 'Copy'}
              </button>
            </div>
            <pre className="p-4 text-sm overflow-x-auto text-emerald-400 font-mono">
              <code>{scriptCode}</code>
            </pre>
          </div>

          <div className="relative flex items-start gap-6 md:justify-between">
            <div className="absolute left-0 md:left-1/2 flex h-10 w-10 -translate-x-1/2 items-center justify-center rounded-full bg-[#12121a] border border-white/10 shadow-[0_0_15px_rgba(168,85,247,0.2)]">
              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-purple-500 to-pink-600 flex items-center justify-center text-white font-bold">2</div>
            </div>
            <div className="ml-12 md:ml-0 md:w-[calc(50%-3rem)] md:order-2 pt-2">
              <p className="font-semibold text-white mb-2">Paste it in your website</p>
              <p className="text-slate-400 text-sm">Add the snippet just before the closing <code>&lt;/body&gt;</code> tag of your website.</p>
            </div>
            <div className="hidden md:block md:w-[calc(50%-3rem)] md:order-1 pt-2"></div>
          </div>

          <div className="relative flex items-start gap-6 md:justify-between">
            <div className="absolute left-0 md:left-1/2 flex h-10 w-10 -translate-x-1/2 items-center justify-center rounded-full bg-[#12121a] border border-white/10 shadow-[0_0_15px_rgba(16,185,129,0.2)]">
              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-emerald-400 to-teal-500 flex items-center justify-center text-white font-bold">3</div>
            </div>
            <div className="ml-12 md:ml-0 md:w-[calc(50%-3rem)] md:text-right pt-2">
              <p className="font-semibold text-white mb-2">Your AI assistant is live! 🎉</p>
              <p className="text-slate-400 text-sm">The chat widget will now appear on your website and start assisting visitors.</p>
            </div>
            <div className="hidden md:block md:w-[calc(50%-3rem)] pt-2"></div>
          </div>
        </div>
      </div>

      <div className="bg-[#12121a]/80 backdrop-blur-xl p-6 rounded-2xl border border-white/[0.08] shadow-xl">
        <h3 className="font-semibold text-white mb-2">Customization Attributes</h3>
        <p className="text-sm text-slate-400 mb-6">Modify these data attributes in the script tag to customize the widget appearance:</p>
        <div className="grid md:grid-cols-2 gap-4">
          <div className="bg-[#0a0a0f] p-4 rounded-xl border border-white/[0.05]">
            <code className="text-indigo-400 text-sm block mb-1">data-primary-color</code>
            <span className="text-slate-400 text-sm">Hex code for the widget's theme color (e.g., #6366f1)</span>
          </div>
          <div className="bg-[#0a0a0f] p-4 rounded-xl border border-white/[0.05]">
            <code className="text-purple-400 text-sm block mb-1">data-business-name</code>
            <span className="text-slate-400 text-sm">The display name shown in the chat header</span>
          </div>
        </div>
      </div>
    </div>
  )
}
