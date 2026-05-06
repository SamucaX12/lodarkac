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
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans selection:bg-indigo-500/30 overflow-x-hidden pb-40">
      <div className="glow-bg" />
      <Navbar />

      <main className="max-w-[1200px] mx-auto px-6 py-20 animate-in fade-in slide-in-from-bottom-4 duration-1000">
        
        {/* UPPER DOSSIER HEADER */}
        <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-12 mb-24 border-b border-white/5 pb-20">
           <div className="space-y-8">
              <div className="flex items-center gap-4">
                 <div className="w-12 h-12 rounded-xl bg-indigo-600/10 border border-indigo-500/20 flex items-center justify-center text-indigo-500 shadow-[0_0_30px_rgba(79,70,229,0.1)]">
                    <Fingerprint size={24} />
                 </div>
                 <div>
                    <h1 className="text-5xl font-black tracking-tighter uppercase leading-none text-white">
                        LODARK<span className="text-indigo-500">.</span>FORENSICS
                    </h1>
                    <div className="flex items-center gap-2 mt-2">
                        <span className="w-2 h-2 rounded-full bg-indigo-500 animate-pulse" />
                        <span className="text-[10px] font-black text-slate-500 uppercase tracking-[0.4em]">Audit Dossier v2.8</span>
                    </div>
                 </div>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-8 pt-4">
                 {[
                   { label: 'Subject', value: result.systemInfo?.username || result.userName || 'Unknown', icon: User },
                   { label: 'Session', value: `#${result.pin}`, icon: Hash },
                   { label: 'Time', value: new Date(result.createdAt).toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' }), icon: Clock },
                   { label: 'Network', value: result.systemInfo?.ip || 'Protected', icon: Globe }
                 ].map((item, i) => (
                   <div key={i} className="flex flex-col gap-1.5">
                      <div className="flex items-center gap-2 text-slate-500">
                        <item.icon size={11} />
                        <span className="text-[9px] font-black uppercase tracking-widest">{item.label}</span>
                      </div>
                      <span className="text-xs font-bold text-white tracking-tight truncate max-w-[150px]">{item.value}</span>
                   </div>
                 ))}
              </div>
           </div>

           <div className={`p-10 rounded-[2rem] border ${status.border} ${status.bg} flex flex-col items-center justify-center min-w-[220px] backdrop-blur-md relative overflow-hidden group transition-all duration-500 hover:scale-[1.02]`}>
              <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-white/[0.02] to-transparent pointer-events-none" />
              <span className="text-[9px] font-black text-slate-500 uppercase tracking-[0.5em] mb-4">Risk Severity</span>
              <div className="flex items-baseline gap-1 relative z-10">
                 <span className={`text-7xl font-black italic tracking-tighter leading-none ${status.color}`}>{riskScore}</span>
                 <span className="text-lg font-black text-slate-700 tracking-tighter">/100</span>
              </div>
              <div className={`mt-6 text-[8px] font-black uppercase tracking-[0.4em] px-4 py-1.5 rounded-full border border-current opacity-60 ${status.color}`}>
                 {status.label.replace('_', ' ')}
              </div>
           </div>
        </div>

        {/* SYSTEM INTELLIGENCE */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 mb-24">
           <div className="space-y-6">
              <h3 className="text-[10px] font-black text-slate-500 uppercase tracking-[0.5em] px-2 flex items-center gap-2">
                 <Monitor size={14} className="text-indigo-500" /> Environment Intel
              </h3>
              <div className="glass-card p-10 space-y-6">
                 {[
                   { label: 'Operating System', value: result.systemInfo?.os || 'Windows 10/11' },
                   { label: 'Hardware Identifier', value: result.systemInfo?.hwid?.substring(0, 32) || 'Hidden' },
                   { label: 'PC Identity', value: result.systemInfo?.pcName || 'Unknown' }
                 ].map((inf, i) => (
                   <div key={i} className="flex items-center justify-between group border-b border-white/5 pb-4 last:border-0 last:pb-0">
                      <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">{inf.label}</span>
                      <span className="text-[11px] font-black text-slate-200 tracking-tight">{inf.value}</span>
                   </div>
                 ))}
              </div>
           </div>

           <div className="space-y-6">
              <h3 className="text-[10px] font-black text-slate-500 uppercase tracking-[0.5em] px-2 flex items-center gap-2">
                 <Dna size={14} className="text-indigo-500" /> Identity Hooks
              </h3>
              <div className="glass-card p-10 space-y-6">
                 <div className="flex items-center justify-between border-b border-white/5 pb-4">
                    <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Steam Integration</span>
                    <span className="text-[11px] font-black text-slate-200 tracking-tight">{result.systemInfo?.steamId || 'Not Linked'}</span>
                 </div>
                 <div>
                    <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest block mb-4">Discord Sessions</span>
                    <div className="flex flex-wrap gap-2">
                       {result.discordInfo?.accounts && result.discordInfo.accounts.length > 0 ? (
                         result.discordInfo.accounts.map((acc: any, i: number) => (
                           <div key={i} className="px-4 py-2 bg-indigo-500/5 border border-indigo-500/10 rounded-xl flex items-center gap-3 group hover:border-indigo-500/30 transition-colors">
                              <div className="w-2 h-2 rounded-full bg-indigo-500 animate-pulse" />
                              <span className="text-[10px] font-black text-indigo-100/80">{acc.username}</span>
                           </div>
                         ))
                       ) : (
                         <span className="text-[10px] font-black text-slate-700 uppercase tracking-widest italic">No cached accounts found</span>
                       )}
                    </div>
                 </div>
              </div>
           </div>
        </div>

        {/* DETECTION PROTOCOLS */}
        <div className="space-y-24">
           {categories.map((cat) => {
             const logs = allLogs.filter(l => l.category === cat.id);
             return (
               <div key={cat.id} className="space-y-10">
                  <div className="flex items-center justify-between border-b border-white/5 pb-8">
                     <div className="flex items-center gap-6">
                        <div className={`w-14 h-14 rounded-2xl bg-slate-900 border border-white/5 flex items-center justify-center ${logs.length > 0 ? 'text-red-500 shadow-[0_0_40px_rgba(239,68,68,0.1)]' : 'text-emerald-500 shadow-[0_0_40px_rgba(16,185,129,0.05)]'}`}>
                           {logs.length > 0 ? <ShieldAlert size={24} /> : <CheckCircle2 size={24} />}
                        </div>
                        <div>
                           <h2 className="text-3xl font-black uppercase tracking-tighter text-white">{cat.label}</h2>
                           <span className={`text-[10px] font-black uppercase tracking-[0.5em] ${logs.length > 0 ? 'text-red-500/50' : 'text-slate-600'}`}>{logs.length} Indicators Found</span>
                        </div>
                     </div>
                     <cat.icon size={24} className="text-slate-900 opacity-50" />
                  </div>

                  {logs.length === 0 ? (
                    <div className="py-20 glass-card border-dashed flex flex-col items-center justify-center opacity-30 group hover:opacity-60 transition-all duration-500">
                       <CheckCircle2 size={40} className="mb-4 text-emerald-500 group-hover:scale-110 transition-transform" />
                       <p className="text-[11px] font-black uppercase tracking-[0.6em] text-slate-400">Security Clearance: Valid</p>
                    </div>
                  ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                       {logs.map((log, i) => (
                         <div key={i} className="glass-card p-10 hover:border-indigo-500/40 group relative overflow-hidden">
                            <div className={`absolute -top-4 -right-4 opacity-[0.03] group-hover:opacity-[0.07] transition-opacity ${log.severity === 'Critical' ? 'text-red-500' : 'text-amber-500'}`}>
                               <ShieldAlert size={120} />
                            </div>
                            <div className="flex items-start gap-4 mb-6">
                               <div className={`mt-2 w-2 h-2 rounded-full ${log.severity === 'Critical' ? 'bg-red-500 shadow-[0_0_15px_rgba(239,68,68,0.8)]' : 'bg-amber-500 shadow-[0_0_15px_rgba(245,158,11,0.8)]'}`} />
                               <h4 className="text-sm font-black uppercase tracking-tight text-white/90 leading-tight">{log.title}</h4>
                            </div>
                            <p className="text-[11px] text-slate-500 font-medium leading-relaxed uppercase mb-8 ml-6">
                               {log.description}
                            </p>
                            <div className="flex items-center gap-6 ml-6">
                               <span className={`text-[8px] font-black px-3 py-1 rounded-lg border uppercase tracking-widest ${log.severity === 'Critical' ? 'border-red-500/20 text-red-500 bg-red-500/5' : 'border-amber-500/20 text-amber-500 bg-amber-500/5'}`}>
                                  {log.severity}
                               </span>
                               <span className="text-[8px] font-black text-slate-700 uppercase tracking-widest">Weight Impact: +{log.score || 10}</span>
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
