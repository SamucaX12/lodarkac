'use client';

import { useState, useEffect } from 'react';
import { Save, ShieldAlert, FileText } from 'lucide-react';

export default function StringsSamucaPage() {
  const [privateStrings, setPrivateStrings] = useState('');
  const [loading, setLoading] = useState(false);
  const [saved, setSaved] = useState(false);

  const fetchConfig = async () => {
    const res = await fetch('/api/admin/strings');
    if (res.ok) {
      const data = await res.json();
      setPrivateStrings((data.privateStrings || []).join('\n'));
    }
  };

  useEffect(() => {
    fetchConfig();
  }, []);

  const handleSave = async () => {
    setLoading(true);
    setSaved(false);

    const stringsArray = privateStrings.split('\n').filter(s => s.trim() !== '');

    const res = await fetch('/api/admin/strings', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ privateStrings: stringsArray })
    });

    if (res.ok) {
      setSaved(true);
      setTimeout(() => setSaved(false), 3000);
    }
    setLoading(false);
  };

  return (
    <div className="space-y-6 max-w-5xl">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-white tracking-tight flex items-center gap-3">
            <ShieldAlert className="text-red-500" size={32} />
            Strings Samuca (Confidencial)
          </h1>
          <p className="text-red-400/80 mt-1">Área restrita. Strings cadastradas aqui não são visíveis para revendedores e injetam direto no motor do C++.</p>
        </div>
        <button 
          onClick={handleSave}
          disabled={loading}
          className="flex items-center gap-2 px-6 py-2.5 bg-red-600 hover:bg-red-500 text-white rounded-lg font-medium transition-all shadow-[0_0_15px_rgba(220,38,38,0.4)] disabled:opacity-50"
        >
          <Save size={18} />
          <span>{loading ? 'Salvando...' : saved ? 'Salvo!' : 'Salvar Strings'}</span>
        </button>
      </div>

      <div className="bg-gradient-to-br from-red-950/20 to-black border border-red-500/20 p-6 rounded-xl shadow-[0_0_30px_rgba(220,38,38,0.1)]">
        <div className="flex items-center gap-3 border-b border-red-500/20 pb-4 mb-4">
          <div className="p-2 bg-red-500/10 rounded-lg text-red-500">
            <FileText size={20} />
          </div>
          <h2 className="text-xl font-semibold text-white">Banco de Assinaturas Privado</h2>
        </div>
        
        <div>
          <label className="block text-sm font-medium text-red-300 mb-2">Memory Strings & YARA Signatures (Uma por linha)</label>
          <textarea
            value={privateStrings}
            onChange={(e) => setPrivateStrings(e.target.value)}
            placeholder="Insira as strings ou bytes confidenciais aqui..."
            rows={20}
            className="w-full bg-black/60 border border-red-500/30 rounded-lg px-4 py-3 text-red-400 font-mono text-sm placeholder-red-900/50 focus:outline-none focus:border-red-500 focus:ring-1 focus:ring-red-500"
          />
          <p className="text-xs text-red-500/70 mt-2">Cuidado: Estas strings serão adicionadas ao core de detecção de todos os clientes globais.</p>
        </div>
      </div>
    </div>
  );
}
