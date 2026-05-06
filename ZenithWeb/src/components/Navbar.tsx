import Link from 'next/link';
import { Shield } from 'lucide-react';

export default function Navbar() {
  return (
    <nav className="relative z-50 flex items-center justify-between px-10 py-10 lg:px-24 bg-transparent backdrop-blur-sm">
      <Link href="/" className="flex items-center gap-4 group cursor-pointer">
        <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center transition-all group-hover:rotate-6 duration-500 shadow-2xl">
          <Shield size={20} className="text-black" />
        </div>
        <div className="flex flex-col">
          <span className="text-lg font-black tracking-tight uppercase leading-none text-white italic">LODARK<span className="text-indigo-500">.AC</span></span>
          <span className="text-[8px] font-black tracking-[0.3em] text-gray-700 uppercase leading-none mt-1">Forensic Intelligence</span>
        </div>
      </Link>

      <div className="flex items-center gap-12">
        <div className="hidden lg:flex items-center gap-12 text-[9px] font-black uppercase tracking-[0.3em] text-gray-600">
          <Link href="/#about" className="hover:text-white transition-colors">Technology</Link>
          <Link href="/#partners" className="hover:text-white transition-colors">Ecosystem</Link>
          <Link href="/verify" className="hover:text-white transition-colors">Verification</Link>
        </div>
        <Link href="/login" className="px-10 py-3 bg-white/[0.03] border border-white/5 text-white rounded-xl hover:bg-white hover:text-black transition-all duration-500 text-[9px] font-black uppercase tracking-widest active:scale-95 shadow-xl">
          Operator Access
        </Link>
      </div>
    </nav>
  );
}
