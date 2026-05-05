import Link from 'next/link'
import { Sparkles, ArrowRight } from 'lucide-react'

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-[#0a0a0f] text-slate-200 selection:bg-indigo-500/30 overflow-x-hidden">
      
      {/* 1. HERO SECTION */}
      <section className="relative min-h-screen flex flex-col items-center justify-center pt-20 pb-32 px-6">
        {/* Radial gradient background */}
        <div 
          className="absolute inset-0 pointer-events-none -z-10"
          style={{
            background: 'radial-gradient(ellipse 80% 50% at 50% -20%, rgba(99,102,241,0.3), transparent)'
          }}
        />

        {/* Top badge */}
        <div className="inline-flex items-center space-x-2 bg-indigo-500/10 border border-indigo-500/30 text-indigo-300 px-4 py-1.5 rounded-full mb-8 backdrop-blur-md animate-fade-in-up">
          <Sparkles className="w-4 h-4" />
          <span className="text-sm font-medium">✦ Now with AI-powered lead capture</span>
        </div>

        {/* Main headline */}
        <h1 className="text-5xl md:text-[72px] leading-[1.1] font-extrabold tracking-tight text-center text-white mb-6">
          <span className="block">Your Business Deserves</span>
          <span className="block text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-purple-400 to-indigo-400 animate-gradient-x py-2">
            An AI That Works
          </span>
          <span className="block">While You Sleep</span>
        </h1>

        {/* Subheading */}
        <p className="text-xl text-slate-400 max-w-[500px] text-center mb-10 leading-relaxed">
          Train once. Deploy everywhere. Capture leads 24/7 on your website and WhatsApp — completely free.
        </p>

        {/* CTAs */}
        <div className="flex flex-col sm:flex-row items-center gap-4 mb-8">
          <Link 
            href="/dashboard" 
            className="group relative inline-flex items-center justify-center space-x-2 px-8 py-4 text-lg font-semibold text-white transition-all duration-200 w-full sm:w-auto"
          >
            <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-indigo-500 to-purple-600 group-hover:opacity-90 transition-opacity"></div>
            <div className="absolute -inset-1 rounded-xl bg-gradient-to-r from-indigo-500 to-purple-600 opacity-30 group-hover:opacity-50 blur-lg transition-opacity duration-200"></div>
            <span className="relative z-10 flex items-center space-x-2">
              <span>Get Started Free →</span>
            </span>
          </Link>
          
          <Link 
            href="#how-it-works" 
            className="inline-flex items-center justify-center px-8 py-4 text-lg font-medium text-slate-300 hover:text-white hover:bg-white/5 rounded-xl transition-colors w-full sm:w-auto border border-transparent hover:border-white/10"
          >
            See how it works
          </Link>
        </div>

        {/* Social proof */}
        <div className="flex items-center gap-6 text-sm text-slate-500 font-medium">
          <span className="flex items-center gap-1.5">✓ No credit card</span>
          <span className="flex items-center gap-1.5">✓ Setup in 5 minutes</span>
          <span className="flex items-center gap-1.5">✓ Free forever</span>
        </div>
      </section>

      {/* 2. FEATURES SECTION */}
      <section className="py-32 px-6 relative border-t border-white/[0.05] bg-[#0d0d14]/50">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-20">
            <h3 className="text-indigo-400 font-bold text-sm tracking-widest uppercase mb-4">Features</h3>
            <h2 className="text-4xl md:text-5xl font-bold text-white tracking-tight">Everything your business needs</h2>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-[#12121a] backdrop-blur-xl p-8 rounded-2xl border border-white/[0.05] hover:border-indigo-500/30 transition-colors group relative overflow-hidden">
              <div className="w-12 h-12 rounded-full bg-gradient-to-br from-indigo-500/20 to-purple-500/20 border border-indigo-500/20 flex items-center justify-center mb-6 group-hover:shadow-[0_0_30px_rgba(99,102,241,0.2)] transition-shadow">
                <span className="text-2xl">🤖</span>
              </div>
              <h3 className="text-xl font-bold text-white mb-3">Instant AI Responses</h3>
              <p className="text-slate-400 leading-relaxed">
                Your AI learns your business and answers customer questions 24/7 automatically
              </p>
            </div>

            <div className="bg-[#12121a] backdrop-blur-xl p-8 rounded-2xl border border-white/[0.05] hover:border-purple-500/30 transition-colors group relative overflow-hidden">
              <div className="w-12 h-12 rounded-full bg-gradient-to-br from-purple-500/20 to-pink-500/20 border border-purple-500/20 flex items-center justify-center mb-6 group-hover:shadow-[0_0_30px_rgba(168,85,247,0.2)] transition-shadow">
                <span className="text-2xl">🎯</span>
              </div>
              <h3 className="text-xl font-bold text-white mb-3">Smart Lead Capture</h3>
              <p className="text-slate-400 leading-relaxed">
                When AI can't answer, it collects visitor details and notifies you on WhatsApp instantly
              </p>
            </div>

            <div className="bg-[#12121a] backdrop-blur-xl p-8 rounded-2xl border border-white/[0.05] hover:border-emerald-500/30 transition-colors group relative overflow-hidden">
              <div className="w-12 h-12 rounded-full bg-gradient-to-br from-emerald-500/20 to-teal-500/20 border border-emerald-500/20 flex items-center justify-center mb-6 group-hover:shadow-[0_0_30px_rgba(16,185,129,0.2)] transition-shadow">
                <span className="text-2xl">📱</span>
              </div>
              <h3 className="text-xl font-bold text-white mb-3">WhatsApp + Website</h3>
              <p className="text-slate-400 leading-relaxed">
                One AI assistant that works on your website widget AND WhatsApp Business simultaneously
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 3. HOW IT WORKS SECTION */}
      <section id="how-it-works" className="py-32 px-6 relative border-t border-white/[0.05]">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-24">
            <h2 className="text-4xl md:text-5xl font-bold text-white tracking-tight">Up and running in minutes</h2>
          </div>

          <div className="relative">
            {/* Gradient Line */}
            <div className="hidden md:block absolute top-8 left-20 right-20 h-0.5 bg-gradient-to-r from-indigo-500/10 via-purple-500/30 to-indigo-500/10"></div>

            <div className="grid md:grid-cols-3 gap-12 relative">
              <div className="text-center group">
                <div className="w-16 h-16 mx-auto rounded-full bg-gradient-to-br from-[#12121a] to-[#1a1a24] border border-white/10 shadow-[0_0_20px_rgba(99,102,241,0.15)] flex items-center justify-center mb-8 relative z-10">
                  <span className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-br from-indigo-400 to-purple-400">1</span>
                </div>
                <h3 className="text-xl font-bold text-white mb-3">Train Your AI</h3>
                <p className="text-slate-400 leading-relaxed">
                  Paste your business info — services, pricing, FAQs
                </p>
              </div>

              <div className="text-center group">
                <div className="w-16 h-16 mx-auto rounded-full bg-gradient-to-br from-[#12121a] to-[#1a1a24] border border-white/10 shadow-[0_0_20px_rgba(168,85,247,0.15)] flex items-center justify-center mb-8 relative z-10">
                  <span className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-br from-purple-400 to-pink-400">2</span>
                </div>
                <h3 className="text-xl font-bold text-white mb-3">Install the Widget</h3>
                <p className="text-slate-400 leading-relaxed">
                  Copy one script tag to your website
                </p>
              </div>

              <div className="text-center group">
                <div className="w-16 h-16 mx-auto rounded-full bg-gradient-to-br from-[#12121a] to-[#1a1a24] border border-white/10 shadow-[0_0_20px_rgba(16,185,129,0.15)] flex items-center justify-center mb-8 relative z-10">
                  <span className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-br from-emerald-400 to-teal-400">3</span>
                </div>
                <h3 className="text-xl font-bold text-white mb-3">Watch Leads Come In</h3>
                <p className="text-slate-400 leading-relaxed">
                  AI handles queries, captures leads automatically
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. CTA SECTION */}
      <section className="py-24 px-6 relative">
        <div className="max-w-4xl mx-auto relative group">
          <div className="absolute -inset-1 rounded-3xl bg-gradient-to-r from-indigo-500 via-purple-500 to-indigo-500 opacity-20 blur-lg group-hover:opacity-30 transition-opacity duration-500"></div>
          <div className="relative bg-[#12121a] border border-white/10 rounded-3xl p-12 md:p-20 text-center overflow-hidden">
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-indigo-500/10 via-transparent to-transparent opacity-50"></div>
            
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6 tracking-tight relative z-10">
              Ready to automate your business?
            </h2>
            <p className="text-xl text-slate-400 mb-10 relative z-10">
              Join businesses already using LocalBiz AI
            </p>
            
            <Link 
              href="/dashboard" 
              className="relative z-10 inline-flex items-center justify-center space-x-2 px-10 py-5 text-xl font-semibold text-white bg-white/5 border border-white/10 hover:bg-white/10 rounded-xl transition-all hover:shadow-[0_0_30px_rgba(99,102,241,0.3)]"
            >
              <span>Open Dashboard →</span>
            </Link>
          </div>
        </div>
      </section>

      {/* 5. FOOTER */}
      <footer className="border-t border-white/[0.05] bg-[#0a0a0f] py-12 px-6">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center">
              <Sparkles className="w-3.5 h-3.5 text-white" />
            </div>
            <span className="text-white font-bold text-lg tracking-tight">LocalBiz AI</span>
          </div>
          <p className="text-slate-500 text-sm">
            Built with ❤️ by Krieo
          </p>
        </div>
      </footer>
    </div>
  )
}
