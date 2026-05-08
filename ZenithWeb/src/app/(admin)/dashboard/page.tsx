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
    <div className="max-w-[1400px] mx-auto space-y-16 animate-in fade-in duration-1000">
      
      {/* HEADER - MINIMALIST */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-10 px-4">
        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <div className="w-1.5 h-1.5 rounded-full bg-purple-500 animate-pulse shadow-[0_0_10px_rgba(168,85,247,0.5)]" />
            <span className="text-[9px] font-black text-slate-700 uppercase tracking-[0.5em]">LODARK_AC_COMMAND_NODE</span>
          </div>
          <h1 className="text-5xl font-black text-white tracking-tighter uppercase italic leading-none">TERMINAL <span className="text-purple-600">CENTRAL</span></h1>
        </div>
        <div className="flex items-center gap-6">
           <div className="text-right">
              <p className="text-[8px] font-black text-slate-800 uppercase tracking-widest mb-1">OPERADOR ATIVO</p>
              <p className="text-[10px] font-black text-white uppercase italic tracking-tighter">{ownerKey}</p>
           </div>
           <div className="w-px h-10 bg-white/5" />
           <div className="text-right">
              <p className="text-[8px] font-black text-slate-800 uppercase tracking-widest mb-1">STATUS DO SISTEMA</p>
              <p className="text-[10px] font-black text-emerald-500 uppercase italic tracking-tighter">OPTIMAL_READY</p>
           </div>
        </div>
      </div>

      {/* QUICK STATS - ULTRA CLEAN */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 px-4">
        {[
          { label: 'Total Auditorias', value: totalScans, icon: Activity, color: 'text-white' },
          { label: 'Ambientes Limpos', value: cleanScans, icon: ShieldCheck, color: 'text-emerald-500' },
          { label: 'Deteções (Cheats)', value: detectedScans, icon: ShieldAlert, color: 'text-red-500' },
          { label: 'Licenças Ativas', value: '42', icon: KeyRound, color: 'text-purple-500' },
        ].map((stat, i) => (
          <div key={i} className="p-8 rounded-[2rem] border border-white/[0.03] bg-white/[0.01] hover:border-purple-500/20 transition-all duration-700 group">
             <div className="flex items-center justify-between mb-8">
                <stat.icon size={14} className={`${stat.color} opacity-40 group-hover:opacity-100 transition-opacity`} />
                <ArrowUpRight className="text-slate-900 group-hover:text-purple-500 transition-colors" size={12} />
             </div>
             <p className="text-[8px] font-black text-slate-800 uppercase tracking-[0.4em] mb-2">{stat.label}</p>
             <h3 className={`text-3xl font-black ${stat.color} tracking-tighter italic`}>{stat.value}</h3>
          </div>
        ))}
      </div>

      {/* OPERATIONS FEED */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 px-4">
        
        <div className="lg:col-span-8 space-y-6">
           <div className="flex items-center justify-between px-2">
              <h2 className="text-[9px] font-black text-slate-700 uppercase tracking-[0.6em]">RECURSOS_ATIVOS_DE_EQUIPE</h2>
              <span className="text-[8px] font-black text-purple-500/40 uppercase tracking-widest">v2.5.0 STABLE</span>
           </div>
           
           <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Link href="/team" className="p-10 rounded-[2.5rem] border border-white/[0.03] bg-white/[0.01] hover:bg-white/[0.02] transition-all group relative overflow-hidden">
                 <Users size={24} className="text-slate-900 group-hover:text-purple-500 mb-8 transition-colors" />
                 <h4 className="text-sm font-black text-white uppercase italic tracking-tight mb-2">EQUIPE SS</h4>
                 <p className="text-[9px] font-bold text-slate-800 uppercase tracking-widest leading-relaxed">Gestão de membros e permissões de auditoria interna.</p>
                 <div className="absolute top-0 right-0 p-8 opacity-0 group-hover:opacity-10 transition-opacity">
                    <ArrowUpRight size={48} className="text-white" />
                 </div>
              </Link>
              <Link href="/strings" className="p-10 rounded-[2.5rem] border border-white/[0.03] bg-white/[0.01] hover:bg-white/[0.02] transition-all group relative overflow-hidden">
                 <Terminal size={24} className="text-slate-900 group-hover:text-purple-500 mb-8 transition-colors" />
                 <h4 className="text-sm font-black text-white uppercase italic tracking-tight mb-2">STRINGS CENTER</h4>
                 <p className="text-[9px] font-bold text-slate-800 uppercase tracking-widest leading-relaxed">Central de heurísticas e análise de binários enterprise.</p>
                 <div className="absolute top-0 right-0 p-8 opacity-0 group-hover:opacity-10 transition-opacity">
                    <ArrowUpRight size={48} className="text-white" />
                 </div>
              </Link>
           </div>

           <div className="bg-[#030303] border border-white/[0.03] rounded-[3rem] overflow-hidden">
              <div className="px-10 py-6 border-b border-white/[0.03] flex items-center justify-between">
                 <span className="text-[9px] font-black text-slate-800 uppercase tracking-[0.4em]">ATIVIDADES_RECENTES</span>
                 <Activity size={14} className="text-slate-900" />
              </div>
              <div className="overflow-x-auto">
                 <table className="w-full text-left">
                    <thead>
                       <tr className="text-[8px] font-black text-slate-800 uppercase tracking-[0.3em]">
                          <th className="px-10 py-4">Dossier_ID</th>
                          <th className="px-10 py-4">Status</th>
                          <th className="px-10 py-4">Indicadores</th>
                          <th className="px-10 py-4 text-right">Ação</th>
                       </tr>
                    </thead>
                    <tbody className="divide-y divide-white/[0.03]">
                       {recentScans.map((scan) => (
                          <tr key={scan._id.toString()} className="group hover:bg-white/[0.01] transition-all">
                             <td className="px-10 py-5">
                                <span className="text-[10px] font-black text-white group-hover:text-purple-500 transition-colors">#{scan.pin}</span>
                             </td>
                             <td className="px-10 py-5">
                                <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-full border ${scan.isClean ? 'bg-emerald-500/5 border-emerald-500/10 text-emerald-500' : 'bg-red-500/5 border-red-500/10 text-red-500'}`}>
                                   <div className={`w-1 h-1 rounded-full ${scan.isClean ? 'bg-emerald-500' : 'bg-red-500 animate-pulse'}`} />
                                   <span className="text-[8px] font-black uppercase tracking-widest">{scan.isClean ? 'CLEAN' : 'THREAT'}</span>
                                </div>
                             </td>
                             <td className="px-10 py-5">
                                <span className="text-[9px] font-black text-slate-800 uppercase tracking-widest italic">{(scan.detections?.length || 0) + (scan.warnings?.length || 0)} Signals</span>
                             </td>
                             <td className="px-10 py-5 text-right">
                                <Link href={`/result/${scan.pin}`} className="text-slate-900 hover:text-white transition-colors">
                                   <ArrowUpRight size={14} />
                                </Link>
                             </td>
                          </tr>
                       ))}
                    </tbody>
                 </table>
              </div>
           </div>
        </div>

        <div className="lg:col-span-4 space-y-8">
           <div className="p-10 rounded-[3rem] border border-white/[0.03] bg-white/[0.01] space-y-10">
              <h3 className="text-[9px] font-black text-slate-800 uppercase tracking-[0.4em]">HEALTH_MONITOR</h3>
              <div className="space-y-6">
                 {[
                   { label: 'Forense Engine', status: 'Stable', color: 'text-emerald-500' },
                   { label: 'Sincronização', status: 'Optimal', color: 'text-emerald-500' },
                   { label: 'Vercel Node', status: 'Lat: 12ms', color: 'text-purple-500' }
                 ].map((s, i) => (
                   <div key={i} className="flex items-center justify-between">
                      <span className="text-[9px] font-black text-slate-600 uppercase tracking-widest">{s.label}</span>
                      <span className={`text-[8px] font-black uppercase italic ${s.color}`}>{s.status}</span>
                   </div>
                 ))}
              </div>
           </div>

           <div className="p-10 rounded-[3rem] bg-purple-600 shadow-[0_30px_60px_rgba(139,92,246,0.15)] relative overflow-hidden group">
              <Shield size={64} className="absolute -bottom-4 -right-4 text-white opacity-10 group-hover:scale-110 transition-transform duration-700" />
              <h4 className="text-xl font-black text-white uppercase italic tracking-tighter mb-4">STAFF AREA</h4>
              <p className="text-[10px] font-bold text-white/60 uppercase tracking-widest leading-relaxed mb-8">Controle de acesso e logs de auditoria interna da organização.</p>
              <Link href="/staff" className="inline-flex items-center gap-3 px-6 py-3 bg-white text-black font-black rounded-xl text-[8px] uppercase tracking-widest hover:bg-black hover:text-white transition-all">
                 ABRIR TERMINAL <ArrowUpRight size={10} />
              </Link>
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
        <div className="bg-red-500/10 border border-red-500/20 p-4 rounded-xl text-left max-w-lg overflow-hidden">
          <p className="text-red-400 text-xs font-mono break-words">
            {error instanceof Error ? error.message : JSON.stringify(error)}
          </p>
        </div>
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
