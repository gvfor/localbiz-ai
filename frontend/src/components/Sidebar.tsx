'use client'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { LayoutDashboard, Brain, Target, Code2, Sparkles } from 'lucide-react'

export default function Sidebar() {
  const pathname = usePathname()
  
  const navLinks = [
    { name: 'Dashboard', href: '/dashboard', icon: LayoutDashboard },
    { name: 'Knowledge Base', href: '/dashboard/knowledge', icon: Brain },
    { name: 'Leads', href: '/dashboard/leads', icon: Target },
    { name: 'Widget', href: '/dashboard/widget', icon: Code2 },
  ]

  return (
    <div className="w-64 bg-[#0d0d14] border-r border-white/[0.05] h-screen flex flex-col fixed left-0 top-0 z-50">
      <div className="p-6 flex items-center gap-3">
        <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center shadow-lg shadow-indigo-500/20">
          <Sparkles className="w-5 h-5 text-white" />
        </div>
        <h1 className="text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-purple-400">
          LocalBiz AI
        </h1>
      </div>
      <nav className="flex-1 mt-8">
        <ul className="space-y-1 px-3">
          {navLinks.map((link) => {
            const isActive = pathname === link.href
            const Icon = link.icon
            return (
              <li key={link.href}>
                <Link 
                  href={link.href}
                  className={`flex items-center space-x-3 px-3 py-2.5 rounded-lg transition-all duration-200 relative overflow-hidden group ${
                    isActive ? 'text-white bg-white/[0.03]' : 'text-slate-400 hover:text-white hover:bg-white/[0.03]'
                  }`}
                >
                  {isActive && (
                    <div className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-indigo-500 to-purple-500 rounded-r"></div>
                  )}
                  {isActive && (
                    <div className="absolute inset-0 bg-gradient-to-r from-indigo-500/10 to-transparent opacity-50"></div>
                  )}
                  <Icon className={`w-5 h-5 relative z-10 transition-colors ${isActive ? 'text-indigo-400' : 'group-hover:text-slate-300'}`} />
                  <span className="font-medium relative z-10 text-sm">{link.name}</span>
                </Link>
              </li>
            )
          })}
        </ul>
      </nav>
      <div className="p-4">
        <div className="bg-[#12121a] border border-white/[0.08] p-3 rounded-xl flex items-center space-x-3 backdrop-blur-md">
          <div className="w-2.5 h-2.5 bg-emerald-500 rounded-full shadow-[0_0_10px_rgba(16,185,129,0.5)] animate-pulse"></div>
          <span className="text-sm font-medium text-slate-300">Deals Wheels</span>
        </div>
      </div>
    </div>
  )
}
