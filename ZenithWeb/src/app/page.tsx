'use client';

import Link from 'next/link';
import { 
  Shield, 
  ChevronRight, 
  Hash, 
  Fingerprint, 
  Activity, 
  Cpu, 
  Globe, 
  Terminal, 
  Zap, 
  Users, 
  ShieldCheck, 
  ExternalLink,
  Code
} from 'lucide-react';
import { useEffect, useState } from 'react';

export default function Home() {
  const [scanLogs, setScanLogs] = useState<string[]>([]);

  // Simulação de scanner rodando no fundo
  useEffect(() => {
    const logs = [
      "INITIALIZING SAMUCA_AC_CORE...",
      "SCANNING KERNEL_MODULES...",
      "DETECTING_DMA_HARDWARE: [SECURE]",
      "SEARCHING_ZIMO_STRINGS...",
      "VERIFYING_SECURE_BOOT: [ENABLED]",
      "CHECKING_BAM_HISTORY...",
      "CLEANING_TEMP_ARTIFACTS...",
      "HEURISTIC_ANALYSIS: [99.2%]",
      "SAMUCA_ENGINE_READY."
    ];
    let i = 0;
    const interval = setInterval(() => {
      setScanLogs(prev => [...prev, logs[i % logs.length]].slice(-15));
      i++;
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative w-full min-h-screen bg-[#020202] text-white font-sans selection:bg-violet-500/30 overflow-hidden">
      
      {/* BACKGROUND SCANNER EFFECT */}
      <div className="fixed inset-0 z-0 opacity-[0.03] pointer-events-none font-mono text-[10px] p-10 select-none">
        {scanLogs.map((log, index) => (
          <div key={index} className="mb-1 animate-in fade-in slide-in-from-left-2 duration-500">
            {`> ${new Date().toISOString()} [SYS_MONITOR] ${log}`}
          </div>
        ))}
      </div>

      {/* Floating Orbs */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-violet-600/10 blur-[150px] rounded-full animate-pulse" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-indigo-600/10 blur-[150px] rounded-full animate-pulse" style={{ animationDelay: '2s' }} />
      </div>

      {/* Navigation */}
      <nav className="relative z-50 flex items-center justify-between px-8 py-10 lg:px-20">
        <div className="flex items-center gap-4 group cursor-pointer">
          <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center transition-all group-hover:rotate-12 group-hover:scale-110 duration-500 shadow-[0_0_20px_rgba(255,255,255,0.2)]">
            <Shield size={24} className="text-black" />
          </div>
          <div className="flex flex-col">
            <span className="text-xl font-black tracking-tighter uppercase italic leading-none">SAMUCA<span className="text-violet-500">.AC</span></span>
            <span className="text-[9px] font-black tracking-[0.5em] text-gray-500 uppercase">Brazilian Forensic Core</span>
          </div>
        </div>

        <div className="hidden lg:flex items-center gap-16 text-[11px] font-black uppercase tracking-[0.3em] text-gray-400">
          <a href="#features" className="hover:text-white transition-colors border-b border-transparent hover:border-violet-500 pb-1">Architecture</a>
          <a href="#devs" className="hover:text-white transition-colors border-b border-transparent hover:border-violet-500 pb-1">Developers</a>
          <a href="#partners" className="hover:text-white transition-colors border-b border-transparent hover:border-violet-500 pb-1">Partners</a>
          <Link href="/login" className="px-10 py-4 bg-white text-black rounded-2xl hover:bg-violet-600 hover:text-white transition-all duration-500 active:scale-95 font-black shadow-2xl">
            ADMIN LOGIN
          </Link>
        </div>
      </nav>

      {/* Hero Section */}
      <main className="relative z-10 flex flex-col items-center text-center px-6 pt-32 pb-48 max-w-7xl mx-auto">
        <div className="inline-flex items-center gap-3 px-6 py-2.5 rounded-full bg-white/[0.03] border border-white/10 mb-16 animate-in fade-in slide-in-from-bottom-4 duration-1000 shadow-xl">
          <div className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
          <span className="text-[10px] font-black uppercase tracking-[0.4em] text-gray-400">System Status: <span className="text-emerald-500">OPERATIONAL</span></span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-24 items-center w-full">
          <div className="text-left space-y-10 animate-in fade-in slide-in-from-left-8 duration-1000">
            <h1 className="text-7xl md:text-9xl font-black tracking-tighter leading-[0.8] uppercase italic">
              SAMUCA<br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-400 to-indigo-600">ADVANCED.</span>
            </h1>
            <p className="text-xl md:text-2xl text-gray-400 max-w-xl font-medium leading-relaxed">
              O scanner forense número #1 do Brasil. Integridade total em cenários competitivos de alto nível.
            </p>
            <div className="flex flex-wrap items-center gap-8 pt-6">
              <Link 
                href="/download"
                className="group px-12 py-6 bg-white text-black font-black rounded-3xl flex items-center gap-4 hover:bg-violet-600 hover:text-white transition-all duration-500 active:scale-95 shadow-[0_20px_50px_rgba(255,255,255,0.1)]"
              >
                DOWNLOAD SCANNER
                <ChevronRight size={20} className="group-hover:translate-x-2 transition-transform" />
              </Link>
              <Link 
                href="/verify"
                className="px-12 py-6 bg-black/60 border border-white/5 hover:border-violet-500/50 text-white font-black rounded-3xl flex items-center gap-4 transition-all active:scale-95 group shadow-2xl backdrop-blur-xl"
              >
                <Hash size={20} className="text-violet-500 group-hover:rotate-12 transition-transform" />
                VERIFY PIN
              </Link>
            </div>
          </div>

          {/* Animated Scanner Box */}
          <div className="relative group hidden lg:block animate-in fade-in slide-in-from-right-8 duration-1000 delay-300">
             <div className="absolute -inset-10 bg-violet-600/10 blur-[100px] rounded-full opacity-50" />
             <div className="relative bg-[#080808] border border-white/5 rounded-[3rem] p-10 overflow-hidden shadow-2xl">
                <div className="flex items-center justify-between mb-10 border-b border-white/5 pb-6">
                   <div className="flex items-center gap-4">
                      <div className="w-3 h-3 rounded-full bg-red-500" />
                      <div className="w-3 h-3 rounded-full bg-amber-500" />
                      <div className="w-3 h-3 rounded-full bg-emerald-500" />
                   </div>
                   <span className="text-[10px] font-black text-gray-600 uppercase tracking-widest">Scanner Terminal v2.5</span>
                </div>
                
                <div className="space-y-4 font-mono text-[12px]">
                   <p className="text-gray-500"><span className="text-violet-500">const</span> engine = <span className="text-indigo-400">new</span> SamucaCore();</p>
                   <p className="text-emerald-500/80">&gt; Scanning USN Journal... 100%</p>
                   <p className="text-emerald-500/80">&gt; Checking DMA Handlers... OK</p>
                   <p className="text-amber-500/80">&gt; Alert: Suspect BAM activity detected.</p>
                   <p className="text-gray-500">engine.<span className="text-violet-400">generateReport</span>(session_id);</p>
                   <div className="pt-6">
                      <div className="h-1 w-full bg-white/5 rounded-full overflow-hidden">
                         <div className="h-full bg-violet-600 animate-progress" style={{ width: '70%' }} />
                      </div>
                      <p className="text-[10px] text-gray-700 mt-2 uppercase font-black">Memory Integrity Check: 88%</p>
                   </div>
                </div>
             </div>
          </div>
        </div>
      </main>

      {/* DEVELOPERS SECTION */}
      <section id="devs" className="relative z-10 py-32 border-t border-white/5 bg-[#030303]">
        <div className="max-w-7xl mx-auto px-10">
          <div className="flex flex-col items-center text-center mb-20">
             <div className="p-4 bg-violet-500/10 rounded-2xl border border-violet-500/20 mb-6">
                <Code className="text-violet-500" size={32} />
             </div>
             <h2 className="text-5xl font-black tracking-tighter uppercase italic mb-4">CORE DEVELOPERS</h2>
             <p className="text-gray-500 text-[10px] font-black uppercase tracking-[0.5em]">The minds behind the engine</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
             {[
               { name: "SAMUCA", role: "Founder & Lead Dev", detail: "Expert in Bypass & Kernel Forensics", icon: Zap },
               { name: "LODARK", role: "Security Engineer", detail: "Infrastructure & Memory Analysis", icon: Shield }
             ].map((dev, i) => (
               <div key={i} className="group p-12 bg-white/[0.01] border border-white/5 rounded-[3rem] hover:bg-white/[0.03] hover:border-violet-500/30 transition-all duration-500 flex items-center gap-10">
                  <div className="w-24 h-24 rounded-3xl bg-black border border-white/5 flex items-center justify-center text-violet-500 group-hover:scale-110 transition-transform">
                     <dev.icon size={40} />
                  </div>
                  <div>
                     <h3 className="text-3xl font-black uppercase italic tracking-tighter mb-1">{dev.name}</h3>
                     <p className="text-[10px] font-black text-violet-500 uppercase tracking-widest mb-4">{dev.role}</p>
                     <p className="text-sm text-gray-500 font-medium">{dev.detail}</p>
                  </div>
               </div>
             ))}
          </div>
        </div>
      </section>

      {/* PARTNERS SECTION */}
      <section id="partners" className="relative z-10 py-32 border-t border-white/5">
         <div className="max-w-7xl mx-auto px-10">
            <div className="flex items-center justify-between mb-20">
               <div>
                  <h2 className="text-4xl font-black tracking-tighter uppercase italic">TRUSTED PARTNERS</h2>
                  <p className="text-[10px] font-black text-gray-700 uppercase tracking-widest mt-2">Certified Forensic Communities</p>
               </div>
               <Users className="text-gray-800" size={48} />
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
               {[
                 "VITAL CHEATS", "XRC SERVICES", "ZIMO STORE", "REAL PECINHAS"
               ].map((partner, i) => (
                 <div key={i} className="p-10 bg-white/[0.01] border border-white/5 rounded-[2.5rem] flex flex-col items-center justify-center gap-4 hover:border-white/20 transition-all group">
                    <div className="w-12 h-12 rounded-full bg-violet-600/10 flex items-center justify-center text-violet-500 mb-2">
                       <ShieldCheck size={24} />
                    </div>
                    <span className="text-[11px] font-black uppercase tracking-widest text-gray-500 group-hover:text-white transition-colors">{partner}</span>
                 </div>
               ))}
            </div>
         </div>
      </section>

      {/* CTA Section */}
      <section className="relative z-10 py-48 text-center">
         <div className="max-w-4xl mx-auto px-6">
            <h2 className="text-6xl md:text-8xl font-black tracking-tighter uppercase italic mb-12">
               READY TO <span className="text-violet-500">ANALYZE?</span>
            </h2>
            <button className="px-16 py-8 bg-white text-black font-black rounded-full hover:bg-violet-600 hover:text-white transition-all duration-500 active:scale-95 shadow-2xl flex items-center gap-6 mx-auto">
               GET STARTED NOW
               <ExternalLink size={24} />
            </button>
         </div>
      </section>

      {/* Minimal Footer */}
      <footer className="relative z-10 py-20 px-10 border-t border-white/5 bg-black flex flex-col md:flex-row justify-between items-center gap-10">
         <div className="flex items-center gap-4">
            <Shield size={20} className="text-violet-500" />
            <span className="text-[10px] font-black uppercase tracking-[0.4em] italic">SAMUCA FORENSIC CORE v3.0</span>
         </div>
         <span className="text-[10px] font-black uppercase tracking-widest text-gray-700">© 2026 SAMUCA.AC. ALL RIGHTS RESERVED.</span>
         <div className="flex gap-10 text-gray-600">
            <Fingerprint size={20} className="hover:text-white cursor-pointer transition-colors" />
            <Globe size={20} className="hover:text-white cursor-pointer transition-colors" />
            <Terminal size={20} className="hover:text-white cursor-pointer transition-colors" />
         </div>
      </footer>
    </div>
  );
}
