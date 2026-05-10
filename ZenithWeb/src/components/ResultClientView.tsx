"use client";

import React, { useState, useMemo } from 'react';
import { 
  Shield, 
  Activity, 
  Clock, 
  AlertTriangle, 
  ShieldCheck, 
  Fingerprint, 
  Cpu, 
  ShieldAlert,
  Globe,
  FileSearch,
  Zap,
  Monitor,
  Search,
  Network,
  Terminal,
  Layers,
  Settings,
  HardDrive,
  Crosshair
} from 'lucide-react';
import Navbar from './Navbar';
import { useLanguage } from '@/contexts/LanguageContext';

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

type TabType = 'overview' | 'bam' | 'bypass' | 'forensics' | 'network' | 'services' | 'cheat' | 'generic' | 'samu';

export default function ResultClientView({ result, riskScore }: ResultProps) {
  const { t } = useLanguage();
  const [activeTab, setActiveTab] = useState<TabType>('overview');
  const [bamSearch, setBamSearch] = useState('');
  const [showSamu, setShowSamu] = useState(false);

  React.useEffect(() => {
    if (typeof window !== 'undefined') {
      const params = new URLSearchParams(window.location.search);
      if (params.get('access') === 'samu' || document.cookie.includes('admin_auth')) {
        setShowSamu(true);
      }
    }
  }, []);

  const getRiskStatus = () => {
    if (result.isClean && riskScore <= 10) return { label: 'CLEAN', color: 'text-emerald-400', bg: 'bg-[#080808]', border: 'border-emerald-500/20' };
    if (riskScore < 35) return { label: 'AVISO', color: 'text-yellow-400', bg: 'bg-[#080808]', border: 'border-yellow-500/20' };
    if (riskScore < 65) return { label: 'SUSPEITO', color: 'text-blue-500', bg: 'bg-[#080808]', border: 'border-blue-500/20' };
    return { label: 'CHEATING', color: 'text-red-500', bg: 'bg-[#080808]', border: 'border-red-500/20' };
  };

  const status = getRiskStatus();
  
  const allLogs = useMemo(() => {
    const logs = [
      ...(result.detections || []), 
      ...(result.warnings || []),
      ...(result.suspicious || []),
      ...(result.integrity || [])
    ];
    if (!showSamu) {
      return logs.filter(l => l.category !== 'Samu');
    }
    return logs;
  }, [result, showSamu]);

  const tabs = [
    { id: 'overview', label: t('tab.dossier'), icon: Fingerprint },
    { id: 'bam', label: t('tab.logs'), icon: Clock },
    { id: 'bypass', label: t('tab.bypass'), icon: ShieldAlert },
    { id: 'forensics', label: t('tab.forensic'), icon: FileSearch },
    { id: 'services', label: t('tab.services'), icon: Settings },
    { id: 'cheat', label: t('tab.cheat'), icon: Zap },
    ...(showSamu ? [{ id: 'samu', label: t('tab.detectSamu'), icon: Crosshair }] : []),
  ];

  const partners = [
    { name: 'ZK PVP', logo: 'https://i.postimg.cc/qMSRKwXw/image.png', link: 'https://discord.gg/zkpvpgg' },
    { name: 'QUEBRADA RP', logo: 'https://i.postimg.cc/Znjwg0jB/image.png', link: 'https://discord.gg/SFNwYXzXNk' },
    { name: 'COMPLEXO ORG DE FF', logo: null, link: 'https://discord.gg/complexoesports', icon: Shield },
    { name: 'EQUIPE SS LODARK TEAM', logo: 'https://i.postimg.cc/GmB1F1hJ/image.png', link: 'https://discord.gg/7ePKTVDanJ' },
  ];

  const filteredBam = useMemo(() => {
    return allLogs.filter(l => (l.category === 'BAM' || l.category === 'Forensics') && 
      (l.title.toLowerCase().includes(bamSearch.toLowerCase()) || l.description.toLowerCase().includes(bamSearch.toLowerCase())));
  }, [allLogs, bamSearch]);

  const renderContent = () => {
    switch (activeTab) {
      case 'overview':
        return (
          <div className="space-y-12 animate-in fade-in duration-500">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2 space-y-8">
                    {/* Destaques (Top 10 Detections) */}
                    {allLogs.filter(l => l.severity === 'Critical' || l.severity === 'High').length > 0 && (
                        <div className="p-10 border border-white/[0.03] bg-[#080808] rounded-[2.5rem] mb-8">
                            <h3 className="text-[10px] font-black text-slate-500 uppercase tracking-[0.4em] mb-8 flex items-center gap-2">
                                <AlertTriangle size={14} className="text-amber-500" /> DESTAQUES CRÍTICOS
                            </h3>
                            <div className="space-y-4">
                                {allLogs
                                    .filter(l => l.severity === 'Critical' || l.severity === 'High')
                                    .sort((a, b) => (b.score || 0) - (a.score || 0))
                                    .slice(0, 10)
                                    .map((log, i) => (
                                        <div key={i} className={`p-6 rounded-[1.5rem] flex flex-col md:flex-row md:items-center justify-between gap-4 border ${log.severity === 'Critical' ? 'border-red-500/20 bg-red-500/[0.02]' : 'border-amber-500/20 bg-amber-500/[0.02]'}`}>
                                            <div className="flex items-center gap-5">
                                                <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${log.severity === 'Critical' ? 'bg-red-500/[0.05] text-red-500' : 'bg-amber-500/[0.05] text-amber-500'}`}>
                                                    <ShieldAlert size={16} />
                                                </div>
                                                <div>
                                                    <h4 className="text-[11px] font-black text-white uppercase tracking-widest">{log.title}</h4>
                                                    <p className="text-[9px] font-bold text-slate-500 uppercase mt-1 tracking-wide line-clamp-1">{log.description}</p>
                                                </div>
                                            </div>
                                            <div className="flex gap-2 shrink-0 md:ml-auto pl-14 md:pl-0">
                                                <span className={`text-[8px] font-black px-3 py-1 rounded-full uppercase tracking-widest border ${log.severity === 'Critical' ? 'bg-red-500/10 text-red-400 border-red-500/20' : 'bg-amber-500/10 text-amber-400 border-amber-500/20'}`}>
                                                    {log.severity}
                                                </span>
                                                {log.category && (
                                                    <span className="text-[8px] font-black px-3 py-1 rounded-full uppercase tracking-widest bg-white/[0.02] text-slate-400 border border-white/[0.03]">
                                                        {log.category}
                                                    </span>
                                                )}
                                            </div>
                                        </div>
                                    ))}
                            </div>
                        </div>
                    )}

                    <div className="p-10 border border-white/[0.03] bg-[#080808] rounded-[2.5rem]">
                        <h3 className="text-[10px] font-black text-slate-500 uppercase tracking-[0.4em] mb-10 flex items-center gap-2">
                           <Monitor size={14} className="text-purple-500" /> {t('result.envSummary')}
                        </h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                           {[
                             { label: t('result.os'), value: result.systemInfo?.os || 'Windows 10/11' },
                             { label: t('result.hwid'), value: result.systemInfo?.hwid?.substring(0, 32) || 'PROTECTED_ID' },
                             { label: t('result.machineName'), value: result.systemInfo?.pcName || 'LODARK-PC' },
                             { label: t('result.ipAddress'), value: result.systemInfo?.ip || '0.0.0.0' }
                           ].map((inf, i) => (
                             <div key={i} className="space-y-2">
                                <span className="text-[9px] font-bold text-slate-600 uppercase tracking-widest">{inf.label}</span>
                                <p className="text-xs font-black text-white tracking-tight truncate">{inf.value}</p>
                             </div>
                           ))}
                        </div>
                    </div>
                    
                    <div className="p-10 border border-white/[0.03] bg-[#080808] rounded-[2.5rem]">
                        <h3 className="text-[10px] font-black text-slate-500 uppercase tracking-[0.4em] mb-8 flex items-center gap-2">
                           <ShieldCheck size={14} className="text-emerald-500" /> {t('result.secStatus')}
                        </h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="flex items-center justify-between p-5 bg-[#0a0a0a] border border-white/[0.02] rounded-2xl">
                                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{t('result.secureBoot')}</span>
                                <span className="text-[9px] font-black text-emerald-500 uppercase tracking-[0.2em]">{t('result.active')}</span>
                            </div>
                            <div className="flex items-center justify-between p-5 bg-[#0a0a0a] border border-white/[0.02] rounded-2xl">
                                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{t('result.virtualization')}</span>
                                <span className="text-[9px] font-black text-emerald-500 uppercase tracking-[0.2em]">{t('result.protected')}</span>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="space-y-8">
                    <div className={`p-12 rounded-[2.5rem] border ${status.border} ${status.bg} flex flex-col items-center text-center relative overflow-hidden`}>
                        <span className="text-[10px] font-black text-slate-500 uppercase tracking-[0.5em] mb-6">{t('result.riskScore')}</span>
                        <div className="relative mb-6">
                            <span className={`text-[6rem] leading-none font-black tracking-tighter ${status.color}`}>{riskScore}</span>
                            <span className="text-lg font-black text-slate-700 absolute bottom-2 -right-8">/100</span>
                        </div>
                        <div className={`text-[9px] font-black uppercase tracking-[0.4em] px-6 py-2 rounded-full border border-current/20 ${status.color} bg-black/40`}>
                           {status.label}
                        </div>
                    </div>

                    <div className="p-10 rounded-[2.5rem] border border-purple-500/10 bg-purple-500/[0.02]">
                        <span className="text-[9px] font-black text-purple-500/50 uppercase tracking-[0.4em] mb-6 block">{t('result.auditToken')}</span>
                        <div className="flex items-center gap-4">
                            <Fingerprint className="text-purple-500" size={24} />
                            <div className="overflow-hidden">
                                <p className="text-lg font-black text-white tracking-widest truncate">{result.pin}</p>
                                <p className="text-[8px] font-bold text-purple-500/50 uppercase tracking-widest">{t('result.tokenDesc')}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
          </div>
        );
      case 'bam':
        return (
          <div className="space-y-8 animate-in slide-in-from-right-4 duration-500">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-8">
                <h3 className="text-[10px] font-black text-slate-500 uppercase tracking-[0.4em] flex items-center gap-2">
                    <Clock size={14} className="text-purple-500" /> HISTÓRICO BAM / EXECUÇÃO ({filteredBam.length})
                </h3>
                <div className="relative w-full md:w-96">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-600" size={16} />
                    <input 
                        type="text" 
                        placeholder={t('result.searchPlaceholder')}
                        value={bamSearch}
                        onChange={(e) => setBamSearch(e.target.value)}
                        className="w-full bg-[#080808] border border-white/[0.03] rounded-full py-3 pl-12 pr-6 text-xs font-bold text-slate-200 focus:outline-none focus:border-purple-500/50 transition-all placeholder:text-slate-700"
                    />
                </div>
            </div>
            <div className="bg-[#080808] border border-white/[0.03] rounded-[2.5rem] overflow-hidden divide-y divide-white/[0.02]">
                {filteredBam.length === 0 ? (
                    <div className="p-24 text-center opacity-40 italic text-[11px] font-bold uppercase tracking-widest text-slate-500">{t('result.noLogs')}</div>
                ) : (
                    filteredBam.map((log, i) => (
                        <div key={i} className="p-6 flex items-center justify-between hover:bg-white/[0.01] transition-colors group">
                            <div className="flex items-center gap-6">
                                <div className="w-10 h-10 rounded-xl bg-[#0a0a0a] border border-white/[0.02] flex items-center justify-center text-slate-600 group-hover:text-purple-500 transition-colors">
                                    <Terminal size={16} />
                                </div>
                                <div>
                                    <p className="text-xs font-black text-slate-200 uppercase tracking-widest">{log.title}</p>
                                    <p className="text-[10px] font-bold text-slate-600 uppercase mt-1 tracking-wide">{log.description}</p>
                                </div>
                            </div>
                            <span className="text-[9px] font-black text-slate-700 bg-white/[0.02] px-4 py-1.5 rounded-full border border-white/[0.03] group-hover:border-purple-500/20 group-hover:text-purple-400 transition-all">
                                {log.severity}
                            </span>
                        </div>
                    ))
                )}
            </div>
          </div>
        );
      case 'bypass':
        const bypassLogs = allLogs.filter(l => l.category === 'Bypass' || l.category === 'Methods');
        return (
          <div className="space-y-8 animate-in slide-in-from-right-4 duration-500">
            <h3 className="text-[10px] font-black text-slate-500 uppercase tracking-[0.4em] flex items-center gap-2">
                <ShieldAlert size={14} className="text-amber-500" /> TÉCNICAS DE BYPASS DETECTADAS ({bypassLogs.length})
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {bypassLogs.length === 0 ? (
                    <div className="col-span-full py-32 bg-[#080808] border border-white/[0.03] rounded-[2.5rem] border-dashed flex flex-col items-center justify-center opacity-50">
                        <ShieldCheck size={32} className="text-emerald-500 mb-6" />
                        <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.4em]">{t('result.noBypass')}</p>
                    </div>
                ) : (
                    bypassLogs.map((log, i) => (
                        <div key={i} className="p-10 rounded-[2.5rem] border border-amber-500/10 bg-amber-500/[0.01] hover:border-amber-500/20 transition-all">
                            <h4 className="text-sm font-black text-white uppercase tracking-widest mb-3">{log.title}</h4>
                            <p className="text-[10px] font-bold text-slate-500 leading-relaxed uppercase tracking-wide">{log.description}</p>
                            <div className="mt-6 pt-6 border-t border-white/5 flex items-center justify-between">
                                <span className="text-[9px] font-black text-amber-500/50 uppercase tracking-widest">Risco Crítico</span>
                                <span className="text-[9px] font-black text-slate-700 uppercase tracking-widest">SCORE +{log.score}</span>
                            </div>
                        </div>
                    ))
                )}
            </div>
          </div>
        );
      case 'forensics':
        const forensicLogs = allLogs.filter(l => l.category === 'Forensics' || l.category === 'USN' || l.category === 'Journal');
        return (
          <div className="space-y-8 animate-in slide-in-from-right-4 duration-500">
            <h3 className="text-[10px] font-black text-slate-500 uppercase tracking-[0.4em] flex items-center gap-2">
                <FileSearch size={14} className="text-blue-500" /> ARTEFATOS FORENSES ({forensicLogs.length})
            </h3>
            <div className="space-y-4">
                {forensicLogs.map((log, i) => (
                    <div key={i} className="p-8 rounded-[2rem] flex items-center justify-between border border-blue-500/10 bg-[#080808]">
                        <div className="flex items-center gap-6">
                            <div className="w-10 h-10 rounded-xl bg-[#0a0a0a] border border-blue-500/10 flex items-center justify-center text-blue-500">
                                <HardDrive size={16} />
                            </div>
                            <div>
                                <h4 className="text-[11px] font-black text-white uppercase tracking-widest mb-1">{log.title}</h4>
                                <p className="text-[9px] font-bold text-slate-500 uppercase tracking-wide">{log.description}</p>
                            </div>
                        </div>
                        <span className="text-[9px] font-black text-blue-400/50 uppercase tracking-widest">{log.severity}</span>
                    </div>
                ))}
            </div>
          </div>
        );
      case 'network':
        const networkLogs = allLogs.filter(l => l.category === 'Network' || l.category === 'Auth');
        return (
          <div className="space-y-8 animate-in slide-in-from-right-4 duration-500">
            <h3 className="text-[10px] font-black text-slate-500 uppercase tracking-[0.4em] flex items-center gap-2">
                <Globe size={14} className="text-indigo-500" /> REDE & SISTEMAS DE AUTH ({networkLogs.length})
            </h3>
            {networkLogs.length === 0 ? (
                <div className="p-24 rounded-[2.5rem] bg-[#080808] border border-white/[0.03] text-center opacity-40 text-[10px] font-bold uppercase tracking-widest text-slate-500">
                    {t('result.noNetwork')}
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {networkLogs.map((log, i) => (
                        <div key={i} className="p-10 rounded-[2.5rem] border border-indigo-500/10 bg-[#080808]">
                            <Network className="text-indigo-500 mb-6" size={24} />
                            <h4 className="text-xs font-black text-white uppercase tracking-widest mb-2">{log.title}</h4>
                            <p className="text-[10px] font-bold text-slate-500 leading-relaxed uppercase tracking-wide">{log.description}</p>
                        </div>
                    ))}
                </div>
            )}
          </div>
        );
      case 'services':
        const serviceLogs = allLogs.filter(l => l.category === 'Services' || l.category === 'System' || l.category === 'Bypass');
        const firmwareLogs = allLogs.filter(l => l.category === 'DMA' || l.category === 'Methods');
        
        return (
          <div className="space-y-12 animate-in slide-in-from-right-4 duration-500">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
                <div className="lg:col-span-2 space-y-8">
                    <h3 className="text-[10px] font-black text-slate-500 uppercase tracking-[0.4em] flex items-center gap-2 px-2">
                        <Server size={14} className="text-purple-500" /> {t('result.criticalServices')}
                    </h3>
                    <div className="bg-[#080808] border border-white/[0.03] rounded-[2.5rem] divide-y divide-white/[0.02]">
                        {[
                          "PcaSvc", "PlugPlay", "DPS", "DiagTrack", "SysMain", "Sysmon", "EventLog", "Ndu", "TPM"
                        ].map((sName, idx) => {
                            const log = allLogs.find(l => l.title.includes(sName));
                            const isActive = log && (log.severity === 'Info' || log.description.toLowerCase().includes('ativo'));
                            return (
                                <div key={idx} className="p-8 flex items-center justify-between group hover:bg-white/[0.01] transition-colors">
                                    <div className="flex items-center gap-6">
                                        <div className={`w-10 h-10 rounded-xl flex items-center justify-center border ${isActive ? 'bg-emerald-500/[0.02] border-emerald-500/20 text-emerald-500' : 'bg-red-500/[0.02] border-red-500/20 text-red-500'}`}>
                                            <Activity size={16} />
                                        </div>
                                        <div>
                                            <h4 className="text-xs font-black text-slate-200 uppercase tracking-widest">{sName}</h4>
                                            <p className="text-[9px] font-bold text-slate-600 uppercase mt-1 tracking-wide">{log?.description || t('result.verifying')}</p>
                                        </div>
                                    </div>
                                    <span className={`text-[8px] font-black px-4 py-1.5 rounded-full border ${isActive ? 'bg-emerald-500/5 text-emerald-500 border-emerald-500/20' : 'bg-red-500/5 text-red-500 border-red-500/20'}`}>
                                        {isActive ? t('result.activeUpper') : t('result.disabledUpper')}
                                    </span>
                                </div>
                            );
                        })}
                    </div>
                </div>

                <div className="space-y-8">
                    <h3 className="text-[10px] font-black text-slate-500 uppercase tracking-[0.4em] flex items-center gap-2 px-2">
                        <Cpu size={14} className="text-purple-500" /> {t('result.firmwareBoot')}
                    </h3>
                    <div className="p-10 rounded-[2.5rem] border border-purple-500/10 bg-purple-500/[0.01] space-y-8">
                        {[
                            { label: 'Secure Boot', active: true },
                            { label: 'TPM 2.0 State', active: true },
                            { label: 'Firmware Integrity', active: true },
                            { label: 'Kernel Signing', active: true }
                        ].map((f, i) => (
                            <div key={i} className="flex items-center justify-between">
                                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{f.label}</span>
                                <div className="flex items-center gap-3">
                                    <span className="text-[9px] font-black text-emerald-500 uppercase tracking-[0.2em]">{t('result.verified')}</span>
                                    <ShieldCheck size={14} className="text-emerald-500" />
                                </div>
                            </div>
                        ))}
                        <div className="pt-6 border-t border-white/[0.03]">
                            <p className="text-[8px] font-bold text-slate-600 uppercase tracking-[0.3em] leading-relaxed">
                                {t('result.firmwareNote')}
                            </p>
                        </div>
                    </div>
                </div>
            </div>
          </div>
        );
      case 'cheat':
        const cheatLogs = allLogs.filter(l => l.category === 'Cheats' || l.category === 'Malware');
        return (
          <div className="space-y-8 animate-in slide-in-from-right-4 duration-500">
            <h3 className="text-[10px] font-black text-slate-500 uppercase tracking-[0.4em] flex items-center gap-2">
                <Zap size={14} className="text-red-500" /> DETECÇÕES ESPECÍFICAS DE CHEAT ({cheatLogs.length})
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {cheatLogs.length === 0 ? (
                    <div className="col-span-full py-40 rounded-[2.5rem] bg-[#080808] border border-white/[0.03] text-center opacity-40 text-[10px] font-bold uppercase tracking-widest text-slate-500">
                        {t('result.noCheat')}
                    </div>
                ) : (
                    cheatLogs.map((log, i) => (
                        <div key={i} className="p-10 rounded-[2.5rem] border border-red-500/20 bg-[#0a0a0a]">
                            <ShieldAlert className="text-red-500 mb-6" size={24} />
                            <h4 className="text-xs font-black text-white uppercase tracking-widest mb-2">{log.title}</h4>
                            <p className="text-[10px] font-bold text-red-500/60 leading-relaxed uppercase tracking-wide">{log.description}</p>
                        </div>
                    ))
                )}
            </div>
          </div>
        );
      case 'generic':
        const genericLogs = allLogs.filter(l => l.category === 'Memory' || l.category === 'Generic' || l.category === 'Strings');
        return (
          <div className="space-y-8 animate-in slide-in-from-right-4 duration-500">
            <h3 className="text-[10px] font-black text-slate-500 uppercase tracking-[0.4em] flex items-center gap-2">
                <Layers size={14} className="text-slate-500" /> DETECÇÕES GENÉRICAS / STRINGS ({genericLogs.length})
            </h3>
            <div className="bg-[#080808] border border-white/[0.03] rounded-[2.5rem] divide-y divide-white/[0.02]">
                {genericLogs.map((log, i) => (
                    <div key={i} className="p-8 flex items-center justify-between group">
                        <div className="flex items-center gap-6">
                            <Search className="text-slate-700 group-hover:text-purple-500 transition-colors" size={16} />
                            <div>
                                <h4 className="text-[11px] font-black text-slate-300 uppercase tracking-widest">{log.title}</h4>
                                <p className="text-[9px] font-bold text-slate-600 uppercase mt-1 tracking-wide">{log.description}</p>
                            </div>
                        </div>
                        <span className="text-[9px] font-black text-slate-700 tracking-widest uppercase">SCORE +{log.score}</span>
                    </div>
                ))}
            </div>
          </div>
        );
      case 'samu':
        const samuLogs = allLogs.filter(l => l.category === 'Samu');
        return (
          <div className="space-y-10 animate-in slide-in-from-right-4 duration-500 pb-20">
            <div className="flex flex-col gap-3 px-4">
                <h3 className="text-[10px] font-black text-purple-500 uppercase tracking-[0.5em] flex items-center gap-3">
                    <Crosshair size={16} /> {t('result.privateDetections')}
                </h3>
                <p className="text-[9px] font-bold text-slate-600 uppercase tracking-widest">
                    {t('result.privateDesc')}
                </p>
            </div>

            <div className="grid grid-cols-1 gap-6">
                {samuLogs.length === 0 ? (
                    <div className="p-20 rounded-[2.5rem] bg-[#080808] border border-white/[0.03] flex flex-col items-center justify-center text-center opacity-40">
                        <ShieldCheck size={32} className="mb-6 text-purple-500" />
                        <p className="text-[10px] font-black text-slate-500 uppercase tracking-[0.4em]">{t('result.noSamu')}</p>
                    </div>
                ) : (
                    samuLogs.map((log, i) => (
                        <div key={i} className="p-10 rounded-[2.5rem] bg-[#080808] border border-purple-500/10 group hover:border-purple-500/20 transition-all">
                            <div className="flex items-start justify-between gap-8">
                                <div className="flex gap-8">
                                    <div className="w-12 h-12 rounded-xl bg-[#0a0a0a] border border-purple-500/20 flex items-center justify-center text-purple-500">
                                        <ShieldAlert size={20} />
                                    </div>
                                    <div className="space-y-3">
                                        <h4 className="text-xs font-black text-white uppercase tracking-widest">{log.title}</h4>
                                        <p className="text-[10px] font-bold text-slate-500 leading-relaxed max-w-2xl uppercase tracking-wide">{log.description}</p>
                                        <div className="flex items-center gap-4 pt-2">
                                            <span className="text-[8px] font-black px-3 py-1 bg-purple-500/[0.05] text-purple-400 rounded-md border border-purple-500/20 uppercase">SAMU_CORE</span>
                                            <span className="text-[8px] font-black text-slate-600 uppercase tracking-widest">Risco: {log.risk || 10}/10</span>
                                        </div>
                                    </div>
                                </div>
                                <div className="p-3 bg-[#0a0a0a] rounded-xl border border-red-500/10 group-hover:scale-110 transition-transform">
                                    <AlertTriangle className="text-red-500" size={16} />
                                </div>
                            </div>
                        </div>
                    ))
                )}
            </div>

            <div className="p-8 bg-[#0a0a0a] border border-purple-500/10 rounded-[2rem] mt-10">
                <p className="text-[8px] font-black text-purple-500/40 uppercase tracking-[0.3em] leading-relaxed text-center">
                    {t('result.privateNote')}
                </p>
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-[#050505] text-slate-200 font-sans selection:bg-purple-500/30 overflow-x-hidden pb-40">
      <Navbar />

      <main className="max-w-[1300px] mx-auto px-10 py-20">
        
        {/* HEADER SECTION - TOTAL CLEAN */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-10 mb-24 animate-in fade-in duration-1000">
            <div className="space-y-4">
                <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-purple-500/5 border border-purple-500/20 rounded-full mb-6">
                    <ShieldCheck size={12} className="text-purple-500" />
                    <span className="text-[9px] font-black text-purple-500 uppercase tracking-[0.4em]">{t('result.reportTitle')}</span>
                </div>
                <h1 className="text-6xl font-black tracking-tighter uppercase leading-[0.8] text-white">
                    LODARK<span className="text-purple-600">.</span>AC
                </h1>
                <p className="text-[11px] font-bold text-slate-600 uppercase tracking-[0.3em]">Advanced Forensic Intelligence • PIN #{result.pin}</p>
            </div>
            <div className="text-right hidden md:block">
                <p className="text-[9px] font-black text-slate-700 uppercase tracking-[0.5em] mb-2">{t('result.extractedAt')}</p>
                <p className="text-sm font-black text-white uppercase tracking-tight">
                    {new Date(result.createdAt).toLocaleDateString('pt-BR')} <span className="text-purple-500 mx-2">•</span> {new Date(result.createdAt).toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' })}
                </p>
            </div>
        </div>

        {/* TAB NAVIGATION - CLEAN STYLE */}
        <div className="flex flex-wrap gap-2 mb-20 p-2 bg-[#080808] border border-white/[0.03] rounded-[2.5rem] w-fit">
            {tabs.map((tab) => (
                <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id as TabType)}
                    className={`flex items-center gap-3 px-8 py-3.5 rounded-[2rem] transition-all duration-500 ${activeTab === tab.id ? 'bg-purple-600 text-white shadow-[0_0_20px_rgba(139,92,246,0.2)] scale-[1.02]' : 'text-slate-500 hover:text-white hover:bg-white/[0.02]'}`}
                >
                    <tab.icon size={14} strokeWidth={activeTab === tab.id ? 3 : 2} />
                    <span className="text-[10px] font-black uppercase tracking-widest">{tab.label}</span>
                </button>
            ))}
        </div>

        {/* MAIN CONTENT AREA */}
        <div className="min-h-[600px]">
            {renderContent()}
        </div>

        {/* PARTNERSHIP SECTION */}
        <div className="mt-48 border-t border-white/[0.02] pt-24 text-center">
            <h3 className="text-[9px] font-black text-slate-700 uppercase tracking-[0.5em] mb-16">{t('result.partnerComms')}</h3>
            <div className="flex flex-wrap justify-center items-center gap-20 opacity-40 hover:opacity-100 transition-opacity duration-1000">
                {partners.map((p, i) => (
                    <a href={p.link} target="_blank" rel="noreferrer" key={i} className="flex flex-col items-center gap-6 group grayscale hover:grayscale-0 transition-all duration-500">
                        <div className="h-16 w-16 rounded-[1.5rem] bg-[#0a0a0a] p-4 border border-white/[0.03] group-hover:border-purple-500/40 transition-all group-hover:scale-110 flex items-center justify-center">
                            {p.logo ? (
                                <img src={p.logo} alt={p.name} className="w-full h-full object-contain filter drop-shadow-[0_0_10px_rgba(255,255,255,0.02)]" />
                            ) : p.icon ? (
                                <p.icon className="text-slate-600 group-hover:text-purple-500" size={24} />
                            ) : null}
                        </div>
                        <span className="text-[9px] font-black text-slate-600 uppercase tracking-[0.3em] group-hover:text-purple-400 transition-colors">{p.name}</span>
                    </a>
                ))}
            </div>
        </div>

      </main>

      <footer className="max-w-[1300px] mx-auto px-10 py-24 flex flex-col md:flex-row justify-between items-center gap-12 border-t border-white/[0.02] mt-32">
         <div className="flex items-center gap-5 opacity-30">
            <Shield size={16} className="text-purple-600" />
            <span className="text-[9px] font-black uppercase tracking-[0.5em]">Lodark Alpha Forensic v2.5.0</span>
         </div>
         <p className="text-[9px] font-black text-slate-700 uppercase tracking-[0.4em]">{t('result.footerNote')}</p>
      </footer>
    </div>
  );
}
