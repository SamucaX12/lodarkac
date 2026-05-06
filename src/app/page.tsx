'use client';

import Link from 'next/link';
import { 
  Shield, 
  ChevronRight, 
  Fingerprint, 
  Activity, 
  Cpu, 
  Globe, 
  Terminal, 
  Zap, 
  ShieldCheck, 
  ExternalLink,
  Search,
  Monitor,
  Lock,
  Eye,
  Crosshair
} from 'lucide-react';
import { useEffect, useState } from 'react';

export default function Home() {
  const [scanText, setScanText] = useState('SYSTEM_SCANNING...');

  useEffect(() => {
    const lines = [
      "SEARCHING_DSE_HOOKS...",
      "SCANNING_PCI_BUS_0...",
      "VERIFYING_EFI_LOADER...",
      "CHECKING_BAM_FLIGHT_LOGS...",
      "DETECTING_ZIMO_STRINGS...",
      "SYSMON_LOG_GAP_CHECK...",
      "LODARK_ENGINE_READY."
    ];
    let i = 0;
    const interval = setInterval(() => {
      setScanText(lines[i % lines.length]);
      i++;
    }, 2500);
    return () => clearInterval(interval);
  }, []);

  const partners = [
    { name: "COMPLEXO E-SPORTS", logo: "https://i.postimg.cc/CKJxRJQ9/image.png", url: "https://discord.gg/complexoesports" },
    { name: "ZK PVP", logo: "https://i.postimg.cc/L6dgKQKt/image.png", url: "https://discord.gg/gADUCbr7k7" },
    { name: "QUEBRADA RP", logo: "https://i.postimg.cc/50YyDLsh/image.png", url: "https://discord.gg/cqCprMUEEq" },
    { name: "TEAM LODARK", logo: "https://i.postimg.cc/yxh1zP0q/image.png", url: "https://discord.gg/h6E85MmRzn" }
  ];

  return (
    <div className="relative w-full min-h-screen bg-[#020202] text-[#e2e8f0] font-sans selection:bg-purple-500/30 overflow-x-hidden">
      
      {/* GLOW BACKGROUND */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] bg-purple-600/[0.05] blur-[140px] rounded-full" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[500px] h-[500px] bg-violet-600/[0.05] blur-[140px] rounded-full" />
      </div>

      {/* TOP NAV - VISION STYLE */}
      <nav className="relative z-50 flex items-center justify-between px-8 py-8 lg:px-20">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 bg-white/[0.03] border border-white/10 rounded-2xl flex items-center justify-center backdrop-blur-xl">
            <Shield size={22} className="text-white" />
          </div>
          <div className="flex flex-col">
            <span className="text-xl font-black tracking-tighter uppercase leading-none">LODARK<span className="text-purple-500">.AC</span></span>
            <span className="text-[7px] font-black tracking-[0.5em] text-purple-500/50 uppercase">Advanced Forensic Unit</span>
          </div>
        </div>

        <div className="hidden lg:flex items-center gap-10 text-[9px] font-black uppercase tracking-[0.2em] text-slate-500">
          <a href="#tech" className="hover:text-white transition-colors">Tecnologia</a>
          <a href="#partners" className="hover:text-white transition-colors">Parceiros</a>
          <Link href="/login" className="px-8 py-3 bg-purple-600 text-white rounded-xl hover:bg-purple-500 transition-all duration-300 shadow-[0_10px_25px_rgba(139,92,246,0.3)]">
            ADMIN ACCESS
          </Link>
        </div>
      </nav>

      {/* HERO SECTION - CLEAN VISION STYLE */}
      <main className="relative z-10 flex flex-col items-center text-center px-6 pt-32 pb-40 max-w-7xl mx-auto">
        
        {/* STATUS BADGE */}
        <div className="inline-flex items-center gap-3 px-4 py-1.5 bg-white/[0.02] border border-white/5 rounded-full mb-12 animate-in fade-in slide-in-from-top-4 duration-1000">
           <div className="w-1.5 h-1.5 rounded-full bg-purple-500 animate-pulse shadow-[0_0_10px_rgba(168,85,247,0.8)]" />
           <span className="text-[8px] font-black tracking-[0.3em] uppercase text-purple-400">{scanText}</span>
        </div>

        <h1 className="text-7xl md:text-9xl font-black tracking-tighter leading-[0.85] uppercase mb-12 text-white">
          THE ART OF<br />
          <span className="text-transparent bg-clip-text bg-gradient-to-b from-white to-white/20">DETECTION.</span>
        </h1>

        <p className="text-sm md:text-base text-slate-500 max-w-2xl font-bold leading-relaxed mb-20 uppercase tracking-[0.1em]">
          O padrão ouro em perícia digital. Engenharia reversa de artefatos e validação de integridade em tempo real para o cenário competitivo de elite.
        </p>

        <div className="flex flex-wrap items-center justify-center gap-6">
          <Link 
            href="/verify"
            className="px-14 py-5 bg-white text-black font-black rounded-2xl text-[10px] uppercase tracking-[0.3em] hover:bg-purple-600 hover:text-white transition-all duration-500 active:scale-95 shadow-[0_20px_50px_rgba(255,255,255,0.1)]"
          >
            VERIFICAR PIN
          </Link>
          <Link 
            href="/download"
            className="px-14 py-5 bg-white/[0.02] border border-white/10 text-white font-black rounded-2xl text-[10px] uppercase tracking-[0.3em] hover:border-purple-500/50 transition-all active:scale-95 backdrop-blur-xl group"
          >
            DOWNLOAD SCANNER
            <ChevronRight size={14} className="inline ml-2 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        {/* MOCKUP DASHBOARD - CLEANER */}
        <div className="mt-40 w-full max-w-5xl relative group animate-in slide-in-from-bottom-10 duration-1000">
           <div className="absolute -inset-1 bg-gradient-to-r from-purple-500/20 to-violet-500/20 rounded-[3rem] blur-3xl opacity-20 group-hover:opacity-40 transition-opacity" />
           <div className="relative bg-[#050505] border border-white/5 rounded-[3rem] p-12 overflow-hidden shadow-2xl">
              <div className="flex items-center justify-between mb-12 opacity-20">
                 <div className="flex gap-2">
                    <div className="w-3 h-3 rounded-full bg-purple-500" />
                    <div className="w-3 h-3 rounded-full bg-white/10" />
                 </div>
                 <span className="text-[8px] font-black uppercase tracking-[0.5em]">LODARK_SECURE_OS_V2.5</span>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-12 text-left">
                 <div className="space-y-10 col-span-2">
                    <div className="grid grid-cols-2 gap-8">
                        <div className="space-y-2">
                            <span className="text-[8px] font-black text-slate-700 uppercase tracking-widest">Memória Heurística</span>
                            <div className="flex items-end gap-2">
                                <span className="text-4xl font-black text-white italic">99.2%</span>
                                <span className="text-[8px] text-purple-500 font-black mb-1 uppercase">SAFE</span>
                            </div>
                        </div>
                        <div className="space-y-2">
                            <span className="text-[8px] font-black text-slate-700 uppercase tracking-widest">Integridade Kernel</span>
                            <div className="flex items-end gap-2">
                                <span className="text-4xl font-black text-white italic">100</span>
                                <span className="text-[8px] text-purple-500 font-black mb-1 uppercase">STABLE</span>
                            </div>
                        </div>
                    </div>
                    <div className="p-8 bg-white/[0.01] border border-white/5 rounded-3xl">
                        <div className="flex items-center gap-4 mb-4">
                            <Activity size={16} className="text-purple-500" />
                            <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Relatório em Tempo Real</span>
                        </div>
                        <p className="text-[11px] font-bold text-slate-400 uppercase leading-relaxed">
                            Monitoramento de USN Journal, BAM, Prefetch e Logs de Eventos Sysmon (1-13) em execução constante.
                        </p>
                    </div>
                 </div>
                 <div className="bg-[#080808] border border-white/5 rounded-3xl p-6 font-mono text-[9px] text-slate-600 space-y-3">
                    <p className="text-purple-500"># LODARK_ACTIVE</p>
                    <p>&gt; IP_FILTER_ENABLED</p>
                    <p>&gt; PROXY_TRAP: <span className="text-emerald-500">READY</span></p>
                    <p>&gt; STRINGS_EXCL: <span className="text-slate-400">ENABLED</span></p>
                    <p className="animate-pulse">&gt; SCANNING_THREADS...</p>
                 </div>
              </div>
           </div>
        </div>
      </main>

      {/* PARTNERS SECTION - PREMIUM CLEAN */}
      <section id="partners" className="relative z-10 py-40 border-t border-white/5 bg-gradient-to-b from-transparent to-[#050505]">
         <div className="max-w-6xl mx-auto px-6">
            <div className="flex flex-col items-center text-center mb-24">
               <h2 className="text-5xl font-black tracking-tighter uppercase italic text-white mb-4">PARCERIAS DE ELITE</h2>
               <div className="w-12 h-1 bg-purple-600 rounded-full mb-8" />
               <p className="text-[10px] font-bold text-slate-600 uppercase tracking-[0.4em]">COMUNIDADES QUE CONFIAM NA LODARK SECURITY</p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
               {partners.map((partner, i) => (
                 <a 
                   key={i} 
                   href={partner.url}
                   target="_blank"
                   rel="noopener noreferrer"
                   className="group relative p-12 bg-white/[0.01] border border-white/5 rounded-[2.5rem] flex flex-col items-center justify-center gap-8 hover:bg-white/[0.02] hover:border-purple-500/40 transition-all duration-500"
                 >
                    <div className="absolute inset-0 bg-purple-500/[0.02] opacity-0 group-hover:opacity-100 blur-3xl transition-opacity duration-500" />
                    
                    <div className="relative z-10 w-20 h-20 grayscale group-hover:grayscale-0 transition-all duration-500">
                       <img 
                         src={partner.logo} 
                         alt={partner.name} 
                         className="w-full h-full object-contain filter drop-shadow-[0_0_20px_rgba(255,255,255,0.05)]"
                       />
                    </div>
                    
                    <div className="relative z-10 flex flex-col items-center gap-1">
                       <span className="text-[10px] font-black uppercase tracking-widest text-slate-500 group-hover:text-white transition-colors">{partner.name}</span>
                       <span className="text-[7px] font-black text-purple-500/30 uppercase tracking-[0.5em] group-hover:text-purple-500 transition-colors">VERIFIED_ORG</span>
                    </div>
                 </a>
               ))}
            </div>
         </div>
      </section>

      {/* TECHNOLOGY CARDS */}
      <section id="tech" className="relative z-10 py-40 border-t border-white/5 bg-[#020202]">
         <div className="max-w-6xl mx-auto px-8 grid grid-cols-1 md:grid-cols-3 gap-16">
            {[
              { icon: Eye, title: "Forense Visual", detail: "Extração limpa de artefatos visíveis e ocultos do sistema NTFS." },
              { icon: Lock, title: "Kernel Shield", detail: "Validação de integridade do Windows via mapeamento de drivers." },
              { icon: Crosshair, title: "Heurística Real", detail: "Detecção baseada em comportamento e conexões C2/Proxy." }
            ].map((feat, i) => (
              <div key={i} className="space-y-6 group">
                 <div className="w-14 h-14 bg-white/[0.02] border border-white/5 rounded-2xl flex items-center justify-center text-purple-500 group-hover:border-purple-500/40 transition-colors duration-500 shadow-2xl">
                    <feat.icon size={26} />
                 </div>
                 <h3 className="text-xs font-black uppercase tracking-[0.2em]">{feat.title}</h3>
                 <p className="text-[11px] text-slate-600 leading-relaxed font-bold uppercase">{feat.detail}</p>
              </div>
            ))}
         </div>
      </section>

      {/* FOOTER */}
      <footer className="relative z-10 py-20 px-10 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-10 bg-[#010101]">
         <div className="flex items-center gap-4 opacity-20">
            <Shield size={16} className="text-purple-500" />
            <span className="text-[9px] font-black uppercase tracking-[0.5em]">LODARK ADVANCED FORENSICS 2026</span>
         </div>
         <span className="text-[8px] font-black uppercase tracking-[0.5em] text-slate-800 italic">Developed by Team Lodark • Forensic Intelligence Unit</span>
      </footer>
    </div>
  );
}
