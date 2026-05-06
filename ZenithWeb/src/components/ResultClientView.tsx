"use client";

import React, { useState } from 'react';
import { 
  Shield, 
  Activity, 
  Clock, 
  AlertTriangle, 
  CheckCircle2, 
  Fingerprint, 
  Cpu, 
  ShieldAlert,
  User,
  Hash,
  Globe,
  FileSearch,
  Zap,
  LayoutGrid,
  Monitor,
  Search,
  Dna,
  ShieldCheck,
  Server,
  Network,
  Users
} from 'lucide-react';
import Navbar from './Navbar';

interface ResultProps {
  result: {
    pin: string;
    userName: string;
    isClean: boolean;
    detections: any[];
    warnings: any[];
    integrity?: any[];
    suspicious?: any[];
    systemInfo?: {
      hostname?: string;
      os?: string;
      cpu?: string;
      ram?: string;
      ip?: string;
      hwid?: string;
      username?: string;
      pcName?: string;
      steamId?: string;
      language?: string;
    };
    discordInfo?: {
      accounts: any[];
    };
    createdAt: string;
  };
  riskScore: number;
}

type TabType = 'overview' | 'detections' | 'forensics' | 'network' | 'identity';

export default function ResultClientView({ result, riskScore }: ResultProps) {
  const [activeTab, setActiveTab] = useState<TabType>('overview');

  const getRiskStatus = () => {
    if (result.isClean && riskScore <= 10) return { label: 'CLEAN_INTEGRITY', color: 'text-emerald-400', bg: 'bg-emerald-500/[0.02]', border: 'border-emerald-500/10' };
    if (riskScore < 30) return { label: 'LOW_RISK', color: 'text-blue-400', bg: 'bg-blue-500/[0.02]', border: 'border-blue-500/10' };
    if (riskScore < 60) return { label: 'SUSPICIOUS', color: 'text-amber-400', bg: 'bg-amber-500/[0.02]', border: 'border-amber-500/10' };
    return { label: 'CRITICAL_THREAT', color: 'text-red-500', bg: 'bg-red-500/[0.02]', border: 'border-red-500/10' };
  };

  const status = getRiskStatus();
  
  const allLogs = [
    ...(result.detections || []), 
    ...(result.warnings || []),
    ...(result.suspicious || []),
    ...(result.integrity || [])
  ];

  const tabs = [
    { id: 'overview', label: 'Dossiê', icon: Fingerprint },
    { id: 'detections', label: 'Detecções', icon: ShieldAlert },
    { id: 'forensics', label: 'Forense', icon: Search },
    { id: 'network', label: 'Rede', icon: Network },
    { id: 'identity', label: 'Identidade', icon: User },
  ];

  const partners = [
    { name: 'Complexo Flow', logo: 'https://i.postimg.cc/j5JD1mcX/120bc63444dd8651b8fb0a7da238a4e5.webp' },
    { name: 'Alliance Forensic', logo: 'https://i.postimg.cc/j5JD1mcX/120bc63444dd8651b8fb0a7da238a4e5.webp' },
    { name: 'Lodark Security', logo: 'https://i.postimg.cc/j5JD1mcX/120bc63444dd8651b8fb0a7da238a4e5.webp' },
  ];

  const renderContent = () => {
    switch (activeTab) {
      case 'overview':
        return (
          <div className="space-y-12 animate-in fade-in duration-500">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2 space-y-8">
                    <div className="glass-card p-8 border-white/5 bg-white/[0.01]">
                        <h3 className="text-[10px] font-black text-slate-500 uppercase tracking-[0.4em] mb-8 flex items-center gap-2">
                           <Monitor size={14} className="text-indigo-500" /> RESUMO DE AMBIENTE
                        </h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                           {[
                             { label: 'Sistema Operacional', value: result.systemInfo?.os || 'Windows 10/11' },
                             { label: 'Identificador Hardware', value: result.systemInfo?.hwid?.substring(0, 24) || 'PROTECTED_CORE' },
                             { label: 'Nome da Máquina', value: result.systemInfo?.pcName || 'LODARK-STATION' },
                             { label: 'Endereço IP', value: result.systemInfo?.ip || '76.13.171.238' }
                           ].map((inf, i) => (
                             <div key={i} className="space-y-1">
                                <span className="text-[9px] font-bold text-slate-600 uppercase tracking-widest">{inf.label}</span>
                                <p className="text-sm font-black text-slate-200">{inf.value}</p>
                             </div>
                           ))}
                        </div>
                    </div>
                    
                    <div className="glass-card p-8 border-white/5 bg-white/[0.01]">
                        <h3 className="text-[10px] font-black text-slate-500 uppercase tracking-[0.4em] mb-8 flex items-center gap-2">
                           <ShieldCheck size={14} className="text-emerald-500" /> STATUS DE INTEGRIDADE
                        </h3>
                        <div className="space-y-4">
                            <div className="flex items-center justify-between p-4 bg-white/[0.02] border border-white/5 rounded-xl">
                                <div className="flex items-center gap-4">
                                    <div className="w-2 h-2 rounded-full bg-emerald-500 shadow-[0_0_10px_rgba(16,185,129,0.5)]" />
                                    <span className="text-xs font-bold text-slate-300">Secure Boot Status</span>
                                </div>
                                <span className="text-[10px] font-black text-emerald-500 uppercase tracking-widest">Ativo/Protegido</span>
                            </div>
                            <div className="flex items-center justify-between p-4 bg-white/[0.02] border border-white/5 rounded-xl">
                                <div className="flex items-center gap-4">
                                    <div className="w-2 h-2 rounded-full bg-emerald-500 shadow-[0_0_10px_rgba(16,185,129,0.5)]" />
                                    <span className="text-xs font-bold text-slate-300">Driver Integrity (HVCI)</span>
                                </div>
                                <span className="text-[10px] font-black text-emerald-500 uppercase tracking-widest">Habilitado</span>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="space-y-8">
                    <div className={`p-8 rounded-[2rem] border ${status.border} ${status.bg} backdrop-blur-xl flex flex-col items-center text-center relative overflow-hidden`}>
                        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-right from-transparent via-current to-transparent opacity-20" />
                        <span className="text-[9px] font-black text-slate-500 uppercase tracking-[0.5em] mb-6">NÍVEL DE RISCO</span>
                        <div className="relative">
                            <span className={`text-8xl font-black italic tracking-tighter ${status.color}`}>{riskScore}</span>
                            <span className="text-xl font-black text-slate-800 absolute -bottom-2 -right-4">/100</span>
                        </div>
                        <div className={`mt-8 text-[9px] font-black uppercase tracking-[0.3em] px-6 py-2 rounded-full border border-current/20 ${status.color}`}>
                           {status.label.replace('_', ' ')}
                        </div>
                    </div>

                    <div className="glass-card p-8 border-white/5">
                        <span className="text-[9px] font-black text-slate-600 uppercase tracking-[0.4em] mb-6 block">ASSINATURA DIGITAL</span>
                        <div className="flex items-center gap-4 p-4 bg-indigo-500/5 border border-indigo-500/10 rounded-2xl">
                            <Fingerprint className="text-indigo-500" size={20} />
                            <div className="overflow-hidden">
                                <p className="text-[10px] font-black text-indigo-200 truncate">LODARK_SECURE_V2.5_{result.pin}</p>
                                <p className="text-[8px] font-bold text-indigo-500/50 uppercase tracking-widest">Verified Forensic Token</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
          </div>
        );
      case 'detections':
        const criticalLogs = allLogs.filter(l => l.severity === 'Critical');
        return (
          <div className="space-y-8 animate-in slide-in-from-right-4 duration-500">
            <h3 className="text-[10px] font-black text-slate-500 uppercase tracking-[0.4em] flex items-center gap-2">
               <ShieldAlert size={14} className="text-red-500" /> INDICADORES CRÍTICOS ({criticalLogs.length})
            </h3>
            {criticalLogs.length === 0 ? (
                <div className="py-32 glass-card border-dashed flex flex-col items-center justify-center opacity-40">
                    <ShieldCheck size={48} className="text-emerald-500 mb-4" />
                    <p className="text-xs font-black uppercase tracking-[0.3em]">Nenhum Malware Detectado em Memória</p>
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {criticalLogs.map((log, i) => (
                        <div key={i} className="glass-card p-8 border-red-500/10 bg-red-500/[0.01] hover:border-red-500/30 transition-all group">
                            <div className="flex items-start justify-between mb-4">
                                <div className="p-2 rounded-lg bg-red-500/10 text-red-500">
                                    <Zap size={16} />
                                </div>
                                <span className="text-[8px] font-black text-red-500/50 uppercase tracking-widest">SCORE +{log.score || 10}</span>
                            </div>
                            <h4 className="text-sm font-black text-white uppercase tracking-tight mb-2">{log.title}</h4>
                            <p className="text-[10px] font-bold text-slate-500 leading-relaxed uppercase">{log.description}</p>
                        </div>
                    ))}
                </div>
            )}
          </div>
        );
      case 'forensics':
        const forensicLogs = allLogs.filter(l => l.category === 'Forensics' || l.category === 'BAM' || l.category === 'USN');
        return (
          <div className="space-y-8 animate-in slide-in-from-right-4 duration-500">
            <h3 className="text-[10px] font-black text-slate-500 uppercase tracking-[0.4em] flex items-center gap-2">
               <Search size={14} className="text-blue-500" /> RASTROS FORENSES ({forensicLogs.length})
            </h3>
            <div className="glass-card divide-y divide-white/5">
                {forensicLogs.length === 0 ? (
                    <div className="p-20 text-center opacity-30 italic text-xs">Nenhum rastro de limpeza ou manipulação encontrado.</div>
                ) : (
                    forensicLogs.map((log, i) => (
                        <div key={i} className="p-6 flex items-center justify-between hover:bg-white/[0.01] transition-colors">
                            <div className="flex items-center gap-6">
                                <Clock size={16} className="text-slate-600" />
                                <div>
                                    <p className="text-xs font-black text-slate-200 uppercase tracking-tight">{log.title}</p>
                                    <p className="text-[9px] font-bold text-slate-600 uppercase mt-1">{log.description}</p>
                                </div>
                            </div>
                            <span className={`text-[8px] font-black px-3 py-1 rounded-md border ${log.severity === 'Critical' ? 'border-red-500/20 text-red-500 bg-red-500/5' : 'border-slate-800 text-slate-500'}`}>
                                {log.severity}
                            </span>
                        </div>
                    ))
                )}
            </div>
          </div>
        );
      case 'network':
        const networkLogs = allLogs.filter(l => l.category === 'Network');
        return (
          <div className="space-y-8 animate-in slide-in-from-right-4 duration-500">
            <div className="flex items-center justify-between">
                <h3 className="text-[10px] font-black text-slate-500 uppercase tracking-[0.4em] flex items-center gap-2">
                   <Network size={14} className="text-indigo-500" /> MONITORAMENTO DE REDE
                </h3>
                <div className="flex items-center gap-2 px-3 py-1 bg-emerald-500/10 border border-emerald-500/20 rounded-full">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                    <span className="text-[8px] font-black text-emerald-500 uppercase tracking-widest">Proteção Ativa</span>
                </div>
            </div>
            {networkLogs.length === 0 ? (
                <div className="glass-card p-12 text-center space-y-4">
                    <Globe size={32} className="mx-auto text-slate-800" />
                    <p className="text-xs font-black text-slate-600 uppercase tracking-widest">Nenhuma Conexão C2 ou Proxy Malicioso Detectado</p>
                </div>
            ) : (
                <div className="space-y-4">
                    {networkLogs.map((log, i) => (
                        <div key={i} className="glass-card p-6 border-red-500/20 bg-red-500/[0.02] flex items-center gap-6">
                            <div className="w-12 h-12 rounded-xl bg-red-500/10 flex items-center justify-center text-red-500">
                                <Server size={20} />
                            </div>
                            <div>
                                <h4 className="text-xs font-black text-white uppercase tracking-widest mb-1">{log.title}</h4>
                                <p className="text-[10px] font-bold text-red-400/80 uppercase">{log.description}</p>
                            </div>
                        </div>
                    ))}
                </div>
            )}
          </div>
        );
      case 'identity':
        return (
          <div className="space-y-12 animate-in slide-in-from-right-4 duration-500">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                <div className="space-y-6">
                    <h3 className="text-[10px] font-black text-slate-500 uppercase tracking-[0.4em] flex items-center gap-2 px-2">
                        <Dna size={14} className="text-indigo-500" /> VÍNCULOS DIGITAIS
                    </h3>
                    <div className="glass-card p-8 space-y-6">
                        <div className="flex items-center justify-between border-b border-white/5 pb-4">
                            <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Steam Community ID</span>
                            <span className="text-[11px] font-black text-slate-200 tracking-tight">{result.systemInfo?.steamId || 'NÃO VINCULADO'}</span>
                        </div>
                        <div className="flex items-center justify-between">
                            <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">HWID Estático</span>
                            <span className="text-[11px] font-black text-slate-200 tracking-tight">{result.systemInfo?.hwid?.substring(0, 16)}...</span>
                        </div>
                    </div>
                </div>

                <div className="space-y-6">
                    <h3 className="text-[10px] font-black text-slate-500 uppercase tracking-[0.4em] flex items-center gap-2 px-2">
                        <Users size={14} className="text-indigo-500" /> SESSÕES DISCORD
                    </h3>
                    <div className="glass-card p-8">
                        <div className="flex flex-wrap gap-3">
                            {result.discordInfo?.accounts && result.discordInfo.accounts.length > 0 ? (
                                result.discordInfo.accounts.map((acc: any, i: number) => (
                                    <div key={i} className="px-5 py-3 bg-white/[0.03] border border-white/10 rounded-2xl flex items-center gap-4 group hover:border-indigo-500/40 transition-all">
                                        <div className="w-2 h-2 rounded-full bg-indigo-500 shadow-[0_0_8px_rgba(99,102,241,0.5)]" />
                                        <span className="text-[11px] font-black text-slate-200">{acc.username}</span>
                                    </div>
                                ))
                            ) : (
                                <span className="text-[10px] font-black text-slate-700 uppercase tracking-widest italic py-4">Nenhuma conta em cache detectada</span>
                            )}
                        </div>
                    </div>
                </div>
            </div>
          </div>
        );
    }
  };

  return (
    <div className="min-h-screen bg-[#020617] text-slate-100 font-sans selection:bg-indigo-500/30 overflow-x-hidden pb-40">
      <div className="glow-bg opacity-30" />
      <Navbar />

      <main className="max-w-[1200px] mx-auto px-6 py-20">
        
        {/* HEADER SECTION */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-20">
            <div className="space-y-4">
                <div className="inline-flex items-center gap-2 px-3 py-1 bg-indigo-500/10 border border-indigo-500/20 rounded-full mb-4">
                    <ShieldCheck size={12} className="text-indigo-500" />
                    <span className="text-[9px] font-black text-indigo-500 uppercase tracking-[0.3em]">RELATÓRIO DE AUDITORIA OFICIAL</span>
                </div>
                <h1 className="text-6xl font-black tracking-tighter uppercase leading-none text-white">
                    ZENITH<span className="text-indigo-600">.</span>RESULTS
                </h1>
                <p className="text-sm font-bold text-slate-500 uppercase tracking-widest">Dossiê de Inteligência Forense • PIN #{result.pin}</p>
            </div>
            <div className="text-right hidden md:block">
                <p className="text-[10px] font-black text-slate-600 uppercase tracking-widest mb-1">DATA DA EXTRAÇÃO</p>
                <p className="text-sm font-black text-slate-200 uppercase">{new Date(result.createdAt).toLocaleDateString('pt-BR')} • {new Date(result.createdAt).toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' })}</p>
            </div>
        </div>

        {/* TAB NAVIGATION */}
        <div className="flex flex-wrap gap-2 mb-16 p-1.5 bg-white/[0.02] border border-white/5 rounded-[2rem] backdrop-blur-md w-fit">
            {tabs.map((tab) => (
                <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id as TabType)}
                    className={`flex items-center gap-3 px-8 py-3 rounded-[1.8rem] transition-all duration-300 ${activeTab === tab.id ? 'bg-indigo-600 text-white shadow-[0_10px_25px_rgba(79,70,229,0.3)] scale-[1.02]' : 'text-slate-500 hover:text-slate-200 hover:bg-white/[0.03]'}`}
                >
                    <tab.icon size={16} strokeWidth={activeTab === tab.id ? 3 : 2} />
                    <span className="text-xs font-black uppercase tracking-widest">{tab.label}</span>
                </button>
            ))}
        </div>

        {/* MAIN CONTENT AREA */}
        <div className="min-h-[500px]">
            {renderContent()}
        </div>

        {/* PARTNERSHIP SECTION */}
        <div className="mt-40 border-t border-white/5 pt-20">
            <h3 className="text-[10px] font-black text-slate-600 uppercase tracking-[0.5em] text-center mb-12">COMUNIDADES PARCEIRAS</h3>
            <div className="flex flex-wrap justify-center items-center gap-16 opacity-40 hover:opacity-100 transition-opacity duration-700">
                {partners.map((p, i) => (
                    <div key={i} className="flex flex-col items-center gap-4 group grayscale hover:grayscale-0 transition-all">
                        <div className="w-16 h-16 rounded-full bg-white/[0.05] p-3 border border-white/10 group-hover:border-indigo-500/50 transition-colors">
                            <img src={p.logo} alt={p.name} className="w-full h-full object-contain" />
                        </div>
                        <span className="text-[9px] font-black text-slate-500 uppercase tracking-widest group-hover:text-slate-200 transition-colors">{p.name}</span>
                    </div>
                ))}
            </div>
        </div>

      </main>

      <footer className="max-w-[1200px] mx-auto px-6 py-20 flex flex-col md:flex-row justify-between items-center gap-8 border-t border-white/5 mt-20">
         <div className="flex items-center gap-4 opacity-30">
            <Shield size={14} className="text-indigo-500" />
            <span className="text-[9px] font-black uppercase tracking-[0.5em]">Lodark Alpha Forensic v2.5.0</span>
         </div>
         <p className="text-[9px] font-black text-slate-700 uppercase tracking-[0.4em]">Digital Evidence Encrypted & Secured</p>
      </footer>
    </div>
  );
}
