import dbConnect from '@/lib/mongodb';
import Pin from '@/models/Pin';
import { Key, Plus, Trash2, Search, Filter, ShieldCheck, Download, User } from 'lucide-react';
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
    <div className="space-y-10 max-w-[1400px] mx-auto pb-20 animate-in fade-in duration-700">
      
      {/* Header Area */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-8 bg-[#0A0A0A] p-10 rounded-[2.5rem] border border-white/5 shadow-2xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-purple-600/5 blur-[100px] pointer-events-none" />
        
        <div className="flex items-center gap-6 relative z-10">
          <div className="w-14 h-14 rounded-2xl bg-white/5 flex items-center justify-center border border-white/10 shadow-inner">
            <Key className="text-purple-400" size={28} />
          </div>
          <div>
            <h1 className="text-3xl font-black text-white tracking-tighter uppercase leading-none">Gestão de PINs</h1>
            <p className="text-[10px] text-gray-500 uppercase tracking-[0.4em] font-black mt-3">Lodark Access Keys Control</p>
          </div>
        </div>
        
        <div className="relative z-10">
          <GeneratePinButton allowedGame={allowedGame} />
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-[#0A0A0A] p-8 rounded-[2rem] border border-white/5 shadow-xl group hover:border-white/10 transition-all">
          <p className="text-[10px] text-gray-600 uppercase font-black tracking-[0.3em] mb-3">Total Gerado</p>
          <div className="flex items-end justify-between">
            <h3 className="text-4xl font-black text-white">{pins.length}</h3>
            <div className="p-3 bg-white/5 rounded-xl group-hover:scale-110 transition-transform">
              <Key size={20} className="text-gray-500" />
            </div>
          </div>
        </div>
        
        <div className="bg-[#0A0A0A] p-8 rounded-[2rem] border border-white/5 shadow-xl group hover:border-purple-500/20 transition-all">
          <p className="text-[10px] text-purple-600 uppercase font-black tracking-[0.3em] mb-3">Disponíveis</p>
          <div className="flex items-end justify-between">
            <h3 className="text-4xl font-black text-white">{pins.filter((p: any) => p.isActive).length}</h3>
            <div className="p-3 bg-purple-500/10 rounded-xl group-hover:scale-110 transition-transform border border-purple-500/20">
              <ShieldCheck size={20} className="text-purple-400" />
            </div>
          </div>
        </div>

        <div className="bg-[#0A0A0A] p-8 rounded-[2rem] border border-white/5 shadow-xl group hover:border-red-500/20 transition-all">
          <p className="text-[10px] text-red-600 uppercase font-black tracking-[0.3em] mb-3">Utilizados</p>
          <div className="flex items-end justify-between">
            <h3 className="text-4xl font-black text-white">{pins.filter((p: any) => !p.isActive).length}</h3>
            <div className="p-3 bg-red-500/10 rounded-xl group-hover:scale-110 transition-transform border border-red-500/20">
              <Trash2 size={20} className="text-red-400" />
            </div>
          </div>
        </div>
      </div>

      {/* Main Database Table */}
      <div className="bg-[#0A0A0A] rounded-[2.5rem] border border-white/5 shadow-2xl overflow-hidden backdrop-blur-sm">
        <div className="px-10 py-8 border-b border-white/5 bg-white/5 flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <h2 className="text-lg font-black text-white tracking-tighter uppercase leading-none">Banco de Dados</h2>
            <p className="text-[9px] text-gray-600 uppercase tracking-widest font-black mt-2">Monitoramento de Keys em tempo real</p>
          </div>
          <div className="flex gap-3 w-full md:w-auto">
            <div className="relative flex-1 md:w-64">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-600" size={14} />
              <input type="text" placeholder="Buscar PIN..." className="w-full bg-black/40 border border-white/5 rounded-xl pl-10 pr-4 py-2.5 text-xs text-white focus:outline-none focus:border-white/20 transition-all" />
            </div>
            <button className="p-2.5 bg-white/5 hover:bg-white/10 rounded-xl transition-all border border-white/5"><Filter size={18} className="text-gray-500" /></button>
          </div>
        </div>
        
        <div className="overflow-x-auto custom-scrollbar">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-black/40 text-gray-600 text-[10px] uppercase tracking-[0.3em] font-black">
                <th className="px-10 py-6 whitespace-nowrap">Acesso (PIN)</th>
                <th className="px-10 py-6 whitespace-nowrap">Cliente</th>
                <th className="px-10 py-6 whitespace-nowrap">Plataforma</th>
                <th className="px-10 py-6 whitespace-nowrap">Criado Por</th>
                <th className="px-10 py-6 whitespace-nowrap">Status</th>
                <th className="px-10 py-6 whitespace-nowrap text-right">Ações</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {pins.length === 0 ? (
                <tr>
                  <td colSpan={6} className="px-10 py-24 text-center">
                    <div className="flex flex-col items-center justify-center opacity-20">
                       <Key size={48} className="mb-4" />
                       <p className="text-[10px] font-black uppercase tracking-[0.5em]">Nenhum PIN encontrado</p>
                    </div>
                  </td>
                </tr>
              ) : (
                pins.map((pin: any) => (
                  <tr key={pin._id.toString()} className="hover:bg-white/[0.02] transition-colors group">
                    <td className="px-10 py-6">
                      <span className="font-mono text-purple-400 text-lg font-black tracking-widest bg-purple-500/5 px-4 py-2 rounded-xl border border-purple-500/10 group-hover:border-purple-500/30 transition-all">
                        {pin.code}
                      </span>
                    </td>
                    <td className="px-10 py-6">
                      <div className="flex flex-col">
                        <span className="text-sm font-black text-white uppercase tracking-tight">{pin.clientName || 'Desconhecido'}</span>
                        <span className="text-[9px] text-gray-600 font-bold tracking-widest mt-1">{new Date(pin.createdAt).toLocaleDateString()}</span>
                      </div>
                    </td>
                    <td className="px-10 py-6">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-white/5 rounded-xl border border-white/5 flex items-center justify-center group-hover:border-white/20 transition-all overflow-hidden p-1.5">
                            <img 
                              src={
                                pin.game === 'FiveM' ? "https://i.postimg.cc/yYsJwjQ6/image.png" : 
                                pin.game === 'ZK' ? "https://i.postimg.cc/h4bqhRnY/image.png" :
                                pin.game === 'Quebrada' ? "https://i.postimg.cc/RhvywqmQ/image.png" :
                                "https://i.postimg.cc/L5z1j0xv/image.png"
                              } 
                              alt="Game" 
                              className="w-full h-full object-contain drop-shadow-[0_0_10px_rgba(255,255,255,0.1)]" 
                            />
                        </div>
                        <span className="text-[10px] font-black text-gray-500 uppercase tracking-[0.2em]">{pin.game || 'Free Fire'}</span>
                      </div>
                    </td>
                    <td className="px-10 py-6">
                      <div className="flex items-center gap-2">
                        <User size={12} className="text-purple-400" />
                        <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest">
                          {pin.createdBy || 'Sistema'}
                        </span>
                      </div>
                    </td>
                    <td className="px-10 py-6">
                      {pin.isScanning ? (
                        <div className="flex items-center gap-3">
                           <div className="w-2 h-2 rounded-full bg-yellow-500 animate-pulse shadow-[0_0_10px_rgba(234,179,8,0.5)]" />
                           <span className="text-[9px] font-black uppercase tracking-widest text-yellow-500">Scan Ativo</span>
                        </div>
                      ) : pin.isActive ? (
                        <div className="flex items-center gap-3">
                           <div className="w-2 h-2 rounded-full bg-emerald-500 shadow-[0_0_10px_rgba(16,185,129,0.5)]" />
                           <span className="text-[9px] font-black uppercase tracking-widest text-emerald-500">Disponível</span>
                        </div>
                      ) : (
                        <div className="flex items-center gap-3">
                           <div className="w-2 h-2 rounded-full bg-red-500 shadow-[0_0_10px_rgba(239,68,68,0.5)]" />
                           <span className="text-[9px] font-black uppercase tracking-widest text-red-500">Utilizado</span>
                        </div>
                      )}
                    </td>
                    <td className="px-10 py-6">
                       <div className="flex items-center justify-end gap-3 opacity-30 group-hover:opacity-100 transition-all duration-300">
                          <CopyLinkButton pinCode={pin.code} />
                          <a 
                            href={`/api/download?pin=${pin.code}`}
                            className="p-2.5 bg-white/5 hover:bg-purple-500/20 text-gray-500 hover:text-purple-400 rounded-xl border border-white/5 hover:border-purple-500/30 transition-all"
                            title="Baixar Scanner"
                          >
                            <Download size={16} />
                          </a>
                          <button className="p-2.5 bg-white/5 hover:bg-red-500/20 text-gray-500 hover:text-red-400 rounded-xl border border-white/5 hover:border-red-500/30 transition-all" title="Deletar">
                            <Trash2 size={16} />
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
