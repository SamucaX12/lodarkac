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
  Code,
  Search,
  Scan
} from 'lucide-react';
import { useEffect, useState } from 'react';

export default function Home() {
  const [scanText, setScanText] = useState('INTEGRITY_CHECK_WAITING...');

  useEffect(() => {
    const lines = [
      "SEARCHING_DSE_HOOKS...",
      "SCANNING_PCI_BUS_0...",
      "VERIFYING_EFI_LOADER...",
      "CHECKING_BAM_FLIGHT_LOGS...",
      "DETECTING_ZIMO_STRINGS...",
      "XRC_TRACE_IDENTIFIED: [CLEAN]",
      "LODARK_ENGINE_STABLE."
    ];
    let i = 0;
    const interval = setInterval(() => {
      setScanText(lines[i % lines.length]);
      i++;
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative w-full min-h-screen bg-[#050505] text-[#e0e0e0] font-sans selection:bg-indigo-500/30 overflow-x-hidden">
      
      {/* SUBTLE SCANNER LINE */}
      <div className="fixed top-0 left-0 w-full h-[1px] bg-indigo-500/20 z-50 animate-scan-line shadow-[0_0_15px_rgba(99,102,241,0.5)]" />

      {/* Background Ambience */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-[400px] h-[400px] bg-indigo-600/[0.03] blur-[120px] rounded-full" />
        <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] bg-violet-600/[0.03] blur-[120px] rounded-full" />
      </div>

      {/* Navigation */}
      <nav className="relative z-50 flex items-center justify-between px-10 py-10 lg:px-24">
        <div className="flex items-center gap-4 group">
          <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center transition-all group-hover:rotate-6 duration-500 shadow-2xl">
            <Shield size={20} className="text-black" />
          </div>
          <div className="flex flex-col">
            <span className="text-lg font-black tracking-tight uppercase leading-none">LODARK<span className="text-indigo-500">.AC</span></span>
            <span className="text-[8px] font-black tracking-[0.3em] text-gray-600 uppercase">Forensic Intelligence</span>
          </div>
        </div>

        <div className="hidden lg:flex items-center gap-12 text-[10px] font-bold uppercase tracking-[0.2em] text-gray-500">
          <a href="#about" className="hover:text-white transition-colors">Technology</a>
          <a href="#partners" className="hover:text-white transition-colors">Partners</a>
          <Link href="/login" className="px-8 py-3 bg-white/[0.02] border border-white/5 text-white rounded-xl hover:bg-white hover:text-black transition-all duration-300 active:scale-95">
            Operator Access
          </Link>
        </div>
      </nav>

      {/* Hero Section */}
      <main className="relative z-10 flex flex-col items-center text-center px-6 pt-32 pb-48 max-w-7xl mx-auto">
        
        {/* Elite Status Badge */}
        <div className="inline-flex items-center gap-3 px-5 py-2 bg-white/[0.02] border border-white/5 rounded-full mb-16 animate-in fade-in slide-in-from-top-4 duration-1000">
           <div className="w-1.5 h-1.5 rounded-full bg-indigo-500 animate-pulse shadow-[0_0_10px_rgba(99,102,241,0.8)]" />
           <span className="text-[9px] font-black tracking-[0.4em] uppercase text-gray-500">{scanText}</span>
        </div>

        <h1 className="text-6xl md:text-8xl font-black tracking-tighter leading-[0.9] uppercase mb-10 text-white">
          PRECISION<br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-gray-200 via-gray-400 to-gray-600">FORENSICS.</span>
        </h1>

        <p className="text-lg md:text-xl text-gray-600 max-w-2xl font-medium leading-relaxed mb-20 uppercase tracking-tight">
          Next-generation anti-cheat architecture. Deep-kernel artifact reconstruction and hardware-level validation for high-stakes competition.
        </p>

        <div className="flex flex-wrap items-center justify-center gap-8">
          <Link 
            href="/download"
            className="px-12 py-5 bg-white text-black font-black rounded-2xl text-[11px] uppercase tracking-[0.2em] hover:bg-indigo-600 hover:text-white transition-all duration-700 active:scale-95 shadow-[0_0_50px_rgba(255,255,255,0.1)]"
          >
            Deploy Scanner
          </Link>
          <Link 
            href="/verify"
            className="px-12 py-5 bg-white/[0.02] border border-white/10 text-white font-black rounded-2xl text-[11px] uppercase tracking-[0.2em] hover:border-indigo-500/50 transition-all active:scale-95 backdrop-blur-xl group"
          >
            Verify Report
            <ChevronRight size={14} className="inline ml-2 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        {/* Minimalist Dashboard Preview */}
        <div className="mt-32 w-full max-w-4xl relative group">
           <div className="absolute -inset-1 bg-gradient-to-r from-indigo-500/20 to-violet-500/20 rounded-[2rem] blur-2xl opacity-20 group-hover:opacity-40 transition-opacity" />
           <div className="relative bg-[#080808] border border-white/5 rounded-[2rem] p-10 overflow-hidden shadow-2xl">
              <div className="flex items-center justify-between mb-10 opacity-30">
                 <div className="flex gap-2">
                    <div className="w-2 h-2 rounded-full bg-white/20" />
                    <div className="w-2 h-2 rounded-full bg-white/20" />
                 </div>
                 <span className="text-[8px] font-black uppercase tracking-widest">Lodark_Forensic_v2.5_Stable</span>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-12 text-left">
                 <div className="space-y-6">
                    <div className="space-y-1">
                       <span className="text-[8px] font-black text-gray-700 uppercase tracking-widest">Hardware Layer</span>
                       <div className="h-1 w-full bg-white/5 rounded-full overflow-hidden">
                          <div className="h-full bg-indigo-500" style={{ width: '100%' }} />
                       </div>
                    </div>
                    <div className="space-y-1">
                       <span className="text-[8px] font-black text-gray-700 uppercase tracking-widest">Kernel Integrity</span>
                       <div className="h-1 w-full bg-white/5 rounded-full overflow-hidden">
                          <div className="h-full bg-indigo-500" style={{ width: '100%' }} />
                       </div>
                    </div>
                    <div className="space-y-1">
                       <span className="text-[8px] font-black text-gray-700 uppercase tracking-widest">Memory Heuristics</span>
                       <div className="h-1 w-full bg-white/5 rounded-full overflow-hidden">
                          <div className="h-full bg-indigo-500" style={{ width: '92%' }} />
                       </div>
                    </div>
                 </div>
                 <div className="font-mono text-[10px] text-gray-600 space-y-2">
                    <p className="text-indigo-400"># LODARK_CORE_INITIALIZED</p>
                    <p>&gt; Checking for Xilinx boards...</p>
                    <p>&gt; Validating Secure Boot hooks...</p>
                    <p>&gt; BAM history analyzed: <span className="text-emerald-500">[STABLE]</span></p>
                    <p className="animate-pulse">&gt; Monitoring system strings...</p>
                 </div>
              </div>
           </div>
        </div>
      </main>

      {/* PARTNERS SECTION - HIGH END CLEAN */}
      <section id="partners" className="relative z-10 py-48 border-t border-white/5 bg-gradient-to-b from-transparent to-black/20">
         <div className="max-w-6xl mx-auto px-6">
            <div className="flex flex-col items-center text-center mb-24 space-y-4">
               <div className="px-4 py-1.5 bg-indigo-500/10 border border-indigo-500/20 rounded-full">
                  <span className="text-[8px] font-black text-indigo-400 uppercase tracking-[0.5em]">Global Ecosystem</span>
               </div>
               <h2 className="text-4xl md:text-5xl font-black tracking-tighter uppercase italic text-white">OFFICIAL PARTNERS</h2>
               <p className="text-[10px] font-bold text-gray-700 uppercase tracking-[0.3em] max-w-sm">
                  Strategic alliances with the most influential organizations and communities.
               </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
               {[
                 { 
                   name: "COMPLEXO E-SPORTS", 
                   type: "ORG FREE FIRE", 
                   logo: "https://i.postimg.cc/CKJxRJQ9/image.png",
                   url: "https://discord.gg/complexoesports"
                 },
                 { 
                   name: "ZK PVP", 
                   type: "CIDADE FIVEM", 
                   logo: "https://i.postimg.cc/L6dgKQKt/image.png",
                   url: "https://discord.gg/gADUCbr7k7"
                 },
                 { 
                   name: "QUEBRADA RP", 
                   type: "CIDADE FIVEM", 
                   logo: "https://i.postimg.cc/50YyDLsh/image.png",
                   url: "https://discord.gg/cqCprMUEEq"
                 },
                 { 
                   name: "TEAM LODARK", 
                   type: "EQUIPE SS", 
                   logo: "https://i.postimg.cc/yxh1zP0q/image.png",
                   url: "https://discord.gg/h6E85MmRzn"
                 }
               ].map((partner, i) => (
                 <a 
                   key={i} 
                   href={partner.url}
                   target="_blank"
                   rel="noopener noreferrer"
                   className="group relative p-10 bg-white/[0.01] border border-white/5 rounded-[2.5rem] flex flex-col items-center justify-center gap-8 hover:bg-white/[0.02] hover:border-indigo-500/40 transition-all duration-700 overflow-hidden"
                 >
                    {/* Hover Glow */}
                    <div className="absolute inset-0 bg-indigo-500/5 opacity-0 group-hover:opacity-100 blur-3xl transition-opacity duration-700" />
                    
                    <div className="relative z-10 w-24 h-24 flex items-center justify-center transform group-hover:scale-110 transition-transform duration-700">
                       <img 
                         src={partner.logo} 
                         alt={partner.name} 
                         className="w-full h-full object-contain filter drop-shadow-[0_0_15px_rgba(255,255,255,0.1)] group-hover:drop-shadow-[0_0_20px_rgba(99,102,241,0.4)]"
                       />
                    </div>
                    
                    <div className="relative z-10 flex flex-col items-center gap-2">
                       <span className="text-[11px] font-black uppercase tracking-widest text-white/90 group-hover:text-white transition-colors">{partner.name}</span>
                       <span className="text-[7px] font-black text-gray-700 uppercase tracking-[0.4em] group-hover:text-indigo-400 transition-colors">{partner.type}</span>
                    </div>

                    <div className="absolute bottom-6 opacity-0 group-hover:opacity-100 translate-y-4 group-hover:translate-y-0 transition-all duration-700">
                       <ExternalLink size={12} className="text-white/20" />
                    </div>
                 </a>
               ))}
            </div>
         </div>
      </section>

      {/* TECH FEATURES */}
      <section id="about" className="relative z-10 py-32 border-t border-white/5 bg-[#080808]">
         <div className="max-w-6xl mx-auto px-10 grid grid-cols-1 md:grid-cols-3 gap-12">
            {[
              { icon: Cpu, title: "Hardware Mapping", detail: "Deep-level scanning for FPGA and DMA PCIe devices." },
              { icon: Terminal, title: "Artifact Analysis", detail: "Forensic reconstruction of BAM, Prefetch and USN Journal." },
              { icon: Globe, title: "Real-time Sync", detail: "Global database sync for immediate threat identification." }
            ].map((feat, i) => (
              <div key={i} className="space-y-6">
                 <div className="w-12 h-12 bg-white/[0.03] border border-white/5 rounded-xl flex items-center justify-center text-indigo-500">
                    <feat.icon size={24} />
                 </div>
                 <h3 className="text-sm font-black uppercase tracking-widest">{feat.title}</h3>
                 <p className="text-[11px] text-gray-600 leading-relaxed font-medium uppercase">{feat.detail}</p>
              </div>
            ))}
         </div>
      </section>

      {/* Minimal Footer */}
      <footer className="relative z-10 py-20 px-10 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-10 opacity-30">
         <div className="flex items-center gap-3">
            <Shield size={14} className="text-indigo-500" />
            <span className="text-[9px] font-black uppercase tracking-[0.3em]">LODARK ADVANCED CORE v2.5</span>
         </div>
         <span className="text-[8px] font-black uppercase tracking-widest text-gray-700">© 2026 LODARK AC. ALL RIGHTS RESERVED.</span>
      </footer>
    </div>
  );
}
