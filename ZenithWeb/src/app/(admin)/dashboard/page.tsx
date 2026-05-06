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

  let topDetectors: any[] = [];
  let topKeyGenerators: any[] = [];

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
    <div className="space-y-12 max-w-[1500px] mx-auto pb-32 animate-in fade-in duration-1000 font-sans">
      
      {/* SUPER CLEAN HEADER */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-10 bg-white/[0.02] border border-white/5 p-12 rounded-[3rem] shadow-2xl relative overflow-hidden backdrop-blur-3xl">
        <div className="absolute top-0 right-0 p-10 opacity-[0.05] pointer-events-none">
           <Terminal size={180} />
        </div>
        <div className="relative z-10 space-y-6">
           <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-violet-600 rounded-2xl flex items-center justify-center shadow-[0_0_20px_rgba(139,92,246,0.3)]">
                 <LayoutDashboard className="text-white" size={24} />
              </div>
              <div>
                 <p className="text-[10px] font-black text-violet-500 uppercase tracking-[0.5em]">Command Center v2.5</p>
                 <h1 className="text-5xl font-black text-white tracking-tighter uppercase italic leading-none mt-1">STAFF PANEL<span className="text-violet-500">.</span></h1>
              </div>
           </div>
           <div className="flex items-center gap-8 text-gray-500">
              <div className="flex items-center gap-3">
                 <Users size={16} />
                 <span className="text-[10px] font-black uppercase tracking-widest">{isSuperAdmin ? 'Super Admin' : 'Staff Access'}</span>
              </div>
              <div className="w-px h-4 bg-white/10" />
              <div className="flex items-center gap-3">
                 <ShieldCheck size={16} />
                 <span className="text-[10px] font-black uppercase tracking-widest">Protocol CSI-7 Active</span>
              </div>
           </div>
        </div>

        <div className="relative z-10 flex flex-wrap gap-4">
           <button className="px-10 py-5 bg-white text-black font-black rounded-2xl hover:bg-violet-600 hover:text-white transition-all shadow-2xl uppercase tracking-widest text-[10px] active:scale-95">
              Generate Bulk PINs
           </button>
           <button className="px-10 py-5 bg-white/[0.03] border border-white/10 text-white font-black rounded-2xl hover:bg-white/10 transition-all uppercase tracking-widest text-[10px] active:scale-95">
              Clear Cache
           </button>
        </div>
      </div>

      {/* STATS GRID - ULTRA MODERN */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
        {[
          { label: 'Global Scans', value: totalScans, icon: Activity, color: 'text-white', bg: 'bg-white/5' },
          { label: 'Clean Environment', value: cleanScans, icon: CheckCircle, color: 'text-emerald-500', bg: 'bg-emerald-500/5' },
          { label: 'System Uptime', value: '99.9%', icon: Clock, color: 'text-indigo-500', bg: 'bg-indigo-500/5' },
          { label: 'Threats Detected', value: detectedScans, icon: ShieldAlert, color: 'text-red-500', bg: 'bg-red-500/5' },
        ].map((stat, i) => (
          <div key={i} className={`p-10 rounded-[2.5rem] border border-white/5 shadow-2xl relative overflow-hidden group hover:border-white/20 transition-all ${stat.bg}`}>
            <div className="relative z-10">
               <div className="flex items-center justify-between mb-8">
                  <div className={`p-3 rounded-xl bg-black border border-white/5 ${stat.color}`}>
                     <stat.icon size={20} />
                  </div>
                  <ArrowUpRight className="text-gray-800 group-hover:text-gray-500 transition-colors" size={18} />
               </div>
               <p className="text-[10px] font-black text-gray-500 uppercase tracking-[0.4em] mb-2">{stat.label}</p>
               <h3 className={`text-5xl font-black ${stat.color} tracking-tighter italic`}>{stat.value}</h3>
            </div>
          </div>
        ))}
      </div>

      {/* MAIN CONTENT AREA */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
         
         {/* RECENT SCANS - TABLE CLEANUP */}
         <div className="lg:col-span-8 bg-white/[0.01] border border-white/5 rounded-[3rem] shadow-2xl overflow-hidden">
            <div className="px-12 py-10 border-b border-white/5 flex items-center justify-between">
               <div>
                  <h2 className="text-2xl font-black text-white uppercase italic tracking-tighter">RECENT OPERATIONS</h2>
                  <p className="text-[9px] font-black text-gray-600 uppercase tracking-widest mt-1">Real-time session monitoring</p>
               </div>
               <Target className="text-violet-500" size={24} />
            </div>
            <div className="overflow-x-auto">
               <table className="w-full text-left">
                  <thead>
                     <tr className="bg-white/[0.02] text-gray-600 text-[10px] font-black uppercase tracking-[0.3em]">
                        <th className="px-12 py-6">Protocol ID</th>
                        <th className="px-12 py-6">Status</th>
                        <th className="px-12 py-6">Detections</th>
                        <th className="px-12 py-6 text-right">Action</th>
                     </tr>
                  </thead>
                  <tbody className="divide-y divide-white/5">
                     {recentScans.map((scan) => (
                        <tr key={scan._id.toString()} className="hover:bg-white/[0.02] transition-colors group">
                           <td className="px-12 py-8">
                              <div className="flex flex-col">
                                 <span className="text-sm font-black text-white italic">#{scan.pin}</span>
                                 <span className="text-[9px] font-black text-gray-700 uppercase tracking-widest">{new Date(scan.createdAt).toLocaleTimeString('pt-BR', { timeZone: 'America/Sao_Paulo' })}</span>
                              </div>
                           </td>
                           <td className="px-12 py-8">
                              <span className={`px-4 py-1.5 rounded-full text-[9px] font-black border uppercase tracking-widest ${scan.isClean ? 'bg-emerald-500/10 text-emerald-500 border-emerald-500/20' : 'bg-red-500/10 text-red-500 border-red-500/20'}`}>
                                 {scan.isClean ? 'TOTAL CLEAN' : 'THREAT DETECTED'}
                              </span>
                           </td>
                           <td className="px-12 py-8">
                              <span className="text-[10px] font-black text-gray-500 uppercase tracking-widest">
                                 {scan.detections.length} Critical / {scan.warnings.length} Warn
                              </span>
                           </td>
                           <td className="px-12 py-8 text-right">
                              <Link href={`/result/${scan.pin}`} className="p-3 bg-white text-black rounded-xl inline-flex hover:bg-violet-600 hover:text-white transition-all active:scale-95">
                                 <ArrowUpRight size={18} />
                              </Link>
                           </td>
                        </tr>
                     ))}
                  </tbody>
               </table>
            </div>
         </div>

         {/* SIDEBAR WIDGETS */}
         <div className="lg:col-span-4 space-y-8">
            
            {/* System Health */}
            <div className="bg-white/[0.01] border border-white/5 rounded-[3rem] p-10 space-y-10">
               <h3 className="text-[10px] font-black text-gray-700 uppercase tracking-[0.5em]">SYSTEM STATUS</h3>
               <div className="space-y-6">
                  {[
                    { label: 'API Gateway', status: 'Online', color: 'text-emerald-500' },
                    { label: 'Forensic DB', status: 'Stable', color: 'text-emerald-500' },
                    { label: 'Auth Server', status: 'Optimal', color: 'text-emerald-500' },
                    { label: 'CDN Nodes', status: 'Active', color: 'text-emerald-500' }
                  ].map((sys, i) => (
                    <div key={i} className="flex items-center justify-between">
                       <span className="text-[11px] font-black text-gray-500 uppercase tracking-widest">{sys.label}</span>
                       <span className={`text-[10px] font-black uppercase italic ${sys.color}`}>{sys.status}</span>
                    </div>
                  ))}
               </div>
               <div className="pt-6 border-t border-white/5">
                  <div className="flex justify-between items-center mb-4">
                     <span className="text-[10px] font-black text-gray-700 uppercase tracking-widest">Global Engine Load</span>
                     <span className="text-sm font-black italic text-white tracking-tighter">14%</span>
                  </div>
                  <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden">
                     <div className="h-full bg-violet-600" style={{ width: '14%' }} />
                  </div>
               </div>
            </div>

            {/* Dev Branding Widget */}
            <div className="bg-gradient-to-br from-violet-600 to-indigo-700 p-10 rounded-[3rem] shadow-2xl relative overflow-hidden group">
               <div className="absolute top-0 right-0 p-8 opacity-20 group-hover:scale-110 transition-transform">
                  <Zap size={64} className="text-white" />
               </div>
               <div className="relative z-10 space-y-6">
                  <div>
                     <p className="text-[10px] font-black text-white/60 uppercase tracking-[0.5em] mb-2">Developed By</p>
                     <h3 className="text-3xl font-black text-white uppercase italic tracking-tighter">SAMUCA & LODARK</h3>
                  </div>
                  <p className="text-[11px] font-medium text-white/80 leading-relaxed">
                     The official high-performance forensic engine for competitive integrity.
                  </p>
                  <div className="pt-4 flex items-center gap-4">
                     <div className="w-8 h-8 rounded-lg bg-white/20 flex items-center justify-center">
                        <Terminal size={14} className="text-white" />
                     </div>
                     <span className="text-[9px] font-black uppercase tracking-widest text-white">Version 2.5.0-STABLE</span>
                  </div>
               </div>
            </div>

         </div>
      </div>

    </div>
  );
}
