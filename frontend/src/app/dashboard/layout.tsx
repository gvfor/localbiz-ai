import Sidebar from '@/components/Sidebar'

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="flex min-h-screen bg-[#0a0a0f] font-sans text-slate-200">
      <Sidebar />
      <div className="ml-64 flex-1 flex flex-col overflow-hidden relative">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-indigo-500/5 rounded-full blur-[120px] pointer-events-none -z-10"></div>
        <main className="flex-1 overflow-x-hidden overflow-y-auto p-10 relative z-10">
          {children}
        </main>
      </div>
    </div>
  )
}
