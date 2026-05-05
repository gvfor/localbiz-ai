'use client'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

export default function Sidebar() {
  const pathname = usePathname()
  
  const navLinks = [
    { name: 'Dashboard', href: '/dashboard', icon: '📊' },
    { name: 'Knowledge Base', href: '/dashboard/knowledge', icon: '🧠' },
    { name: 'Leads', href: '/dashboard/leads', icon: '🎯' },
    { name: 'Widget', href: '/dashboard/widget', icon: '🔌' },
  ]

  return (
    <div className="w-64 bg-gray-900 text-white h-screen flex flex-col fixed left-0 top-0">
      <div className="p-6">
        <h1 className="text-xl font-bold text-white">🤖 LocalBiz AI</h1>
      </div>
      <nav className="flex-1 mt-6">
        <ul className="space-y-2 px-4">
          {navLinks.map((link) => {
            const isActive = pathname === link.href
            return (
              <li key={link.href}>
                <Link 
                  href={link.href}
                  className={`flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors ${
                    isActive ? 'bg-gray-700 text-white' : 'text-gray-400 hover:bg-gray-800 hover:text-white'
                  }`}
                >
                  <span className="text-xl">{link.icon}</span>
                  <span className="font-medium">{link.name}</span>
                </Link>
              </li>
            )
          })}
        </ul>
      </nav>
      <div className="p-6 border-t border-gray-800">
        <div className="flex items-center space-x-3">
          <div className="w-2.5 h-2.5 bg-green-500 rounded-full"></div>
          <span className="text-sm font-medium text-gray-400">Deals Wheels</span>
        </div>
      </div>
    </div>
  )
}
