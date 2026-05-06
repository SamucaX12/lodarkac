'use client';

import { useState, useEffect } from 'react';
import { Shield, Zap, Bug, GitCommit, Plus, X, Trash2 } from 'lucide-react';
import Link from 'next/link';

export default function UpdatesPage() {
  const [updates, setUpdates] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [isOpen, setIsOpen] = useState(false);
  
  // Form state
  const [version, setVersion] = useState('');
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [type, setType] = useState('minor');
  const [changes, setChanges] = useState<{type: string, text: string}[]>([]);
  const [newChangeText, setNewChangeText] = useState('');
  const [newChangeType, setNewChangeType] = useState('added');

  const fetchUpdates = async () => {
    try {
      const res = await fetch('/api/admin/updates');
      if (res.ok) {
        const data = await res.json();
        setUpdates(data.updates || []);
      }
    } catch (e) {
      console.error(e);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchUpdates();
  }, []);

  const handleAddChange = () => {
    if (!newChangeText) return;
    setChanges([...changes, { type: newChangeType, text: newChangeText }]);
    setNewChangeText('');
  };

  const handleRemoveChange = (index: number) => {
    setChanges(changes.filter((_, i) => i !== index));
  };

  const handleSubmit = async () => {
    if (!version || !title || !description) return alert('Fill all fields');
    
    const res = await fetch('/api/admin/updates', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ version, title, description, type, changes })
    });

    if (res.ok) {
      setIsOpen(false);
      setVersion('');
      setTitle('');
      setDescription('');
      setChanges([]);
      fetchUpdates();
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'added': return <Zap size={14} className="text-purple-400 mt-0.5" />;
      case 'improved': return <Shield size={14} className="text-purple-400 mt-0.5" />;
      case 'removed': return <Bug size={14} className="text-red-400 mt-0.5" />;
      case 'fixed': return <Bug size={14} className="text-emerald-400 mt-0.5" />;
      default: return <GitCommit size={14} className="text-gray-400 mt-0.5" />;
    }
  };

  return (
    <div className="space-y-10 max-w-[1000px] mx-auto pb-20 animate-in fade-in duration-700">
      
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-8 bg-[#0A0A0A] p-10 rounded-[2.5rem] border border-white/5 shadow-2xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-purple-600/5 blur-[100px] pointer-events-none" />
        
        <div className="flex items-center gap-6 relative z-10">
          <div className="w-14 h-14 rounded-2xl bg-white/5 flex items-center justify-center border border-white/10 shadow-inner">
            <GitCommit className="text-purple-400" size={28} />
          </div>
          <div>
            <h1 className="text-3xl font-black text-white tracking-tighter uppercase leading-none">Changelog</h1>
            <p className="text-[10px] text-gray-500 uppercase tracking-[0.4em] font-black mt-3">Histórico de Atualizações</p>
          </div>
        </div>
        
        <button 
          onClick={() => setIsOpen(true)}
          className="relative z-10 flex items-center gap-3 px-8 py-4 bg-white hover:bg-slate-100 text-black rounded-2xl font-black text-[10px] uppercase tracking-widest transition-all shadow-xl"
        >
          <Plus size={16} />
          <span>Nova Atualização</span>
        </button>
      </div>

      <div className="space-y-12 relative before:absolute before:inset-0 before:ml-5 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-white/10 before:to-transparent">
        {loading ? (
          <div className="text-center py-20 text-gray-500 font-black uppercase tracking-widest text-xs">Carregando histórico...</div>
        ) : updates.length === 0 ? (
          <div className="text-center py-20 text-gray-600 font-black uppercase tracking-widest text-xs">Nenhuma atualização registrada.</div>
        ) : (
          updates.map((update, index) => (
            <div key={update._id} className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active">
              <div className="flex items-center justify-center w-10 h-10 rounded-full border border-white/10 bg-[#0A0A0A] shadow shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2">
                <GitCommit size={18} className={update.type === 'major' ? 'text-purple-400' : 'text-gray-400'} />
              </div>
              
              <div className="w-[calc(100%-4rem)] md:w-[calc(50%-3rem)] p-8 rounded-[2rem] bg-[#0A0A0A] border border-white/5 backdrop-blur-sm hover:border-white/10 transition-all shadow-2xl">
                <div className="flex items-center justify-between mb-4">
                  <span className="text-purple-400 font-black text-2xl tracking-tighter">{update.version}</span>
                  <span className="text-[10px] text-gray-600 font-black uppercase tracking-widest">{new Date(update.createdAt).toLocaleDateString()}</span>
                </div>
                
                <h3 className="text-lg font-black text-white mb-3 uppercase tracking-tight">{update.title}</h3>
                <p className="text-sm text-gray-500 mb-6 leading-relaxed">{update.description}</p>
                
                <div className="space-y-4">
                  {update.changes.map((change: any, cIdx: number) => (
                    <div key={cIdx} className="flex items-start gap-3 bg-white/5 p-3 rounded-xl border border-white/5">
                      {getTypeIcon(change.type)}
                      <span className="text-xs text-gray-400 leading-relaxed font-bold">{change.text}</span>
                    </div>
                  ))}
                </div>

                <div className="mt-6 pt-6 border-t border-white/5 flex items-center justify-between">
                   <span className="text-[8px] text-gray-700 uppercase font-black tracking-widest">Publicado por {update.createdBy}</span>
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      {isOpen && (
        <div className="fixed inset-0 bg-black/90 backdrop-blur-sm flex items-center justify-center z-[100] p-4">
          <div className="bg-[#0A0A0A] border border-white/5 p-10 rounded-[2.5rem] w-full max-w-2xl shadow-2xl relative max-h-[90vh] overflow-y-auto custom-scrollbar">
            <button onClick={() => setIsOpen(false)} className="absolute top-6 right-6 text-gray-600 hover:text-white transition-colors">
              <X size={20} />
            </button>
            
            <h2 className="text-2xl font-black text-white uppercase tracking-tighter mb-8 text-center">Registrar Atualização</h2>
            
            <div className="space-y-6">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-[9px] font-black text-gray-600 uppercase tracking-widest mb-2">Versão</label>
                  <input type="text" value={version} onChange={(e) => setVersion(e.target.value)} placeholder="v2.1.0" className="w-full bg-white/5 border border-white/5 rounded-xl px-4 py-3 text-sm text-white outline-none focus:border-white/20" />
                </div>
                <div>
                  <label className="block text-[9px] font-black text-gray-600 uppercase tracking-widest mb-2">Tipo</label>
                  <select value={type} onChange={(e) => setType(e.target.value)} className="w-full bg-white/5 border border-white/5 rounded-xl px-4 py-3 text-xs font-bold text-gray-300 outline-none appearance-none">
                    <option value="major">Major (Grande)</option>
                    <option value="minor">Minor (Pequena)</option>
                    <option value="hotfix">Hotfix (Correção)</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-[9px] font-black text-gray-600 uppercase tracking-widest mb-2">Título da Atualização</label>
                <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Heurística YARA e Forense UEFI" className="w-full bg-white/5 border border-white/5 rounded-xl px-4 py-3 text-sm text-white outline-none focus:border-white/20" />
              </div>

              <div>
                <label className="block text-[9px] font-black text-gray-600 uppercase tracking-widest mb-2">Resumo</label>
                <textarea value={description} onChange={(e) => setDescription(e.target.value)} placeholder="Breve descrição do que mudou..." className="w-full bg-white/5 border border-white/5 rounded-xl px-4 py-3 text-sm text-white outline-none focus:border-white/20 h-24 resize-none" />
              </div>

              <div className="border-t border-white/5 pt-6">
                <label className="block text-[9px] font-black text-gray-600 uppercase tracking-widest mb-4">Lista de Mudanças (Strings)</label>
                
                <div className="flex gap-3 mb-4">
                  <select value={newChangeType} onChange={(e) => setNewChangeType(e.target.value)} className="bg-white/5 border border-white/5 rounded-xl px-3 text-[10px] font-bold text-gray-400 outline-none">
                    <option value="added">Adicionado</option>
                    <option value="improved">Melhoria</option>
                    <option value="removed">Removido</option>
                    <option value="fixed">Corrigido</option>
                  </select>
                  <input type="text" value={newChangeText} onChange={(e) => setNewChangeText(e.target.value)} placeholder="Ex: Detecção de injeção de DLL" className="flex-1 bg-white/5 border border-white/5 rounded-xl px-4 py-3 text-sm text-white outline-none focus:border-white/20" />
                  <button onClick={handleAddChange} className="p-3 bg-purple-500 hover:bg-purple-400 text-white rounded-xl transition-all">
                    <Plus size={20} />
                  </button>
                </div>

                <div className="space-y-2">
                  {changes.map((change, idx) => (
                    <div key={idx} className="flex items-center justify-between bg-white/5 p-3 rounded-xl border border-white/5 group">
                      <div className="flex items-center gap-3">
                        {getTypeIcon(change.type)}
                        <span className="text-xs text-gray-400 font-bold">{change.text}</span>
                      </div>
                      <button onClick={() => handleRemoveChange(idx)} className="text-gray-600 hover:text-red-400 transition-colors opacity-0 group-hover:opacity-100">
                        <Trash2 size={14} />
                      </button>
                    </div>
                  ))}
                </div>
              </div>

              <button 
                onClick={handleSubmit}
                className="w-full py-4 bg-white hover:bg-slate-100 text-black rounded-xl font-black text-[11px] uppercase tracking-widest transition-all shadow-xl mt-4"
              >
                Publicar Atualização
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
