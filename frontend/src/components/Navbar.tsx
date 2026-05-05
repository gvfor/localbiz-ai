"use client"
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { LayoutDashboard, Book, Users, Code, Bot } from 'lucide-react'

export default function Navbar() {
  const pathname = usePathname()

  const links = [
    { href: '/dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { href: '/dashboard/knowledge', label: 'Knowledge Base', icon: Book },
    { href: '/dashboard/leads', label: 'Leads', icon: Users },
    { href: '/dashboard/widget', label: 'Widget', icon: Code },
  ]

  return (
    <div className="w-64 bg-gray-900 text-white h-full fixed flex flex-col">
      <div className="p-6 flex items-center space-x-3 border-b border-gray-800">
        <Bot className="w-8 h-8 text-sky-500" />
        <span className="text-xl font-bold">LocalBiz AI</span>
      </div>
      
      <nav className="flex-1 p-4 space-y-2">
        {links.map(link => {
          const isActive = pathname === link.href
          const Icon = link.icon
          return (
            <Link 
              key={link.href} 
              href={link.href}
              className={`flex items-center space-x-3 p-3 rounded-lg transition-colors ${
                isActive ? 'bg-sky-500 text-white' : 'text-gray-300 hover:bg-gray-800 hover:text-white'
              }`}
            >
              <Icon className="w-5 h-5" />
              <span>{link.label}</span>
            </Link>
          )
        })}
      </nav>

      <div className="p-4 border-t border-gray-800">
        <div className="flex items-center space-x-3 bg-gray-800 p-3 rounded-lg">
          <div className="w-8 h-8 bg-sky-500 rounded-full flex items-center justify-center text-sm font-bold">
            DW
          </div>
          <div>
            <p className="text-sm font-medium">Deals Wheels</p>
            <p className="text-xs text-gray-400">Business Account</p>
          </div>
        </div>
      </div>
    </div>
  )
}
