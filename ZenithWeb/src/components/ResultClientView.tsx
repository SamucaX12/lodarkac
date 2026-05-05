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
  ChevronUp
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
  const [activeTab, setActiveTab] = useState<'overview' | 'forensics' | 'system'>('overview');
  const [expandedLog, setExpandedLog] = useState<number | null>(null);

  const getRiskStatus = () => {
    if (result.isClean && riskScore <= 10) return { label: 'CLEAR', color: 'text-emerald-500', bg: 'bg-emerald-500/5', border: 'border-emerald-500/10' };
    if (riskScore < 30) return { label: 'LOW RISK', color: 'text-blue-500', bg: 'bg-blue-500/5', border: 'border-blue-500/10' };
    if (riskScore < 60) return { label: 'SUSPICIOUS', color: 'text-amber-500', bg: 'bg-amber-500/5', border: 'border-amber-500/10' };
    return { label: 'CRITICAL', color: 'text-red-500', bg: 'bg-red-500/5', border: 'border-red-500/10' };
  };

  const status = getRiskStatus();
  const allLogs = [...(result.detections || []), ...(result.warnings || [])];

  return (
    <div className="min-h-screen bg-[#050505] text-white font-sans selection:bg-violet-500/30">
      <Navbar />

      <main className="max-w-6xl mx-auto px-6 py-20 lg:py-32">
        {/* Header Section - ULTRA CLEAN */}
        <div className="flex flex-col lg:flex-row items-center lg:items-center justify-between gap-20 mb-40 animate-in fade-in slide-in-from-bottom-4 duration-1000">
          <div className="text-center lg:text-left space-y-8 flex-1">
            <h1 className="text-8xl lg:text-[12rem] font-black tracking-tighter uppercase italic leading-[0.75] mb-8 select-none">
              <span className="text-white">SCAN</span><br />
              <span className="text-gray-900">CORE.</span>
            </h1>
            <div className="flex flex-col lg:flex-row items-center gap-6 lg:gap-12 opacity-50">
               <div className="flex flex-col">
                  <span className="text-[10px] font-black text-gray-500 uppercase tracking-[0.4em] mb-1">Subject</span>
                  <span className="text-sm font-black uppercase italic text-white tracking-tight">{result.userName}</span>
               </div>
               <div className="w-px h-8 bg-white/10 hidden lg:block" />
               <div className="flex flex-col">
                  <span className="text-[10px] font-black text-gray-500 uppercase tracking-[0.4em] mb-1">Session ID</span>
                  <span className="text-sm font-black uppercase italic text-white tracking-tight">#{result.pin}</span>
               </div>
               <div className="w-px h-8 bg-white/10 hidden lg:block" />
               <div className="flex flex-col">
                  <span className="text-[10px] font-black text-gray-500 uppercase tracking-[0.4em] mb-1">Integrity</span>
                  <span className={`text-sm font-black uppercase italic tracking-tight ${status.color}`}>{status.label}</span>
               </div>
            </div>
          </div>

          <div className="relative group flex items-center justify-center">
             <div className={`absolute inset-0 blur-[100px] opacity-20 rounded-full transition-all duration-1000 ${status.color.replace('text', 'bg')}`} />
             <div className="relative flex flex-col items-center">
                <span className="text-[10px] font-black text-gray-700 uppercase tracking-[0.5em] mb-4">Risk Factor</span>
                <div className="flex items-baseline gap-4">
                   <span className={`text-[12rem] lg:text-[16rem] font-black italic tracking-tighter leading-none transition-all duration-700 ${status.color}`}>{riskScore}</span>
                   <span className="text-4xl font-black text-gray-900">/100</span>
                </div>
             </div>
          </div>
        </div>

        {/* CSI-7 Minimalist Strip */}
        <div className="mb-40 flex flex-col md:flex-row items-center justify-between p-1 border-y border-white/5 opacity-40 hover:opacity-100 transition-opacity">
           <div className="flex items-center gap-4 px-6 py-4">
              <Fingerprint size={16} className="text-violet-500" />
              <span className="text-[9px] font-black uppercase tracking-[0.5em] text-gray-500">CSI-7_AUTH:</span>
              <span className="text-[9px] font-mono text-gray-300">LDRK_{result.pin}_0x{result.systemInfo?.hwid?.substring(0, 8) || 'SECURED'}_VERIFIED</span>
           </div>
           <div className="flex items-center gap-8 px-6 py-4">
              <span className="text-[9px] font-black uppercase tracking-widest text-gray-700 italic">Samuca Forensic Engine v2.5.0</span>
              <div className="w-2 h-2 rounded-full bg-emerald-500 shadow-[0_0_10px_rgba(16,185,129,0.5)]" />
           </div>
        </div>

        {/* Minimalist Tabs */}
        <div className="flex items-center gap-16 mb-20 border-b border-white/5">
           {[
             { id: 'overview', label: 'Overview' },
             { id: 'forensics', label: 'Forensic Discovery' },
             { id: 'system', label: 'Architecture' }
           ].map((tab) => (
             <button
               key={tab.id}
               onClick={() => setActiveTab(tab.id as any)}
               className={`pb-8 text-[11px] font-black uppercase tracking-[0.4em] transition-all relative ${activeTab === tab.id ? 'text-white' : 'text-gray-700 hover:text-gray-400'}`}
             >
               {tab.label}
               {activeTab === tab.id && (
                 <div className="absolute bottom-0 left-0 w-full h-0.5 bg-white animate-in slide-in-from-left duration-300" />
               )}
             </button>
           ))}
        </div>

        {/* Content Area */}
        <div className="min-h-[500px]">
           {activeTab === 'overview' && (
             <div className="grid grid-cols-1 md:grid-cols-3 gap-8 animate-in fade-in slide-in-from-bottom-4 duration-1000">
                {[
                  { icon: Shield, label: 'Detections', value: result.detections.length, color: 'text-red-500' },
                  { icon: AlertTriangle, label: 'Warnings', value: result.warnings.length, color: 'text-amber-500' },
                  { icon: Activity, label: 'Integrity', value: result.isClean ? '100%' : 'CLEAN', color: 'text-emerald-500' }
                ].map((card, i) => (
                  <div key={i} className="p-12 rounded-[3rem] bg-white/[0.01] border border-white/5 space-y-8 hover:bg-white/[0.03] transition-all">
                     <div className={`w-14 h-14 rounded-2xl bg-black border border-white/5 flex items-center justify-center ${card.color}`}>
                        <card.icon size={24} />
                     </div>
                     <div>
                        <h3 className="text-[10px] font-black text-gray-700 uppercase tracking-[0.4em] mb-2">{card.label}</h3>
                        <div className="text-6xl font-black italic tracking-tighter">{card.value}</div>
                     </div>
                  </div>
                ))}
             </div>
           )}

           {activeTab === 'forensics' && (
             <div className="space-y-16 animate-in fade-in duration-700">
                {allLogs.length === 0 ? (
                  <div className="flex flex-col items-center justify-center py-32 text-center">
                     <CheckCircle2 size={64} className="text-emerald-500 opacity-10 mb-8" />
                     <h3 className="text-xl font-black uppercase italic tracking-tighter text-gray-700">NO THREATS IDENTIFIED</h3>
                  </div>
                ) : (
                  <>
                    {[
                      { title: 'DMA / HARDWARE', categories: ['DMA'] },
                      { title: 'BYPASS / AUTH', categories: ['Bypass'] },
                      { title: 'METHODS / INJECTION', categories: ['Methods'] },
                      { title: 'CHEATS / BLACKLIST', categories: ['Cheats'] },
                      { title: 'SERVICES MONITOR', categories: ['Services'] },
                      { title: 'BAM ACTIVITY', categories: ['BAM'] },
                      { title: 'SYSTEM FORENSICS', categories: ['Forensics'] }
                    ].map((group, groupIdx) => {
                      const logs = allLogs.filter(log => group.categories.some(cat => log.category?.includes(cat)));
                      if (logs.length === 0) return null;

                      return (
                        <div key={groupIdx} className="space-y-6">
                           <div className="flex items-center gap-4">
                              <div className="h-px flex-1 bg-white/5" />
                              <h3 className="text-[10px] font-black text-gray-600 uppercase tracking-[0.5em]">{group.title}</h3>
                              <div className="h-px flex-1 bg-white/5" />
                           </div>
                           
                           <div className="space-y-4">
                              {logs.map((log, i) => {
                                 const globalIdx = allLogs.indexOf(log);
                                 return (
                                    <div 
                                      key={i} 
                                      onClick={() => setExpandedLog(expandedLog === globalIdx ? null : globalIdx)}
                                      className="group p-8 rounded-[2rem] bg-white/[0.01] border border-white/5 hover:border-white/10 transition-all cursor-pointer"
                                    >
                                       <div className="flex items-center justify-between gap-8">
                                          <div className="flex items-center gap-8">
                                             <div className={`w-14 h-14 rounded-2xl flex items-center justify-center border border-white/5 ${log.severity === 'Critical' || log.severity === 'High' ? 'text-red-500' : 'text-amber-500'}`}>
                                                {group.title.includes('DMA') ? <Cpu size={24} /> : group.title.includes('SYSTEM') ? <Clock size={24} /> : <Terminal size={24} />}
                                             </div>
                                             <div>
                                                <div className="flex items-center gap-4 mb-1">
                                                   <h4 className="text-sm font-black uppercase italic tracking-tight">{log.title}</h4>
                                                   <span className={`text-[8px] font-black px-2 py-0.5 rounded border border-white/5 uppercase tracking-widest ${log.severity === 'Critical' || log.severity === 'High' ? 'text-red-500' : 'text-amber-500'}`}>
                                                      {log.severity}
                                                   </span>
                                                </div>
                                                <span className="text-[9px] font-black text-gray-700 uppercase tracking-widest">{log.category} Protocol</span>
                                             </div>
                                          </div>
                                          <div className="flex items-center gap-8">
                                             <span className="text-2xl font-black italic tracking-tighter opacity-20">+{log.score || 10}</span>
                                             {expandedLog === globalIdx ? <ChevronUp size={16} className="text-gray-700" /> : <ChevronDown size={16} className="text-gray-700" />}
                                          </div>
                                       </div>
                                       {expandedLog === globalIdx && (
                                         <div className="mt-8 pt-8 border-t border-white/5 animate-in fade-in slide-in-from-top-2 duration-300">
                                            <p className="text-gray-400 text-xs font-medium leading-relaxed max-w-3xl">
                                               {log.description}
                                            </p>
                                         </div>
                                       )}
                                    </div>
                                 );
                              })}
                           </div>
                        </div>
                      );
                    })}

                    {/* Other category if not caught above */}
                    {(() => {
                      const definedCategories = ['DMA', 'Bypass', 'Methods', 'Cheats', 'Services', 'BAM', 'Forensics'];
                      const otherLogs = allLogs.filter(log => !definedCategories.some(cat => log.category?.includes(cat)));
                      if (otherLogs.length === 0) return null;

                      return (
                        <div className="space-y-6">
                           <div className="flex items-center gap-4">
                              <div className="h-px flex-1 bg-white/5" />
                              <h3 className="text-[10px] font-black text-gray-600 uppercase tracking-[0.5em]">OTHER DISCOVERIES</h3>
                              <div className="h-px flex-1 bg-white/5" />
                           </div>
                           <div className="space-y-4">
                              {otherLogs.map((log, i) => {
                                 const globalIdx = allLogs.indexOf(log);
                                 return (
                                    <div 
                                      key={i} 
                                      onClick={() => setExpandedLog(expandedLog === globalIdx ? null : globalIdx)}
                                      className="group p-8 rounded-[2rem] bg-white/[0.01] border border-white/5 hover:border-white/10 transition-all cursor-pointer"
                                    >
                                       <div className="flex items-center justify-between gap-8">
                                          <div className="flex items-center gap-8">
                                             <div className={`w-14 h-14 rounded-2xl flex items-center justify-center border border-white/5 ${log.severity === 'Critical' || log.severity === 'High' ? 'text-red-500' : 'text-amber-500'}`}>
                                                <Info size={24} />
                                             </div>
                                             <div>
                                                <div className="flex items-center gap-4 mb-1">
                                                   <h4 className="text-sm font-black uppercase italic tracking-tight">{log.title}</h4>
                                                   <span className={`text-[8px] font-black px-2 py-0.5 rounded border border-white/5 uppercase tracking-widest ${log.severity === 'Critical' || log.severity === 'High' ? 'text-red-500' : 'text-amber-500'}`}>
                                                      {log.severity}
                                                   </span>
                                                </div>
                                                <span className="text-[9px] font-black text-gray-700 uppercase tracking-widest">{log.category || 'General'} Protocol</span>
                                             </div>
                                          </div>
                                          <div className="flex items-center gap-8">
                                             <span className="text-2xl font-black italic tracking-tighter opacity-20">+{log.score || 10}</span>
                                             {expandedLog === globalIdx ? <ChevronUp size={16} className="text-gray-700" /> : <ChevronDown size={16} className="text-gray-700" />}
                                          </div>
                                       </div>
                                       {expandedLog === globalIdx && (
                                         <div className="mt-8 pt-8 border-t border-white/5 animate-in fade-in slide-in-from-top-2 duration-300">
                                            <p className="text-gray-400 text-xs font-medium leading-relaxed max-w-3xl">
                                               {log.description}
                                            </p>
                                         </div>
                                       )}
                                    </div>
                                 );
                              })}
                           </div>
                        </div>
                      );
                    })()}
                  </>
                )}
             </div>
           )}

           {activeTab === 'system' && (
             <div className="grid grid-cols-1 md:grid-cols-2 gap-16 animate-in fade-in duration-700">
                <div className="space-y-12">
                   <h3 className="text-[10px] font-black text-gray-700 uppercase tracking-[0.6em]">Environment Analysis</h3>
                   <div className="space-y-6">
                      {[
                        { label: 'Host Identifier', value: result.systemInfo?.hostname },
                        { label: 'Core Processor', value: result.systemInfo?.cpu },
                        { label: 'Memory Capacity', value: result.systemInfo?.ram },
                        { label: 'System Kernel', value: result.systemInfo?.os }
                      ].map((info, i) => (
                        <div key={i} className="flex items-center justify-between py-6 border-b border-white/5 group">
                           <span className="text-[10px] font-black text-gray-600 uppercase tracking-[0.4em] group-hover:text-white transition-colors">{info.label}</span>
                           <span className="text-[11px] font-black uppercase italic text-gray-400">{info.value || 'N/A'}</span>
                        </div>
                      ))}
                   </div>
                </div>

                <div className="space-y-12">
                   <h3 className="text-[10px] font-black text-gray-700 uppercase tracking-[0.6em]">Engine Metadata</h3>
                   <div className="grid grid-cols-2 gap-6">
                      {[
                        { label: 'Node', value: 'ATL-SEC-01' },
                        { label: 'DSE status', value: 'SECURE' },
                        { label: 'HVCI status', value: 'ACTIVE' },
                        { label: 'TPM Rev', value: '2.0_STD' }
                      ].map((meta, i) => (
                        <div key={i} className="p-8 rounded-[2rem] bg-white/[0.01] border border-white/5 text-center space-y-2">
                           <span className="text-[9px] font-black text-gray-700 uppercase tracking-widest block">{meta.label}</span>
                           <span className="text-[10px] font-black uppercase italic text-gray-300">{meta.value}</span>
                        </div>
                      ))}
                   </div>
                </div>
             </div>
           )}
        </div>
      </main>

      {/* Minimalist Footer */}
      <footer className="max-w-6xl mx-auto px-6 py-24 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-10 opacity-20 hover:opacity-60 transition-opacity">
         <div className="flex items-center gap-4">
            <Shield size={20} />
            <span className="text-[10px] font-black uppercase tracking-[0.4em] italic">Samuca Forensic Protocol v3.0</span>
         </div>
         <span className="text-[9px] font-black uppercase tracking-[0.4em] text-gray-600">Total Integrity. Zero Compromise.</span>
         <div className="flex items-center gap-8 text-[9px] font-black uppercase tracking-widest text-gray-600">
            <span>RSA-4096</span>
            <span>AES-256</span>
         </div>
      </footer>
    </div>
  );
}
