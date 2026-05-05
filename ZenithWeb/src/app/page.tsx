import Link from 'next/link';
import { Shield, Zap, MessageSquare, Terminal, ChevronRight, Fingerprint, Activity, Cpu, Globe, ShieldCheck } from 'lucide-react';

export default function Home() {
  return (
    <div className="relative w-full min-h-screen bg-[#050505] text-white font-sans selection:bg-violet-500/30 overflow-x-hidden">
      {/* Dynamic Background */}
      <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-violet-600/5 blur-[120px] rounded-full animate-pulse" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-indigo-600/5 blur-[120px] rounded-full animate-pulse" style={{ animationDelay: '2s' }} />
      </div>

      {/* Navigation */}
      <nav className="relative z-50 flex items-center justify-between px-8 py-8 lg:px-16">
        <div className="flex items-center gap-3 group cursor-pointer">
          <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center transition-transform group-hover:rotate-12 duration-500">
            <Shield size={20} className="text-black" />
          </div>
          <div className="flex flex-col">
            <span className="text-lg font-black tracking-tighter uppercase italic leading-none">LODARK<span className="text-violet-500">.AC</span></span>
            <span className="text-[8px] font-black tracking-[0.4em] text-gray-500 uppercase">Forensic Core</span>
          </div>
        </div>

        <div className="hidden lg:flex items-center gap-12 text-[10px] font-black uppercase tracking-[0.2em] text-gray-400">
          <a href="#features" className="hover:text-white transition-colors">Protocols</a>
          <a href="#engine" className="hover:text-white transition-colors">Architecture</a>
          <a href="#pricing" className="hover:text-white transition-colors">Pricing</a>
          <Link href="/login" className="px-8 py-3 bg-white text-black rounded-xl hover:bg-violet-500 hover:text-white transition-all duration-300 active:scale-95">
            Admin Access
          </Link>
        </div>
      </nav>

      {/* Hero Section */}
      <main className="relative z-10 flex flex-col items-center text-center px-6 pt-32 pb-48 max-w-5xl mx-auto">
        <div className="inline-flex items-center gap-3 px-4 py-2 rounded-full bg-white/5 border border-white/10 mb-12 animate-in fade-in slide-in-from-bottom-4 duration-1000">
          <div className="w-2 h-2 rounded-full bg-violet-500 animate-ping" />
          <span className="text-[10px] font-black uppercase tracking-[0.3em] text-gray-400">Next-Gen Engine v2.5.0 Deployment</span>
        </div>

        <h1 className="text-7xl md:text-9xl font-black tracking-tighter leading-[0.85] uppercase italic mb-12 animate-in fade-in slide-in-from-bottom-8 duration-1000 delay-100">
          STAY CLEAN.<br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-400 to-indigo-600">STAY ELITE.</span>
        </h1>

        <p className="text-lg md:text-xl text-gray-400 max-w-2xl font-medium leading-relaxed mb-16 animate-in fade-in slide-in-from-bottom-12 duration-1000 delay-200">
          Advanced forensic analysis for competitive environments. Specialized in high-integrity detection of DMA hardware and invisible system partitions.
        </p>

        <div className="flex flex-wrap items-center justify-center gap-6 animate-in fade-in slide-in-from-bottom-16 duration-1000 delay-300">
          <Link 
            href="/download"
            className="group px-12 py-5 bg-white text-black font-black rounded-2xl flex items-center gap-3 hover:bg-violet-500 hover:text-white transition-all duration-500 active:scale-95"
          >
            Launch Scanner
            <ChevronRight size={18} className="group-hover:translate-x-1 transition-transform" />
          </Link>
          <a 
            href="https://discord.gg/tSQEGQqHKe"
            target="_blank"
            className="px-12 py-5 bg-black/40 border border-white/10 hover:border-white/20 text-white font-black rounded-2xl flex items-center gap-3 transition-all active:scale-95"
          >
            <MessageSquare size={18} />
            Support Core
          </a>
        </div>

        {/* Floating Forensic Items */}
        <div className="mt-32 w-full grid grid-cols-2 md:grid-cols-4 gap-4 animate-in fade-in slide-in-from-bottom-20 duration-1000 delay-500">
           {[
             { icon: Cpu, label: "DMA Hardware", detail: "FPGA / PCIe" },
             { icon: Activity, label: "BAM Traces", detail: "UserSettings" },
             { icon: Terminal, label: "Kernel Integrity", detail: "DSE / HVCI" },
             { icon: Globe, label: "Cloud Sync", detail: "Real-time" }
           ].map((item, i) => (
             <div key={i} className="p-8 bg-white/[0.02] border border-white/5 rounded-[2rem] text-left group hover:bg-white/5 hover:border-violet-500/30 transition-all duration-500">
                <item.icon size={24} className="text-violet-500 mb-6 group-hover:scale-110 transition-transform" />
                <h4 className="text-xs font-black uppercase italic mb-1">{item.label}</h4>
                <span className="text-[10px] font-bold text-gray-600 uppercase tracking-widest">{item.detail}</span>
             </div>
           ))}
        </div>
      </main>

      {/* Unique Verification Section */}
      <section className="relative z-10 py-32 border-y border-white/5 bg-[#080808]">
        <div className="max-w-6xl mx-auto px-10 grid grid-cols-1 lg:grid-cols-2 gap-24 items-center">
          <div className="space-y-8 text-left">
            <span className="text-[10px] font-black text-violet-500 uppercase tracking-[0.5em]">Session Integrity</span>
            <h2 className="text-5xl md:text-6xl font-black tracking-tighter uppercase italic leading-none">
              CRYPTO-SESSION<br />
              <span className="text-gray-700">VERIFICATION</span>
            </h2>
            <p className="text-gray-400 text-lg leading-relaxed font-medium">
              Every scan generates a unique cryptographic hash linked to the hardware and environment. No more fake screenshots or spoofed results.
            </p>
            <div className="pt-4 flex items-center gap-8">
               <div className="flex flex-col">
                  <span className="text-3xl font-black italic tracking-tighter">CSI-7</span>
                  <span className="text-[9px] font-black text-gray-600 uppercase tracking-widest">Protocol Type</span>
               </div>
               <div className="w-px h-10 bg-white/10" />
               <div className="flex flex-col">
                  <span className="text-3xl font-black italic tracking-tighter">256-BIT</span>
                  <span className="text-[9px] font-black text-gray-600 uppercase tracking-widest">Encryption</span>
               </div>
            </div>
          </div>
          
          {/* Verification Box Mockup */}
          <div className="relative group">
             <div className="absolute -inset-4 bg-violet-600/20 blur-[80px] rounded-[3rem] opacity-50 group-hover:opacity-100 transition-opacity" />
             <div className="relative bg-black rounded-[3rem] border border-white/5 p-12 space-y-8 overflow-hidden shadow-2xl">
                <div className="flex items-center justify-between">
                   <Fingerprint size={32} className="text-violet-500" />
                   <span className="px-4 py-1 rounded-full bg-violet-500/10 text-violet-500 text-[10px] font-black uppercase tracking-widest border border-violet-500/20">Authentic Session</span>
                </div>
                <div className="space-y-2">
                   <span className="text-[10px] font-black text-gray-600 uppercase tracking-widest">Session Fingerprint</span>
                   <div className="font-mono text-sm break-all text-gray-400 p-4 bg-white/5 rounded-xl border border-white/5">
                      LDRK_0x921A_F82C_44E1_B9D2_CSI7_VERIFIED
                   </div>
                </div>
                <div className="pt-4 border-t border-white/5 flex items-center justify-between">
                   <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-emerald-500/20 flex items-center justify-center text-emerald-500">
                         <ShieldCheck size={16} />
                      </div>
                      <span className="text-[10px] font-black uppercase tracking-widest">Environment Secured</span>
                   </div>
                   <span className="text-[10px] font-black text-gray-700 uppercase tracking-widest italic">Lodark Forensic v2.5</span>
                </div>
             </div>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="relative z-10 py-32 px-10">
        <div className="max-w-7xl mx-auto text-center">
          <div className="mb-24 space-y-4">
             <span className="text-[10px] font-black text-violet-500 uppercase tracking-[0.5em]">Service Access</span>
             <h2 className="text-5xl md:text-6xl font-black tracking-tighter uppercase italic">ENGINE LICENSES</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { name: "Standard", price: "80", features: ["Unlimited PINs", "Forensic Protocol", "Discord Logs"] },
              { name: "Enterprise", price: "120", features: ["Custom Branding", "Private Strings", "White-label", "Priority Core"], recommended: true },
              { name: "Elite", price: "200", features: ["DMA/FPGA Detect", "UEFI/DSE Bypass", "Kernel Analyst"] }
            ].map((plan, i) => (
              <div key={i} className={`relative p-12 rounded-[2.5rem] border transition-all duration-500 group ${plan.recommended ? 'bg-white text-black border-white' : 'bg-[#0A0A0A] border-white/5 hover:border-violet-500/30'}`}>
                {plan.recommended && (
                  <div className="absolute top-0 left-1/2 -translate-x-1/2 bg-violet-600 text-white text-[9px] font-black px-6 py-2 rounded-b-xl uppercase tracking-widest">Recommended</div>
                )}
                <h3 className={`text-[10px] font-black uppercase tracking-[0.4em] mb-10 ${plan.recommended ? 'text-black/60' : 'text-gray-500'}`}>{plan.name}</h3>
                <div className="flex items-baseline gap-2 mb-12">
                  <span className="text-6xl font-black italic tracking-tighter">R$ {plan.price}</span>
                  <span className={`text-[10px] font-bold uppercase ${plan.recommended ? 'text-black/40' : 'text-gray-600'}`}>/mo</span>
                </div>
                <ul className="space-y-5 mb-16 flex-1 text-left">
                  {plan.features.map((feat, fi) => (
                    <li key={fi} className="flex items-center gap-3 text-[10px] font-black uppercase tracking-widest">
                       <Shield size={12} className={plan.recommended ? 'text-violet-600' : 'text-violet-500'} />
                       {feat}
                    </li>
                  ))}
                </ul>
                <button className={`w-full py-5 rounded-2xl font-black text-[10px] uppercase tracking-widest transition-all active:scale-95 ${plan.recommended ? 'bg-black text-white hover:bg-violet-600' : 'bg-white text-black hover:bg-violet-600 hover:text-white'}`}>Select Tier</button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Minimal Footer */}
      <footer className="relative z-10 py-16 px-10 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-8 opacity-40 hover:opacity-100 transition-opacity">
         <div className="flex items-center gap-3">
            <Shield size={16} />
            <span className="text-[10px] font-black uppercase tracking-[0.4em] italic">Lodark Advanced Security</span>
         </div>
         <span className="text-[9px] font-black uppercase tracking-widest text-gray-500">© 2026 Lodark AC Core. Total Integrity.</span>
         <div className="flex gap-8 text-gray-500">
            <Fingerprint size={18} />
            <Globe size={18} />
            <Terminal size={18} />
         </div>
      </footer>
    </div>
  );
}
