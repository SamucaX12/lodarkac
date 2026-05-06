import { 
  Activity, 
  ShieldAlert, 
  CheckCircle, 
  Clock, 
  Trophy, 
  KeyRound, 
  ArrowUpRight, 
  Zap, 
  Target, 
  Database, 
  MessageSquare,
  LayoutDashboard,
  ShieldCheck,
  Users,
  Settings,
  Terminal,
  Cpu,
  Globe
} from 'lucide-react';
import dbConnect from '@/lib/mongodb';
import Result from '@/models/Result';
import Pin from '@/models/Pin';
import Link from 'next/link';
import { cookies } from 'next/headers';

export const dynamic = 'force-dynamic';

export default async function DashboardPage() {
  const authCookie = cookies().get('admin_auth')?.value || '';
  if (!authCookie) {
    return (
      <div className="flex flex-col items-center justify-center py-40 text-center space-y-8 animate-in fade-in duration-700">
        <ShieldAlert size={64} className="text-red-500 opacity-10 mb-4" />
        <h2 className="text-[10px] font-black uppercase tracking-[0.5em] text-slate-500 italic">ACESSO NEGADO • SESSÃO INVÁLIDA</h2>
        <p className="text-[9px] font-bold text-slate-800 uppercase tracking-widest max-w-xs mx-auto">Você precisa estar autenticado como operador para acessar este terminal.</p>
        <Link href="/login" className="px-10 py-4 bg-white text-black font-black rounded-xl text-[9px] uppercase tracking-widest hover:bg-purple-600 hover:text-white transition-all shadow-2xl">VOLTAR AO LOGIN</Link>
      </div>
    );
  }

  try {
    await dbConnect();
    
    const parts = authCookie.split('|');
    const role = parts[0];
    let ownerKey = '';
    if (parts.length >= 4) {
      ownerKey = parts[3];
    } else if (role === 'superadmin') {
      ownerKey = 'lodark_admin';
    }

    const isSuperAdmin = role === 'superadmin';
    const query = isSuperAdmin ? {} : { ownerKey };

    const recentScans = await Result.find(query).sort({ createdAt: -1 }).limit(10);
    const totalScans = await Result.countDocuments(query);
    const cleanScans = await Result.countDocuments({ ...query, isClean: true });
    const detectedScans = totalScans - cleanScans;

    return (
    <div className="space-y-12 max-w-[1300px] mx-auto pb-32 animate-in fade-in duration-1000 font-sans text-[#e0e0e0]">
      
      {/* MINIMALIST HEADER */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-10 bg-white/[0.01] border border-white/5 p-12 rounded-3xl relative overflow-hidden backdrop-blur-xl">
        <div className="relative z-10 space-y-4">
           <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center">
                 <LayoutDashboard className="text-white" size={16} />
              </div>
              <h1 className="text-2xl font-black text-white tracking-tight uppercase leading-none">LODARK<span className="text-indigo-500">.</span>CONTROL</h1>
           </div>
           <div className="flex items-center gap-6 text-gray-700">
              <span className="text-[8px] font-black uppercase tracking-[0.4em]">{isSuperAdmin ? 'Root Access' : 'Operator Mode'}</span>
              <div className="w-px h-3 bg-white/10" />
              <span className="text-[8px] font-black uppercase tracking-[0.4em]">Engine v2.5.0 Stable</span>
           </div>
        </div>

        <div className="relative z-10 flex gap-4">
           <button className="px-8 py-3 bg-white text-black font-black rounded-xl hover:bg-indigo-600 hover:text-white transition-all text-[9px] uppercase tracking-widest active:scale-95">
              Generate Bulk
           </button>
           <button className="px-8 py-3 bg-white/[0.03] border border-white/5 text-gray-500 font-black rounded-xl hover:bg-white/10 transition-all text-[9px] uppercase tracking-widest active:scale-95">
              Flush Logs
           </button>
        </div>
      </div>

      {/* STATS - CLEAN GRID */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {[
          { label: 'Total Scans', value: totalScans, icon: Activity, color: 'text-white' },
          { label: 'Integrity OK', value: cleanScans, icon: CheckCircle, color: 'text-emerald-500' },
          { label: 'Detections', value: detectedScans, icon: ShieldAlert, color: 'text-red-500' },
          { label: 'Cloud Load', value: '14%', icon: Globe, color: 'text-indigo-500' },
        ].map((stat, i) => (
          <div key={i} className="p-8 rounded-3xl border border-white/5 bg-white/[0.01] transition-all">
             <div className="flex items-center justify-between mb-6">
                <stat.icon size={16} className={stat.color} />
                <ArrowUpRight className="text-gray-900" size={14} />
             </div>
             <p className="text-[8px] font-black text-gray-700 uppercase tracking-widest mb-1">{stat.label}</p>
             <h3 className={`text-3xl font-black ${stat.color} tracking-tight`}>{stat.value}</h3>
          </div>
        ))}
      </div>

      {/* MAIN CONTENT */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
         
         {/* TABLE */}
          <div className="lg:col-span-8 bg-white/[0.01] border border-white/5 rounded-3xl overflow-hidden backdrop-blur-md">
            <div className="px-10 py-8 border-b border-white/5 flex items-center justify-between">
               <div className="flex items-center gap-3">
                  <div className="w-1.5 h-1.5 rounded-full bg-indigo-500 animate-pulse" />
                  <h2 className="text-[10px] font-black text-white uppercase tracking-[0.4em]">LIVE_OPERATIONS_FEED</h2>
               </div>
               <Target className="text-indigo-500/50" size={16} />
            </div>
            <div className="overflow-x-auto">
               <table className="w-full text-left border-collapse">
                  <thead>
                     <tr className="bg-white/[0.01] text-gray-700 text-[8px] font-black uppercase tracking-[0.3em]">
                        <th className="px-10 py-5 border-b border-white/5">Session_ID</th>
                        <th className="px-10 py-5 border-b border-white/5">Integrity</th>
                        <th className="px-10 py-5 border-b border-white/5">Detections</th>
                        <th className="px-10 py-5 border-b border-white/5 text-right">Access</th>
                     </tr>
                  </thead>
                  <tbody className="divide-y divide-white/5">
                     {recentScans.length === 0 ? (
                        <tr>
                           <td colSpan={4} className="px-10 py-20 text-center opacity-20">
                              <span className="text-[9px] font-black uppercase tracking-[0.5em]">No recent activity detected</span>
                           </td>
                        </tr>
                     ) : (
                        recentScans.map((scan) => (
                           <tr key={scan._id.toString()} className="hover:bg-white/[0.02] transition-all group">
                              <td className="px-10 py-6">
                                 <div className="flex flex-col gap-1">
                                    <span className="text-[11px] font-black text-white group-hover:text-indigo-400 transition-colors">#{scan.pin || '000000'}</span>
                                    <span className="text-[7px] font-black text-gray-800 uppercase tracking-widest">{scan.createdAt ? new Date(scan.createdAt).toLocaleTimeString('pt-BR') : '--:--'}</span>
                                 </div>
                              </td>
                              <td className="px-10 py-6">
                                 <div className="flex items-center gap-2">
                                    <div className={`w-1 h-1 rounded-full ${scan.isClean ? 'bg-emerald-500' : 'bg-red-500 animate-pulse'}`} />
                                    <span className={`text-[8px] font-black uppercase tracking-widest ${scan.isClean ? 'text-emerald-500' : 'text-red-500'}`}>
                                       {scan.isClean ? 'CLEAN' : 'THREAT'}
                                    </span>
                                 </div>
                              </td>
                              <td className="px-10 py-6">
                                 <div className="flex items-center gap-3">
                                    <span className="text-[10px] font-black text-white">{(scan.detections?.length || 0) + (scan.warnings?.length || 0)}</span>
                                    <span className="text-[7px] font-black text-gray-800 uppercase tracking-widest italic">Indicators Found</span>
                                 </div>
                              </td>
                              <td className="px-10 py-6 text-right">
                                 <Link href={`/result/${scan.pin}`} className="inline-flex items-center gap-2 px-4 py-2 bg-white/[0.03] border border-white/5 text-white rounded-lg hover:bg-white hover:text-black transition-all group/btn shadow-lg">
                                    <span className="text-[8px] font-black uppercase tracking-widest">Open Dossier</span>
                                    <ArrowUpRight size={12} className="group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5 transition-transform" />
                                 </Link>
                              </td>
                           </tr>
                        ))
                     )}
                  </tbody>
               </table>
            </div>
         </div>

         {/* SIDEBAR */}
         <div className="lg:col-span-4 space-y-8">
            <div className="bg-white/[0.01] border border-white/5 rounded-3xl p-8 space-y-8">
               <h3 className="text-[8px] font-black text-gray-700 uppercase tracking-[0.4em]">Engine Health</h3>
               <div className="space-y-5">
                  {[
                    { label: 'API Gateway', status: 'Online', color: 'text-emerald-500' },
                    { label: 'Forensic DB', status: 'Stable', color: 'text-emerald-500' },
                    { label: 'Auth Node', status: 'Optimal', color: 'text-emerald-500' }
                  ].map((sys, i) => (
                    <div key={i} className="flex items-center justify-between">
                       <span className="text-[9px] font-black text-gray-600 uppercase tracking-widest">{sys.label}</span>
                       <span className={`text-[8px] font-black uppercase italic ${sys.color}`}>{sys.status}</span>
                    </div>
                  ))}
               </div>
            </div>

            <div className="bg-indigo-600 p-8 rounded-3xl shadow-2xl relative overflow-hidden group">
               <Zap size={48} className="absolute top-0 right-0 p-4 opacity-20 text-white" />
               <div className="relative z-10 space-y-4">
                  <h3 className="text-xl font-black text-white uppercase italic tracking-tight">TEAM LODARK</h3>
                  <p className="text-[10px] font-medium text-white/80 leading-relaxed uppercase">
                     Official forensic operations core. Competitive integrity enforced.
                  </p>
                  <span className="text-[7px] font-black uppercase tracking-widest text-white/60 block pt-4">LODARK_AC_CORE_v2.5.0</span>
               </div>
            </div>
         </div>
      </div>

    </div>
    );
  } catch (error) {
    return (
      <div className="flex flex-col items-center justify-center py-40 text-center space-y-8 animate-in fade-in duration-700">
        <Database size={64} className="text-indigo-500 opacity-10 mb-4" />
        <h2 className="text-[10px] font-black uppercase tracking-[0.5em] text-slate-500 italic">BANCO DE DADOS OFFLINE</h2>
        <p className="text-[9px] font-bold text-slate-800 uppercase tracking-widest max-w-xs mx-auto leading-relaxed">
          Ocorreu uma falha crítica na conexão com o cluster de dados. Verifique a configuração do banco no painel administrativo.
        </p>
        <Link 
          href="/dashboard"
          className="px-10 py-4 bg-white/[0.03] border border-white/5 text-white font-black rounded-xl text-[9px] uppercase tracking-widest hover:bg-white hover:text-black transition-all"
        >
          REENTRAR NO TERMINAL
        </Link>
      </div>
    );
  }
}
