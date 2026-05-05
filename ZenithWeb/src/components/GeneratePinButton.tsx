'use client';

import { useState } from 'react';
import { Plus, X, Zap, Target, Shield } from 'lucide-react';
import { useRouter } from 'next/navigation';

interface GeneratePinButtonProps {
  allowedGame?: string;
}

export default function GeneratePinButton({ allowedGame = 'all' }: GeneratePinButtonProps) {
  const [loading, setLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [clientName, setClientName] = useState('');
  
  // Se o user só pode um jogo, já deixa selecionado
  const initialGame = allowedGame === 'all' ? 'Free Fire' : (allowedGame === 'FF' ? 'Free Fire' : allowedGame);
  const [game, setGame] = useState(initialGame);
  const [planType, setPlanType] = useState('Standard');
  const router = useRouter();

  const handleGeneratePin = async () => {
    if (!clientName) return alert('Enter a client name');
    setLoading(true);
    const res = await fetch('/api/admin/generate-pin', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ 
        clientName,
        game,
        type: planType 
      }) 
    });

    if (res.ok) {
      setIsOpen(false);
      setClientName('');
      router.refresh(); 
    } else {
      const err = await res.json();
      alert(err.error || 'Erro ao gerar PIN');
    }
    setLoading(false);
  };

  return (
    <>
      <button 
        onClick={() => setIsOpen(true)}
        className="flex items-center gap-3 px-8 py-4 bg-white hover:bg-slate-100 text-black rounded-2xl font-black text-[10px] uppercase tracking-widest transition-all shadow-xl hover:scale-105 active:scale-95 group"
      >
        <Plus size={16} className="group-hover:rotate-90 transition-transform duration-300" />
        <span>Gerar Nova Key</span>
      </button>

      {isOpen && (
        <div className="fixed inset-0 bg-black/90 backdrop-blur-sm flex items-center justify-center z-[100] p-4 animate-in fade-in duration-300">
          <div className="bg-[#0A0A0A] border border-white/5 p-10 rounded-[2.5rem] w-full max-w-md shadow-2xl relative animate-in zoom-in-95 duration-300">
            <button 
              onClick={() => setIsOpen(false)} 
              className="absolute top-6 right-6 text-gray-600 hover:text-white transition-colors p-2 hover:bg-white/5 rounded-xl"
            >
              <X size={20} />
            </button>
            
            <div className="flex flex-col items-center mb-8 text-center">
              <div className="w-16 h-16 bg-purple-500/10 rounded-2xl flex items-center justify-center border border-purple-500/20 mb-6">
                <Shield className="text-purple-400" size={32} />
              </div>
              <h2 className="text-2xl font-black text-white uppercase tracking-tighter">Gerador de Acesso</h2>
              <p className="text-[10px] text-gray-500 font-black uppercase tracking-widest mt-2">Lodark Secure Key Generation</p>
            </div>
            
            <div className="space-y-6">
              <div>
                <label className="block text-[9px] font-black text-gray-600 uppercase tracking-widest mb-2 px-1">Nome do Cliente</label>
                <div className="relative">
                  <input 
                    type="text" 
                    value={clientName}
                    onChange={(e) => setClientName(e.target.value)}
                    className="w-full bg-white/5 border border-white/5 rounded-2xl px-6 py-4 text-sm text-white placeholder-gray-700 outline-none focus:border-white/20 focus:bg-white/10 transition-all"
                    placeholder="Ex: Samuca_PVP"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-[9px] font-black text-gray-600 uppercase tracking-widest mb-2 px-1">Plataforma</label>
                  <select 
                    value={game}
                    onChange={(e) => setGame(e.target.value)}
                    className="w-full bg-white/5 border border-white/5 rounded-2xl px-4 py-4 text-xs font-bold text-gray-300 outline-none focus:border-white/20 transition-all appearance-none cursor-pointer"
                  >
                    {(allowedGame === 'all' || allowedGame === 'FF') && <option value="Free Fire" className="bg-[#0A0A0A]">Free Fire</option>}
                    {(allowedGame === 'all' || allowedGame === 'FiveM') && <option value="FiveM" className="bg-[#0A0A0A]">FiveM</option>}
                    {(allowedGame === 'all' || allowedGame === 'ZK') && <option value="ZK" className="bg-[#0A0A0A]">ZK</option>}
                    {(allowedGame === 'all' || allowedGame === 'Quebrada') && <option value="Quebrada" className="bg-[#0A0A0A]">Quebrada</option>}
                  </select>
                </div>

                <div>
                  <label className="block text-[9px] font-black text-gray-600 uppercase tracking-widest mb-2 px-1">Nível de Plano</label>
                  <select 
                    value={planType}
                    onChange={(e) => setPlanType(e.target.value)}
                    className="w-full bg-white/5 border border-white/5 rounded-2xl px-4 py-4 text-xs font-bold text-gray-300 outline-none focus:border-white/20 transition-all appearance-none cursor-pointer"
                  >
                    <option value="Standard" className="bg-[#0A0A0A]">Padrão</option>
                    <option value="Enterprise" className="bg-[#0A0A0A]">Enterprise</option>
                    <option value="Private" className="bg-[#0A0A0A]">Privado</option>
                  </select>
                </div>
              </div>

              <button 
                onClick={handleGeneratePin}
                disabled={loading}
                className="w-full mt-4 py-5 bg-white hover:bg-slate-100 text-black rounded-[1.5rem] font-black text-[11px] uppercase tracking-[0.2em] transition-all shadow-xl disabled:opacity-50 hover:scale-[1.02] active:scale-95 flex items-center justify-center gap-3"
              >
                {loading ? (
                  <div className="w-4 h-4 border-2 border-black/20 border-t-black rounded-full animate-spin" />
                ) : (
                  <>
                    <Zap size={14} />
                    <span>Criar Acesso Vitalício</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
