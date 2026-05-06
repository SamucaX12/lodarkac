"use client";

import React from 'react';
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
  Dna
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

export default function ResultClientView({ result, riskScore }: ResultProps) {
  const getRiskStatus = () => {
    if (result.isClean && riskScore <= 10) return { label: 'CLEAN_INTEGRITY', color: 'text-emerald-500', bg: 'bg-emerald-500/[0.02]', border: 'border-emerald-500/10 shadow-[0_0_20px_rgba(16,185,129,0.05)]' };
    if (riskScore < 30) return { label: 'LOW_RISK', color: 'text-indigo-500', bg: 'bg-indigo-500/[0.02]', border: 'border-indigo-500/10 shadow-[0_0_20px_rgba(99,102,241,0.05)]' };
    if (riskScore < 60) return { label: 'SUSPICIOUS', color: 'text-amber-500', bg: 'bg-amber-500/[0.02]', border: 'border-amber-500/10 shadow-[0_0_20px_rgba(245,158,11,0.05)]' };
    return { label: 'CRITICAL_THREAT', color: 'text-red-500', bg: 'bg-red-500/[0.02]', border: 'border-red-500/10 shadow-[0_0_20px_rgba(239,68,68,0.05)]' };
  };

  const status = getRiskStatus();
  
  // Agrupar logs por categoria de forma automática e limpa
  const allLogs = [
    ...(result.detections || []), 
    ...(result.warnings || []),
    ...(result.suspicious || []),
    ...(result.integrity || [])
  ];

  const categories = [
    { id: 'DMA', label: 'Hardware Layer', icon: Cpu },
    { id: 'Bypass', label: 'Bypass Analysis', icon: Shield },
    { id: 'Methods', label: 'Injection Logic', icon: Zap },
    { id: 'Cheats', label: 'Cheat Artifacts', icon: LayoutGrid },
    { id: 'Services', label: 'System Services', icon: Activity },
    { id: 'BAM', label: 'Activity Logs', icon: Clock },
    { id: 'Forensics', label: 'Forensic Traces', icon: Search }
  ];

  return (
    <div className="min-h-screen bg-[#050505] text-[#e0e0e0] font-sans selection:bg-indigo-500/30 overflow-x-hidden pb-40">
      <Navbar />

      <main className="max-w-[1100px] mx-auto px-6 py-20 animate-in fade-in slide-in-from-bottom-4 duration-1000">
        
        {/* UPPER DOSSIER HEADER */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-12 mb-24 border-b border-white/5 pb-16">
           <div className="space-y-6">
              <div className="flex items-center gap-3">
                 <div className="w-8 h-8 rounded-lg bg-indigo-600 flex items-center justify-center text-white shadow-[0_0_20px_rgba(79,70,229,0.3)]">
                    <Fingerprint size={16} />
                 </div>
                 <span className="text-[10px] font-black text-gray-700 uppercase tracking-[0.5em]">Forensic Dossier Alpha</span>
              </div>
              <h1 className="text-5xl font-black tracking-tighter uppercase leading-none text-white">
                 LODARK<span className="text-indigo-600">.</span>SYSTEMS
              </h1>
              <div className="flex flex-wrap gap-x-8 gap-y-4">
                 {[
                   { label: 'Subject', value: result.systemInfo?.username || result.userName || 'Unknown', icon: User },
                   { label: 'Session', value: `#${result.pin}`, icon: Hash },
                   { label: 'Time', value: new Date(result.createdAt).toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' }), icon: Clock },
                   { label: 'Node', value: 'AWS-SA-1', icon: Globe }
                 ].map((item, i) => (
                   <div key={i} className="flex items-center gap-2">
                      <item.icon size={10} className="text-gray-800" />
                      <span className="text-[8px] font-black text-gray-700 uppercase tracking-widest">{item.label}</span>
                      <span className="text-[10px] font-black text-white/80 uppercase">{item.value}</span>
                   </div>
                 ))}
              </div>
           </div>

           <div className={`p-10 rounded-3xl border ${status.border} ${status.bg} flex flex-col items-center justify-center min-w-[200px] backdrop-blur-sm relative overflow-hidden group`}>
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-indigo-500/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-1000" />
              <span className="text-[8px] font-black text-gray-700 uppercase tracking-[0.4em] mb-4">Risk Severity</span>
              <div className="flex items-baseline gap-1">
                 <span className={`text-6xl font-black italic tracking-tighter leading-none ${status.color}`}>{riskScore}</span>
                 <span className="text-sm font-black text-gray-800 tracking-tighter">/100</span>
              </div>
              <div className={`mt-4 text-[7px] font-black uppercase tracking-[0.3em] px-3 py-1 rounded-full border border-current opacity-30 ${status.color}`}>
                 {status.label}
              </div>
           </div>
        </div>

        {/* SYSTEM INTELLIGENCE - SEPARADINHO CLEAN */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 mb-24">
           <div className="space-y-6">
              <h3 className="text-[9px] font-black text-gray-800 uppercase tracking-[0.5em] px-2 flex items-center gap-2">
                 <Monitor size={12} /> Environment Intel
              </h3>
              <div className="bg-white/[0.01] border border-white/5 rounded-3xl p-8 space-y-5">
                 {[
                   { label: 'Operating System', value: result.systemInfo?.os || 'Windows 10/11' },
                   { label: 'Hardware Identifier', value: result.systemInfo?.hwid?.substring(0, 24) + '...' || 'Hidden' },
                   { label: 'Network Endpoint', value: result.systemInfo?.ip || 'Protected' },
                   { label: 'PC Name', value: result.systemInfo?.pcName || 'Unknown' }
                 ].map((inf, i) => (
                   <div key={i} className="flex items-center justify-between group">
                      <span className="text-[9px] font-bold text-gray-700 uppercase tracking-widest">{inf.label}</span>
                      <span className="text-[10px] font-black text-white/60 tracking-tight">{inf.value}</span>
                   </div>
                 ))}
              </div>
           </div>

           <div className="space-y-6">
              <h3 className="text-[9px] font-black text-gray-800 uppercase tracking-[0.5em] px-2 flex items-center gap-2">
                 <Dna size={12} /> Identity Hooks
              </h3>
              <div className="bg-white/[0.01] border border-white/5 rounded-3xl p-8 space-y-5">
                 <div className="flex items-center justify-between">
                    <span className="text-[9px] font-bold text-gray-700 uppercase tracking-widest">Steam Integration</span>
                    <span className="text-[10px] font-black text-white/60 tracking-tight">{result.systemInfo?.steamId || 'Not Linked'}</span>
                 </div>
                 <div className="pt-2">
                    <span className="text-[9px] font-bold text-gray-700 uppercase tracking-widest block mb-4">Discord Sessions</span>
                    <div className="flex flex-wrap gap-2">
                       {result.discordInfo?.accounts && result.discordInfo.accounts.length > 0 ? (
                         result.discordInfo.accounts.map((acc: any, i: number) => (
                           <div key={i} className="px-3 py-1.5 bg-indigo-500/5 border border-indigo-500/10 rounded-lg flex items-center gap-2">
                              <div className="w-1.5 h-1.5 rounded-full bg-indigo-500 animate-pulse" />
                              <span className="text-[9px] font-black text-indigo-200/70">{acc.username}</span>
                           </div>
                         ))
                       ) : (
                         <span className="text-[9px] font-black text-gray-800 uppercase tracking-widest italic">No cached accounts found</span>
                       )}
                    </div>
                 </div>
              </div>
           </div>
        </div>

        {/* DETECTION PROTOCOLS - TUDO SEPARADINHO */}
        <div className="space-y-20">
           {categories.map((cat) => {
             const logs = allLogs.filter(l => l.category === cat.id);
             return (
               <div key={cat.id} className="space-y-8">
                  <div className="flex items-center justify-between border-b border-white/5 pb-6">
                     <div className="flex items-center gap-4">
                        <div className={`w-10 h-10 rounded-xl bg-white/[0.02] border border-white/5 flex items-center justify-center ${logs.length > 0 ? 'text-red-500 shadow-[0_0_20px_rgba(239,68,68,0.1)]' : 'text-emerald-500'}`}>
                           {logs.length > 0 ? <ShieldAlert size={18} /> : <CheckCircle2 size={18} />}
                        </div>
                        <div>
                           <h2 className="text-xl font-black uppercase tracking-tighter text-white">{cat.label}</h2>
                           <span className="text-[8px] font-black text-gray-700 uppercase tracking-[0.4em]">{logs.length} Indicators Found</span>
                        </div>
                     </div>
                     <cat.icon size={20} className="text-gray-900" />
                  </div>

                  {logs.length === 0 ? (
                    <div className="py-12 bg-white/[0.01] border border-white/5 border-dashed rounded-3xl flex flex-col items-center justify-center opacity-30 group hover:opacity-50 transition-opacity">
                       <CheckCircle2 size={32} className="mb-4 text-emerald-500" />
                       <p className="text-[10px] font-black uppercase tracking-[0.5em] text-gray-400">Sector Clear</p>
                    </div>
                  ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                       {logs.map((log, i) => (
                         <div key={i} className="bg-white/[0.02] border border-white/5 rounded-3xl p-8 hover:border-indigo-500/30 transition-all group relative overflow-hidden">
                            <div className={`absolute top-0 right-0 p-4 opacity-5 ${log.severity === 'Critical' ? 'text-red-500' : 'text-amber-500'}`}>
                               <ShieldAlert size={40} />
                            </div>
                            <div className="flex items-start gap-4 mb-4">
                               <div className={`mt-1.5 w-1.5 h-1.5 rounded-full ${log.severity === 'Critical' ? 'bg-red-500 shadow-[0_0_10px_rgba(239,68,68,0.5)]' : 'bg-amber-500 shadow-[0_0_10px_rgba(245,158,11,0.5)]'}`} />
                               <h4 className="text-[11px] font-black uppercase tracking-tight text-white/90">{log.title}</h4>
                            </div>
                            <p className="text-[10px] text-gray-600 font-medium leading-relaxed uppercase mb-6 ml-5">
                               {log.description}
                            </p>
                            <div className="flex items-center gap-4 ml-5">
                               <span className={`text-[7px] font-black px-2 py-0.5 rounded-md border uppercase tracking-widest ${log.severity === 'Critical' ? 'border-red-500/20 text-red-500 bg-red-500/[0.02]' : 'border-amber-500/20 text-amber-500 bg-amber-500/[0.02]'}`}>
                                  {log.severity}
                               </span>
                               <span className="text-[7px] font-black text-gray-800 uppercase tracking-widest">Weight: +{log.score || 10}</span>
                            </div>
                         </div>
                       ))}
                    </div>
                  )}
               </div>
             );
           })}
        </div>

      </main>

      {/* MINIMAL FOOTER */}
      <footer className="max-w-[1100px] mx-auto px-6 py-20 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-8">
         <div className="flex items-center gap-4 opacity-20">
            <Shield size={14} />
            <span className="text-[9px] font-black uppercase tracking-[0.4em]">Lodark Alpha Forensic v2.5.0</span>
         </div>
         <div className="flex flex-col items-end gap-1 opacity-20">
            <span className="text-[8px] font-black uppercase tracking-widest text-gray-700">Digital Fingerprint Encrypted</span>
            <span className="text-[8px] font-black uppercase tracking-widest text-indigo-500/50">Team Lodark Operations</span>
         </div>
      </footer>
    </div>
  );
}
