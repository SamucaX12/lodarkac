'use client';

import Link from 'next/link';
import { 
  Shield, 
  ArrowRight,
  ShieldCheck, 
  Zap,
} from 'lucide-react';
import { useEffect, useState } from 'react';
import Navbar from '@/components/Navbar';
import { useLanguage } from '@/contexts/LanguageContext';

export default function Home() {
  const { t } = useLanguage();
  const [scanText, setScanText] = useState('SISTEMA_OPERACIONAL...');

  useEffect(() => {
    const lines = [
      "BUSCANDO_HOOKS_DSE...",
      "SCANNING_PCI_BUS_0...",
      "VERIFICANDO_EFI_LOADER...",
      "LENDO_LOGS_BAM...",
      "DETECTANDO_STRINGS_SUSPEITAS...",
      t('hero.status')
    ];
    let i = 0;
    const interval = setInterval(() => {
      setScanText(lines[i % lines.length]);
      i++;
    }, 2500);
    return () => clearInterval(interval);
  }, [t]);

  const pricingPlans = [
    {
      name: "Lodark Personal",
      desc: t('pricing.personal.desc'),
      price: "R$ 49,90",
      period: t('pricing.period.month'),
      features: [t('feat.fullAccess'), t('feat.samuDetect'), t('feat.support'), t('feat.coreUpdates')],
      color: "border-white/5"
    },
    {
      name: "Lodark Team",
      desc: t('pricing.team.desc'),
      price: "R$ 149,90",
      period: t('pricing.period.month'),
      features: [t('feat.members'), t('feat.staffDash'), t('feat.pinGen'), t('feat.alphaPriority')],
      color: "border-purple-500/20 bg-purple-500/[0.02]"
    },
    {
      name: "Enterprise",
      desc: t('pricing.enterprise.desc'),
      price: t('pricing.price.consult'),
      period: "",
      features: [t('feat.customBrand'), t('feat.yaraRules'), t('feat.apiAccess'), t('feat.dedicInfra')],
      color: "border-white/5"
    }
  ];

  return (
    <div className="relative w-full min-h-screen bg-[#050505] text-[#e2e8f0] font-sans selection:bg-purple-500/30 overflow-x-hidden">
      
      {/* MINIMALIST BACKGROUND GLOWS */}
      <div className="fixed inset-0 z-0 pointer-events-none flex items-center justify-center">
        <div className="absolute top-[-20%] left-[-10%] w-[1000px] h-[1000px] bg-purple-600/[0.015] blur-[200px] rounded-full" />
      </div>

      <Navbar />

      {/* HERO SECTION - NAPSE STYLE (TOTAL CLEAN) */}
      <main className="relative z-10 flex flex-col items-center text-center px-6 pt-32 pb-40 max-w-7xl mx-auto">
        
        {/* STATUS BADGE */}
        <div className="inline-flex items-center gap-3 px-6 py-2 bg-white/[0.01] border border-white/5 rounded-full mb-16 animate-in fade-in slide-in-from-top-4 duration-1000">
           <div className="w-1.5 h-1.5 rounded-full bg-purple-500 animate-pulse shadow-[0_0_10px_rgba(168,85,247,0.8)]" />
           <span className="text-[9px] font-black tracking-[0.4em] uppercase text-slate-500">{scanText}</span>
        </div>

        <h1 className="text-[12vw] lg:text-[6rem] font-black tracking-tighter leading-[0.9] uppercase mb-10 text-white text-center">
          {t('hero.title1')}<br />
          <span className="text-transparent bg-clip-text bg-gradient-to-b from-white to-white/40">{t('hero.title2')}</span>
        </h1>

        <p className="text-[10px] md:text-[11px] text-slate-500 max-w-xl font-bold leading-relaxed mb-20 uppercase tracking-[0.3em] px-4 opacity-70">
          {t('hero.subtitle')}
        </p>

        <div className="flex flex-wrap items-center justify-center gap-8">
          <Link 
            href="/verify"
            className="px-14 py-5 bg-white text-black font-black rounded-full text-[10px] uppercase tracking-[0.3em] hover:bg-purple-600 hover:text-white transition-all duration-700 active:scale-95 shadow-[0_0_40px_rgba(255,255,255,0.05)]"
          >
            {t('common.verify')}
          </Link>
          <Link 
            href="/download"
            className="px-14 py-5 bg-transparent border border-white/10 text-white font-black rounded-full text-[10px] uppercase tracking-[0.3em] hover:bg-white/[0.02] hover:border-purple-500/50 transition-all active:scale-95 group"
          >
            {t('common.download')}
            <ArrowRight size={14} className="inline ml-3 group-hover:translate-x-2 transition-transform opacity-50" />
          </Link>
        </div>

        {/* MOCKUP DASHBOARD - CLEANER THAN EVER */}
        <div className="mt-40 w-full max-w-6xl relative group animate-in slide-in-from-bottom-20 duration-1000 px-4">
           <div className="relative bg-[#080808] border border-white/[0.03] rounded-[3rem] p-16 overflow-hidden shadow-2xl">
              <div className="flex items-center justify-between mb-16 opacity-40">
                 <div className="flex gap-3">
                    <div className="w-2.5 h-2.5 rounded-full bg-purple-500" />
                    <div className="w-2.5 h-2.5 rounded-full bg-white/10" />
                    <div className="w-2.5 h-2.5 rounded-full bg-white/10" />
                 </div>
                 <span className="text-[9px] font-black uppercase tracking-[0.6em] text-slate-500">LODARK_AC_CORE_v2.8</span>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-20 text-left">
                  <div className="space-y-12">
                      <div className="space-y-4">
                          <span className="text-[10px] font-black text-slate-700 uppercase tracking-widest">{t('mockup.accuracy')}</span>
                          <div className="flex items-end gap-3">
                              <span className="text-6xl font-black text-white tracking-tighter">99.8%</span>
                              <span className="text-[10px] text-purple-500 font-black mb-2 uppercase tracking-widest">{t('mockup.accuracyLabel')}</span>
                          </div>
                      </div>
                      <div className="p-10 bg-[#0a0a0a] border border-white/[0.02] rounded-[2rem]">
                          <div className="flex items-center gap-4 mb-6">
                              <Zap size={16} className="text-purple-500" />
                              <span className="text-[11px] font-black text-slate-400 uppercase tracking-widest">{t('mockup.engineTitle')}</span>
                          </div>
                          <p className="text-xs font-bold text-slate-500 uppercase leading-relaxed tracking-wide">
                              {t('mockup.engineDesc')}
                          </p>
                      </div>
                  </div>
                  <div className="flex flex-col justify-between">
                      <div className="bg-[#030303] border border-white/[0.02] rounded-[2rem] p-10 font-mono text-[10px] text-slate-600 space-y-4 shadow-inner">
                          <p className="text-purple-500"># LODARK_ACTIVE_SCAN</p>
                          <p>&gt; SYSMON_HOOKS: <span className="text-emerald-500 font-black">VALIDATED</span></p>
                          <p>&gt; CPL_HIJACK_CHECK: <span className="text-emerald-500 font-black">CLEAN</span></p>
                          <p>&gt; UEFI_TRACE: <span className="text-slate-400 font-black">READY</span></p>
                          <p className="animate-pulse opacity-50">&gt; MONITORANDO_MEMORIA...</p>
                      </div>
                  </div>
              </div>
           </div>
        </div>

        {/* TEAM & SCANNERS SECTION (NEW) */}
        <div className="mt-40 w-full animate-in fade-in duration-1000">
            <h3 className="text-[10px] font-black text-slate-600 uppercase tracking-[0.5em] mb-16">{t('team.title')}</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                {/* Scanner Card */}
                <a href="https://discord.gg/7ePKTVDanJ" target="_blank" rel="noreferrer" className="flex flex-col items-center justify-center p-12 bg-[#080808] border border-white/[0.03] rounded-[2.5rem] group hover:border-purple-500/20 transition-all duration-500">
                    <img src="https://i.postimg.cc/QNBkZ4CL/LOGO-LODARK.png" alt="Lodark Scanner" className="h-16 mb-8 filter grayscale group-hover:grayscale-0 transition-all duration-500 opacity-60 group-hover:opacity-100" />
                    <span className="text-xs font-black text-white uppercase tracking-widest mb-2">{t('team.scanner')}</span>
                    <span className="text-[9px] font-bold text-slate-600 uppercase tracking-[0.3em]">Discord Network</span>
                </a>
                
                {/* Devs Card */}
                <div className="flex flex-col items-center justify-center p-12 bg-[#080808] border border-white/[0.03] rounded-[2.5rem] group hover:border-purple-500/20 transition-all duration-500">
                    <div className="flex items-center gap-6 mb-8">
                        <img src="https://i.postimg.cc/cJ2CRmSm/image.png" alt="Samu Ant Bypass" className="w-16 h-16 rounded-full object-cover border border-white/5 filter grayscale group-hover:grayscale-0 transition-all duration-500 opacity-60 group-hover:opacity-100" />
                        <img src="https://i.postimg.cc/Dz8m4NRR/image.png" alt="!ⱽᵘˡᵍᵒ 𝖑𝖔𝖉𝖆𝖗𝐤.𝖉𝖑𝖑" className="w-16 h-16 rounded-full object-cover border border-white/5 filter grayscale group-hover:grayscale-0 transition-all duration-500 opacity-60 group-hover:opacity-100" />
                    </div>
                    <span className="text-xs font-black text-white uppercase tracking-widest mb-2">{t('team.devs')}</span>
                    <span className="text-[9px] font-bold text-slate-600 uppercase tracking-[0.3em]">Samu Ant Bypass & !ⱽᵘˡᵍᵒ 𝖑𝖔𝖉𝖆𝖗𝐤.𝖉𝖑𝖑</span>
                </div>
            </div>
        </div>

        {/* PARTNERS SECTION */}
        <div id="partners" className="mt-40 w-full animate-in fade-in duration-1000">
            <h3 className="text-[10px] font-black text-slate-600 uppercase tracking-[0.5em] mb-16">{t('partners.title')}</h3>
            <div className="flex flex-wrap items-center justify-center gap-x-16 gap-y-12">
                
                <a href="https://discord.gg/zkpvpgg" target="_blank" rel="noreferrer" className="flex flex-col items-center gap-4 group opacity-40 hover:opacity-100 transition-all duration-500">
                    <img src="https://i.postimg.cc/qMSRKwXw/image.png" alt="ZK PVP" className="h-12 filter grayscale group-hover:grayscale-0 transition-all" />
                    <span className="text-[9px] font-black uppercase tracking-widest text-slate-400 group-hover:text-white">ZK PVP</span>
                </a>
                
                <a href="https://discord.gg/SFNwYXzXNk" target="_blank" rel="noreferrer" className="flex flex-col items-center gap-4 group opacity-40 hover:opacity-100 transition-all duration-500">
                    <img src="https://i.postimg.cc/Znjwg0jB/image.png" alt="QUEBRADA RP" className="h-12 filter grayscale group-hover:grayscale-0 transition-all" />
                    <span className="text-[9px] font-black uppercase tracking-widest text-slate-400 group-hover:text-white">QUEBRADA RP</span>
                </a>
                
                <a href="https://discord.gg/complexoesports" target="_blank" rel="noreferrer" className="flex flex-col items-center gap-4 group opacity-40 hover:opacity-100 transition-all duration-500">
                    {/* Placeholder for Complexo if no image provided, using Shield icon as fallback if needed or just text */}
                    <div className="h-12 w-12 flex items-center justify-center border border-white/10 rounded-xl group-hover:border-purple-500/50 transition-colors">
                        <Shield size={20} className="text-slate-600 group-hover:text-purple-500" />
                    </div>
                    <span className="text-[9px] font-black uppercase tracking-widest text-slate-400 group-hover:text-white">COMPLEXO ORG</span>
                </a>

                <a href="https://discord.gg/7ePKTVDanJ" target="_blank" rel="noreferrer" className="flex flex-col items-center gap-4 group opacity-40 hover:opacity-100 transition-all duration-500">
                    <div className="h-12 w-12 flex items-center justify-center border border-white/10 rounded-xl group-hover:border-purple-500/50 transition-colors">
                        <Shield size={20} className="text-slate-600 group-hover:text-purple-500" />
                    </div>
                    <span className="text-[9px] font-black uppercase tracking-widest text-slate-400 group-hover:text-white">EQUIPE LODARK (FF)</span>
                </a>

                <a href="https://discord.gg/7ePKTVDanJ" target="_blank" rel="noreferrer" className="flex flex-col items-center gap-4 group opacity-40 hover:opacity-100 transition-all duration-500">
                    <img src="https://i.postimg.cc/GmB1F1hJ/image.png" alt="Lodark Team" className="h-12 filter grayscale group-hover:grayscale-0 transition-all" />
                    <span className="text-[9px] font-black uppercase tracking-widest text-slate-400 group-hover:text-white">EQUIPE SS (LODARK TEAM)</span>
                </a>

            </div>
        </div>

      </main>

      {/* PRICING SECTION - CLEAN STYLE */}
      <section id="pricing" className="relative z-10 py-60 border-t border-white/[0.02]">
          <div className="max-w-6xl mx-auto px-6">
              <div className="flex flex-col items-center text-center mb-32">
                  <h2 className="text-5xl font-black tracking-tighter uppercase text-white mb-6">{t('pricing.title')}</h2>
                  <div className="w-16 h-1 bg-purple-600 rounded-full mb-10" />
                  <p className="text-[10px] font-bold text-slate-600 uppercase tracking-[0.4em]">{t('pricing.subtitle')}</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
                  {pricingPlans.map((plan, i) => (
                      <div key={i} className={`p-12 rounded-[2.5rem] border ${plan.color} bg-[#080808] flex flex-col items-center text-center group transition-all duration-700 hover:scale-[1.02] shadow-2xl hover:border-white/10`}>
                          <h3 className="text-lg font-black text-white uppercase tracking-widest mb-4">{plan.name}</h3>
                          <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-10 leading-relaxed">{plan.desc}</p>
                          
                          <div className="mb-12 flex flex-col items-center">
                              <span className="text-4xl font-black text-white tracking-tighter">{plan.price}</span>
                              <span className="text-[9px] font-black text-slate-700 uppercase tracking-[0.3em] mt-2">{plan.period}</span>
                          </div>

                          <div className="space-y-5 w-full mb-12">
                              {plan.features.map((f, idx) => (
                                  <div key={idx} className="flex items-center justify-center gap-3">
                                      <ShieldCheck size={14} className="text-purple-600/50 group-hover:text-purple-500 transition-colors" />
                                      <span className="text-[9px] font-bold text-slate-400 uppercase tracking-widest">{f}</span>
                                  </div>
                              ))}
                          </div>

                          <a 
                            href="https://discord.gg/7ePKTVDanJ"
                            target="_blank"
                            className="w-full py-4 bg-white/[0.02] border border-white/5 text-white font-black rounded-full text-[9px] uppercase tracking-[0.3em] hover:bg-white hover:text-black transition-all duration-500"
                          >
                              {t('common.buyNow')}
                          </a>
                      </div>
                  ))}
              </div>
          </div>
      </section>

      {/* FOOTER */}
      <footer className="relative z-10 py-24 px-10 border-t border-white/[0.02] bg-[#030303]">
          <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-12">
            <div className="flex items-center gap-6 opacity-30">
                <Shield size={20} className="text-purple-600" />
                <div className="flex flex-col">
                    <span className="text-sm font-black text-white tracking-widest uppercase leading-none">LODARK<span className="text-purple-600">.AC</span></span>
                    <span className="text-[7px] font-black uppercase tracking-[0.4em] mt-1">Advanced Forensic Intelligence</span>
                </div>
            </div>
            <div className="flex flex-col items-center md:items-end gap-3 text-center md:text-right">
                <span className="text-[9px] font-black text-slate-700 uppercase tracking-[0.5em]">{t('footer.developedBy')}</span>
                <p className="text-[8px] font-bold text-slate-800 uppercase tracking-widest leading-relaxed max-w-xs">
                    {t('footer.rights')}
                </p>
            </div>
          </div>
      </footer>
    </div>
  );
}
