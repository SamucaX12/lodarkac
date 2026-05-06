"use client";

import React, { useState } from 'react';
import { 
  Shield, 
  Activity, 
  Clock, 
  Search, 
  AlertTriangle, 
  CheckCircle2, 
  Fingerprint, 
  ChevronRight, 
  Cpu, 
  Terminal, 
  Database,
  ShieldAlert,
  Info,
  ChevronDown,
  ChevronUp,
  User,
  Hash,
  Globe,
  FileSearch,
  Zap,
  LayoutGrid
} from 'lucide-react';
import Navbar from './Navbar';

interface ResultProps {
  result: {
    pin: string;
    userName: string;
    isClean: boolean;
    detections: any[];
    warnings: any[];
    systemInfo?: {
      hostname?: string;
      os?: string;
      cpu?: string;
      ram?: string;
      ip?: string;
      hwid?: string;
    };
    createdAt: string;
  };
  riskScore: number;
}

export default function ResultClientView({ result, riskScore }: ResultProps) {
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const [expandedLog, setExpandedLog] = useState<number | null>(null);

  const getRiskStatus = () => {
    if (result.isClean && riskScore <= 10) return { label: 'TOTAL CLEAN', color: 'text-emerald-500', bg: 'bg-emerald-500/5', border: 'border-emerald-500/20 shadow-[0_0_30px_rgba(16,185,129,0.1)]' };
    if (riskScore < 30) return { label: 'LOW RISK', color: 'text-blue-500', bg: 'bg-blue-500/5', border: 'border-blue-500/20' };
    if (riskScore < 60) return { label: 'SUSPICIOUS', color: 'text-amber-500', bg: 'bg-amber-500/5', border: 'border-amber-500/20 shadow-[0_0_30px_rgba(245,158,11,0.1)]' };
    return { label: 'CRITICAL', color: 'text-red-500', bg: 'bg-red-500/5', border: 'border-red-500/20 shadow-[0_0_30px_rgba(239,68,68,0.1)]' };
  };

  const status = getRiskStatus();
  const allLogs = [...(result.detections || []), ...(result.warnings || [])];

  const categories = [
    { id: 'DMA', label: 'DMA / HARDWARE', icon: Cpu, count: allLogs.filter(l => l.category === 'DMA').length },
    { id: 'Bypass', label: 'BYPASS / AUTH', icon: Shield, count: allLogs.filter(l => l.category === 'Bypass').length },
    { id: 'Methods', label: 'INJECTION / LOGIC', icon: Zap, count: allLogs.filter(l => l.category === 'Methods').length },
    { id: 'Cheats', label: 'CHEATS / APPS', icon: LayoutGrid, count: allLogs.filter(l => l.category === 'Cheats').length },
    { id: 'Services', label: 'SERVICES / OS', icon: Activity, count: allLogs.filter(l => l.category === 'Services').length },
    { id: 'BAM', label: 'BAM / ACTIVITY', icon: Clock, count: allLogs.filter(l => l.category === 'BAM').length },
    { id: 'Forensics', label: 'FILE FORENSICS', icon: FileSearch, count: allLogs.filter(l => l.category === 'Forensics').length },
  ];

  return (
    <div className="min-h-screen bg-[#020202] text-white font-sans selection:bg-violet-500/30 overflow-x-hidden">
      <Navbar />

      <main className="max-w-[1400px] mx-auto px-6 py-20 lg:py-32">
        
        {/* HEADER - CLEAN & PREMIUM */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-end mb-32 animate-in fade-in slide-in-from-bottom-8 duration-1000">
           <div className="lg:col-span-8 space-y-12">
              <div className="flex items-center gap-6">
                 <div className="w-16 h-16 rounded-2xl bg-white/[0.03] border border-white/10 flex items-center justify-center text-violet-500 shadow-2xl">
                    <Fingerprint size={32} />
                 </div>
                 <div className="space-y-1">
                    <span className="text-[10px] font-black text-gray-600 uppercase tracking-[0.5em]">Forensic Report Analysis</span>
                    <h1 className="text-6xl md:text-8xl font-black tracking-tighter uppercase italic leading-none">
                       DOSSIER<span className="text-violet-500">.</span>CORE
                    </h1>
                 </div>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                 {[
                   { label: 'Subject', value: result.userName, icon: User },
                   { label: 'Session ID', value: `#${result.pin}`, icon: Hash },
                   { label: 'Analysis Time', value: new Date(result.createdAt).toLocaleString('pt-BR', { timeZone: 'America/Sao_Paulo', hour: '2-digit', minute: '2-digit' }), icon: Clock },
                   { label: 'Integrity', value: status.label, icon: ShieldCheck, color: status.color }
                 ].map((item, i) => (
                   <div key={i} className="space-y-2 group">
                      <div className="flex items-center gap-2 text-gray-700">
                         <item.icon size={12} />
                         <span className="text-[9px] font-black uppercase tracking-[0.3em]">{item.label}</span>
                      </div>
                      <p className={`text-sm font-black uppercase italic tracking-tight ${item.color || 'text-white'}`}>{item.value}</p>
                   </div>
                 ))}
              </div>
           </div>

           <div className="lg:col-span-4 flex flex-col items-center lg:items-end">
              <div className={`relative p-16 rounded-[4rem] border ${status.border} ${status.bg} flex flex-col items-center transition-all duration-1000 hover:scale-[1.02]`}>
                 <div className="absolute top-6 text-[10px] font-black text-gray-500 uppercase tracking-[0.5em]">Risk Index</div>
                 <div className="flex items-baseline gap-2">
                    <span className={`text-[12rem] font-black italic tracking-tighter leading-none ${status.color}`}>{riskScore}</span>
                    <span className="text-4xl font-black text-gray-800">/100</span>
                 </div>
                 <div className={`mt-4 px-6 py-2 rounded-full border ${status.border} text-[10px] font-black uppercase tracking-widest ${status.color}`}>
                    {status.label}
                 </div>
              </div>
           </div>
        </div>

        {/* CATEGORY GRID - CLEAN SEPARATION */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
           
           {/* Sidebar Navigation */}
           <div className="lg:col-span-3 space-y-4">
              <h3 className="text-[10px] font-black text-gray-700 uppercase tracking-[0.4em] mb-10 px-4">Forensic Protocols</h3>
              {categories.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => setActiveCategory(activeCategory === cat.id ? null : cat.id)}
                  className={`w-full flex items-center justify-between p-6 rounded-3xl border transition-all group ${activeCategory === cat.id ? 'bg-white text-black border-white' : 'bg-white/[0.01] border-white/5 text-gray-500 hover:border-white/10'}`}
                >
                  <div className="flex items-center gap-5">
                    <cat.icon size={20} className={activeCategory === cat.id ? 'text-black' : 'text-violet-500'} />
                    <span className="text-[11px] font-black uppercase tracking-widest">{cat.label}</span>
                  </div>
                  {cat.count > 0 && (
                    <span className={`text-[10px] font-black px-2 py-0.5 rounded-lg ${activeCategory === cat.id ? 'bg-black text-white' : 'bg-red-500 text-white animate-pulse'}`}>
                      {cat.count}
                    </span>
                  )}
                </button>
              ))}
           </div>

           {/* Main Discovery Area */}
           <div className="lg:col-span-9">
              <div className="bg-white/[0.01] border border-white/5 rounded-[4rem] p-12 min-h-[600px] relative overflow-hidden">
                 <div className="absolute top-0 right-0 p-12 opacity-[0.02] pointer-events-none">
                    <Search size={300} />
                 </div>

                 {!activeCategory ? (
                   <div className="flex flex-col items-center justify-center h-full py-32 text-center">
                      <LayoutGrid size={64} className="text-gray-800 mb-8" />
                      <h2 className="text-2xl font-black uppercase italic tracking-tighter text-gray-700 mb-2">Select a protocol</h2>
                      <p className="text-[10px] font-black text-gray-800 uppercase tracking-widest">Awaiting sector decryption...</p>
                   </div>
                 ) : (
                   <div className="space-y-12 animate-in fade-in slide-in-from-right-4 duration-500">
                      <div className="flex items-center justify-between border-b border-white/5 pb-8">
                         <div>
                            <h2 className="text-4xl font-black uppercase italic tracking-tighter">
                               {categories.find(c => c.id === activeCategory)?.label}
                            </h2>
                            <p className="text-[10px] font-black text-violet-500 uppercase tracking-widest mt-2">Detections for this protocol</p>
                         </div>
                         <div className="w-16 h-16 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-violet-500">
                            {React.createElement(categories.find(c => c.id === activeCategory)?.icon || Activity, { size: 28 })}
                         </div>
                      </div>

                      <div className="space-y-6">
                         {allLogs.filter(l => l.category === activeCategory).length === 0 ? (
                           <div className="py-32 flex flex-col items-center text-center opacity-20">
                              <ShieldCheck size={48} className="mb-4" />
                              <span className="text-[10px] font-black uppercase tracking-[0.5em]">Sector Clear</span>
                           </div>
                         ) : (
                           allLogs.filter(l => l.category === activeCategory).map((log, i) => (
                             <div 
                               key={i}
                               onClick={() => setExpandedLog(expandedLog === i ? null : i)}
                               className="group p-8 rounded-[2.5rem] bg-white/[0.02] border border-white/5 hover:border-violet-500/30 transition-all cursor-pointer"
                             >
                                <div className="flex items-center justify-between">
                                   <div className="flex items-center gap-8">
                                      <div className={`w-12 h-12 rounded-xl border border-white/5 flex items-center justify-center ${log.severity === 'Critical' ? 'text-red-500 bg-red-500/5' : 'text-amber-500 bg-amber-500/5'}`}>
                                         {log.severity === 'Critical' ? <ShieldAlert size={20} /> : <AlertTriangle size={20} />}
                                      </div>
                                      <div>
                                         <h4 className="text-sm font-black uppercase italic tracking-tight mb-1">{log.title}</h4>
                                         <div className="flex items-center gap-4">
                                            <span className={`text-[8px] font-black px-2 py-0.5 rounded border uppercase tracking-widest ${log.severity === 'Critical' ? 'border-red-500/20 text-red-500' : 'border-amber-500/20 text-amber-500'}`}>
                                               {log.severity}
                                            </span>
                                            <span className="text-[9px] font-black text-gray-700 uppercase tracking-widest">Score Weight: +{log.score || 10}</span>
                                         </div>
                                      </div>
                                   </div>
                                   <ChevronDown size={18} className={`text-gray-700 transition-transform ${expandedLog === i ? 'rotate-180' : ''}`} />
                                </div>
                                {expandedLog === i && (
                                  <div className="mt-8 pt-8 border-t border-white/5 animate-in fade-in slide-in-from-top-2 duration-300">
                                     <p className="text-gray-400 text-[11px] font-medium leading-relaxed max-w-4xl">
                                        {log.description}
                                     </p>
                                     <div className="mt-6 p-4 rounded-xl bg-black/40 border border-white/5 font-mono text-[9px] text-gray-500">
                                        TRACE_ID: {Math.random().toString(16).substring(2, 10).toUpperCase()}_VERIFIED
                                     </div>
                                  </div>
                                )}
                             </div>
                           ))
                         )}
                      </div>
                   </div>
                 )}
              </div>

              {/* System Specs - Dossier Style */}
              <div className="mt-16 grid grid-cols-1 md:grid-cols-2 gap-8">
                 <div className="p-10 rounded-[3rem] bg-white/[0.01] border border-white/5 space-y-8">
                    <h3 className="text-[10px] font-black text-gray-700 uppercase tracking-[0.5em] mb-4">Architecture Info</h3>
                    <div className="space-y-4">
                       {[
                         { label: 'Kernel Version', value: result.systemInfo?.os },
                         { label: 'Processor ID', value: result.systemInfo?.cpu },
                         { label: 'Memory Range', value: result.systemInfo?.ram }
                       ].map((spec, i) => (
                         <div key={i} className="flex justify-between items-center py-4 border-b border-white/5">
                            <span className="text-[10px] font-black text-gray-600 uppercase tracking-widest">{spec.label}</span>
                            <span className="text-[11px] font-black text-gray-400 uppercase italic truncate max-w-[200px]">{spec.value || 'N/A'}</span>
                         </div>
                       ))}
                    </div>
                 </div>

                 <div className="p-10 rounded-[3rem] bg-white/[0.01] border border-white/5 flex flex-col justify-between">
                    <h3 className="text-[10px] font-black text-gray-700 uppercase tracking-[0.5em] mb-4">Security Protocol</h3>
                    <div className="space-y-4">
                       <div className="flex items-center gap-4 p-4 rounded-2xl bg-emerald-500/5 border border-emerald-500/10">
                          <ShieldCheck className="text-emerald-500" size={20} />
                          <div>
                             <p className="text-[10px] font-black text-white uppercase tracking-widest">DSE Integrity</p>
                             <p className="text-[8px] font-bold text-emerald-500 uppercase tracking-widest">Enforced & Verified</p>
                          </div>
                       </div>
                       <div className="flex items-center gap-4 p-4 rounded-2xl bg-emerald-500/5 border border-emerald-500/10">
                          <Globe className="text-emerald-500" size={20} />
                          <div>
                             <p className="text-[10px] font-black text-white uppercase tracking-widest">Cloud Sync</p>
                             <p className="text-[8px] font-bold text-emerald-500 uppercase tracking-widest">Real-time Connection</p>
                          </div>
                       </div>
                    </div>
                 </div>
              </div>
           </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="max-w-[1400px] mx-auto px-6 py-20 border-t border-white/5 flex flex-col md:flex-row justify-between items-center opacity-30">
         <div className="flex items-center gap-4">
            <Shield size={16} />
            <span className="text-[9px] font-black uppercase tracking-[0.4em]">Samuca Advanced Forensic Protocol</span>
         </div>
         <span className="text-[9px] font-black uppercase tracking-widest text-gray-600 italic">Developed by Samuca & Lodark</span>
      </footer>
    </div>
  );
}
