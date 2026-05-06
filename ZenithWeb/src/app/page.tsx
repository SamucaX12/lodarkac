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
  Crosshair,
  MessageSquare,
  Package,
  Layers,
  ArrowRight
} from 'lucide-react';
import { useEffect, useState } from 'react';
import Navbar from '@/components/Navbar';

export default function Home() {
  const [scanText, setScanText] = useState('SISTEMA_OPERACIONAL...');

  useEffect(() => {
    const lines = [
      "BUSCANDO_HOOKS_DSE...",
      "SCANNING_PCI_BUS_0...",
      "VERIFICANDO_EFI_LOADER...",
      "LENDO_LOGS_BAM...",
      "DETECTANDO_STRINGS_SUSPEITAS...",
      "LODARK_AC_PRONTO."
    ];
    let i = 0;
    const interval = setInterval(() => {
      setScanText(lines[i % lines.length]);
      i++;
    }, 2500);
    return () => clearInterval(interval);
  }, []);

  const pricingPlans = [
    {
      name: "Lodark Personal",
      desc: "Licença individual para auditoria e perícia forense em tempo real.",
      price: "R$ 49,90",
      period: "/mês",
      features: ["Acesso Completo", "Detecção SAMU", "Suporte 24/7", "Atualizações Core"],
      color: "border-white/5"
    },
    {
      name: "Lodark Team",
      desc: "Gestão de equipe e licenças em massa para organizações de elite.",
      price: "R$ 149,90",
      period: "/mês",
      features: ["Até 5 Membros", "Dashboard Staff", "Geração de PINs", "Prioridade Alpha"],
      color: "border-purple-500/20 bg-purple-500/[0.02]"
    },
    {
      name: "Enterprise",
      desc: "Solução white-label completa para o seu próprio ecossistema.",
      price: "SOB CONSULTA",
      period: "",
      features: ["Custom Branding", "Yara Rules Privadas", "API Access", "Infra Dedicada"],
      color: "border-white/5"
    }
  ];

  return (
    <div className="relative w-full min-h-screen bg-[#020202] text-[#e2e8f0] font-sans selection:bg-purple-500/30 overflow-x-hidden">
      
      {/* OCEAN STYLE GLOWS */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[800px] h-[800px] bg-purple-600/[0.02] blur-[160px] rounded-full" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[600px] h-[600px] bg-violet-600/[0.02] blur-[160px] rounded-full" />
      </div>

      <Navbar />

      {/* HERO SECTION - OCEAN MINIMALIST */}
      <main className="relative z-10 flex flex-col items-center text-center px-6 pt-32 pb-40 max-w-7xl mx-auto">
        
        {/* STATUS BADGE */}
        <div className="inline-flex items-center gap-3 px-6 py-2 bg-white/[0.02] border border-white/5 rounded-full mb-16 animate-in fade-in slide-in-from-top-4 duration-1000">
           <div className="w-1.5 h-1.5 rounded-full bg-purple-500 animate-pulse shadow-[0_0_10px_rgba(168,85,247,0.8)]" />
           <span className="text-[9px] font-black tracking-[0.4em] uppercase text-slate-500">{scanText}</span>
        </div>

        <h1 className="text-[12vw] lg:text-7xl font-black tracking-tighter leading-[0.8] uppercase mb-12 text-white text-center">
          O TOPO DA<br />
          <span className="text-transparent bg-clip-text bg-gradient-to-b from-white to-white/30">FORENSE.</span>
        </h1>

        <p className="text-[10px] md:text-[11px] text-slate-600 max-w-lg font-bold leading-relaxed mb-20 uppercase tracking-[0.4em] px-4 opacity-50">
          A elite da perícia digital. Engenharia reversa e detecção de artefatos de última geração para o cenário competitivo.
        </p>

        <div className="flex flex-wrap items-center justify-center gap-8">
          <Link 
            href="/verify"
            className="px-14 py-5 bg-white text-black font-black rounded-3xl text-[10px] uppercase tracking-[0.4em] hover:bg-purple-600 hover:text-white transition-all duration-700 active:scale-95 shadow-[0_30px_60px_rgba(255,255,255,0.05)]"
          >
            VERIFICAR PIN
          </Link>
          <Link 
            href="/download"
            className="px-14 py-5 bg-white/[0.02] border border-white/10 text-white font-black rounded-3xl text-[10px] uppercase tracking-[0.4em] hover:border-purple-500/50 transition-all active:scale-95 backdrop-blur-3xl group"
          >
            BAIXAR SCANNER
            <ArrowRight size={14} className="inline ml-3 group-hover:translate-x-2 transition-transform" />
          </Link>
        </div>

        {/* PARTNERS SECTION */}
        <div className="mt-40 w-full animate-in fade-in duration-1000">
            <p className="text-[9px] font-black text-slate-800 uppercase tracking-[0.6em] mb-12">NOSSOS PARCEIROS ESTRATÉGICOS</p>
            <div className="flex flex-wrap items-center justify-center gap-x-16 gap-y-12 opacity-40">
                <div className="flex items-center gap-4 group hover:opacity-100 transition-opacity">
                    <Shield size={16} className="text-purple-600" />
                    <span className="text-[11px] font-black uppercase italic tracking-tighter text-white">ZK PVP</span>
                </div>
                <div className="flex items-center gap-4 group hover:opacity-100 transition-opacity">
                    <Shield size={16} className="text-purple-600" />
                    <span className="text-[11px] font-black uppercase italic tracking-tighter text-white">QUEBRADA RP</span>
                </div>
                <div className="flex items-center gap-4 group hover:opacity-100 transition-opacity">
                    <Shield size={16} className="text-purple-600" />
                    <span className="text-[11px] font-black uppercase italic tracking-tighter text-white">COMPLEXO ORG DE FF</span>
                </div>
                <div className="flex items-center gap-4 group hover:opacity-100 transition-opacity">
                    <Shield size={16} className="text-purple-600" />
                    <span className="text-[11px] font-black uppercase italic tracking-tighter text-white">TEAM LODARK</span>
                </div>
            </div>
        </div>

        {/* MOCKUP DASHBOARD - CLEANER THAN EVER */}
        <div className="mt-40 w-full max-w-6xl relative group animate-in slide-in-from-bottom-20 duration-1000 px-4">
           <div className="absolute -inset-1 bg-gradient-to-r from-purple-500/10 to-violet-500/10 rounded-[4rem] blur-3xl opacity-20 group-hover:opacity-40 transition-opacity" />
           <div className="relative bg-[#050505] border border-white/5 rounded-[4rem] p-16 overflow-hidden shadow-2xl">
              <div className="flex items-center justify-between mb-16 opacity-30">
                 <div className="flex gap-3">
                    <div className="w-3 h-3 rounded-full bg-purple-500" />
                    <div className="w-3 h-3 rounded-full bg-white/10" />
                    <div className="w-3 h-3 rounded-full bg-white/10" />
                 </div>
                 <span className="text-[10px] font-black uppercase tracking-[0.6em] italic text-slate-500">LODARK_AC_CORE_v2.8</span>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-20 text-left">
                  <div className="space-y-12">
                      <div className="space-y-4">
                          <span className="text-[10px] font-black text-slate-700 uppercase tracking-widest">Capacidade Preditiva</span>
                          <div className="flex items-end gap-3">
                              <span className="text-6xl font-black text-white italic tracking-tighter">99.8%</span>
                              <span className="text-[10px] text-purple-500 font-black mb-2 uppercase tracking-widest">ACCURACY</span>
                          </div>
                      </div>
                      <div className="p-10 bg-white/[0.01] border border-white/5 rounded-[3rem]">
                          <div className="flex items-center gap-4 mb-6">
                              <Zap size={18} className="text-purple-500" />
                              <span className="text-[11px] font-black text-slate-500 uppercase tracking-widest">Engine de Heurística</span>
                          </div>
                          <p className="text-xs font-bold text-slate-400 uppercase leading-relaxed tracking-wide">
                              Detecção avançada de artefatos SAMU, manipulação de discos, UEFI e traces de USN Journal em tempo real.
                          </p>
                      </div>
                  </div>
                  <div className="flex flex-col justify-between">
                      <div className="bg-[#080808] border border-white/5 rounded-[3rem] p-10 font-mono text-[10px] text-slate-600 space-y-4 shadow-inner">
                          <p className="text-purple-500"># LODARK_ACTIVE_SCAN</p>
                          <p>&gt; SYSMON_HOOKS: <span className="text-emerald-500 font-black">VALIDATED</span></p>
                          <p>&gt; CPL_HIJACK_CHECK: <span className="text-emerald-500 font-black">CLEAN</span></p>
                          <p>&gt; UEFI_TRACE: <span className="text-slate-400 font-black">READY</span></p>
                          <p className="animate-pulse">&gt; MONITORANDO_MEMORIA...</p>
                      </div>
                  </div>
              </div>
           </div>
        </div>
      </main>

      {/* PRICING SECTION - OCEAN STYLE */}
      <section id="pricing" className="relative z-10 py-60 border-t border-white/5">
          <div className="max-w-6xl mx-auto px-6">
              <div className="flex flex-col items-center text-center mb-32">
                  <h2 className="text-6xl font-black tracking-tighter uppercase italic text-white mb-6">PLANOS DE ACESSO</h2>
                  <div className="w-16 h-1.5 bg-purple-600 rounded-full mb-10" />
                  <p className="text-[11px] font-bold text-slate-600 uppercase tracking-[0.5em]">O PODER DA AUDITORIA NAS SUAS MÃOS</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
                  {pricingPlans.map((plan, i) => (
                      <div key={i} className={`p-12 rounded-[3.5rem] border ${plan.color} backdrop-blur-3xl flex flex-col items-center text-center group transition-all duration-700 hover:scale-[1.03] shadow-2xl`}>
                          <h3 className="text-xl font-black text-white uppercase italic tracking-tight mb-4">{plan.name}</h3>
                          <p className="text-[10px] font-bold text-slate-600 uppercase tracking-widest mb-10 leading-relaxed">{plan.desc}</p>
                          
                          <div className="mb-12 flex flex-col items-center">
                              <span className="text-5xl font-black text-white italic tracking-tighter">{plan.price}</span>
                              <span className="text-[10px] font-black text-slate-800 uppercase tracking-widest mt-2">{plan.period}</span>
                          </div>

                          <div className="space-y-5 w-full mb-12">
                              {plan.features.map((f, idx) => (
                                  <div key={idx} className="flex items-center justify-center gap-3">
                                      <ShieldCheck size={14} className="text-purple-600" />
                                      <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">{f}</span>
                                  </div>
                              ))}
                          </div>

                          <a 
                            href="https://discord.gg/teamlodark"
                            target="_blank"
                            className="w-full py-5 bg-white/[0.03] border border-white/10 text-white font-black rounded-3xl text-[10px] uppercase tracking-[0.3em] hover:bg-white hover:text-black transition-all duration-500"
                          >
                              ADQUIRIR AGORA
                          </a>
                      </div>
                  ))}
              </div>
          </div>
      </section>

      {/* FOOTER - PT-BR */}
      <footer className="relative z-10 py-32 px-10 border-t border-white/5 bg-[#010101]">
          <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-12">
            <div className="flex items-center gap-6 opacity-30">
                <Shield size={22} className="text-purple-600" />
                <div className="flex flex-col">
                    <span className="text-base font-black text-white tracking-tighter uppercase italic leading-none">LODARK<span className="text-purple-600">.AC</span></span>
                    <span className="text-[8px] font-black uppercase tracking-[0.4em] mt-1">Advanced Forensic Intelligence</span>
                </div>
            </div>
            <div className="flex flex-col items-center md:items-end gap-3 text-center md:text-right">
                <span className="text-[10px] font-black text-slate-800 uppercase tracking-[0.5em] italic">Desenvolvido por Team Lodark • 2026</span>
                <p className="text-[8px] font-bold text-slate-900 uppercase tracking-widest leading-relaxed max-w-xs">
                    Todos os direitos reservados. Auditoria privada de alta performance para cenários competitivos.
                </p>
            </div>
          </div>
      </footer>
    </div>
  );
}
