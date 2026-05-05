import Link from 'next/link';
import { Shield } from 'lucide-react';

export default function Navbar() {
  return (
    <nav className="relative z-50 flex items-center justify-between px-8 py-8 lg:px-16 bg-transparent">
      <Link href="/" className="flex items-center gap-3 group cursor-pointer">
        <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center transition-transform group-hover:rotate-12 duration-500">
          <Shield size={20} className="text-black" />
        </div>
        <div className="flex flex-col">
          <span className="text-lg font-black tracking-tighter uppercase italic leading-none text-white">SAMUCA<span className="text-red-500">.AC</span></span>
          <span className="text-[8px] font-black tracking-[0.4em] text-gray-600 uppercase">Forensic Core</span>
        </div>
      </Link>

      <div className="flex items-center gap-12">
        <div className="hidden lg:flex items-center gap-12 text-[10px] font-black uppercase tracking-[0.2em] text-gray-500">
          <Link href="/#features" className="hover:text-white transition-colors">Protocols</Link>
          <Link href="/#pricing" className="hover:text-white transition-colors">Pricing</Link>
          <Link href="/dashboard" className="hover:text-white transition-colors">Dashboard</Link>
        </div>
        <Link href="/login" className="px-8 py-3 bg-white/5 border border-white/10 text-white rounded-xl hover:bg-white hover:text-black transition-all duration-300 text-[10px] font-black uppercase tracking-widest active:scale-95">
          Admin
        </Link>
      </div>
    </nav>
  );
}
