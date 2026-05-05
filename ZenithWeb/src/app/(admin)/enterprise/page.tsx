'use client';

import { useState, useEffect } from 'react';
import { Save, Link as LinkIcon, Database, Code, Palette, MessageSquare, Users, Ghost } from 'lucide-react';
import TeamChat from '@/components/TeamChat';

export const dynamic = 'force-dynamic';

export default function EnterprisePage() {
  const [scannerName, setScannerName] = useState('LODARK AC');
  const [primaryColor, setPrimaryColor] = useState('#2563eb');
  const [spinnerColor1, setSpinnerColor1] = useState('#ff3366');
  const [spinnerColor2, setSpinnerColor2] = useState('#ffaa00');
  const [spinnerColor3, setSpinnerColor3] = useState('#33ccff');
  const [downloadLink, setDownloadLink] = useState('');
  const [customStrings, setCustomStrings] = useState('');
  const [statusMessages, setStatusMessages] = useState('');
  const [yaraRules, setYaraRules] = useState('');
  const [loading, setLoading] = useState(false);
  const [saved, setSaved] = useState(false);

  const fetchConfig = async () => {
    const res = await fetch('/api/admin/enterprise');
    if (res.ok) {
      const data = await res.json();
      setScannerName(data.scannerName || 'LODARK AC');
      setPrimaryColor(data.primaryColor || '#2563eb');
      setSpinnerColor1(data.spinnerColor1 || '#ff3366');
      setSpinnerColor2(data.spinnerColor2 || '#ffaa00');
      setSpinnerColor3(data.spinnerColor3 || '#33ccff');
      setDownloadLink(data.downloadLink || '');
      setCustomStrings((data.customStrings || []).join('\n'));
      setStatusMessages((data.statusMessages || [
        "Iniciando caçada de bypass...",
        "Lodark Chupa Todos...",
        "Verificando emuladores e W.O...",
        "Analisando hooks do Sysmon...",
        "Zimo Free? WO...",
        "Escaneando arquivos suspeitos (BAM)...",
        "Verificando Blacklist...",
        "Lendo memória dos processos...",
        "Finalizando e enviando resultados..."
      ]).join('\n'));
      setYaraRules(data.yaraRules || '');
    }
  };

  useEffect(() => {
    fetchConfig();
  }, []);

  const handleSave = async () => {
    setLoading(true);
    setSaved(false);

    // Converte a string do textarea em array, pulando as linhas vazias
    const stringsArray = customStrings.split('\n').filter(s => s.trim() !== '');
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
    <div className="space-y-8 max-w-[1200px] mx-auto pb-10">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 bg-[#0B0E14] p-6 rounded-2xl border border-white/5 shadow-2xl">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-full bg-purple-500/10 flex items-center justify-center border border-purple-500/20 shadow-[0_0_15px_rgba(59,130,246,0.15)]">
            <Database className="text-purple-400" size={24} />
          </div>
          <div>
            <h1 className="text-2xl font-black text-white tracking-wider">ENTERPRISE SETUP</h1>
            <p className="text-xs text-gray-500 uppercase tracking-widest font-bold mt-1">Configure your custom scanner parameters</p>
          </div>
        </div>
        <button 
          onClick={handleSave}
          disabled={loading}
          className="flex items-center gap-2 px-8 py-3 bg-purple-600 hover:bg-purple-500 text-white rounded-xl font-black tracking-widest text-xs uppercase transition-all shadow-[0_0_20px_rgba(37,99,235,0.4)] disabled:opacity-50"
        >
          <Save size={16} />
          <span>{loading ? 'Saving...' : saved ? 'Saved!' : 'Save Config'}</span>
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

        {/* Branding (White Label) */}
        <div className="bg-[#0B0E14] p-6 rounded-2xl border border-white/5 shadow-xl space-y-5">
          <div className="flex items-center gap-3 border-b border-white/5 pb-4">
            <Palette className="text-orange-400" size={20} />
            <h2 className="text-sm font-black text-gray-300 uppercase tracking-widest">White Label Branding</h2>
          </div>
          <div className="space-y-4">
            <div>
              <label className="block text-[10px] font-black text-gray-500 uppercase tracking-widest mb-2">Scanner Name</label>
              <input
                type="text"
                value={scannerName}
                onChange={(e) => setScannerName(e.target.value)}
                placeholder="LODARK AC"
                className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-gray-600 focus:outline-none focus:border-purple-500/50 transition-colors"
              />
            </div>
            <div>
              <label className="block text-[10px] font-black text-gray-500 uppercase tracking-widest mb-2">Cor Primária do Scanner</label>
              <div className="flex gap-4 items-center bg-black/20 p-2 rounded-xl border border-white/5">
                <input 
                  type="color" 
                  value={primaryColor}
                  onChange={(e) => setPrimaryColor(e.target.value)}
                  className="h-10 w-20 bg-transparent border-0 cursor-pointer rounded-lg"
                />
                <input 
                  type="text" 
                  value={primaryColor}
                  onChange={(e) => setPrimaryColor(e.target.value)}
                  className="bg-transparent border-0 text-white w-full focus:outline-none font-mono text-sm"
                />
              </div>
            </div>
            
            <div className="pt-2">
              <label className="block text-[10px] font-black text-gray-500 uppercase tracking-widest mb-2">Cores da Animação (Gringo Wave Spinner)</label>
              <div className="grid grid-cols-3 gap-3">
                <div className="flex flex-col gap-2 bg-black/20 p-2 rounded-xl border border-white/5">
                  <span className="text-[9px] text-gray-500 font-bold uppercase tracking-widest text-center">Cor 1</span>
                  <input type="color" value={spinnerColor1} onChange={(e) => setSpinnerColor1(e.target.value)} className="w-full h-8 bg-transparent border-0 cursor-pointer rounded-lg" />
                </div>
                <div className="flex flex-col gap-2 bg-black/20 p-2 rounded-xl border border-white/5">
                  <span className="text-[9px] text-gray-500 font-bold uppercase tracking-widest text-center">Cor 2</span>
                  <input type="color" value={spinnerColor2} onChange={(e) => setSpinnerColor2(e.target.value)} className="w-full h-8 bg-transparent border-0 cursor-pointer rounded-lg" />
                </div>
                <div className="flex flex-col gap-2 bg-black/20 p-2 rounded-xl border border-white/5">
                  <span className="text-[9px] text-gray-500 font-bold uppercase tracking-widest text-center">Cor 3</span>
                  <input type="color" value={spinnerColor3} onChange={(e) => setSpinnerColor3(e.target.value)} className="w-full h-8 bg-transparent border-0 cursor-pointer rounded-lg" />
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Scanner Download Link */}
        <div className="bg-[#0B0E14] p-6 rounded-2xl border border-white/5 shadow-xl space-y-5">
          <div className="flex items-center gap-3 border-b border-white/5 pb-4">
            <LinkIcon className="text-purple-400" size={20} />
            <h2 className="text-sm font-black text-gray-300 uppercase tracking-widest">Scanner Distribution</h2>
          </div>
          <div>
            <label className="block text-[10px] font-black text-gray-500 uppercase tracking-widest mb-2">Direct Download URL (.exe / .zip)</label>
            <input
              type="text"
              value={downloadLink}
              onChange={(e) => setDownloadLink(e.target.value)}
              placeholder="https://your-site.com/LodarkAC_v2.exe"
              className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-purple-400 font-mono text-sm placeholder-gray-600 focus:outline-none focus:border-purple-500/50 transition-colors"
            />
            <p className="text-[10px] text-gray-600 font-bold uppercase tracking-widest mt-3">Link fornecido após o PIN.</p>
          </div>
        </div>

        {/* Custom Status Messages (Mockery) */}
        <div className="bg-gradient-to-br from-[#0B0E14] to-pink-950/10 p-6 rounded-2xl border border-pink-500/20 shadow-[0_0_30px_rgba(236,72,153,0.05)] space-y-5 lg:col-span-2">
          <div className="flex items-center gap-3 border-b border-pink-500/20 pb-4">
            <Ghost className="text-pink-500" size={24} />
            <div>
              <h2 className="text-sm font-black text-pink-400 uppercase tracking-widest">Scanner Mockery Area 🤡</h2>
              <p className="text-[10px] text-pink-500/60 font-bold uppercase tracking-widest mt-1">Zue os cheats durante o loading (Lodark Style)</p>
            </div>
          </div>
          <div>
            <textarea
              value={statusMessages}
              onChange={(e) => setStatusMessages(e.target.value)}
              placeholder="Iniciando caçada...\nLodark chupa todos...\nZimo Free? WO..."
              rows={6}
              className="w-full bg-black/60 border border-pink-500/30 rounded-xl px-4 py-4 text-pink-200 font-mono text-sm placeholder-pink-900/50 focus:outline-none focus:border-pink-500 transition-colors custom-scrollbar"
            />
          </div>
        </div>

        {/* Custom Strings */}
        <div className="bg-[#0B0E14] p-6 rounded-2xl border border-white/5 shadow-xl space-y-5">
          <div className="flex items-center gap-3 border-b border-white/5 pb-4">
            <Code className="text-purple-400" size={20} />
            <h2 className="text-sm font-black text-gray-300 uppercase tracking-widest">Memory Strings</h2>
          </div>
          <div>
            <textarea
              value={customStrings}
              onChange={(e) => setCustomStrings(e.target.value)}
              placeholder="skeng.dll\ncheat_menu_open\nAimBot_Instance"
              rows={8}
              className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-purple-300 font-mono text-sm placeholder-gray-600 focus:outline-none focus:border-purple-500/50 transition-colors custom-scrollbar"
            />
          </div>
        </div>

        {/* YARA Rules */}
        <div className="bg-[#0B0E14] p-6 rounded-2xl border border-white/5 shadow-xl space-y-5">
          <div className="flex items-center gap-3 border-b border-white/5 pb-4">
            <Code className="text-purple-400" size={20} />
            <h2 className="text-sm font-black text-gray-300 uppercase tracking-widest">YARA Rules (Advanced)</h2>
          </div>
          <div>
            <textarea
              value={yaraRules}
              onChange={(e) => setYaraRules(e.target.value)}
              placeholder={'rule DummyCheat {\n  strings:\n    $a = "dummy_cheat_string"\n  condition:\n    $a\n}'}
              rows={8}
              className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-purple-300 font-mono text-sm placeholder-gray-600 focus:outline-none focus:border-purple-500/50 transition-colors custom-scrollbar"
            />
          </div>
        </div>

        {/* Team Chat */}
        <div className="lg:col-span-2">
          <TeamChat ownerKey="Private Team" />
        </div>

      </div>
    </div>
  );
}
