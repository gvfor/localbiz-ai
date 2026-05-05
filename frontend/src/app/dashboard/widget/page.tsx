'use client'
import { useState } from 'react'

export default function WidgetPage() {
  const [copied, setCopied] = useState(false)
  
  const scriptCode = `<script 
  src="http://localhost:8000/widget/localbiz-widget.js"
  data-business-id="4efd842d-6abe-4fad-bebf-f1a01ca8675f"
  data-business-name="Deals Wheels"
  data-primary-color="#0ea5e9"
  data-api-url="http://localhost:8000">
</script>`

  const handleCopy = () => {
    navigator.clipboard.writeText(scriptCode)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="max-w-3xl space-y-8">
      <h1 className="text-3xl font-bold text-gray-900">Install Widget 🔌</h1>
      
      <div className="bg-white p-8 rounded-xl border shadow-sm space-y-6">
        <h2 className="text-xl font-semibold text-gray-900">Step by step install guide</h2>
        
        <div className="space-y-4">
          <div className="flex gap-4">
            <div className="w-8 h-8 rounded-full bg-sky-100 text-sky-600 font-bold flex items-center justify-center shrink-0">1</div>
            <div>
              <p className="font-medium text-gray-900 mb-2">Copy the script tag below</p>
              <div className="relative">
                <pre className="bg-gray-900 text-gray-100 p-4 rounded-lg text-sm overflow-x-auto">
                  <code>{scriptCode}</code>
                </pre>
                <button 
                  onClick={handleCopy}
                  className="absolute top-2 right-2 bg-gray-700 hover:bg-gray-600 text-white text-xs px-3 py-1.5 rounded transition-colors"
                >
                  {copied ? 'Copied!' : 'Copy to clipboard'}
                </button>
              </div>
            </div>
          </div>

          <div className="flex gap-4">
            <div className="w-8 h-8 rounded-full bg-sky-100 text-sky-600 font-bold flex items-center justify-center shrink-0">2</div>
            <div>
              <p className="font-medium text-gray-900 mt-1">Paste it before <code>&lt;/body&gt;</code> on your website</p>
            </div>
          </div>

          <div className="flex gap-4">
            <div className="w-8 h-8 rounded-full bg-sky-100 text-sky-600 font-bold flex items-center justify-center shrink-0">3</div>
            <div>
              <p className="font-medium text-gray-900 mt-1">Your AI assistant is live! 🎉</p>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white p-6 rounded-xl border shadow-sm space-y-4">
        <h3 className="font-semibold text-gray-900">Customization options</h3>
        <p className="text-sm text-gray-600">You can customize the widget by modifying these data attributes:</p>
        <ul className="space-y-2 text-sm">
          <li className="flex gap-2 items-center text-gray-700"><code className="bg-gray-100 px-2 py-1 rounded text-pink-600">data-primary-color</code> = your brand color (hex code)</li>
          <li className="flex gap-2 items-center text-gray-700"><code className="bg-gray-100 px-2 py-1 rounded text-pink-600">data-business-name</code> = your business name</li>
        </ul>
      </div>
    </div>
  )
}
