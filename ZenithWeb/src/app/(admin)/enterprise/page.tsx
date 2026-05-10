'use client';

import { useState, useEffect } from 'react';
import { Save, Link as LinkIcon, Database, Code, Palette, MessageSquare, Users, Ghost, Shield, Lock, Zap, Activity } from 'lucide-react';
import TeamChat from '@/components/TeamChat';

export const dynamic = 'force-dynamic';

export default function EnterprisePage() {
  const [scannerName, setScannerName] = useState('LODARK AC');
  const [primaryColor, setPrimaryColor] = useState('#7c3aed');
  const [spinnerColor1, setSpinnerColor1] = useState('#7c3aed');
  const [spinnerColor2, setSpinnerColor2] = useState('#4f46e5');
  const [spinnerColor3, setSpinnerColor3] = useState('#9333ea');
  const [downloadLink, setDownloadLink] = useState('');
  const [customStrings, setCustomStrings] = useState('');
  const [privateStrings, setPrivateStrings] = useState('');
  const [statusMessages, setStatusMessages] = useState('');
  const [yaraRules, setYaraRules] = useState('');
  const [loading, setLoading] = useState(false);
  const [saved, setSaved] = useState(false);

  const fetchConfig = async () => {
    const res = await fetch('/api/admin/enterprise');
    if (res.ok) {
      const data = await res.json();
      setScannerName(data.scannerName || 'LODARK AC');
      setPrimaryColor(data.primaryColor || '#7c3aed');
      setSpinnerColor1(data.spinnerColor1 || '#7c3aed');
      setSpinnerColor2(data.spinnerColor2 || '#4f46e5');
      setSpinnerColor3(data.spinnerColor3 || '#9333ea');
      setDownloadLink(data.downloadLink || '');
      setCustomStrings((data.customStrings || []).join('\n'));
      setPrivateStrings((data.privateStrings || []).join('\n'));
      const savedMessages = data.statusMessages && data.statusMessages.length > 0 ? data.statusMessages : [
        "Iniciando telagem...",
        "Procurando bypass mal feito...",
        "Checando emulador genérico...",
        "Analisando PowerShell suspeito...",
        "Vendo tentativa de limpar rastro...",
        "Lendo Prefetch que o bypass esqueceu...",
        "Pegando processo escondido...",
        "Scanner LodarkAC ativado...",
        "Bypass detectado 💀",
        "Relatório enviado para LodarkAC.",
        "GG."
      ];
      setStatusMessages(savedMessages.join('\n'));
      setYaraRules(data.yaraRules || '');
    }
  };

  useEffect(() => {
    fetchConfig();
  }, []);

  const handleSave = async () => {
    setLoading(true);
    setSaved(false);

    const stringsArray = customStrings.split('\n').filter(s => s.trim() !== '');
    const privateStringsArray = privateStrings.split('\n').filter(s => s.trim() !== '');
    const statusArray = statusMessages.split('\n').filter(s => s.trim() !== '');

    const res = await fetch('/api/admin/enterprise', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        scannerName,
        primaryColor,
        spinnerColor1,
        spinnerColor2,
        spinnerColor3,
        downloadLink,
        customStrings: stringsArray,
        privateStrings: privateStringsArray,
        statusMessages: statusArray.length > 0 ? statusArray : undefined,
        yaraRules
      })
    });

    if (res.ok) {
      setSaved(true);
      setTimeout(() => setSaved(false), 3000);
    }
    setLoading(false);
  };

  return (
    <div className="space-y-10 max-w-[1400px] mx-auto pb-20 animate-in fade-in duration-700">
      
      {/* Header Profissional */}
      <div className="flex flex-col md:flex-row items-center justify-between gap-8 bg-black/40 backdrop-blur-3xl p-10 rounded-[2.5rem] border border-white/5 shadow-2xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-violet-600/5 blur-[100px] pointer-events-none" />
        
        <div className="flex items-center gap-6 relative z-10">
          <div className="w-16 h-16 bg-gradient-to-br from-violet-600 to-indigo-700 rounded-2xl flex items-center justify-center border border-white/10 shadow-xl">
            <Database className="text-white" size={32} />
          </div>
          <div>
            <h1 className="text-3xl font-black text-white tracking-tighter uppercase italic">ENTERPRISE<span className="text-violet-500">.CONFIG</span></h1>
            <p className="text-[10px] text-gray-500 uppercase tracking-[0.4em] font-bold mt-1 opacity-60">Custom Forensic Protocol Management</p>
          </div>
        </div>

        <button 
          onClick={handleSave}
          disabled={loading}
          className="relative z-10 flex items-center gap-3 px-10 py-4 bg-violet-600 hover:bg-violet-500 text-white rounded-2xl font-black tracking-widest text-[10px] uppercase transition-all shadow-[0_0_30px_rgba(124,58,237,0.3)] disabled:opacity-50 active:scale-95 group"
        >
          <Save size={18} className="group-hover:scale-110 transition-transform" />
          <span>{loading ? 'Saving Protocol...' : saved ? 'Protocol Applied!' : 'Apply Configuration'}</span>
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">

        {/* Branding & Distribution (Left Column) */}
        <div className="lg:col-span-4 space-y-8">
          
          {/* White Label Branding */}
          <div className="bg-black/40 backdrop-blur-2xl p-8 rounded-[2rem] border border-white/5 shadow-xl space-y-6">
            <div className="flex items-center gap-3 border-b border-white/5 pb-4">
              <Palette className="text-violet-400" size={20} />
              <h2 className="text-xs font-black text-white uppercase tracking-widest italic">Branding Core</h2>
            </div>
            <div className="space-y-6">
              <div>
                <label className="block text-[9px] font-black text-gray-500 uppercase tracking-[0.3em] mb-3">Custom Scanner Name</label>
                <input
                  type="text"
                  value={scannerName}
                  onChange={(e) => setScannerName(e.target.value)}
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-gray-600 focus:outline-none focus:border-violet-500/50 transition-all font-bold text-sm"
                />
              </div>
              <div>
                <label className="block text-[9px] font-black text-gray-500 uppercase tracking-[0.3em] mb-3">Primary Identity Color</label>
                <div className="flex gap-4 items-center bg-white/5 p-2 rounded-xl border border-white/5">
                  <input 
                    type="color" 
                    value={primaryColor}
                    onChange={(e) => setPrimaryColor(e.target.value)}
                    className="h-10 w-16 bg-transparent border-0 cursor-pointer rounded-lg overflow-hidden"
                  />
                  <input 
                    type="text" 
                    value={primaryColor}
                    onChange={(e) => setPrimaryColor(e.target.value)}
                    className="bg-transparent border-0 text-white w-full focus:outline-none font-mono text-xs uppercase tracking-widest"
                  />
                </div>
              </div>
              
              <div className="pt-2">
                <label className="block text-[9px] font-black text-gray-500 uppercase tracking-[0.3em] mb-4">Gringo Wave Spinner Palette</label>
                <div className="grid grid-cols-3 gap-3">
                  {[spinnerColor1, spinnerColor2, spinnerColor3].map((c, i) => (
                    <div key={i} className="bg-white/5 p-2 rounded-xl border border-white/5 flex flex-col items-center">
                      <input 
                        type="color" 
                        value={c} 
                        onChange={(e) => {
                          if(i===0) setSpinnerColor1(e.target.value);
                          if(i===1) setSpinnerColor2(e.target.value);
                          if(i===2) setSpinnerColor3(e.target.value);
                        }} 
                        className="w-full h-8 bg-transparent border-0 cursor-pointer rounded-lg" 
                      />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Scanner Distribution */}
          <div className="bg-black/40 backdrop-blur-2xl p-8 rounded-[2rem] border border-white/5 shadow-xl space-y-6">
            <div className="flex items-center gap-3 border-b border-white/5 pb-4">
              <LinkIcon className="text-violet-400" size={20} />
              <h2 className="text-xs font-black text-white uppercase tracking-widest italic">Distribution</h2>
            </div>
            <div>
              <label className="block text-[9px] font-black text-gray-500 uppercase tracking-[0.3em] mb-3">Binary Distribution URL</label>
              <input
                type="text"
                value={downloadLink}
                onChange={(e) => setDownloadLink(e.target.value)}
                placeholder="https://cdn.lodark.com/client.exe"
                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-violet-400 font-mono text-xs placeholder-gray-700 focus:outline-none focus:border-violet-500/50 transition-all"
              />
              <p className="text-[8px] text-gray-600 font-bold uppercase tracking-widest mt-4 leading-relaxed italic">
                * Link visible to users after PIN authentication.
              </p>
            </div>
          </div>
        </div>

        {/* Forensic Logic & Strings (Middle/Right Column) */}
        <div className="lg:col-span-8 space-y-8">
          
          {/* Memory Strings Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            
            {/* Public Custom Strings */}
            <div className="bg-black/40 backdrop-blur-2xl p-8 rounded-[2rem] border border-white/5 shadow-xl space-y-6">
              <div className="flex items-center gap-3 border-b border-white/5 pb-4">
                <Code className="text-violet-400" size={20} />
                <h2 className="text-xs font-black text-white uppercase tracking-widest italic">Global Strings</h2>
              </div>
              <textarea
                value={customStrings}
                onChange={(e) => setCustomStrings(e.target.value)}
                placeholder="skeng.dll\ncheat_menu\n..."
                rows={10}
                className="w-full bg-white/5 border border-white/10 rounded-2xl px-5 py-5 text-violet-300 font-mono text-xs placeholder-gray-700 focus:outline-none focus:border-violet-500/50 transition-all custom-scrollbar"
              />
            </div>

            {/* Private Custom Strings (Encrypted/Hidden) */}
            <div className="bg-violet-950/10 backdrop-blur-2xl p-8 rounded-[2rem] border border-violet-500/20 shadow-2xl space-y-6 relative overflow-hidden">
              <div className="absolute top-0 right-0 p-4 opacity-10">
                <Lock size={60} className="text-violet-500" />
              </div>
              <div className="flex items-center gap-3 border-b border-violet-500/20 pb-4">
                <Lock className="text-violet-400" size={20} />
                <h2 className="text-xs font-black text-violet-400 uppercase tracking-widest italic">Private Strings (Elite)</h2>
              </div>
              <textarea
                value={privateStrings}
                onChange={(e) => setPrivateStrings(e.target.value)}
                placeholder="hidden_cheat_signature\nprivate_hook\n..."
                rows={10}
                className="w-full bg-white/5 border border-violet-500/20 rounded-2xl px-5 py-5 text-violet-400 font-mono text-xs placeholder-violet-900/50 focus:outline-none focus:border-violet-500 transition-all custom-scrollbar"
              />
              <p className="text-[8px] text-violet-500/60 font-black uppercase tracking-widest italic">
                * These strings are only loaded into the private kernel buffer.
              </p>
            </div>
          </div>

          {/* Scanner Status Mockery */}
          <div className="bg-black/40 backdrop-blur-2xl p-8 rounded-[2.5rem] border border-white/5 shadow-xl space-y-6">
            <div className="flex items-center justify-between border-b border-white/5 pb-4">
              <div className="flex items-center gap-3">
                <Activity className="text-violet-400" size={24} />
                <h2 className="text-xs font-black text-white uppercase tracking-widest italic">UI Mockery Protocol</h2>
              </div>
              <span className="text-[9px] font-black text-gray-700 uppercase tracking-widest">Logic: Randomized Rotation</span>
            </div>
            <textarea
              value={statusMessages}
              onChange={(e) => setStatusMessages(e.target.value)}
              rows={5}
              className="w-full bg-white/5 border border-white/10 rounded-2xl px-5 py-5 text-gray-300 font-mono text-xs placeholder-gray-700 focus:outline-none focus:border-violet-500/50 transition-all custom-scrollbar"
            />
          </div>

          {/* YARA Rules */}
          <div className="bg-black/40 backdrop-blur-2xl p-8 rounded-[2.5rem] border border-white/5 shadow-xl space-y-6">
            <div className="flex items-center gap-3 border-b border-white/5 pb-4">
              <Zap className="text-violet-400" size={20} />
              <h2 className="text-xs font-black text-white uppercase tracking-widest italic">YARA Rule Orchestration</h2>
            </div>
            <textarea
              value={yaraRules}
              onChange={(e) => setYaraRules(e.target.value)}
              placeholder={'rule SamplePattern {\n  strings: $s = "MALWARE_SIG"\n  condition: $s\n}'}
              rows={8}
              className="w-full bg-white/5 border border-white/10 rounded-2xl px-5 py-5 text-indigo-300 font-mono text-xs placeholder-gray-700 focus:outline-none focus:border-violet-500/50 transition-all custom-scrollbar"
            />
          </div>

          {/* Team Chat Integration */}
          <div className="pt-4">
            <TeamChat ownerKey="Private Admin Node" />
          </div>

        </div>
      </div>
    </div>
  );
}
