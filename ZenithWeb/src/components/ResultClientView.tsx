'use client';
import { useState } from 'react';
import { Shield, ShieldAlert, CheckCircle, AlertTriangle, Bug, Code, Network, Monitor, Hash, Globe, Calendar, Fingerprint, Trash2, Key, TerminalSquare, Lock, Copy, FileText, Search, Ghost, User, Cpu, Activity, Database, Wrench, Zap, ExternalLink, Info, MessageSquare } from 'lucide-react';
import Link from 'next/link';

export default function ResultClientView({ result, riskScore, detectionsCount, warningsCount, cleanCount, totalItems, conicGradient }: any) {
  const [activeTab, setActiveTab] = useState('overview');
  const [searchQuery, setSearchQuery] = useState('');

  // Filtros de Categoria Profissionais
  const isExecutions = (t: string) => /BAM|Execuções|Prefetch|Amcache|Shimcache|UserAssist|JumpLists|Sysmon Log/i.test(t);
  const isCheatDetection = (t: string) => /\[Blacklist\]|Internal Detectado|External Detectado|Zimo|Pecinha|Chams|YARA|Nome Genérico|Cheat|Fake Aplicativo|Vision/i.test(t);
  const isProcessAnalysis = (t: string) => /Processo|Process|Pai Suspeito/i.test(t);
  const isFileAnalysis = (t: string) => /\[Arquivo\]|Recent|Temporária|Oculto|Aleatório|Lixeira|Download/i.test(t);
  const isNetworkAuth = (t: string) => /Auth|Domínio|Conexão|KEYAUTH|LICENSIAUTH|SITE/i.test(t);
  const isSystemCategory = (t: string) => /\[Sistema\]|Serviço|Service|Driver|Inicialização|Tarefa|Emulator|Hardware/i.test(t);
  const isSuspiciousTools = (t: string) => /Debugger|Spoofer|Cleaner|Loader|PowerShell/i.test(t);
  const isBypass = (t: string) => /\[Bypass\]|Ghost|Hollowing|Hook|Desativado|Exclusão|UEFI|Secure Boot|Fileless|DMA|Bypass/i.test(t);
  const isMemoryAnalysis = (t: string) => /\[Memória\]|Memory|Memória|Módulo|Injeção|Shellcode|Hijacking/i.test(t);
  const isLodarkStrings = (t: string) => /Lodark Detect|Custom Detect|Lodark AC Global/i.test(t);
  const isLodark = (t: string) => /LODARK LOGS|Stream Mode/i.test(t);

  const getRiskLevel = () => {
    if (riskScore < 30) return { label: 'BAIXO', color: 'text-emerald-500', bg: 'bg-emerald-500/10', border: 'border-emerald-500/20' };
    if (riskScore < 70) return { label: 'MÉDIO', color: 'text-yellow-500', bg: 'bg-yellow-500/10', border: 'border-yellow-500/20' };
    return { label: 'ALTO', color: 'text-red-500', bg: 'bg-red-500/10', border: 'border-red-500/20' };
  };

  const risk = getRiskLevel();

  const getMockery = (desc: string) => {
    const d = desc.toLowerCase();
    if (d.includes("xvideo") || d.includes("porno") || d.includes("buceta")) return "🔞 Pegamos no flagra! Safado kkkkkkkkk";
    if (d.includes("zimo") || d.includes("zimostore")) return "🤡 Ah, o famoso 2+ anos de mercado... Que fase!";
    if (d.includes("real pecinha") || d.includes("realpecinhaslol")) return "💀 O melhor ficou ainda melhor? Pelo visto não kkkkkk";
    if (d.includes("chams") || d.includes("opengl32.dll")) return "👀 Tá cego irmão? Precisando ver através da parede e ainda toma ban.";
    if (d.includes("aimbot")) return "🎯 Aimbot de C# sem ofuscação? Até meu cachorro faria melhor.";
    if (d.includes("keyauth")) return "🔑 Usando KeyAuth público pra vender cheat 'privado'? Patético.";
    if (d.includes("vulnerável") || d.includes("byovd")) return "🗑️ Usando driver vazado de 2015 achando que tá seguro...";
    if (d.includes("bypass ac")) return "🚫 'Bypass AC (TELA PRETA)' - Bela função em português, jumento.";
    if (d.includes("ghost execution") || d.includes("process hollowing")) return "👻 Tentou dar unload e sumir? O pai te achou na memória, lixo.";
    return null;
  };

  const allLogs = [...(result.detections || []), ...(result.warnings || []), ...(result.integrity || []), ...(result.suspicious || [])];

  const getFilteredLogs = () => {
    let filtered: any[] = [];
    if (activeTab === 'executions') filtered = allLogs.filter(l => isExecutions(l.title));
    else if (activeTab === 'cheats') filtered = allLogs.filter(l => isCheatDetection(l.title));
    else if (activeTab === 'processes') filtered = allLogs.filter(l => isProcessAnalysis(l.title));
    else if (activeTab === 'files') filtered = allLogs.filter(l => isFileAnalysis(l.title));
    else if (activeTab === 'network') filtered = allLogs.filter(l => isNetworkAuth(l.title));
    else if (activeTab === 'system') filtered = allLogs.filter(l => isSystemCategory(l.title));
    else if (activeTab === 'tools') filtered = allLogs.filter(l => isSuspiciousTools(l.title));
    else if (activeTab === 'bypass') filtered = allLogs.filter(l => isBypass(l.title));
    else if (activeTab === 'memory') filtered = allLogs.filter(l => isMemoryAnalysis(l.title));
    else if (activeTab === 'lodark-strings') filtered = allLogs.filter(l => isLodarkStrings(l.title) || l.description.includes('Lodark Global'));
    else if (activeTab === 'lodark') filtered = allLogs.filter(l => isLodark(l.title));
    else if (activeTab === 'overview' || activeTab === 'security') return [];

    if (searchQuery) {
      filtered = filtered.filter(l => 
        l.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
        l.description.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }
    return filtered;
  };

  const filteredLogs = getFilteredLogs();

  const SidebarItem = ({ id, icon: Icon, label, count }: any) => (
    <button
      onClick={() => { setActiveTab(id); setSearchQuery(''); }}
      className={`w-full flex items-center justify-between px-5 py-4 rounded-2xl transition-all duration-300 ${activeTab === id ? 'bg-white text-black shadow-[0_0_30px_rgba(255,255,255,0.1)] scale-[1.02]' : 'text-gray-500 hover:bg-white/5 hover:text-gray-300 border border-transparent'}`}
    >
      <div className="flex items-center gap-4">
        <Icon size={18} className={activeTab === id ? 'text-black' : 'opacity-70'} />
        <span className="font-black text-[10px] uppercase tracking-[0.2em]">{label}</span>
      </div>
      {count !== undefined && (
        <span className={`text-[9px] font-black px-2.5 py-1 rounded-lg ${activeTab === id ? 'bg-black/10 text-black' : 'bg-white/5 text-gray-700'}`}>
          {count}
        </span>
      )}
    </button>
  );

  return (
    <div className="max-w-[1600px] mx-auto min-h-screen pb-20 font-sans px-6 animate-in fade-in duration-1000">
      
      {/* Header Premium */}
      <header className="flex flex-col md:flex-row items-center justify-between mt-10 mb-10 bg-[#0A0A0A]/80 backdrop-blur-xl p-8 rounded-[3rem] border border-white/5 shadow-2xl relative overflow-hidden">
        {/* Background Glow */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-purple-600/10 blur-[120px] pointer-events-none" />
        
        <div className="flex items-center gap-6 relative z-10">
          <div className="w-20 h-20 bg-white/5 rounded-[2rem] flex items-center justify-center border border-white/10 shadow-inner group">
            <img 
              src="https://i.postimg.cc/cJrtFJDM/image-removebg-preview.png" 
              alt="Lodark Logo" 
              className="w-12 h-12 object-contain drop-shadow-[0_0_20px_rgba(168,85,247,0.5)] group-hover:scale-110 transition-transform duration-500" 
            />
          </div>
          <div>
            <h1 className="text-3xl font-black text-white tracking-tighter uppercase leading-none">LODARK<span className="text-purple-500">.AC</span></h1>
            <p className="text-[10px] text-gray-500 uppercase tracking-[0.4em] font-black mt-3">Forensic Security Report</p>
            <div className="flex items-center gap-2 mt-2">
              <span className="text-[8px] font-black bg-white/5 px-2 py-0.5 rounded-md text-gray-400 uppercase tracking-widest border border-white/5">Developed by Samuca & Lodark</span>
            </div>
          </div>
        </div>

        <div className="flex flex-col items-center border-x border-white/5 px-20 my-8 md:my-0">
          <div className="flex items-center gap-4">
             <img src="https://i.postimg.cc/L5z1j0xv/image.png" alt="FF" className="w-8 h-8 object-contain" />
             <h3 className="text-white font-black text-4xl tracking-[0.2em] drop-shadow-2xl">{result.pin}</h3>
          </div>
          <p className="text-gray-600 text-[10px] uppercase font-black tracking-[0.6em] mt-3">Pin Identificador</p>
        </div>

        <div className="flex items-center gap-10 text-right relative z-10">
          <div className="hidden lg:block">
            <h2 className="text-white font-black text-base uppercase tracking-widest">{new Date(result.createdAt).toLocaleDateString('pt-BR')}</h2>
            <p className="text-gray-600 text-[10px] uppercase font-black tracking-[0.4em] mt-1.5">{new Date(result.createdAt).toLocaleTimeString('pt-BR')}</p>
          </div>
          <Link href="/dashboard" className="px-10 py-4 bg-white text-black rounded-2xl transition-all hover:scale-105 active:scale-95 text-[11px] font-black uppercase tracking-widest shadow-[0_0_30px_rgba(255,255,255,0.2)]">
            Voltar
          </Link>
        </div>
      </header>

      {/* Main Layout Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Navigation Sidebar */}
        <div className="lg:col-span-3 bg-[#0A0A0A]/60 backdrop-blur-xl rounded-[3rem] border border-white/5 p-6 space-y-2 h-fit shadow-2xl sticky top-28">
          <div className="mb-6 px-3 pb-4 border-b border-white/5">
            <p className="text-[10px] font-black text-gray-700 uppercase tracking-[0.4em]">Navegação</p>
          </div>
          
          <SidebarItem id="overview" icon={Monitor} label="Visão Geral" />
          <SidebarItem id="security" icon={Fingerprint} label="Contas & HWID" />
          
          <div className="my-6 pt-6 px-3 border-t border-white/5">
            <p className="text-[10px] font-black text-gray-700 uppercase tracking-[0.4em]">Análise Forense</p>
          </div>

          <SidebarItem id="executions" icon={TerminalSquare} label="Sistema" count={allLogs.filter(l => isExecutions(l.title)).length} />
          <SidebarItem id="cheats" icon={Bug} label="Cheats" count={allLogs.filter(l => isCheatDetection(l.title)).length} />
          <SidebarItem id="memory" icon={Database} label="Memória" count={allLogs.filter(l => isMemoryAnalysis(l.title)).length} />
          <SidebarItem id="bypass" icon={Ghost} label="Bypass" count={allLogs.filter(l => isBypass(l.title)).length} />
          <SidebarItem id="files" icon={FileText} label="Arquivos" count={allLogs.filter(l => isFileAnalysis(l.title)).length} />
          <SidebarItem id="processes" icon={Activity} label="Processos" count={allLogs.filter(l => isProcessAnalysis(l.title)).length} />
          <SidebarItem id="network" icon={Globe} label="Rede / Auth" count={allLogs.filter(l => isNetworkAuth(l.title)).length} />
          <SidebarItem id="lodark-strings" icon={Code} label="Strings Lodark" count={allLogs.filter(l => isLodarkStrings(l.title) || l.description.includes('Lodark Global')).length} />
          
          {(result.ownerKey === 'samuca244' || result.ownerKey === 'lodark244') && (
            <>
              <div className="my-6 pt-6 px-3 border-t border-white/5">
                <p className="text-[10px] font-black text-pink-600 uppercase tracking-[0.4em]">Secret Area</p>
              </div>
              <SidebarItem id="lodark" icon={Lock} label="LODARK LOGS 🤡" count={allLogs.filter(l => isLodark(l.title)).length} />
            </>
          )}
        </div>

        {/* Content Area */}
        <div className="lg:col-span-9 flex flex-col gap-8">
          
          {activeTab === 'overview' && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 animate-in fade-in slide-in-from-bottom-6 duration-1000">
              {/* Verdict Card */}
              <div className={`p-12 rounded-[3.5rem] border flex flex-col items-center justify-center text-center relative overflow-hidden transition-all duration-700 shadow-2xl ${result.isClean ? 'bg-emerald-500/5 border-emerald-500/10' : 'bg-red-500/5 border-red-500/10'}`}>
                {/* Visual indicator */}
                <div className={`absolute top-0 left-0 w-full h-2 ${result.isClean ? 'bg-emerald-500 shadow-[0_0_30px_rgba(16,185,129,0.6)]' : 'bg-red-500 shadow-[0_0_30px_rgba(239,68,68,0.6)]'}`}></div>
                
                <div className={`w-32 h-32 rounded-full flex items-center justify-center mb-8 relative ${result.isClean ? 'bg-emerald-500/10' : 'bg-red-500/10'}`}>
                  <div className={`absolute inset-0 rounded-full animate-ping opacity-20 ${result.isClean ? 'bg-emerald-500' : 'bg-red-500'}`}></div>
                  {result.isClean ? <Shield size={72} className="text-emerald-500 relative z-10" /> : <ShieldAlert size={72} className="text-red-500 relative z-10" />}
                </div>

                <p className="text-[11px] text-gray-500 font-black uppercase tracking-[0.5em] mb-4">Veredito da Varredura</p>
                <h2 className={`text-7xl font-black tracking-tighter drop-shadow-2xl ${result.isClean ? 'text-emerald-500' : 'text-red-500'}`}>
                  {result.isClean ? 'CLEAN' : 'CHEATER'}
                </h2>
                
                {!result.isClean && (
                  <div className="mt-10 flex items-center gap-3 px-6 py-3 bg-red-500/10 border border-red-500/20 rounded-full">
                    <AlertTriangle size={16} className="text-red-500" />
                    <span className="text-[11px] font-black text-red-500 uppercase tracking-[0.2em]">Restrição Permanente Aplicada</span>
                  </div>
                )}
              </div>

              {/* Advanced Stats Card */}
              <div className="bg-[#0A0A0A] rounded-[3.5rem] border border-white/5 p-12 flex flex-col justify-between shadow-2xl relative overflow-hidden group">
                <div className="absolute -bottom-20 -right-20 w-64 h-64 bg-purple-600/5 blur-[100px] pointer-events-none rounded-full group-hover:bg-purple-600/10 transition-colors duration-1000" />
                
                <div className="flex items-center justify-between mb-10">
                  <div>
                    <h3 className="text-2xl font-black text-white uppercase tracking-tighter">Análise de Risco</h3>
                    <p className="text-[11px] text-gray-600 uppercase tracking-[0.4em] font-black mt-2">Dados em tempo real</p>
                  </div>
                  <div className="p-4 bg-white/5 rounded-[1.5rem] border border-white/5 shadow-xl">
                     <Activity size={28} className="text-purple-500" />
                  </div>
                </div>

                <div className="space-y-8">
                  <div className="flex items-center justify-between group/item">
                    <div className="flex items-center gap-5">
                      <div className="w-2 h-14 rounded-full bg-red-500/20 group-hover/item:bg-red-500 transition-all duration-500" />
                      <div>
                        <p className="text-[11px] font-black text-gray-600 uppercase tracking-widest">Deteções Críticas</p>
                        <p className="text-4xl font-black text-white mt-1">{detectionsCount}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-5 text-right">
                      <div className="hidden sm:block">
                        <p className="text-[11px] font-black text-gray-600 uppercase tracking-widest">Alertas Suspeitos</p>
                        <p className="text-4xl font-black text-white mt-1">{warningsCount}</p>
                      </div>
                      <div className="w-2 h-14 rounded-full bg-orange-500/20 group-hover/item:bg-orange-500 transition-all duration-500" />
                    </div>
                  </div>

                  <div className="pt-8 border-t border-white/5">
                    <div className="flex items-center justify-between mb-4">
                       <span className="text-[11px] font-black text-gray-500 uppercase tracking-[0.3em]">Nível de Ameaça Global</span>
                       <span className={`text-[10px] font-black px-4 py-1.5 rounded-full border shadow-lg ${risk.bg} ${risk.color} ${risk.border}`}>
                          {risk.label}
                       </span>
                    </div>
                    <div className="w-full h-4 bg-white/5 rounded-full overflow-hidden p-1 border border-white/5">
                       <div 
                         className={`h-full rounded-full transition-all duration-[2000ms] cubic-bezier(0.4, 0, 0.2, 1) ${riskScore > 60 ? 'bg-gradient-to-r from-red-600 to-red-400' : riskScore > 30 ? 'bg-gradient-to-r from-yellow-600 to-yellow-400' : 'bg-gradient-to-r from-emerald-600 to-emerald-400'}`}
                         style={{ width: `${Math.max(5, riskScore)}%` }}
                       />
                    </div>
                  </div>
                </div>
              </div>

              {/* Banned Banner Premium */}
              {!result.isClean && (
                <div className="md:col-span-2 rounded-[3.5rem] border border-red-500/20 p-12 flex items-center justify-between bg-gradient-to-r from-red-600/10 via-red-600/5 to-transparent relative overflow-hidden group shadow-2xl animate-in slide-in-from-right-10 duration-1000">
                  <div className="absolute inset-0 bg-[url('https://i.postimg.cc/L5z1j0xv/image.png')] opacity-[0.04] grayscale pointer-events-none bg-repeat space-4" />
                  <div className="relative z-10">
                    <h3 className="text-red-500 font-black text-6xl tracking-[0.4em] mb-4 uppercase italic drop-shadow-[0_0_30px_rgba(239,68,68,0.4)]">TERMINATED</h3>
                    <p className="text-red-400/70 text-base font-bold uppercase tracking-[0.2em] leading-relaxed max-w-xl">
                      Violação grave de integridade detectada. <br />
                      Hardware e contas associadas foram marcados como não confiáveis.
                    </p>
                  </div>
                  <div className="relative">
                    <div className="absolute inset-0 bg-red-500/30 blur-[80px] rounded-full scale-150 animate-pulse" />
                    <img src="https://i.postimg.cc/L5z1j0xv/image.png" alt="Banned" className="w-40 h-40 object-contain drop-shadow-[0_0_40px_rgba(239,68,68,0.7)] relative z-10 transform group-hover:scale-110 transition-transform duration-700" />
                  </div>
                </div>
              )}
            </div>
          )}

          {activeTab === 'security' && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 animate-in fade-in zoom-in-95 duration-700">
              {/* Accounts Card */}
              <div className="bg-[#0A0A0A] rounded-[3.5rem] border border-white/5 p-12 shadow-2xl backdrop-blur-xl relative overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-500/50 via-purple-500/50 to-blue-500/50 opacity-30" />
                <div className="flex items-center gap-5 mb-10 pb-8 border-b border-white/5">
                  <div className="p-4 bg-blue-500/10 rounded-[1.5rem] border border-blue-500/20 shadow-lg">
                    <User className="text-blue-400" size={28} />
                  </div>
                  <div>
                    <h3 className="text-2xl font-black text-white uppercase tracking-tighter">Vínculos Sociais</h3>
                    <p className="text-[11px] text-gray-600 uppercase tracking-[0.4em] font-black mt-2">Deteção Multi-Conta</p>
                  </div>
                </div>
                
                <div className="space-y-10">
                  {/* Discord Accounts */}
                  <div>
                    <div className="flex items-center justify-between mb-6 px-1">
                       <div className="flex items-center gap-2">
                          <MessageSquare size={14} className="text-gray-500" />
                          <p className="text-[11px] font-black text-gray-500 uppercase tracking-widest">Profiles Discord</p>
                       </div>
                       <span className="text-[10px] font-black bg-white/5 text-gray-400 px-3 py-1 rounded-xl border border-white/5">{result.discordInfo?.accounts?.length || 0}</span>
                    </div>
                    
                    <div className="space-y-4">
                      {result.discordInfo?.accounts?.length > 0 ? (
                        result.discordInfo.accounts.map((acc: any, i: number) => (
                          <div key={i} className="flex items-center justify-between p-5 bg-white/5 rounded-[1.8rem] border border-white/5 group hover:border-blue-500/40 hover:bg-white/[0.07] transition-all duration-300 shadow-lg">
                            <div className="flex items-center gap-5">
                              <div className="w-14 h-14 rounded-2xl bg-black/60 flex items-center justify-center border border-white/10 overflow-hidden shadow-inner p-1">
                                 <img src="https://i.postimg.cc/QMQZGQnr/image-removebg-preview-(3).png" className="w-full h-full object-contain opacity-70 group-hover:scale-110 transition-transform duration-500" />
                              </div>
                              <div>
                                <p className="text-base font-black text-white group-hover:text-blue-400 transition-colors">{acc.username || 'Desconhecido'}</p>
                                <div className="flex items-center gap-2 mt-1">
                                   <Hash size={10} className="text-gray-600" />
                                   <p className="text-[11px] text-gray-600 font-mono tracking-tight">{acc.id}</p>
                                </div>
                              </div>
                            </div>
                            <div className={`px-3 py-1.5 rounded-xl text-[9px] font-black uppercase tracking-[0.1em] shadow-sm ${acc.status?.includes('Active') ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20' : 'bg-gray-500/10 text-gray-500 border border-gray-500/20'}`}>
                              {acc.status}
                            </div>
                          </div>
                        ))
                      ) : (
                        <div className="p-10 bg-white/5 rounded-[2rem] border border-white/5 border-dashed flex flex-col items-center justify-center text-gray-600 text-xs italic">
                           <Search size={24} className="mb-3 opacity-20" />
                           Nenhuma conta ativa detectada
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Steam */}
                  <div className="pt-8 border-t border-white/5">
                    <p className="text-[11px] font-black text-gray-500 uppercase tracking-widest mb-6 px-1">Plataforma Gaming</p>
                    <div className="bg-white/5 p-5 rounded-[1.8rem] border border-white/5 flex items-center justify-between group hover:border-purple-500/40 hover:bg-white/[0.07] transition-all duration-300 shadow-lg">
                       <div className="flex items-center gap-4">
                         <div className="w-3 h-3 rounded-full bg-purple-500 group-hover:animate-pulse shadow-[0_0_10px_rgba(168,85,247,0.5)]" />
                         <span className="text-sm font-black text-gray-300 uppercase tracking-widest">Steam Community ID</span>
                       </div>
                       <span className="text-xs font-mono text-purple-400 bg-purple-500/10 px-4 py-2 rounded-2xl border border-purple-500/20 font-bold">{result.systemInfo?.steamId || 'Not Linked'}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Hardware Card */}
              <div className="bg-[#0A0A0A] rounded-[3.5rem] border border-white/5 p-12 shadow-2xl backdrop-blur-xl relative overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-purple-500/50 via-magenta-500/50 to-purple-500/50 opacity-30" />
                <div className="flex items-center gap-5 mb-10 pb-8 border-b border-white/5">
                  <div className="p-4 bg-purple-500/10 rounded-[1.5rem] border border-purple-500/20 shadow-lg">
                    <Cpu className="text-purple-400" size={28} />
                  </div>
                  <div>
                    <h3 className="text-2xl font-black text-white uppercase tracking-tighter">Hardware Forensic</h3>
                    <p className="text-[11px] text-gray-600 uppercase tracking-[0.4em] font-black mt-2">Unique Machine Identifier</p>
                  </div>
                </div>

                <div className="space-y-8">
                  <div className="space-y-3">
                    <label className="text-[10px] font-black text-gray-600 uppercase tracking-[0.3em] px-2 flex items-center gap-2">
                       <Globe size={12} />
                       Endereço IP / Localização
                    </label>
                    <div className="bg-white/5 p-5 rounded-[1.8rem] border border-white/5 flex items-center justify-between group hover:bg-white/[0.07] transition-all duration-300 shadow-lg">
                      <code className="text-sm font-black text-purple-400 font-mono tracking-wider">{result.systemInfo?.ip || '0.0.0.0'}</code>
                      <button onClick={() => navigator.clipboard.writeText(result.systemInfo?.ip || '')} className="text-gray-600 hover:text-white transition-colors p-2.5 hover:bg-white/10 rounded-xl bg-black/20 border border-white/5 shadow-inner group-hover:scale-110"><Copy size={16} /></button>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <label className="text-[10px] font-black text-gray-600 uppercase tracking-[0.3em] px-2 flex items-center gap-2">
                       <Fingerprint size={12} />
                       Hardware Signature (HWID)
                    </label>
                    <div className="bg-white/5 p-5 rounded-[1.8rem] border border-white/5 flex items-center justify-between group hover:bg-white/[0.07] transition-all duration-300 shadow-lg">
                      <code className="text-[11px] font-mono text-gray-400 break-all pr-6 leading-relaxed uppercase">{result.systemInfo?.hwid || 'No HWID Found'}</code>
                      <button onClick={() => navigator.clipboard.writeText(result.systemInfo?.hwid || '')} className="text-gray-600 hover:text-white transition-colors p-2.5 hover:bg-white/10 rounded-xl bg-black/20 border border-white/5 shadow-inner shrink-0 group-hover:scale-110"><Copy size={16} /></button>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-6 pt-4">
                    <div className="bg-white/5 p-5 rounded-[1.8rem] border border-white/5 shadow-lg group hover:bg-white/[0.07] transition-all">
                       <p className="text-[9px] font-black text-gray-600 uppercase tracking-[0.3em] mb-2 px-1">Máquina</p>
                       <div className="flex items-center gap-3">
                          <Monitor size={14} className="text-purple-500" />
                          <p className="text-sm font-black text-white truncate uppercase tracking-tight">{result.systemInfo?.pcName || 'Unknown'}</p>
                       </div>
                    </div>
                    <div className="bg-white/5 p-5 rounded-[1.8rem] border border-white/5 shadow-lg group hover:bg-white/[0.07] transition-all">
                       <p className="text-[9px] font-black text-gray-600 uppercase tracking-[0.3em] mb-2 px-1">OS User</p>
                       <div className="flex items-center gap-3">
                          <User size={14} className="text-blue-500" />
                          <p className="text-sm font-black text-white truncate uppercase tracking-tight">{result.systemInfo?.username || 'Unknown'}</p>
                       </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Dynamic List Content */}
          {activeTab !== 'overview' && activeTab !== 'security' && (
            <div className="bg-[#0A0A0A]/60 backdrop-blur-xl rounded-[3.5rem] border border-white/5 flex flex-col overflow-hidden h-full shadow-2xl animate-in fade-in slide-in-from-bottom-10 duration-1000">
              <div className="p-10 border-b border-white/5 bg-white/[0.02] flex flex-col md:flex-row items-center justify-between gap-8">
                <div className="relative flex-1 w-full group">
                  <Search className="absolute left-6 top-1/2 -translate-y-1/2 text-gray-600 group-focus-within:text-white transition-colors duration-300" size={20} />
                  <input 
                    type="text" 
                    placeholder={`Filtrar registros em ${activeTab.toUpperCase()}...`}
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full bg-white/5 border border-white/10 rounded-[2rem] pl-16 pr-8 py-5 text-base text-white placeholder-gray-700 focus:outline-none focus:border-white/30 focus:bg-white/[0.08] transition-all shadow-2xl"
                  />
                </div>
                <div className="flex items-center gap-4 bg-white/5 px-8 py-5 rounded-[2rem] border border-white/5 shadow-xl">
                  <Hash size={16} className="text-gray-600" />
                  <span className="text-[11px] font-black text-gray-500 uppercase tracking-[0.3em] whitespace-nowrap">
                    {filteredLogs.length} Entradas
                  </span>
                </div>
              </div>

              <div className="p-10 overflow-y-auto max-h-[800px] custom-scrollbar space-y-6">
                {filteredLogs.length === 0 ? (
                  <div className="flex flex-col items-center justify-center py-40 text-gray-700">
                    <div className="w-24 h-24 bg-white/5 rounded-full flex items-center justify-center mb-8 border border-white/5 shadow-inner">
                      <Search size={40} className="opacity-10" />
                    </div>
                    <p className="text-[12px] font-black uppercase tracking-[0.6em] text-gray-700">Database Limpa nesta Categoria</p>
                  </div>
                ) : (
                  filteredLogs.map((log: any, idx: number) => {
                    let zoeira = getMockery(log.description);
                    const isCritical = log.severity === 'Critical' || log.severity === 'High';
                    const isInfo = log.severity === 'Info';
                    
                    return (
                      <div key={idx} className={`group rounded-[2.5rem] p-8 border transition-all duration-500 relative overflow-hidden shadow-lg ${isCritical ? 'bg-red-500/[0.03] border-red-500/10 hover:border-red-500/30 hover:bg-red-500/[0.05]' : isInfo ? 'bg-emerald-500/[0.03] border-emerald-500/10 hover:border-emerald-500/30 hover:bg-emerald-500/[0.05]' : 'bg-orange-500/[0.03] border-orange-500/10 hover:border-orange-500/30 hover:bg-orange-500/[0.05]'}`}>
                        {/* Status side bar */}
                        <div className={`absolute left-0 top-10 bottom-10 w-1.5 rounded-full transition-all duration-500 group-hover:scale-y-125 ${isCritical ? 'bg-red-500 shadow-[0_0_20px_rgba(239,68,68,0.6)]' : isInfo ? 'bg-emerald-500 shadow-[0_0_20px_rgba(16,185,129,0.6)]' : 'bg-orange-500 shadow-[0_0_20px_rgba(249,115,22,0.6)]'}`}></div>
                        
                        <div className="flex justify-between items-center mb-6 pl-6">
                          <div className="flex items-center gap-4">
                             <div className={`p-2.5 rounded-xl border ${isCritical ? 'bg-red-500/10 text-red-500 border-red-500/20' : isInfo ? 'bg-emerald-500/10 text-emerald-500 border-emerald-500/20' : 'bg-orange-500/10 text-orange-500 border-orange-500/20'}`}>
                                {isCritical ? <ShieldAlert size={18} /> : isInfo ? <CheckCircle size={18} /> : <AlertTriangle size={18} />}
                             </div>
                             <span className={`font-black tracking-tight text-xl uppercase leading-none ${isCritical ? 'text-red-400' : isInfo ? 'text-emerald-400' : 'text-orange-400'}`}>{log.title}</span>
                          </div>
                          <span className={`text-[9px] font-black uppercase tracking-[0.4em] px-4 py-2 rounded-2xl border shadow-sm ${isCritical ? 'bg-red-500/10 text-red-500 border-red-500/20' : isInfo ? 'bg-emerald-500/10 text-emerald-500 border-emerald-500/20' : 'bg-orange-500/10 text-orange-500 border-orange-500/20'}`}>
                            {log.severity || 'WARNING'}
                          </span>
                        </div>
                        
                        <div className="bg-black/40 p-6 rounded-[1.8rem] border border-white/5 ml-6 shadow-inner relative group-hover:bg-black/60 transition-colors duration-500">
                          <p className="text-gray-400 text-sm font-bold leading-relaxed font-mono break-all group-hover:text-gray-300 transition-colors">{log.description}</p>
                          <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                             <button onClick={() => navigator.clipboard.writeText(log.description)} className="p-2 hover:bg-white/10 rounded-lg text-gray-600 hover:text-white"><Copy size={12} /></button>
                          </div>
                        </div>
                        
                        {zoeira && activeTab !== 'lodark' && (
                          <div className={`mt-6 pt-6 border-t ml-6 flex items-center gap-4 ${isCritical ? 'border-red-500/10 text-red-400/60' : isInfo ? 'border-emerald-500/10 text-emerald-400/60' : 'border-orange-500/10 text-orange-400/60'}`}>
                            <div className="w-2 h-2 rounded-full bg-current opacity-30 animate-pulse" />
                            <p className="text-[11px] italic font-black uppercase tracking-[0.2em] group-hover:text-current transition-colors">{zoeira}</p>
                          </div>
                        )}
                        
                        {activeTab === 'lodark' && (
                          <div className="mt-6 pt-6 border-t border-pink-500/20 ml-6 flex items-center gap-4 text-pink-500/60">
                            <Lock size={14} className="opacity-40" />
                            <p className="text-[11px] italic font-black uppercase tracking-[0.2em]">"Registro forense reservado à administração Lodark."</p>
                          </div>
                        )}
                      </div>
                    );
                  })
                )}
              </div>
            </div>
          )}

        </div>
      </div>

      {/* Footer Branding */}
      <footer className="mt-24 flex flex-col items-center gap-8 opacity-30 grayscale hover:opacity-100 hover:grayscale-0 transition-all duration-1000">
         <div className="h-px w-96 bg-gradient-to-r from-transparent via-white/20 to-transparent" />
         <div className="flex items-center gap-12">
            <img src="https://i.postimg.cc/yYsJwjQ6/image.png" alt="FiveM" className="h-10 object-contain hover:scale-110 transition-transform" />
            <img src="https://i.postimg.cc/L5z1j0xv/image.png" alt="Free Fire" className="h-12 object-contain hover:scale-110 transition-transform" />
         </div>
         <div className="flex flex-col items-center gap-2">
            <p className="text-[11px] font-black uppercase tracking-[0.8em] text-white">Lodark Advanced Security Forensic Report</p>
            <p className="text-[8px] font-black uppercase tracking-[0.4em] text-gray-500">Desenvolvido por Samuca & Lodark</p>
         </div>
      </footer>
    </div>
  );
}
