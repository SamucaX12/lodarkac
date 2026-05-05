import Link from "next/link";
import { Shield, LayoutDashboard, Key, Search, FileText, BarChart3, Settings, Briefcase, Users, SearchCode, LogOut, ShieldAlert } from "lucide-react";
import { cookies } from "next/headers";

export function Sidebar() {
  const cookieStore = cookies();
  const adminAuth = cookieStore.get('admin_auth')?.value || '';
  const isSuperAdmin = adminAuth.startsWith('superadmin');

  return (
    <aside className="w-72 bg-[#0A0A0A] min-h-screen border-r border-white/5 flex flex-col fixed z-40">
      <div className="p-8 flex items-center gap-4 border-b border-white/5">
        <div className="w-10 h-10 bg-white/5 rounded-2xl flex items-center justify-center border border-white/10 overflow-hidden">
          <img 
            src="https://i.postimg.cc/h4bqhRnY/image.png" 
            alt="Logo" 
            className="w-full h-full object-cover" 
          />
        </div>
        <div className="flex flex-col">
          <h1 className="font-black text-lg tracking-tighter text-white leading-none">LODARK</h1>
          <span className="text-[9px] font-black text-gray-600 uppercase tracking-[0.3em]">Advanced Panel</span>
        </div>
      </div>

      <nav className="flex-1 p-6 flex flex-col gap-8 overflow-y-auto custom-scrollbar">
        
        {/* ÁREA CEO */}
        <div className="space-y-2">
          <p className="px-3 text-[9px] font-black text-gray-700 uppercase tracking-[0.4em] mb-4">Administração</p>
          <Link href="/dashboard" className="flex items-center gap-3 px-4 py-3 rounded-2xl hover:bg-white/5 text-gray-500 hover:text-white transition-all group">
            <LayoutDashboard className="w-4 h-4 group-hover:text-purple-500 transition-colors" />
            <span className="text-xs font-bold uppercase tracking-widest">Dashboard</span>
          </Link>
          <Link href="/enterprise" className="flex items-center gap-3 px-4 py-3 rounded-2xl hover:bg-white/5 text-gray-500 hover:text-white transition-all group">
            <Briefcase className="w-4 h-4 group-hover:text-purple-500 transition-colors" />
            <span className="text-xs font-bold uppercase tracking-widest">Enterprise</span>
          </Link>
          {isSuperAdmin && (
            <>
              <Link href="/resellers" className="flex items-center gap-3 px-4 py-3 rounded-2xl hover:bg-white/5 text-gray-500 hover:text-white transition-all group">
                <Shield className="w-4 h-4 text-purple-400 group-hover:text-purple-300" />
                <span className="text-xs font-bold uppercase tracking-widest">Keys & Licenças</span>
              </Link>
              <Link href="/custom-detects" className="flex items-center gap-3 px-4 py-3 rounded-2xl hover:bg-emerald-500/5 text-emerald-500/50 hover:text-emerald-400 transition-all border border-transparent hover:border-emerald-500/20 group">
                <SearchCode className="w-4 h-4 group-hover:text-emerald-400" />
                <span className="text-xs font-bold uppercase tracking-widest">Yara Setup</span>
              </Link>
            </>
          )}
        </div>

        {/* ÁREA SCANNER */}
        <div className="space-y-2">
          <p className="px-3 text-[9px] font-black text-gray-700 uppercase tracking-[0.4em] mb-4">Operacional</p>
          <Link href="/pins" className="flex items-center gap-3 px-4 py-3 rounded-2xl hover:bg-white/5 text-gray-500 hover:text-white transition-all group">
            <Key className="w-4 h-4 group-hover:text-purple-500 transition-colors" />
            <span className="text-xs font-bold uppercase tracking-widest">Gerar PINs</span>
          </Link>
          <Link href="/dashboard" className="flex items-center gap-3 px-4 py-3 rounded-2xl hover:bg-white/5 text-gray-500 hover:text-white transition-all group">
            <Search className="w-4 h-4 group-hover:text-purple-500 transition-colors" />
            <span className="text-xs font-bold uppercase tracking-widest">Resultados</span>
          </Link>
          <Link href="/updates" className="flex items-center gap-3 px-4 py-3 rounded-2xl hover:bg-white/5 text-gray-500 hover:text-white transition-all group">
            <GitCommit className="w-4 h-4 group-hover:text-purple-500 transition-colors" />
            <span className="text-xs font-bold uppercase tracking-widest">Changelog</span>
          </Link>
        </div>

        {/* ÁREA STAFF / EQUIPE */}
        <div className="space-y-2">
          <p className="px-3 text-[9px] font-black text-gray-700 uppercase tracking-[0.4em] mb-4">Equipe</p>
          {(isSuperAdmin || adminAuth.includes('admin')) && (
            <>
              <Link href="/staff" className="flex items-center gap-3 px-4 py-3 rounded-2xl hover:bg-white/5 text-gray-500 hover:text-white transition-all group">
                <Users className="w-4 h-4 group-hover:text-purple-500 transition-colors" />
                <span className="text-xs font-bold uppercase tracking-widest">Staff & Logs</span>
              </Link>
              <Link href="/bans" className="flex items-center gap-3 px-4 py-3 rounded-2xl hover:bg-white/5 text-gray-500 hover:text-white transition-all group">
                <ShieldAlert className="w-4 h-4 group-hover:text-red-500 transition-colors" />
                <span className="text-xs font-bold uppercase tracking-widest text-red-500/70 group-hover:text-red-500">Gestão de Bans</span>
              </Link>
            </>
          )}
          <Link href="/extractor" className="flex items-center gap-3 px-4 py-3 rounded-2xl hover:bg-white/5 text-gray-500 hover:text-white transition-all group">
            <SearchCode className="w-4 h-4 group-hover:text-purple-500 transition-colors" />
            <span className="text-xs font-bold uppercase tracking-widest">Forensics</span>
          </Link>
        </div>

      </nav>

      {/* User Profile Section */}
      <div className="p-6 border-t border-white/5 bg-white/5 backdrop-blur-sm">
        <div className="flex items-center gap-4 mb-6 px-2">
          {adminAuth.includes('samuca244') ? (
            <>
              <div className="relative">
                <img src="https://i.postimg.cc/3xbh7jhh/image.png" alt="Samuca" className="w-12 h-12 rounded-2xl object-cover border border-purple-500/50 shadow-[0_0_15px_rgba(168,85,247,0.3)]" />
                <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-emerald-500 border-2 border-[#0A0A0A] rounded-full" />
              </div>
              <div className="flex flex-col">
                <span className="text-[11px] font-black text-white tracking-widest uppercase">SamucaX</span>
                <span className="text-[8px] text-purple-400 uppercase font-black tracking-widest mt-1">Lead Developer</span>
              </div>
            </>
          ) : adminAuth.includes('lodark244') ? (
            <>
              <div className="relative">
                <img src="https://i.postimg.cc/bJ1fQKtQ/image.png" alt="Lodark" className="w-12 h-12 rounded-2xl object-cover border border-blue-500/50 shadow-[0_0_15px_rgba(59,130,246,0.3)]" />
                <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-emerald-500 border-2 border-[#0A0A0A] rounded-full" />
              </div>
              <div className="flex flex-col">
                <span className="text-[11px] font-black text-white tracking-widest uppercase">Lodark.dll</span>
                <span className="text-[8px] text-blue-400 uppercase font-black tracking-widest mt-1">CEO / Founder</span>
              </div>
            </>
          ) : (
            <>
              <div className="w-12 h-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center">
                <Users className="w-6 h-6 text-gray-500" />
              </div>
              <div className="flex flex-col">
                <span className="text-[11px] font-black text-white tracking-widest uppercase">{isSuperAdmin ? 'Admin' : 'Staff'}</span>
                <span className="text-[8px] text-gray-500 uppercase font-black tracking-widest mt-1">Acesso Autorizado</span>
              </div>
            </>
          )}
        </div>
        <Link href="/login" className="flex items-center justify-center gap-3 w-full py-3 rounded-2xl bg-red-500/10 hover:bg-red-500/20 text-red-400 transition-all border border-red-500/20 group">
          <LogOut className="w-4 h-4 group-hover:scale-110 transition-transform" />
          <span className="text-[10px] font-black uppercase tracking-widest">Encerrar Sessão</span>
        </Link>
      </div>
    </aside>
  );
}
