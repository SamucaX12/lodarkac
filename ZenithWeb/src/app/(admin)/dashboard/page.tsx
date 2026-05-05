import { Activity, ShieldAlert, CheckCircle, Clock, Trophy, KeyRound, ArrowUpRight, Zap, Target } from 'lucide-react';
import dbConnect from '@/lib/mongodb';
import Result from '@/models/Result';
import Pin from '@/models/Pin';
import Link from 'next/link';
import { cookies } from 'next/headers';

export const dynamic = 'force-dynamic';

export default async function DashboardPage() {
  await dbConnect();
  
  const authCookie = cookies().get('admin_auth')?.value || '';
  const parts = authCookie.split('|');
  const role = parts[0];
  let ownerKey = '';
  if (parts.length >= 4) {
    ownerKey = parts[3];
  } else if (role === 'superadmin') {
    ownerKey = 'samuca244';
  }

  const isSuperAdmin = role === 'superadmin';
  const query = isSuperAdmin ? {} : { ownerKey };

  const recentScans = await Result.find(query).sort({ createdAt: -1 }).limit(10);
  const totalScans = await Result.countDocuments(query);
  const cleanScans = await Result.countDocuments({ ...query, isClean: true });
  const detectedScans = totalScans - cleanScans;

  let topDetectors = [];
  let topKeyGenerators = [];

  if (isSuperAdmin) {
    topDetectors = await Result.aggregate([
      { $match: { isClean: false, ownerKey: { $exists: true, $nin: [null, "", "samuca244"] } } },
      { $group: { _id: "$ownerKey", detects: { $sum: 1 } } },
      { $sort: { detects: -1 } },
      { $limit: 4 }
    ]);

    topKeyGenerators = await Pin.aggregate([
      { $match: { ownerKey: { $exists: true, $nin: [null, "", "samuca244"] } } },
      { $group: { _id: "$ownerKey", keys: { $sum: 1 } } },
      { $sort: { keys: -1 } },
      { $limit: 4 }
    ]);
  }

  return (
    <div className="space-y-10 max-w-[1400px] mx-auto pb-20 animate-in fade-in duration-700">
      
      {/* Welcome Banner */}
      <div className="bg-[#0A0A0A] p-10 rounded-[2.5rem] border border-white/5 shadow-2xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-80 h-80 bg-purple-600/5 blur-[120px] pointer-events-none" />
        <div className="relative z-10">
          <div className="flex items-center gap-3 mb-4">
             <Zap size={16} className="text-purple-500" />
             <span className="text-[10px] font-black text-purple-500 uppercase tracking-[0.4em]">Sessão Administrativa Ativa</span>
          </div>
          <h1 className="text-4xl font-black text-white tracking-tighter uppercase leading-none">Painel de Controle</h1>
          <p className="text-[10px] text-gray-600 uppercase tracking-[0.4em] font-black mt-3">Lodark Forensic Operations</p>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {[
          { label: 'Scans Totais', value: totalScans, icon: Activity, color: 'text-white', bar: 'bg-purple-500' },
          { label: 'Limpos', value: cleanScans, icon: CheckCircle, color: 'text-emerald-500', bar: 'bg-emerald-500' },
          { label: 'Em Análise', value: 0, icon: Clock, color: 'text-yellow-500', bar: 'bg-yellow-500' },
          { label: 'Deteções', value: detectedScans, icon: ShieldAlert, color: 'text-red-500', bar: 'bg-red-500' },
        ].map((stat, i) => (
          <div key={i} className="bg-[#0A0A0A] p-8 rounded-[2rem] border border-white/5 shadow-xl group hover:border-white/10 transition-all relative overflow-hidden">
            <div className={`absolute top-0 left-0 w-1 h-full ${stat.bar} opacity-20 group-hover:opacity-100 transition-all`} />
            <p className="text-[10px] font-black text-gray-600 uppercase tracking-widest mb-4 flex items-center gap-2">
              <stat.icon size={14} className={stat.color} /> {stat.label}
            </p>
            <h3 className={`text-4xl font-black text-white`}>{stat.value}</h3>
          </div>
        ))}
      </div>

      {/* Rankings (If Admin) */}
      {isSuperAdmin && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-[#0A0A0A] rounded-[2.5rem] border border-white/5 overflow-hidden shadow-2xl">
            <div className="px-10 py-8 border-b border-white/5 bg-white/5 flex items-center justify-between">
              <div className="flex items-center gap-4">
                 <div className="p-2.5 bg-yellow-500/10 rounded-xl border border-yellow-500/20">
                    <Trophy className="text-yellow-500" size={20} />
                 </div>
                 <h2 className="text-sm font-black text-white uppercase tracking-widest">Top Detetores</h2>
              </div>
              <ArrowUpRight size={18} className="text-gray-600" />
            </div>
            <div className="p-6 space-y-3">
              {topDetectors.length === 0 ? (
                <div className="py-12 text-center text-gray-700 text-[10px] font-black uppercase tracking-widest">Sem dados no momento</div>
              ) : (
                topDetectors.map((user: any, index: number) => (
                  <div key={index} className="flex items-center justify-between p-4 hover:bg-white/5 rounded-2xl transition-all border border-transparent hover:border-white/5 group">
                    <div className="flex items-center gap-4">
                      <span className="text-xs font-black text-gray-700 w-4">{index + 1}</span>
                      <span className="text-sm font-black text-white group-hover:text-purple-400 transition-colors">{user._id}</span>
                    </div>
                    <span className="text-[9px] font-black text-red-500 bg-red-500/10 px-3 py-1.5 rounded-xl border border-red-500/20">
                      {user.detects} BANS
                    </span>
                  </div>
                ))
              )}
            </div>
          </div>

          <div className="bg-[#0A0A0A] rounded-[2.5rem] border border-white/5 overflow-hidden shadow-2xl">
            <div className="px-10 py-8 border-b border-white/5 bg-white/5 flex items-center justify-between">
              <div className="flex items-center gap-4">
                 <div className="p-2.5 bg-purple-500/10 rounded-xl border border-purple-500/20">
                    <KeyRound className="text-purple-500" size={20} />
                 </div>
                 <h2 className="text-sm font-black text-white uppercase tracking-widest">Top Generators</h2>
              </div>
              <ArrowUpRight size={18} className="text-gray-600" />
            </div>
            <div className="p-6 space-y-3">
              {topKeyGenerators.length === 0 ? (
                <div className="py-12 text-center text-gray-700 text-[10px] font-black uppercase tracking-widest">Sem dados no momento</div>
              ) : (
                topKeyGenerators.map((user: any, index: number) => (
                  <div key={index} className="flex items-center justify-between p-4 hover:bg-white/5 rounded-2xl transition-all border border-transparent hover:border-white/5 group">
                    <div className="flex items-center gap-4">
                      <span className="text-xs font-black text-gray-700 w-4">{index + 1}</span>
                      <span className="text-sm font-black text-white group-hover:text-purple-400 transition-colors">{user._id}</span>
                    </div>
                    <span className="text-[9px] font-black text-purple-400 bg-purple-500/10 px-3 py-1.5 rounded-xl border border-purple-500/20">
                      {user.keys} KEYS
                    </span>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      )}

      {/* Recent Activity Table */}
      <div className="bg-[#0A0A0A] rounded-[2.5rem] border border-white/5 shadow-2xl overflow-hidden backdrop-blur-sm">
        <div className="px-10 py-8 border-b border-white/5 bg-white/5 flex items-center justify-between">
          <div>
            <h2 className="text-lg font-black text-white tracking-tighter uppercase leading-none">Scans Recentes</h2>
            <p className="text-[9px] text-gray-600 uppercase tracking-widest font-black mt-2">Monitoramento de Atividade Global</p>
          </div>
          <Target size={20} className="text-purple-500" />
        </div>
        <div className="overflow-x-auto custom-scrollbar">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-black/40 text-gray-600 text-[10px] uppercase tracking-[0.3em] font-black">
                <th className="px-10 py-6 whitespace-nowrap">PIN Identificador</th>
                <th className="px-10 py-6 whitespace-nowrap">Status</th>
                <th className="px-10 py-6 whitespace-nowrap">Deteções</th>
                <th className="px-10 py-6 whitespace-nowrap">Horário</th>
                <th className="px-10 py-6 whitespace-nowrap text-right">Relatório</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {recentScans.length === 0 ? (
                <tr>
                  <td colSpan={5} className="px-10 py-16 text-center text-gray-700 text-[10px] font-black uppercase tracking-widest">
                    Nenhum scan realizado ainda.
                  </td>
                </tr>
              ) : (
                recentScans.map((scan) => (
                  <tr key={scan._id.toString()} className="hover:bg-white/[0.02] transition-colors group">
                    <td className="px-10 py-6 font-mono text-purple-400 font-black text-sm tracking-widest">{scan.pin}</td>
                    <td className="px-10 py-6">
                      {scan.isClean ? (
                        <span className="px-3 py-1.5 rounded-lg text-[9px] font-black bg-emerald-500/10 text-emerald-500 border border-emerald-500/20">
                          LIMPO
                        </span>
                      ) : (
                        <span className="px-3 py-1.5 rounded-lg text-[9px] font-black bg-red-500/10 text-red-500 border border-red-500/20">
                          DETECTADO
                        </span>
                      )}
                    </td>
                    <td className="px-10 py-6 text-gray-500 text-[10px] font-black uppercase tracking-widest">
                      {scan.detections.length} Críticos / {scan.warnings.length} Avisos
                    </td>
                    <td className="px-10 py-6 text-gray-600 text-xs font-mono">
                      {new Date(scan.createdAt).toLocaleTimeString()}
                    </td>
                    <td className="px-10 py-6 text-right">
                      <Link 
                        href={`/result/${scan.pin}`}
                        className="px-6 py-2.5 bg-white text-black rounded-xl text-[10px] font-black uppercase tracking-widest transition-all hover:scale-105 shadow-xl"
                      >
                        Ver Report
                      </Link>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Credits Section */}
      <div className="bg-[#0A0A0A] p-10 rounded-[2.5rem] border border-white/5 shadow-2xl relative overflow-hidden">
        <div className="absolute -bottom-10 -right-10 w-64 h-64 bg-purple-600/5 blur-[100px] pointer-events-none rounded-full" />
        <div className="flex flex-col md:flex-row items-center gap-10 relative z-10">
          <div className="w-24 h-24 bg-white/5 rounded-[2rem] flex items-center justify-center border border-white/10 shadow-inner p-4">
             <img src="https://i.postimg.cc/cJrtFJDM/image-removebg-preview.png" className="w-full h-full object-contain drop-shadow-[0_0_15px_rgba(168,85,247,0.4)]" />
          </div>
          <div className="flex-1 space-y-4 text-center md:text-left">
            <h2 className="text-2xl font-black text-white uppercase tracking-tighter">Lodark Advanced Security</h2>
            <p className="text-gray-500 text-sm font-medium leading-relaxed max-w-2xl">
              Sistema forense de alta performance idealizado por <span className="text-white font-bold tracking-widest uppercase text-[10px]">Samuca Ant Bypass</span> e operado pela 
              <span className="text-white font-bold tracking-widest uppercase text-[10px]"> Equipe LoDark</span>. 
              Garantindo integridade absoluta em cenários competitivos de alto nível.
            </p>
          </div>
          <div className="flex flex-col gap-2">
             <div className="bg-white/5 px-6 py-4 rounded-2xl border border-white/5 text-center">
                <p className="text-[8px] font-black text-gray-600 uppercase tracking-widest mb-1">Versão do Sistema</p>
                <p className="text-xs font-black text-purple-400">2.1.0-STABLE</p>
             </div>
          </div>
        </div>
      </div>

    </div>
  );
}
