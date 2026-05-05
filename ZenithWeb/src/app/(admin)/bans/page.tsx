'use client';

import { useState, useEffect } from 'react';
import { ShieldAlert, Plus, X, Trash2, User, Key, Globe, Search } from 'lucide-react';

export default function BansPage() {
  const [bans, setBans] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [isOpen, setIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  // Form state
  const [target, setTarget] = useState('');
  const [type, setType] = useState('username');
  const [reason, setReason] = useState('');
  const [ip, setIp] = useState('');

  const fetchBans = async () => {
    try {
      const res = await fetch('/api/admin/bans');
      if (res.ok) {
        const data = await res.json();
        setBans(data.bans || []);
      }
    } catch (e) {
      console.error(e);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchBans();
  }, []);

  const handleSubmit = async () => {
    if (!target || !reason) return alert('Preencha o alvo e o motivo');
    
    const res = await fetch('/api/admin/bans', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ target, type, reason, ip })
    });

    if (res.ok) {
      setIsOpen(false);
      setTarget('');
      setReason('');
      setIp('');
      fetchBans();
    } else {
      const data = await res.json();
      alert(data.error || 'Erro ao banir');
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Deseja realmente remover este banimento?')) return;
    
    const res = await fetch(`/api/admin/bans?id=${id}`, {
      method: 'DELETE'
    });

    if (res.ok) {
      fetchBans();
    } else {
      const data = await res.json();
      alert(data.error || 'Erro ao remover ban');
    }
  };

  const filteredBans = bans.filter(ban => 
    ban.target.toLowerCase().includes(searchQuery.toLowerCase()) ||
    ban.reason.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-8 max-w-[1200px] mx-auto animate-in fade-in duration-700">
      
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 bg-[#0A0A0A] p-10 rounded-[2.5rem] border border-white/5 shadow-2xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-red-600/5 blur-[100px] pointer-events-none" />
        
        <div className="flex items-center gap-6 relative z-10">
          <div className="w-14 h-14 rounded-2xl bg-red-500/10 flex items-center justify-center border border-red-500/20 shadow-inner">
            <ShieldAlert className="text-red-500" size={28} />
          </div>
          <div>
            <h1 className="text-3xl font-black text-white tracking-tighter uppercase leading-none">Gestão de Bans</h1>
            <p className="text-[10px] text-gray-500 uppercase tracking-[0.4em] font-black mt-3">Blacklist de Usuários e Keys</p>
          </div>
        </div>
        
        <button 
          onClick={() => setIsOpen(true)}
          className="relative z-10 flex items-center gap-3 px-8 py-4 bg-red-600 hover:bg-red-500 text-white rounded-2xl font-black text-[10px] uppercase tracking-widest transition-all shadow-xl"
        >
          <Plus size={16} />
          <span>Novo Banimento</span>
        </button>
      </div>

      <div className="bg-[#0A0A0A] rounded-[2.5rem] border border-white/5 overflow-hidden shadow-2xl">
        <div className="p-8 border-b border-white/5 flex items-center gap-4">
          <Search size={18} className="text-gray-600" />
          <input 
            type="text" 
            placeholder="Pesquisar banimento..." 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="bg-transparent border-none outline-none text-sm text-white w-full placeholder-gray-700"
          />
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="border-b border-white/5 bg-white/[0.02]">
                <th className="px-8 py-6 text-[10px] font-black text-gray-500 uppercase tracking-[0.2em]">Alvo (User/Key)</th>
                <th className="px-8 py-6 text-[10px] font-black text-gray-500 uppercase tracking-[0.2em]">Tipo</th>
                <th className="px-8 py-6 text-[10px] font-black text-gray-500 uppercase tracking-[0.2em]">Motivo</th>
                <th className="px-8 py-6 text-[10px] font-black text-gray-500 uppercase tracking-[0.2em]">Banido Por</th>
                <th className="px-8 py-6 text-[10px] font-black text-gray-500 uppercase tracking-[0.2em]">Ações</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {loading ? (
                <tr><td colSpan={5} className="px-8 py-20 text-center text-gray-600 uppercase text-[10px] font-black tracking-widest">Carregando...</td></tr>
              ) : filteredBans.length === 0 ? (
                <tr><td colSpan={5} className="px-8 py-20 text-center text-gray-700 uppercase text-[10px] font-black tracking-widest">Nenhum banimento encontrado</td></tr>
              ) : (
                filteredBans.map((ban) => (
                  <tr key={ban._id} className="hover:bg-white/[0.02] transition-colors group">
                    <td className="px-8 py-6">
                      <div className="flex items-center gap-3">
                        {ban.type === 'username' ? <User size={14} className="text-blue-400" /> : <Key size={14} className="text-purple-400" />}
                        <span className="text-sm font-black text-white">{ban.target}</span>
                      </div>
                      {ban.ip && <span className="text-[10px] text-gray-600 block mt-1 font-mono">IP: {ban.ip}</span>}
                    </td>
                    <td className="px-8 py-6">
                      <span className={`text-[9px] font-black uppercase tracking-widest px-3 py-1 rounded-lg ${ban.type === 'username' ? 'bg-blue-500/10 text-blue-400' : 'bg-purple-500/10 text-purple-400'}`}>
                        {ban.type === 'username' ? 'Usuário' : 'Admin Key'}
                      </span>
                    </td>
                    <td className="px-8 py-6">
                      <p className="text-xs text-gray-400 max-w-xs truncate font-bold" title={ban.reason}>{ban.reason}</p>
                    </td>
                    <td className="px-8 py-6">
                      <span className="text-[10px] text-gray-500 font-black uppercase tracking-widest">{ban.bannedBy}</span>
                      <span className="text-[9px] text-gray-700 block mt-1 font-black">{new Date(ban.createdAt).toLocaleDateString()}</span>
                    </td>
                    <td className="px-8 py-6">
                      <button onClick={() => handleDelete(ban._id)} className="p-3 bg-red-500/10 hover:bg-red-500 text-red-500 hover:text-white rounded-xl transition-all opacity-0 group-hover:opacity-100">
                        <Trash2 size={16} />
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {isOpen && (
        <div className="fixed inset-0 bg-black/90 backdrop-blur-sm flex items-center justify-center z-[100] p-4">
          <div className="bg-[#0A0A0A] border border-white/5 p-10 rounded-[2.5rem] w-full max-w-lg shadow-2xl relative">
            <button onClick={() => setIsOpen(false)} className="absolute top-6 right-6 text-gray-600 hover:text-white transition-colors">
              <X size={20} />
            </button>
            
            <h2 className="text-2xl font-black text-white uppercase tracking-tighter mb-8 text-center">Banir Usuário / Key</h2>
            
            <div className="space-y-6">
              <div>
                <label className="block text-[9px] font-black text-gray-600 uppercase tracking-widest mb-2 px-1">Tipo de Banimento</label>
                <div className="grid grid-cols-2 gap-3">
                   <button onClick={() => setType('username')} className={`py-4 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all border ${type === 'username' ? 'bg-blue-500/10 border-blue-500 text-blue-400' : 'bg-white/5 border-white/5 text-gray-500'}`}>Usuário</button>
                   <button onClick={() => setType('key')} className={`py-4 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all border ${type === 'key' ? 'bg-purple-500/10 border-purple-500 text-purple-400' : 'bg-white/5 border-white/5 text-gray-500'}`}>Admin Key</button>
                </div>
              </div>

              <div>
                <label className="block text-[9px] font-black text-gray-600 uppercase tracking-widest mb-2 px-1">{type === 'username' ? 'Nome de Usuário' : 'Admin Key'}</label>
                <input type="text" value={target} onChange={(e) => setTarget(e.target.value)} placeholder={type === 'username' ? 'Ex: user_test' : 'Ex: ZENITH-XXXX-XXXX'} className="w-full bg-white/5 border border-white/5 rounded-xl px-5 py-4 text-sm text-white outline-none focus:border-white/20" />
              </div>

              <div>
                <label className="block text-[9px] font-black text-gray-600 uppercase tracking-widest mb-2 px-1">IP do Alvo (Opcional)</label>
                <input type="text" value={ip} onChange={(e) => setIp(e.target.value)} placeholder="127.0.0.1" className="w-full bg-white/5 border border-white/5 rounded-xl px-5 py-4 text-sm text-white outline-none focus:border-white/20" />
              </div>

              <div>
                <label className="block text-[9px] font-black text-gray-600 uppercase tracking-widest mb-2 px-1">Motivo do Banimento</label>
                <textarea value={reason} onChange={(e) => setReason(e.target.value)} placeholder="Ex: Testando bypass não autorizado / Abuso de sistema" className="w-full bg-white/5 border border-white/5 rounded-xl px-5 py-4 text-sm text-white outline-none focus:border-white/20 h-32 resize-none" />
              </div>

              <button 
                onClick={handleSubmit}
                className="w-full py-5 bg-red-600 hover:bg-red-500 text-white rounded-xl font-black text-[11px] uppercase tracking-widest transition-all shadow-xl mt-4"
              >
                Confirmar Banimento
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
