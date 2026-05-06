import Link from "next/link";
import { Shield, LayoutDashboard, Key, Search, FileText, BarChart3, Settings, Briefcase, Users, SearchCode, LogOut, ShieldAlert, GitCommit } from "lucide-react";
import { cookies } from "next/headers";

export function Sidebar() {
  const cookieStore = cookies();
  const adminAuth = cookieStore.get('admin_auth')?.value || '';
  const isSuperAdmin = adminAuth.startsWith('superadmin');

  return (
    <aside className="w-72 bg-[#050505] min-h-screen border-r border-white/5 flex flex-col fixed z-40">
      <div className="p-10 flex flex-col items-center gap-6 border-b border-white/5 bg-white/[0.01]">
        <div className="w-16 h-16 bg-white/[0.03] border border-white/10 rounded-[2rem] flex items-center justify-center backdrop-blur-xl group hover:border-purple-500/50 transition-all duration-500">
           <Shield size={32} className="text-white group-hover:text-purple-500" />
        </div>
        <div className="flex flex-col items-center">
          <h1 className="font-black text-xl tracking-tighter text-white leading-none uppercase italic">LODARK<span className="text-purple-600">.AC</span></h1>
          <span className="text-[7px] font-black text-purple-500/40 uppercase tracking-[0.6em] mt-2">Elite Management</span>
        </div>
      </div>

      <nav className="flex-1 p-8 flex flex-col gap-10 overflow-y-auto custom-scrollbar">
        
        {/* MANAGEMENT */}
        <div className="space-y-3">
          <p className="px-3 text-[8px] font-black text-slate-700 uppercase tracking-[0.5em] mb-6">ADMINISTRAÇÃO</p>
          <Link href="/dashboard" className="flex items-center gap-4 px-5 py-3.5 rounded-2xl hover:bg-white/[0.02] text-slate-500 hover:text-white transition-all group border border-transparent hover:border-white/5">
            <LayoutDashboard className="w-4 h-4 group-hover:text-purple-500 transition-colors" />
            <span className="text-[10px] font-black uppercase tracking-widest">Dashboard</span>
          </Link>
          {(isSuperAdmin || (cookieStore.get('admin_auth')?.value.split('|')[1] !== 'Mensal')) && (
            <>
              <Link href="/enterprise" className="flex items-center gap-4 px-5 py-3.5 rounded-2xl hover:bg-white/[0.02] text-slate-500 hover:text-white transition-all group border border-transparent hover:border-white/5">
                <Briefcase className="w-4 h-4 group-hover:text-purple-500 transition-colors" />
                <span className="text-[10px] font-black uppercase tracking-widest">Enterprise</span>
              </Link>
              <Link href="/team" className="flex items-center gap-4 px-5 py-3.5 rounded-2xl hover:bg-white/[0.02] text-slate-500 hover:text-white transition-all group border border-transparent hover:border-white/5">
                <Users className="w-4 h-4 group-hover:text-purple-500 transition-colors" />
                <span className="text-[10px] font-black uppercase tracking-widest">Equipe Enterprise</span>
              </Link>
            </>
          )}
          {isSuperAdmin && (
            <>
              <Link href="/resellers" className="flex items-center gap-4 px-5 py-3.5 rounded-2xl hover:bg-white/[0.02] text-slate-500 hover:text-white transition-all group border border-transparent hover:border-white/5">
                <Shield className="w-4 h-4 text-purple-500 group-hover:text-purple-400" />
                <span className="text-[10px] font-black uppercase tracking-widest">Keys & Licenças</span>
              </Link>
            </>
          )}
        </div>

        {/* OPERATIONS */}
        <div className="space-y-3">
          <p className="px-3 text-[8px] font-black text-slate-700 uppercase tracking-[0.5em] mb-6">OPERAÇÕES</p>
          <Link href="/pins" className="flex items-center gap-4 px-5 py-3.5 rounded-2xl hover:bg-white/[0.02] text-slate-500 hover:text-white transition-all group border border-transparent hover:border-white/5">
            <Key className="w-4 h-4 group-hover:text-purple-500 transition-colors" />
            <span className="text-[10px] font-black uppercase tracking-widest">Gerar PINs</span>
          </Link>
          {(isSuperAdmin || (cookieStore.get('admin_auth')?.value.split('|')[1] === 'Enterprise')) && (
            <Link href="/strings" className="flex items-center gap-4 px-5 py-3.5 rounded-2xl hover:bg-white/[0.02] text-slate-500 hover:text-white transition-all group border border-transparent hover:border-white/5">
              <FileSearch className="w-4 h-4 group-hover:text-purple-500 transition-colors" />
              <span className="text-[10px] font-black uppercase tracking-widest">Strings Center</span>
            </Link>
          )}
          <Link href="/dashboard" className="flex items-center gap-4 px-5 py-3.5 rounded-2xl hover:bg-white/[0.02] text-slate-500 hover:text-white transition-all group border border-transparent hover:border-white/5">
            <Search className="w-4 h-4 group-hover:text-purple-500 transition-colors" />
            <span className="text-[10px] font-black uppercase tracking-widest">Resultados</span>
          </Link>
        </div>

        {/* TEAM */}
        <div className="space-y-3">
          <p className="px-3 text-[8px] font-black text-slate-700 uppercase tracking-[0.5em] mb-6">EQUIPE</p>
          {(isSuperAdmin || adminAuth.includes('admin')) && (
            <>
              <Link href="/staff" className="flex items-center gap-4 px-5 py-3.5 rounded-2xl hover:bg-white/[0.02] text-slate-500 hover:text-white transition-all group border border-transparent hover:border-white/5">
                <Users className="w-4 h-4 group-hover:text-purple-500 transition-colors" />
                <span className="text-[10px] font-black uppercase tracking-widest">Staff & Logs</span>
              </Link>
              <Link href="/bans" className="flex items-center gap-4 px-5 py-3.5 rounded-2xl bg-red-500/[0.01] border border-red-500/10 text-red-500/50 hover:text-red-500 transition-all group">
                <ShieldAlert className="w-4 h-4 group-hover:text-red-500 transition-colors" />
                <span className="text-[10px] font-black uppercase tracking-widest">Gestão de Bans</span>
              </Link>
            </>
          )}
        </div>

      </nav>

      {/* User Profile Section */}
      <div className="p-8 border-t border-white/5 bg-white/[0.01] backdrop-blur-xl">
        <div className="flex items-center gap-4 mb-8 px-2">
            <div className="relative">
              <div className="w-12 h-12 bg-purple-600 rounded-2xl flex items-center justify-center font-black text-white italic shadow-[0_0_15px_rgba(139,92,246,0.3)]">
                {isSuperAdmin ? 'L' : 'S'}
              </div>
              <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-emerald-500 border-2 border-[#050505] rounded-full" />
            </div>
            <div className="flex flex-col">
              <span className="text-[11px] font-black text-white tracking-widest uppercase italic">{isSuperAdmin ? 'Lodark.dll' : 'Staff Node'}</span>
              <span className="text-[8px] text-purple-500/50 uppercase font-black tracking-[0.2em] mt-1 italic">Authorized Admin</span>
            </div>
        </div>
        <Link href="/login" className="flex items-center justify-center gap-3 w-full py-4 rounded-2xl bg-white/[0.02] hover:bg-red-500 hover:text-white text-slate-600 transition-all border border-white/5 group active:scale-95">
          <LogOut className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
          <span className="text-[9px] font-black uppercase tracking-widest">Sair do Painel</span>
        </Link>
      </div>
    </aside>
  );
}
