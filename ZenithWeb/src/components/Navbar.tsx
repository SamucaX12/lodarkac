import Link from 'next/link';
import { Shield } from 'lucide-react';

export default function Navbar() {
  return (
    <nav className="relative z-50 flex items-center justify-between px-8 py-10 lg:px-20 bg-transparent">
      <Link href="/" className="flex items-center gap-4 group cursor-pointer">
        <div className="w-12 h-12 bg-white/[0.03] border border-white/10 rounded-2xl flex items-center justify-center transition-all duration-500 backdrop-blur-xl group-hover:border-purple-500/50">
          <Shield size={22} className="text-white" />
        </div>
        <div className="flex flex-col">
          <span className="text-xl font-black tracking-tighter uppercase leading-none text-white italic">LODARK<span className="text-purple-600">.AC</span></span>
          <span className="text-[7px] font-black tracking-[0.5em] text-purple-500/40 uppercase leading-none mt-1">Advanced Forensic Intelligence Unit</span>
        </div>
      </Link>

      <div className="flex items-center gap-12">
        <div className="hidden lg:flex items-center gap-10 text-[9px] font-black uppercase tracking-[0.2em] text-slate-500">
          <Link href="/#tech" className="hover:text-white transition-colors">Tecnologia</Link>
          <Link href="/#partners" className="hover:text-white transition-colors">Ecossistema</Link>
          <Link href="/verify" className="hover:text-white transition-colors">Verificação</Link>
        </div>
        <Link href="/login" className="px-10 py-3.5 bg-purple-600 text-white rounded-xl hover:bg-purple-500 transition-all duration-500 text-[10px] font-black uppercase tracking-widest active:scale-95 shadow-[0_10px_30px_rgba(139,92,246,0.3)]">
          LOGIN
        </Link>
      </div>
    </nav>
  );
}
