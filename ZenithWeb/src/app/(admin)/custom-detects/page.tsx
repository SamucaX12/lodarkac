'use client';

import { useState, useEffect, useRef } from 'react';
import { ShieldAlert, Plus, Trash2, UploadCloud, FileCog } from 'lucide-react';

export default function CustomDetectsPage() {
  const [detects, setDetects] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [dragActive, setDragActive] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [formData, setFormData] = useState({
    name: '',
    size: '',
    md5: '',
    sha256: '',
    dps: '',
    pcaSvc: '',
    downloadLink: ''
  });

  useEffect(() => {
    fetchDetects();
  }, []);

  const fetchDetects = async () => {
    const res = await fetch('/api/admin/custom-detects');
    const data = await res.json();
    if (Array.isArray(data)) setDetects(data);
    setLoading(false);
  };

  const handleInputChange = (e: any) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    if (!formData.name) return alert('Name is required');

    const res = await fetch('/api/admin/custom-detects', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData)
    });

    if (res.ok) {
      setFormData({ name: '', size: '', md5: '', sha256: '', dps: '', pcaSvc: '', downloadLink: '' });
      fetchDetects();
    }
  };

  const handleDelete = async (id: string) => {
    if (confirm('Deletar essa detect?')) {
      await fetch(`/api/admin/custom-detects?id=${id}`, { method: 'DELETE' });
      fetchDetects();
    }
  };

  // File Analyzer Logic
  const handleDrag = (e: any) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") setDragActive(true);
    else if (e.type === "dragleave") setDragActive(false);
  };

  const handleDrop = async (e: any) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      await analyzeFile(e.dataTransfer.files[0]);
    }
  };

  const handleFileChange = async (e: any) => {
    e.preventDefault();
    if (e.target.files && e.target.files[0]) {
      await analyzeFile(e.target.files[0]);
    }
  };

  const analyzeFile = async (file: File) => {
    try {
      const buffer = await file.arrayBuffer();
      
      // Calculate SHA-256
      const hashBuffer = await crypto.subtle.digest('SHA-256', buffer);
      const hashArray = Array.from(new Uint8Array(hashBuffer));
      const hashHex = hashArray.map(b => b.toString(16).padStart(2, '0')).join('');

      setFormData(prev => ({
        ...prev,
        name: file.name,
        size: file.size.toString(),
        sha256: hashHex,
        md5: 'Use ferramenta externa para MD5', // Browser crypto.subtle doesn't support MD5 natively
      }));
    } catch (err) {
      console.error(err);
      alert('Erro ao analisar arquivo.');
    }
  };

  return (
    <div className="space-y-8 max-w-[1200px] mx-auto pb-20">
      <div className="flex items-center gap-4 bg-[#0B0E14] p-6 rounded-2xl border border-white/5 shadow-2xl">
        <div className="w-12 h-12 rounded-full bg-green-500/10 flex items-center justify-center border border-green-500/20 shadow-[0_0_15px_rgba(34,197,94,0.15)]">
          <ShieldAlert className="text-green-400" size={24} />
        </div>
        <div>
          <h1 className="text-2xl font-black text-white tracking-wider">CUSTOM DETECT / STRINGS</h1>
          <p className="text-xs text-gray-500 uppercase tracking-widest font-bold mt-1">Lodark AC Global Database</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Col: File Analyzer & Form */}
        <div className="lg:col-span-1 space-y-6">
          
          {/* Drag and Drop Analyzer */}
          <div 
            className={`bg-[#0B0E14] border-2 border-dashed rounded-2xl p-6 text-center transition-all ${dragActive ? 'border-green-500 bg-green-500/5' : 'border-white/10 hover:border-white/20'}`}
            onDragEnter={handleDrag}
            onDragLeave={handleDrag}
            onDragOver={handleDrag}
            onDrop={handleDrop}
            onClick={() => fileInputRef.current?.click()}
          >
            <input ref={fileInputRef} type="file" className="hidden" onChange={handleFileChange} />
            <div className="w-12 h-12 bg-white/5 rounded-full flex items-center justify-center mx-auto mb-3">
              <FileCog size={24} className={dragActive ? 'text-green-400' : 'text-gray-400'} />
            </div>
            <p className="text-sm font-bold text-white mb-1">Analisador de Arquivo</p>
            <p className="text-xs text-gray-500">Jogue um .exe ou .dll aqui para extrair Hash e Size automaticamente.</p>
          </div>

          {/* Manual Entry Form */}
          <form onSubmit={handleSubmit} className="bg-[#0B0E14] border border-white/5 rounded-2xl p-6 shadow-xl space-y-4">
            <h3 className="text-sm font-black text-green-400 uppercase tracking-widest border-b border-white/5 pb-3">Adicionar Assinatura</h3>
            
            <div>
              <label className="block text-[10px] uppercase font-bold text-gray-500 mb-1">Nome do Arquivo / Cheat</label>
              <input type="text" name="name" value={formData.name} onChange={handleInputChange} className="w-full bg-black/40 border border-white/10 rounded-lg px-3 py-2 text-sm text-white focus:border-green-500 focus:outline-none transition-colors" placeholder="ex: NVIDIAGameReady-Driver.exe" required />
            </div>
            
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-[10px] uppercase font-bold text-gray-500 mb-1">Size (Bytes)</label>
                <input type="text" name="size" value={formData.size} onChange={handleInputChange} className="w-full bg-black/40 border border-white/10 rounded-lg px-3 py-2 text-sm text-white font-mono focus:border-green-500 focus:outline-none transition-colors" placeholder="11383296" />
              </div>
              <div>
                <label className="block text-[10px] uppercase font-bold text-gray-500 mb-1">MD5</label>
                <input type="text" name="md5" value={formData.md5} onChange={handleInputChange} className="w-full bg-black/40 border border-white/10 rounded-lg px-3 py-2 text-sm text-white font-mono focus:border-green-500 focus:outline-none transition-colors" placeholder="..." />
              </div>
            </div>

            <div>
              <label className="block text-[10px] uppercase font-bold text-gray-500 mb-1">SHA-256</label>
              <input type="text" name="sha256" value={formData.sha256} onChange={handleInputChange} className="w-full bg-black/40 border border-white/10 rounded-lg px-3 py-2 text-[10px] text-white font-mono focus:border-green-500 focus:outline-none transition-colors" placeholder="..." />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-[10px] uppercase font-bold text-gray-500 mb-1">DPS Trace</label>
                <input type="text" name="dps" value={formData.dps} onChange={handleInputChange} className="w-full bg-black/40 border border-white/10 rounded-lg px-3 py-2 text-sm text-white font-mono focus:border-green-500 focus:outline-none transition-colors" placeholder="!2026/02/23..." />
              </div>
              <div>
                <label className="block text-[10px] uppercase font-bold text-gray-500 mb-1">PcaSvc</label>
                <input type="text" name="pcaSvc" value={formData.pcaSvc} onChange={handleInputChange} className="w-full bg-black/40 border border-white/10 rounded-lg px-3 py-2 text-sm text-white font-mono focus:border-green-500 focus:outline-none transition-colors" placeholder="0x1569000" />
              </div>
            </div>

            <div>
              <label className="block text-[10px] uppercase font-bold text-gray-500 mb-1">Link de Download (Opcional)</label>
              <input type="text" name="downloadLink" value={formData.downloadLink} onChange={handleInputChange} className="w-full bg-black/40 border border-white/10 rounded-lg px-3 py-2 text-sm text-white focus:border-green-500 focus:outline-none transition-colors" placeholder="https://..." />
            </div>

            <button type="submit" className="w-full flex items-center justify-center gap-2 bg-green-500/10 hover:bg-green-500/20 text-green-400 border border-green-500/20 hover:border-green-500/40 font-black tracking-widest text-xs uppercase py-3 rounded-lg transition-all mt-4">
              <Plus size={16} /> Adicionar na Base
            </button>
          </form>
        </div>

        {/* Right Col: Database List */}
        <div className="lg:col-span-2 bg-[#0B0E14] border border-white/5 rounded-2xl shadow-xl overflow-hidden flex flex-col">
          <div className="p-5 border-b border-white/5 bg-black/20">
            <h3 className="text-sm font-black text-gray-400 uppercase tracking-widest">Base de Dados (Lodark AC)</h3>
          </div>
          
          <div className="flex-1 overflow-y-auto custom-scrollbar p-5 space-y-3 max-h-[700px]">
            {loading ? (
              <div className="text-center text-gray-500 text-sm py-10">Carregando...</div>
            ) : detects.length === 0 ? (
              <div className="text-center text-gray-500 text-sm py-10 uppercase tracking-widest font-bold">Nenhuma assinatura registrada</div>
            ) : (
              detects.map((d: any) => (
                <div key={d._id} className="bg-black/40 border border-white/5 rounded-xl p-4 relative group hover:border-white/10 transition-colors">
                  <button onClick={() => handleDelete(d._id)} className="absolute top-4 right-4 text-gray-600 hover:text-red-500 transition-colors">
                    <Trash2 size={16} />
                  </button>
                  
                  <h4 className="text-green-400 font-black text-lg mb-2">{d.name}</h4>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-x-4 gap-y-2 text-xs font-mono">
                    {d.size && <div className="flex"><span className="text-gray-500 w-16">Size:</span> <span className="text-gray-300">{d.size}</span></div>}
                    {d.md5 && <div className="flex"><span className="text-gray-500 w-16">MD5:</span> <span className="text-gray-300 truncate" title={d.md5}>{d.md5}</span></div>}
                    {d.sha256 && <div className="flex col-span-1 md:col-span-2"><span className="text-gray-500 w-16">SHA256:</span> <span className="text-gray-300 truncate" title={d.sha256}>{d.sha256}</span></div>}
                    {d.dps && <div className="flex"><span className="text-gray-500 w-16">DPS:</span> <span className="text-gray-300">{d.dps}</span></div>}
                    {d.pcaSvc && <div className="flex"><span className="text-gray-500 w-16">PcaSvc:</span> <span className="text-gray-300">{d.pcaSvc}</span></div>}
                  </div>
                  
                  {d.downloadLink && (
                    <div className="mt-3 pt-3 border-t border-white/5">
                      <a href={d.downloadLink} target="_blank" rel="noreferrer" className="text-[10px] text-blue-400 hover:text-blue-300 flex items-center gap-1 uppercase font-bold tracking-widest">
                        <UploadCloud size={12} /> Link de Download
                      </a>
                    </div>
                  )}
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
}