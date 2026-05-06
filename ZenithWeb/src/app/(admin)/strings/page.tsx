'use client';

import { useState, useEffect } from 'react';
import { 
  FileSearch, 
  Plus, 
  Trash2, 
  ShieldAlert, 
  Search, 
  Upload, 
  Terminal, 
  Fingerprint, 
  Zap, 
  ChevronRight, 
  Database,
  Monitor,
  Activity,
  Layers,
  ShieldCheck,
  AlertTriangle,
  Loader2,
  FileCode,
  Hash
} from 'lucide-react';

type TabType = 'extractor' | 'custom';

export default function StringsPage() {
  const [activeTab, setActiveTab] = useState<TabType>('extractor');
  const [strings, setStrings] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [fileResults, setFileResults] = useState<any>(null);

  // Form states
  const [process, setProcess] = useState('dps');
  const [clientName, setClientName] = useState('');
  const [stringValue, setStringValue] = useState('');
  const [severity, setSeverity] = useState('Suspeito');

  useEffect(() => {
    fetchStrings();
  }, []);

  const fetchStrings = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/admin/strings');
      if (res.ok) {
        const data = await res.json();
        setStrings(data);
      }
    } catch (error) {
      console.error('Erro ao buscar strings');
    }
    setLoading(false);
  };

  const handleAddString = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!clientName || !stringValue) return;

    try {
      const res = await fetch('/api/admin/strings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ process, clientName, stringValue, severity }),
      });

      if (res.ok) {
        setClientName('');
        setStringValue('');
        fetchStrings();
      }
    } catch (error) {
      console.error('Erro ao adicionar string');
    }
  };

  const handleDelete = async (id: string) => {
    try {
      const res = await fetch('/api/admin/strings', {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id }),
      });
      if (res.ok) fetchStrings();
    } catch (error) {
      console.error('Erro ao deletar');
    }
  };

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsUploading(true);
    // Simulate file analysis
    setTimeout(() => {
        setFileResults({
            name: file.name,
            size: (file.size / (1024 * 1024)).toFixed(2) + ' MB',
            md5: 'a13b25e338d01bd384823b0a310d8506',
            sha256: '8efa654740f067f46e0750cd2285311fab7ecf5bc363fba...',
            pca: '0x1ae2000',
            dps: '2025/12/16:01:42:59',
            detections: [
                { title: 'Possible Generic Cheat Loader TYPE F', severity: 'Critical' },
                { title: 'Generic HWID Getter', severity: 'High' }
            ],
            suspicious: [
                { title: 'Web Proxy Connection String', severity: 'Medium' }
            ]
        });
        setIsUploading(false);
    }, 2000);
  };

  return (
    <div className="space-y-12 max-w-[1400px] mx-auto pb-40 animate-in fade-in duration-1000">
      
      {/* HEADER */}
      <div className="flex flex-col gap-4 bg-[#050505] p-12 rounded-[3rem] border border-white/5 shadow-2xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-purple-600/[0.03] blur-[120px] pointer-events-none" />
        <div className="flex items-center gap-8 relative z-10">
          <div className="w-16 h-16 rounded-[2rem] bg-purple-600/[0.02] flex items-center justify-center border border-purple-500/10 group-hover:border-purple-500/30 transition-all duration-500">
            <FileSearch className="text-purple-500" size={32} />
          </div>
          <div>
            <h1 className="text-4xl font-black text-white tracking-tighter uppercase italic leading-none">STRINGS <span className="text-purple-600 italic">CENTER</span></h1>
            <p className="text-[10px] text-slate-500 uppercase tracking-[0.5em] font-black mt-4">Análise de Binários e Gestão de Heurísticas</p>
          </div>
        </div>
      </div>

      {/* TABS */}
      <div className="flex items-center gap-4 p-2 bg-white/[0.01] border border-white/5 rounded-3xl w-fit mx-auto lg:mx-0">
          <button 
            onClick={() => setActiveTab('extractor')}
            className={`flex items-center gap-3 px-8 py-4 rounded-2xl text-[10px] font-black uppercase tracking-widest transition-all ${activeTab === 'extractor' ? 'bg-white text-black shadow-2xl' : 'text-slate-600 hover:text-white'}`}
          >
            <FileCode size={16} /> String Extractor
          </button>
          <button 
            onClick={() => setActiveTab('custom')}
            className={`flex items-center gap-3 px-8 py-4 rounded-2xl text-[10px] font-black uppercase tracking-widest transition-all ${activeTab === 'custom' ? 'bg-white text-black shadow-2xl' : 'text-slate-600 hover:text-white'}`}
          >
            <Database size={16} /> Custom Strings
          </button>
      </div>

      {activeTab === 'extractor' ? (
        <div className="space-y-10 animate-in slide-in-from-left-4 duration-500">
            
            {/* UPLOAD AREA */}
            <div className={`relative border-2 border-dashed ${isUploading ? 'border-purple-500/50 bg-purple-500/[0.02]' : 'border-white/5 bg-[#050505]'} rounded-[3rem] p-24 text-center transition-all group`}>
                <input 
                  type="file" 
                  onChange={handleFileUpload}
                  className="absolute inset-0 opacity-0 cursor-pointer z-20" 
                />
                <div className="relative z-10 flex flex-col items-center">
                    <div className={`w-24 h-24 rounded-[2.5rem] ${isUploading ? 'bg-purple-600 text-white' : 'bg-white/[0.02] text-slate-700'} border border-white/5 flex items-center justify-center mb-8 group-hover:scale-110 transition-transform`}>
                        {isUploading ? <Loader2 className="animate-spin" size={32} /> : <Upload size={32} />}
                    </div>
                    <h3 className="text-2xl font-black text-white uppercase italic tracking-tighter mb-4">
                        {isUploading ? 'Analisando Binário...' : 'Upload de Binário'}
                    </h3>
                    <p className="text-[10px] font-bold text-slate-600 uppercase tracking-widest max-w-sm mx-auto leading-relaxed">
                        Arraste arquivos .exe, .dll ou .sys para extrair strings e realizar análise de segurança avançada.
                    </p>
                </div>
            </div>

            {/* RESULTS IF ANY */}
            {fileResults && (
                <div className="space-y-8 animate-in zoom-in-95 duration-500">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        <div className="bg-[#050505] p-10 rounded-[3rem] border border-white/5">
                            <p className="text-[9px] font-black text-slate-700 uppercase tracking-widest mb-6 flex items-center gap-2"><Fingerprint size={12}/> File Info</p>
                            <h4 className="text-lg font-black text-white italic uppercase tracking-tight mb-2">{fileResults.name}</h4>
                            <span className="text-[10px] font-bold text-purple-500 uppercase tracking-widest">{fileResults.size}</span>
                        </div>
                        <div className="bg-[#050505] p-10 rounded-[3rem] border border-white/5">
                            <p className="text-[9px] font-black text-slate-700 uppercase tracking-widest mb-6 flex items-center gap-2"><Hash size={12}/> MD5 Hash</p>
                            <p className="font-mono text-[10px] text-slate-400 break-all">{fileResults.md5}</p>
                        </div>
                        <div className="bg-[#050505] p-10 rounded-[3rem] border border-white/5">
                            <p className="text-[9px] font-black text-slate-700 uppercase tracking-widest mb-6 flex items-center gap-2"><Activity size={12}/> Forensic Values</p>
                            <div className="space-y-3">
                                <div className="flex justify-between items-center">
                                    <span className="text-[9px] font-black text-slate-700 uppercase tracking-widest italic">PCA VALUE</span>
                                    <span className="text-[10px] font-black text-white">{fileResults.pca}</span>
                                </div>
                                <div className="flex justify-between items-center">
                                    <span className="text-[9px] font-black text-slate-700 uppercase tracking-widest italic">DPS TIME</span>
                                    <span className="text-[10px] font-black text-white">{fileResults.dps}</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="bg-[#050505] rounded-[3rem] border border-white/5 overflow-hidden">
                        <div className="px-12 py-8 border-b border-white/5 bg-white/[0.01] flex items-center justify-between">
                            <h3 className="text-sm font-black text-white uppercase italic tracking-widest">Relatório de Heurística</h3>
                            <div className="flex items-center gap-6">
                                <span className="text-[9px] font-black px-3 py-1 bg-red-500/10 text-red-500 rounded-lg border border-red-500/20">{fileResults.detections.length} DETECÇÕES</span>
                                <span className="text-[9px] font-black px-3 py-1 bg-yellow-500/10 text-yellow-500 rounded-lg border border-yellow-500/20">{fileResults.suspicious.length} SUSPEITOS</span>
                            </div>
                        </div>
                        <div className="p-8 space-y-4">
                            {fileResults.detections.map((d: any, i: number) => (
                                <div key={i} className="flex items-center justify-between p-6 bg-red-500/[0.02] border border-red-500/10 rounded-2xl group transition-all hover:bg-red-500/[0.04]">
                                    <div className="flex items-center gap-6">
                                        <div className="w-10 h-10 rounded-xl bg-red-500/10 flex items-center justify-center text-red-500">
                                            <AlertTriangle size={18} />
                                        </div>
                                        <span className="text-[11px] font-black text-white uppercase tracking-tight italic">{d.title}</span>
                                    </div>
                                    <span className="text-[9px] font-black text-red-500 uppercase tracking-widest italic">{d.severity}</span>
                                </div>
                            ))}
                            {fileResults.suspicious.map((d: any, i: number) => (
                                <div key={i} className="flex items-center justify-between p-6 bg-yellow-500/[0.02] border border-yellow-500/10 rounded-2xl group transition-all hover:bg-yellow-500/[0.04]">
                                    <div className="flex items-center gap-6">
                                        <div className="w-10 h-10 rounded-xl bg-yellow-500/10 flex items-center justify-center text-yellow-500">
                                            <ShieldAlert size={18} />
                                        </div>
                                        <span className="text-[11px] font-black text-white uppercase tracking-tight italic">{d.title}</span>
                                    </div>
                                    <span className="text-[9px] font-black text-yellow-500 uppercase tracking-widest italic">{d.severity}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            )}
        </div>
      ) : (
        <div className="space-y-12 animate-in slide-in-from-right-4 duration-500">
            
            {/* ADD NEW STRING FORM */}
            <div className="bg-[#050505] p-12 rounded-[3.5rem] border border-white/5 shadow-2xl">
                <div className="flex items-center gap-4 mb-12">
                    <Plus className="text-purple-500" size={20} />
                    <h2 className="text-xl font-black text-white uppercase italic tracking-tight">ADICIONAR NOVA HEURÍSTICA</h2>
                </div>
                
                <form onSubmit={handleAddString} className="grid grid-cols-1 lg:grid-cols-2 gap-10">
                    <div className="space-y-10">
                        <div className="space-y-4">
                            <label className="text-[10px] font-black text-slate-700 uppercase tracking-widest ml-1 italic">PROCESSO ALVO</label>
                            <select 
                                value={process}
                                onChange={(e) => setProcess(e.target.value)}
                                className="w-full bg-white/[0.02] border border-white/5 rounded-2xl px-6 py-4.5 text-xs text-white focus:outline-none focus:border-purple-500/30 transition-all font-bold uppercase tracking-widest"
                            >
                                <option value="dps">Diagnostic Policy Service (DPS)</option>
                                <option value="lsass">LSA Security Subsystem (LSASS)</option>
                                <option value="svchost">Svchost / Memory</option>
                                <option value="explorer">Windows Explorer</option>
                                <option value="generic">Global / Any</option>
                            </select>
                        </div>
                        <div className="space-y-4">
                            <label className="text-[10px] font-black text-slate-700 uppercase tracking-widest ml-1 italic">NOME DA DETECÇÃO</label>
                            <input 
                                type="text"
                                value={clientName}
                                onChange={(e) => setClientName(e.target.value)}
                                placeholder="ex: Mesa Changer"
                                className="w-full bg-white/[0.02] border border-white/5 rounded-2xl px-6 py-4.5 text-xs text-white placeholder-slate-800 focus:outline-none focus:border-purple-500/30 transition-all font-bold"
                            />
                        </div>
                    </div>
                    <div className="space-y-10">
                        <div className="space-y-4">
                            <label className="text-[10px] font-black text-slate-700 uppercase tracking-widest ml-1 italic">VALOR DA STRING (PATERN)</label>
                            <input 
                                type="text"
                                value={stringValue}
                                onChange={(e) => setStringValue(e.target.value)}
                                placeholder="ex: 2025/12/16:01:42:59"
                                className="w-full bg-white/[0.02] border border-white/5 rounded-2xl px-6 py-4.5 text-[11px] text-purple-400 font-mono focus:outline-none focus:border-purple-500/30 transition-all"
                            />
                        </div>
                        <div className="space-y-4">
                            <label className="text-[10px] font-black text-slate-700 uppercase tracking-widest ml-1 italic">SEVERIDADE NO RESULTADO</label>
                            <div className="flex gap-4">
                                <button 
                                    type="button"
                                    onClick={() => setSeverity('Suspeito')}
                                    className={`flex-1 py-4.5 rounded-2xl text-[10px] font-black uppercase tracking-[0.2em] transition-all border ${severity === 'Suspeito' ? 'bg-blue-500/20 text-blue-400 border-blue-500/30 shadow-lg' : 'bg-white/[0.01] text-slate-700 border-white/5'}`}
                                >
                                    SUSPEITO
                                </button>
                                <button 
                                    type="button"
                                    onClick={() => setSeverity('Cheating')}
                                    className={`flex-1 py-4.5 rounded-2xl text-[10px] font-black uppercase tracking-[0.2em] transition-all border ${severity === 'Cheating' ? 'bg-red-500/20 text-red-400 border-red-500/30 shadow-lg' : 'bg-white/[0.01] text-slate-700 border-white/5'}`}
                                >
                                    CHEATING
                                </button>
                            </div>
                        </div>
                    </div>
                    <div className="lg:col-span-2 pt-4">
                        <button 
                            type="submit"
                            className="w-full bg-white text-black font-black tracking-[0.4em] text-[10px] uppercase py-5 rounded-[1.5rem] hover:bg-purple-600 hover:text-white transition-all shadow-2xl active:scale-95"
                        >
                            ADICIONAR STRING À HEURÍSTICA GLOBAL
                        </button>
                    </div>
                </form>
            </div>

            {/* STRINGS LIST */}
            <div className="bg-[#050505] rounded-[3.5rem] border border-white/5 shadow-2xl overflow-hidden">
                <div className="px-12 py-10 border-b border-white/5 bg-white/[0.01] flex items-center justify-between">
                    <h3 className="text-xl font-black text-white uppercase italic tracking-tight">BANCO DE <span className="text-purple-600 italic">STRINGS</span></h3>
                    <div className="flex items-center gap-4 px-6 py-3 bg-white/[0.02] border border-white/5 rounded-2xl">
                        <Search size={14} className="text-slate-700" />
                        <input type="text" placeholder="BUSCAR..." className="bg-transparent border-none focus:outline-none text-[10px] font-black uppercase tracking-widest text-white w-40" />
                    </div>
                </div>
                <div className="p-6 space-y-4">
                    {loading ? (
                        <div className="py-20 flex justify-center"><Loader2 className="animate-spin text-purple-500" size={32} /></div>
                    ) : strings.length === 0 ? (
                        <div className="py-20 text-center opacity-10 flex flex-col items-center">
                            <Database size={48} className="mb-4" />
                            <p className="text-xs font-black uppercase tracking-widest italic">Nenhuma string customizada</p>
                        </div>
                    ) : (
                        strings.map((s: any) => (
                            <div key={s._id} className="flex items-center justify-between p-6 bg-white/[0.01] rounded-3xl border border-white/5 hover:border-purple-500/20 transition-all group">
                                <div className="flex items-center gap-8">
                                    <div className={`w-12 h-12 rounded-2xl flex items-center justify-center border ${s.severity === 'Cheating' ? 'bg-red-500/10 text-red-500 border-red-500/20' : 'bg-blue-500/10 text-blue-400 border-blue-500/20'}`}>
                                        <Zap size={20} />
                                    </div>
                                    <div className="space-y-1">
                                        <h4 className="text-sm font-black text-white uppercase tracking-tight italic">{s.clientName}</h4>
                                        <div className="flex items-center gap-4">
                                            <span className="text-[9px] font-black text-purple-500 uppercase tracking-widest italic">{s.process}</span>
                                            <div className="w-1 h-1 rounded-full bg-slate-800" />
                                            <span className="text-[10px] font-mono text-slate-500">{s.stringValue}</span>
                                        </div>
                                    </div>
                                </div>
                                <div className="flex items-center gap-10">
                                    <span className={`text-[9px] font-black uppercase tracking-[0.2em] italic ${s.severity === 'Cheating' ? 'text-red-500' : 'text-blue-400'}`}>
                                        {s.severity}
                                    </span>
                                    <button 
                                      onClick={() => handleDelete(s._id)}
                                      className="p-3 bg-white/[0.02] hover:bg-red-500/10 text-slate-800 hover:text-red-500 rounded-xl transition-all opacity-0 group-hover:opacity-100"
                                    >
                                        <Trash2 size={16} />
                                    </button>
                                </div>
                            </div>
                        ))
                    )}
                </div>
            </div>

        </div>
      )}

    </div>
  );
}
