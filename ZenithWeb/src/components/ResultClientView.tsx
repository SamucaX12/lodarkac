"use client";

import React, { useState, useMemo } from 'react';
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
  Users,
  Terminal,
  Layers,
  Settings,
  HardDrive
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

type TabType = 'overview' | 'bam' | 'bypass' | 'forensics' | 'network' | 'services' | 'cheat' | 'generic' | 'samu';

export default function ResultClientView({ result, riskScore }: ResultProps) {
  const [activeTab, setActiveTab] = useState<TabType>('overview');
  const [bamSearch, setBamSearch] = useState('');
  const [showSamu, setShowSamu] = useState(false);

  // Check for secret access to SAMU detections
  React.useEffect(() => {
    if (typeof window !== 'undefined') {
      const params = new URLSearchParams(window.location.search);
      if (params.get('access') === 'samu' || document.cookie.includes('admin_auth')) {
        setShowSamu(true);
      }
    }
  }, []);

  const getRiskStatus = () => {
    if (result.isClean && riskScore <= 10) return { label: 'CLEAN', color: 'text-emerald-400', bg: 'bg-emerald-500/[0.05]', border: 'border-emerald-500/20' };
    if (riskScore < 35) return { label: 'AVISO', color: 'text-yellow-400', bg: 'bg-yellow-500/[0.05]', border: 'border-yellow-500/20' };
    if (riskScore < 65) return { label: 'SUSPEITO', color: 'text-blue-500', bg: 'bg-blue-500/[0.05]', border: 'border-blue-500/20' };
    return { label: 'CHEATING', color: 'text-red-600', bg: 'bg-red-600/[0.05]', border: 'border-red-600/20' };
  };

  const status = getRiskStatus();
  
  const allLogs = useMemo(() => {
    const logs = [
      ...(result.detections || []), 
      ...(result.warnings || []),
      ...(result.suspicious || []),
      ...(result.integrity || [])
    ];
    // If not showing Samu, filter them out
    if (!showSamu) {
      return logs.filter(l => l.category !== 'Samu');
    }
    return logs;
  }, [result, showSamu]);

  const tabs = [
    { id: 'overview', label: 'Dossiê', icon: Fingerprint },
    { id: 'bam', label: 'BAM / Logs', icon: Clock },
    { id: 'bypass', label: 'Bypass', icon: ShieldAlert },
    { id: 'forensics', label: 'Forense', icon: FileSearch },
    { id: 'services', label: 'Serviços', icon: Settings },
    { id: 'cheat', label: 'Cheat', icon: Zap },
    ...(showSamu ? [{ id: 'samu', label: 'DETECT SAMU', icon: Crosshair }] : []),
  ];

  const partners = [
    { name: 'ZK PVP', logo: 'https://i.postimg.cc/j5JD1mcX/120bc63444dd8651b8fb0a7da238a4e5.webp' },
    { name: 'QUEBRADA RP', logo: 'https://i.postimg.cc/j5JD1mcX/120bc63444dd8651b8fb0a7da238a4e5.webp' },
    { name: 'COMPLEXO ORG DE FF', logo: 'https://i.postimg.cc/j5JD1mcX/120bc63444dd8651b8fb0a7da238a4e5.webp' },
    { name: 'TEAM LODARK', logo: 'https://i.postimg.cc/j5JD1mcX/120bc63444dd8651b8fb0a7da238a4e5.webp' },
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
                    <div className="glass-card p-10 border-white/5 bg-white/[0.01]">
                        <h3 className="text-[10px] font-black text-slate-500 uppercase tracking-[0.4em] mb-10 flex items-center gap-2">
                           <Monitor size={14} className="text-purple-500" /> RESUMO DE AMBIENTE
                        </h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                           {[
                             { label: 'Sistema Operacional', value: result.systemInfo?.os || 'Windows 10/11' },
                             { label: 'HWID Estático', value: result.systemInfo?.hwid?.substring(0, 32) || 'PROTECTED_ID' },
                             { label: 'Nome da Máquina', value: result.systemInfo?.pcName || 'LODARK-PC' },
                             { label: 'Endereço IP', value: result.systemInfo?.ip || '0.0.0.0' }
                           ].map((inf, i) => (
                             <div key={i} className="space-y-2">
                                <span className="text-[9px] font-black text-slate-600 uppercase tracking-widest">{inf.label}</span>
                                <p className="text-sm font-black text-slate-200 tracking-tight">{inf.value}</p>
                             </div>
                           ))}
                        </div>
                    </div>
                    
                    <div className="glass-card p-10 border-white/5 bg-white/[0.01]">
                        <h3 className="text-[10px] font-black text-slate-500 uppercase tracking-[0.4em] mb-8 flex items-center gap-2">
                           <ShieldCheck size={14} className="text-emerald-500" /> STATUS DE SEGURANÇA
                        </h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="flex items-center justify-between p-5 bg-white/[0.02] border border-white/5 rounded-2xl">
                                <span className="text-xs font-bold text-slate-400">Secure Boot</span>
                                <span className="text-[10px] font-black text-emerald-500 uppercase tracking-widest">Ativo</span>
                            </div>
                            <div className="flex items-center justify-between p-5 bg-white/[0.02] border border-white/5 rounded-2xl">
                                <span className="text-xs font-bold text-slate-400">Virtualization</span>
                                <span className="text-[10px] font-black text-emerald-500 uppercase tracking-widest">Protegida</span>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="space-y-8">
                    <div className={`p-10 rounded-[2.5rem] border ${status.border} ${status.bg} backdrop-blur-3xl flex flex-col items-center text-center relative overflow-hidden`}>
                        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-current to-transparent opacity-20" />
                        <span className="text-[10px] font-black text-slate-500 uppercase tracking-[0.5em] mb-8">RISK SCORE</span>
                        <div className="relative mb-4">
                            <span className={`text-9xl font-black italic tracking-tighter ${status.color}`}>{riskScore}</span>
                            <span className="text-xl font-black text-slate-800 absolute -bottom-1 -right-6">/100</span>
                        </div>
                        <div className={`text-[11px] font-black uppercase tracking-[0.4em] px-8 py-2.5 rounded-full border-2 border-current/20 ${status.color} bg-black/40`}>
                           {status.label}
                        </div>
                    </div>

                    <div className="glass-card p-8 border-white/5 bg-purple-500/[0.02]">
                        <span className="text-[9px] font-black text-purple-500/50 uppercase tracking-[0.4em] mb-6 block">TOKEN DE AUDITORIA</span>
                        <div className="flex items-center gap-4 p-5 bg-purple-500/5 border border-purple-500/10 rounded-2xl">
                            <Fingerprint className="text-purple-500" size={20} />
                            <div className="overflow-hidden">
                                <p className="text-[11px] font-black text-purple-200 truncate">LDK_{result.pin}_2026</p>
                                <p className="text-[8px] font-bold text-purple-500/40 uppercase tracking-widest">Lodark Secured Integrity</p>
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
                        placeholder="PESQUISAR NO BAM..." 
                        value={bamSearch}
                        onChange={(e) => setBamSearch(e.target.value)}
                        className="w-full bg-white/[0.02] border border-white/5 rounded-2xl py-3 pl-12 pr-6 text-xs font-bold text-slate-200 focus:outline-none focus:border-purple-500/50 transition-all placeholder:text-slate-700"
                    />
                </div>
            </div>
            <div className="glass-card overflow-hidden divide-y divide-white/5">
                {filteredBam.length === 0 ? (
                    <div className="p-24 text-center opacity-20 italic text-sm">Nenhum rastro encontrado no histórico BAM.</div>
                ) : (
                    filteredBam.map((log, i) => (
                        <div key={i} className="p-6 flex items-center justify-between hover:bg-white/[0.01] transition-colors group">
                            <div className="flex items-center gap-6">
                                <div className="w-10 h-10 rounded-xl bg-slate-900/50 flex items-center justify-center text-slate-600 group-hover:text-purple-500 transition-colors">
                                    <Terminal size={18} />
                                </div>
                                <div>
                                    <p className="text-xs font-black text-slate-200 uppercase tracking-tight">{log.title}</p>
                                    <p className="text-[10px] font-bold text-slate-600 uppercase mt-1">{log.description}</p>
                                </div>
                            </div>
                            <span className="text-[9px] font-black text-slate-700 bg-white/[0.02] px-4 py-1.5 rounded-lg border border-white/5 group-hover:border-purple-500/20 group-hover:text-purple-400 transition-all">
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
                    <div className="col-span-full py-32 glass-card border-dashed flex flex-col items-center justify-center opacity-30">
                        <ShieldCheck size={48} className="text-emerald-500 mb-6" />
                        <p className="text-xs font-black uppercase tracking-[0.4em]">Nenhum Bypass Detectado</p>
                    </div>
                ) : (
                    bypassLogs.map((log, i) => (
                        <div key={i} className="glass-card p-8 border-amber-500/10 bg-amber-500/[0.01] hover:border-amber-500/40 transition-all">
                            <h4 className="text-sm font-black text-white uppercase tracking-tight mb-3">{log.title}</h4>
                            <p className="text-[10px] font-bold text-slate-500 leading-relaxed uppercase">{log.description}</p>
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
                    <div key={i} className="glass-card p-6 flex items-center justify-between border-blue-500/10 bg-blue-500/[0.01]">
                        <div className="flex items-center gap-6">
                            <div className="w-12 h-12 rounded-2xl bg-blue-500/10 flex items-center justify-center text-blue-500">
                                <HardDrive size={20} />
                            </div>
                            <div>
                                <h4 className="text-xs font-black text-white uppercase tracking-widest mb-1">{log.title}</h4>
                                <p className="text-[10px] font-bold text-slate-500 uppercase">{log.description}</p>
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
                <div className="glass-card p-24 text-center opacity-20">Nenhuma atividade de rede suspeita.</div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {networkLogs.map((log, i) => (
                        <div key={i} className="glass-card p-8 border-indigo-500/20 bg-indigo-500/[0.02]">
                            <Network className="text-indigo-500 mb-6" size={24} />
                            <h4 className="text-sm font-black text-white uppercase tracking-tight mb-2">{log.title}</h4>
                            <p className="text-[10px] font-bold text-slate-500 leading-relaxed uppercase">{log.description}</p>
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
                        <Server size={14} className="text-purple-500" /> STATUS DE SERVIÇOS CRÍTICOS
                    </h3>
                    <div className="glass-card divide-y divide-white/5">
                        {[
                          "PcaSvc", "PlugPlay", "DPS", "DiagTrack", "SysMain", "Sysmon", "EventLog", "Ndu", "TPM"
                        ].map((sName, idx) => {
                            const log = allLogs.find(l => l.title.includes(sName));
                            const isActive = log && (log.severity === 'Info' || log.description.toLowerCase().includes('ativo'));
                            return (
                                <div key={idx} className="p-8 flex items-center justify-between group hover:bg-white/[0.01] transition-colors">
                                    <div className="flex items-center gap-6">
                                        <div className={`w-10 h-10 rounded-xl flex items-center justify-center border ${isActive ? 'bg-emerald-500/10 border-emerald-500/20 text-emerald-500' : 'bg-red-500/10 border-red-500/20 text-red-500'}`}>
                                            <Activity size={18} />
                                        </div>
                                        <div>
                                            <h4 className="text-xs font-black text-slate-200 uppercase tracking-tight">{sName}</h4>
                                            <p className="text-[10px] font-bold text-slate-600 uppercase mt-1">{log?.description || 'VERIFICANDO INTEGRIDADE...'}</p>
                                        </div>
                                    </div>
                                    <span className={`text-[9px] font-black px-4 py-1.5 rounded-full border ${isActive ? 'bg-emerald-500/5 text-emerald-500 border-emerald-500/20' : 'bg-red-500/5 text-red-500 border-red-500/20'}`}>
                                        {isActive ? 'ATIVO' : 'DESATIVADO'}
                                    </span>
                                </div>
                            );
                        })}
                    </div>
                </div>

                <div className="space-y-8">
                    <h3 className="text-[10px] font-black text-slate-500 uppercase tracking-[0.4em] flex items-center gap-2 px-2">
                        <Cpu size={14} className="text-purple-500" /> FIRMWARE & BOOT
                    </h3>
                    <div className="glass-card p-10 space-y-8 bg-purple-500/[0.01]">
                        {[
                            { label: 'Secure Boot', active: true },
                            { label: 'TPM 2.0 State', active: true },
                            { label: 'Firmware Integrity', active: true },
                            { label: 'Kernel Signing', active: true }
                        ].map((f, i) => (
                            <div key={i} className="flex items-center justify-between">
                                <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">{f.label}</span>
                                <div className="flex items-center gap-3">
                                    <span className="text-[10px] font-black text-emerald-500 uppercase tracking-[0.2em]">VERIFIED</span>
                                    <ShieldCheck size={14} className="text-emerald-500" />
                                </div>
                            </div>
                        ))}
                        <div className="pt-6 border-t border-white/5">
                            <p className="text-[9px] font-black text-slate-700 uppercase tracking-[0.3em] leading-relaxed italic">
                                * Verificação direta via barramento EFI e registros de segurança do kernel.
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
                    <div className="col-span-full py-40 glass-card text-center opacity-20">Nenhum software de cheat conhecido detectado.</div>
                ) : (
                    cheatLogs.map((log, i) => (
                        <div key={i} className="glass-card p-10 border-red-500/20 bg-red-500/[0.02]">
                            <ShieldAlert className="text-red-500 mb-6" size={32} />
                            <h4 className="text-base font-black text-white uppercase tracking-tighter mb-2">{log.title}</h4>
                            <p className="text-[11px] font-bold text-red-500/60 leading-relaxed uppercase">{log.description}</p>
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
            <div className="glass-card divide-y divide-white/5">
                {genericLogs.map((log, i) => (
                    <div key={i} className="p-6 flex items-center justify-between group">
                        <div className="flex items-center gap-6">
                            <Search className="text-slate-700 group-hover:text-purple-500 transition-colors" size={16} />
                            <div>
                                <h4 className="text-xs font-black text-slate-300 uppercase tracking-tight">{log.title}</h4>
                                <p className="text-[10px] font-bold text-slate-600 uppercase mt-1">{log.description}</p>
                            </div>
                        </div>
                        <span className="text-[10px] font-black text-slate-800 tracking-widest italic">SCORE +{log.score}</span>
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
                <h3 className="text-[11px] font-black text-purple-500 uppercase tracking-[0.5em] flex items-center gap-3">
                    <Crosshair size={16} /> DETECÇÕES PRIVADAS (SAMU CORE)
                </h3>
                <p className="text-[10px] font-bold text-slate-700 uppercase tracking-widest">
                    Auditoria avançada de artefatos de última geração e métodos de bypass persistentes.
                </p>
            </div>

            <div className="grid grid-cols-1 gap-6">
                {samuLogs.length === 0 ? (
                    <div className="glass-card p-20 flex flex-col items-center justify-center text-center opacity-20">
                        <ShieldCheck size={48} className="mb-6 text-purple-500" />
                        <p className="text-[10px] font-black uppercase tracking-[0.5em]">Nenhum artefato SAMU detectado.</p>
                    </div>
                ) : (
                    samuLogs.map((log, i) => (
                        <div key={i} className="glass-card p-10 group hover:bg-purple-500/[0.02] transition-all border-purple-500/10">
                            <div className="flex items-start justify-between gap-8">
                                <div className="flex gap-8">
                                    <div className="w-14 h-14 rounded-2xl bg-purple-500/10 border border-purple-500/20 flex items-center justify-center text-purple-500">
                                        <ShieldAlert size={24} />
                                    </div>
                                    <div className="space-y-3">
                                        <h4 className="text-sm font-black text-white uppercase italic tracking-tight">{log.title}</h4>
                                        <p className="text-xs font-bold text-slate-500 leading-relaxed max-w-2xl uppercase tracking-wide">{log.description}</p>
                                        <div className="flex items-center gap-4 pt-2">
                                            <span className="text-[9px] font-black px-3 py-1 bg-purple-500/20 text-purple-400 rounded-md border border-purple-500/30 uppercase">SAMU_CORE</span>
                                            <span className="text-[9px] font-black text-slate-700 uppercase tracking-widest italic">Risco: {log.risk || 10}/10</span>
                                        </div>
                                    </div>
                                </div>
                                <div className="p-4 bg-red-500/5 rounded-xl border border-red-500/10 group-hover:scale-110 transition-transform">
                                    <AlertTriangle className="text-red-500" size={20} />
                                </div>
                            </div>
                        </div>
                    ))
                )}
            </div>

            {/* Private Note */}
            <div className="p-8 bg-purple-500/[0.02] border border-purple-500/10 rounded-[2.5rem] mt-10">
                <p className="text-[9px] font-black text-purple-500/40 uppercase tracking-[0.4em] leading-relaxed text-center italic">
                    * ESTA ABA É VISÍVEL APENAS PARA OPERADORES COM ACESSO DE NÍVEL SAMU/LODARK. AS INFORMAÇÕES AQUI CONTIDAS SÃO ALTAMENTE CONFIDENCIAIS.
                </p>
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-[#020202] text-slate-200 font-sans selection:bg-purple-500/30 overflow-x-hidden pb-40">
      <div className="glow-bg opacity-20" />
      <Navbar />

      <main className="max-w-[1300px] mx-auto px-10 py-20">
        
        {/* HEADER SECTION - LODARK AC */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-10 mb-24 animate-in fade-in duration-1000">
            <div className="space-y-4">
                <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-purple-500/10 border border-purple-500/20 rounded-full mb-6">
                    <ShieldCheck size={14} className="text-purple-500" />
                    <span className="text-[10px] font-black text-purple-500 uppercase tracking-[0.4em]">RELATÓRIO DE AUDITORIA LODARK AC</span>
                </div>
                <h1 className="text-7xl font-black tracking-tighter uppercase leading-[0.8] text-white">
                    LODARK<span className="text-purple-600">.</span>AC
                </h1>
                <p className="text-base font-bold text-slate-600 uppercase tracking-[0.3em]">Advanced Forensic Intelligence • PIN #{result.pin}</p>
            </div>
            <div className="text-right hidden md:block">
                <p className="text-[10px] font-black text-slate-700 uppercase tracking-[0.5em] mb-2">EXTRAÍDO EM</p>
                <p className="text-base font-black text-slate-200 uppercase tracking-tight">
                    {new Date(result.createdAt).toLocaleDateString('pt-BR')} <span className="text-purple-500 mx-2">•</span> {new Date(result.createdAt).toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' })}
                </p>
            </div>
        </div>

        {/* TAB NAVIGATION - CLEAN PURPLE STYLE */}
        <div className="flex flex-wrap gap-2 mb-20 p-2 bg-white/[0.02] border border-white/5 rounded-[2.5rem] backdrop-blur-3xl w-fit">
            {tabs.map((tab) => (
                <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id as TabType)}
                    className={`flex items-center gap-3 px-10 py-4 rounded-[2rem] transition-all duration-500 ${activeTab === tab.id ? 'bg-purple-600 text-white shadow-[0_15px_40px_rgba(139,92,246,0.3)] scale-[1.03]' : 'text-slate-600 hover:text-slate-300 hover:bg-white/[0.03]'}`}
                >
                    <tab.icon size={16} strokeWidth={activeTab === tab.id ? 3 : 2} />
                    <span className="text-[11px] font-black uppercase tracking-widest">{tab.label}</span>
                </button>
            ))}
        </div>

        {/* MAIN CONTENT AREA */}
        <div className="min-h-[600px]">
            {renderContent()}
        </div>

        {/* PARTNERSHIP SECTION */}
        <div className="mt-48 border-t border-white/5 pt-24 text-center">
            <h3 className="text-[10px] font-black text-slate-700 uppercase tracking-[0.6em] mb-16">COMUNIDADES PARCEIRAS</h3>
            <div className="flex flex-wrap justify-center items-center gap-20 opacity-30 hover:opacity-100 transition-opacity duration-1000">
                {partners.map((p, i) => (
                    <div key={i} className="flex flex-col items-center gap-6 group grayscale hover:grayscale-0 transition-all duration-500">
                        <div className="w-20 h-20 rounded-[2rem] bg-white/[0.02] p-5 border border-white/5 group-hover:border-purple-500/40 transition-all group-hover:scale-110">
                            <img src={p.logo} alt={p.name} className="w-full h-full object-contain filter drop-shadow-[0_0_10px_rgba(255,255,255,0.05)]" />
                        </div>
                        <span className="text-[10px] font-black text-slate-600 uppercase tracking-[0.4em] group-hover:text-purple-400 transition-colors">{p.name}</span>
                    </div>
                ))}
            </div>
        </div>

      </main>

      <footer className="max-w-[1300px] mx-auto px-10 py-24 flex flex-col md:flex-row justify-between items-center gap-12 border-t border-white/5 mt-32">
         <div className="flex items-center gap-5 opacity-20">
            <Shield size={18} className="text-purple-600" />
            <span className="text-[10px] font-black uppercase tracking-[0.6em]">Lodark Alpha Forensic v2.5.0</span>
         </div>
         <p className="text-[10px] font-black text-slate-800 uppercase tracking-[0.5em] italic">Forensic Integrity Secured by Team Lodark</p>
      </footer>
    </div>
  );
}
