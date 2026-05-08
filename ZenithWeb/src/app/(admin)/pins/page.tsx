import dbConnect from '@/lib/mongodb';
import Pin from '@/models/Pin';
import { Key, Plus, Trash2, Search, Filter, ShieldCheck, Download, User, Activity, Zap } from 'lucide-react';
import GeneratePinButton from '@/components/GeneratePinButton';
import CopyLinkButton from '@/components/CopyLinkButton';
import { cookies } from 'next/headers';

export const dynamic = 'force-dynamic';

export default async function PinsPage() {
  await dbConnect();

  const authCookie = cookies().get('admin_auth')?.value || '';
  const parts = authCookie.split('|');
  const role = parts[0];
  const allowedGame = parts[2] || 'all';
  let ownerKey = '';
  if (parts.length >= 4) {
    ownerKey = parts[3];
  } else if (role === 'superadmin') {
    ownerKey = 'lodark_admin';
  }

  const query = role === 'superadmin' ? {} : { ownerKey };
  const pins = await Pin.find(query).sort({ createdAt: -1 });

  return (
    <div className="space-y-12 max-w-[1500px] mx-auto pb-40 animate-in fade-in duration-1000">
      
      {/* HEADER AREA - CLEAN PURPLE */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-10 bg-[#050505] p-12 rounded-[3rem] border border-white/5 shadow-2xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-purple-600/[0.03] blur-[120px] pointer-events-none" />
        
        <div className="flex items-center gap-8 relative z-10">
          <div className="w-20 h-20 rounded-[2rem] bg-purple-600/[0.02] flex items-center justify-center border border-purple-500/10 shadow-[inset_0_0_20px_rgba(139,92,246,0.05)] group hover:border-purple-500/30 transition-all duration-500">
            <Key className="text-purple-500" size={36} />
          </div>
          <div>
            <h1 className="text-4xl font-black text-white tracking-tighter uppercase leading-none italic">GESTÃO DE <span className="text-purple-600 italic">PINS</span></h1>
            <p className="text-[10px] text-slate-500 uppercase tracking-[0.6em] font-black mt-4">Lodark Access Intelligence Control</p>
          </div>
        </div>
        
        <div className="relative z-10">
          <GeneratePinButton allowedGame={allowedGame} />
        </div>
      </div>

      {/* STATS CARDS - MINIMALIST */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {[
          { label: 'TOTAL GERADO', value: pins.length, icon: Key, color: 'text-slate-500', bg: 'bg-white/[0.01]' },
          { label: 'DISPONÍVEIS', value: pins.filter((p: any) => p.isActive).length, icon: ShieldCheck, color: 'text-purple-500', bg: 'bg-purple-500/[0.02]' },
          { label: 'UTILIZADOS', value: pins.filter((p: any) => !p.isActive).length, icon: Zap, color: 'text-red-500', bg: 'bg-red-500/[0.01]' }
        ].map((stat, i) => (
          <div key={i} className={`${stat.bg} p-10 rounded-[2.5rem] border border-white/5 shadow-xl transition-all hover:scale-[1.02] duration-500`}>
            <p className={`text-[10px] ${stat.color} uppercase font-black tracking-[0.4em] mb-6`}>{stat.label}</p>
            <div className="flex items-end justify-between">
              <h3 className="text-6xl font-black text-white italic tracking-tighter leading-none">{stat.value}</h3>
              <div className={`p-4 bg-white/[0.02] rounded-2xl border border-white/5 ${stat.color}`}>
                <stat.icon size={24} />
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* DATA TABLE - ULTRA CLEAN */}
      <div className="bg-[#050505] rounded-[3rem] border border-white/5 shadow-2xl overflow-hidden backdrop-blur-3xl">
        <div className="px-12 py-10 border-b border-white/5 flex flex-col md:flex-row items-center justify-between gap-10">
          <div>
            <h2 className="text-xl font-black text-white tracking-tighter uppercase leading-none italic">BANCO DE DADOS <span className="text-purple-600 italic">LIVE</span></h2>
            <p className="text-[10px] text-slate-700 uppercase tracking-[0.5em] font-black mt-4">Monitoramento de chaves em tempo real</p>
          </div>
          <div className="flex gap-4 w-full md:w-auto">
            <div className="relative flex-1 md:w-80">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-700" size={16} />
              <input 
                type="text" 
                placeholder="BUSCAR PIN..." 
                className="w-full bg-white/[0.02] border border-white/5 rounded-2xl pl-12 pr-6 py-4 text-xs font-bold text-white focus:outline-none focus:border-purple-500/40 transition-all placeholder:text-slate-800" 
              />
            </div>
            <button className="p-4 bg-white/[0.02] hover:bg-white/[0.05] rounded-2xl transition-all border border-white/5"><Filter size={20} className="text-slate-600" /></button>
          </div>
        </div>
        
        <div className="overflow-x-auto custom-scrollbar">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-white/[0.01] text-slate-700 text-[10px] uppercase tracking-[0.4em] font-black">
                <th className="px-12 py-8 whitespace-nowrap">ACESSO (PIN)</th>
                <th className="px-12 py-8 whitespace-nowrap">CLIENTE / DATA</th>
                <th className="px-12 py-8 whitespace-nowrap">PLATAFORMA</th>
                <th className="px-12 py-8 whitespace-nowrap">STATUS</th>
                <th className="px-12 py-8 whitespace-nowrap text-right">AÇÕES</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {pins.length === 0 ? (
                <tr>
                  <td colSpan={5} className="px-12 py-32 text-center">
                    <div className="flex flex-col items-center justify-center opacity-10">
                       <Key size={64} className="mb-6" />
                       <p className="text-xs font-black uppercase tracking-[0.6em]">Nenhum PIN encontrado</p>
                    </div>
                  </td>
                </tr>
              ) : (
                pins.map((pin: any) => (
                  <tr key={pin._id.toString()} className="hover:bg-white/[0.01] transition-all duration-300 group">
                    <td className="px-12 py-10">
                      <div className="flex items-center gap-4">
                        <div className="w-2 h-2 rounded-full bg-purple-600 group-hover:scale-150 transition-transform" />
                        <span className="font-mono text-white text-2xl font-black tracking-tighter italic">
                          {pin.code}
                        </span>
                      </div>
                    </td>
                    <td className="px-12 py-10">
                      <div className="flex flex-col gap-2">
                        <span className="text-sm font-black text-slate-300 uppercase tracking-tight group-hover:text-white transition-colors">{pin.clientName || 'USUÁRIO_DESCONHECIDO'}</span>
                        <div className="flex items-center gap-2">
                            <Clock size={10} className="text-slate-700" />
                            <span className="text-[10px] text-slate-700 font-bold uppercase tracking-widest">{new Date(pin.createdAt).toLocaleDateString('pt-BR')}</span>
                        </div>
                      </div>
                    </td>
                    <td className="px-12 py-10">
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 bg-white/[0.02] rounded-[1.2rem] border border-white/5 flex items-center justify-center group-hover:border-purple-500/30 transition-all p-2">
                            <img 
                              src={
                                pin.game === 'FiveM' ? "https://i.postimg.cc/yYsJwjQ6/image.png" : 
                                pin.game === 'ZK' ? "https://i.postimg.cc/h4bqhRnY/image.png" :
                                pin.game === 'Quebrada' ? "https://i.postimg.cc/RhvywqmQ/image.png" :
                                "https://i.postimg.cc/L5z1j0xv/image.png"
                              } 
                              alt="Game" 
                              className="w-full h-full object-contain filter drop-shadow-[0_0_5px_rgba(255,255,255,0.05)]" 
                            />
                        </div>
                        <span className="text-[11px] font-black text-slate-600 uppercase tracking-widest">{pin.game || 'FREE FIRE'}</span>
                      </div>
                    </td>
                    <td className="px-12 py-10">
                      {pin.isScanning ? (
                        <div className="inline-flex items-center gap-3 px-4 py-2 bg-yellow-500/5 border border-yellow-500/10 rounded-full">
                           <div className="w-1.5 h-1.5 rounded-full bg-yellow-500 animate-pulse" />
                           <span className="text-[9px] font-black uppercase tracking-widest text-yellow-500">EM SCAN...</span>
                        </div>
                      ) : pin.isActive ? (
                        <div className="inline-flex items-center gap-3 px-4 py-2 bg-purple-500/5 border border-purple-500/10 rounded-full">
                           <div className="w-1.5 h-1.5 rounded-full bg-purple-500" />
                           <span className="text-[9px] font-black uppercase tracking-widest text-purple-400">DISPONÍVEL</span>
                        </div>
                      ) : (
                        <div className="inline-flex items-center gap-3 px-4 py-2 bg-red-500/5 border border-red-500/10 rounded-full">
                           <div className="w-1.5 h-1.5 rounded-full bg-red-500" />
                           <span className="text-[9px] font-black uppercase tracking-widest text-red-500">UTILIZADO</span>
                        </div>
                      )}
                    </td>
                    <td className="px-12 py-10">
                       <div className="flex items-center justify-end gap-3 opacity-10 group-hover:opacity-100 transition-all duration-500">
                          <CopyLinkButton pinCode={pin.code} />
                          <a 
                            href={`/api/download?pin=${pin.code}`}
                            className="p-3 bg-white/[0.02] hover:bg-purple-600 hover:text-white text-slate-700 rounded-xl border border-white/5 transition-all"
                            title="Baixar Scanner"
                          >
                            <Download size={18} />
                          </a>
                          <button className="p-3 bg-white/[0.02] hover:bg-red-600 hover:text-white text-slate-700 rounded-xl border border-white/5 transition-all" title="Deletar">
                            <Trash2 size={18} />
                          </button>
                       </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
