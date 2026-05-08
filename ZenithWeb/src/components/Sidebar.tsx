import Link from "next/link";
import { 
  Shield, 
  LayoutDashboard, 
  Key, 
  Search, 
  FileText, 
  BarChart3, 
  Settings, 
  Briefcase, 
  Users, 
  SearchCode, 
  LogOut, 
  ShieldAlert, 
  GitCommit,
  Cpu,
  Globe,
  Terminal,
  Activity,
  UserCheck
} from "lucide-react";
import { cookies } from "next/headers";

export function Sidebar() {
  const cookieStore = cookies();
  const adminAuth = cookieStore.get('admin_auth')?.value || '';
  const isSuperAdmin = adminAuth.startsWith('superadmin');
  const role = adminAuth.split('|')[0] || 'guest';

  return (
    <aside className="w-64 bg-[#020202] min-h-screen border-r border-white/[0.03] flex flex-col fixed z-40">
      
      {/* BRANDING - ULTRA CLEAN */}
      <div className="p-8 mb-4">
        <div className="flex items-center gap-3 group cursor-default">
           <div className="w-8 h-8 bg-purple-600 rounded-lg flex items-center justify-center shadow-[0_0_20px_rgba(168,85,247,0.2)]">
              <Shield size={16} className="text-white" />
           </div>
           <div className="flex flex-col">
              <h1 className="font-black text-sm tracking-tighter text-white uppercase italic leading-none">LODARK<span className="text-purple-600">.</span>AC</h1>
              <span className="text-[6px] font-black text-slate-800 uppercase tracking-[0.5em] mt-1 italic">Advanced Intelligence</span>
           </div>
        </div>
      </div>

      <nav className="flex-1 px-4 flex flex-col gap-8 overflow-y-auto custom-scrollbar">
        
        {/* CORE AREA */}
        <div className="space-y-1">
          <p className="px-4 text-[7px] font-black text-slate-800 uppercase tracking-[0.6em] mb-4">Core Systems</p>
          <Link href="/dashboard" className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-white/[0.02] text-slate-500 hover:text-white transition-all group">
            <LayoutDashboard size={14} className="group-hover:text-purple-500 transition-colors" />
            <span className="text-[9px] font-black uppercase tracking-widest">Dashboard</span>
          </Link>
          
          <Link href="/pins" className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-white/[0.02] text-slate-500 hover:text-white transition-all group">
            <Key size={14} className="group-hover:text-purple-500 transition-colors" />
            <span className="text-[9px] font-black uppercase tracking-widest">Results (Pins)</span>
          </Link>
        </div>

        {/* ENTERPRISE & TEAMS */}
        <div className="space-y-1">
          <p className="px-4 text-[7px] font-black text-slate-800 uppercase tracking-[0.6em] mb-4">Enterprise Management</p>
          <Link href="/enterprise" className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-white/[0.02] text-slate-500 hover:text-white transition-all group">
            <Briefcase size={14} className="group-hover:text-purple-500 transition-colors" />
            <span className="text-[9px] font-black uppercase tracking-widest">Enterprise Panel</span>
          </Link>
          <Link href="/team" className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-white/[0.02] text-slate-500 hover:text-white transition-all group">
            <Users size={14} className="group-hover:text-purple-500 transition-colors" />
            <span className="text-[9px] font-black uppercase tracking-widest">Equipe SS</span>
          </Link>
        </div>

        {/* ANALYTICS */}
        <div className="space-y-1">
          <p className="px-4 text-[7px] font-black text-slate-800 uppercase tracking-[0.6em] mb-4">Forense Tools</p>
          <Link href="/strings" className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-white/[0.02] text-slate-500 hover:text-white transition-all group">
            <SearchCode size={14} className="group-hover:text-purple-500 transition-colors" />
            <span className="text-[9px] font-black uppercase tracking-widest">Strings Center</span>
          </Link>
          <Link href="/extractor" className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-white/[0.02] text-slate-500 hover:text-white transition-all group">
            <Terminal size={14} className="group-hover:text-purple-500 transition-colors" />
            <span className="text-[9px] font-black uppercase tracking-widest">Binary Extractor</span>
          </Link>
        </div>

        {/* ADMIN AREA */}
        <div className="space-y-1">
          <p className="px-4 text-[7px] font-black text-slate-800 uppercase tracking-[0.6em] mb-4">Administration</p>
          <Link href="/staff" className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-white/[0.02] text-slate-500 hover:text-white transition-all group">
            <UserCheck size={14} className="group-hover:text-purple-500 transition-colors" />
            <span className="text-[9px] font-black uppercase tracking-widest">Staff Area</span>
          </Link>
          <Link href="/bans" className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-white/[0.02] text-red-500/30 hover:text-red-500 transition-all group">
            <ShieldAlert size={14} className="group-hover:text-red-500 transition-colors" />
            <span className="text-[9px] font-black uppercase tracking-widest">Bans Management</span>
          </Link>
        </div>

      </nav>

      {/* FOOTER */}
      <div className="p-6">
        <div className="bg-white/[0.01] border border-white/[0.03] rounded-2xl p-4 flex items-center justify-between group hover:border-purple-500/20 transition-all duration-700">
           <div className="flex flex-col">
              <span className="text-[8px] font-black text-white uppercase italic tracking-tighter">{adminAuth.split('|')[3] || 'Operator'}</span>
              <span className="text-[6px] font-bold text-slate-700 uppercase tracking-widest mt-1 italic">Session Active</span>
           </div>
           <Link href="/login" className="p-2 hover:bg-white/5 rounded-lg transition-colors text-slate-600 hover:text-white">
              <LogOut size={12} />
           </Link>
        </div>
      </div>
    </aside>
  );
}
