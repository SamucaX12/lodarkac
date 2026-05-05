import Link from 'next/link';
import { Shield } from 'lucide-react';
import TranslateWidget from './TranslateWidget';

export default function Navbar() {
  return (
    <nav className="absolute top-0 w-full z-50 px-6 py-4 flex items-center justify-between">
      {/* Logo */}
      <div className="flex items-center gap-2">
        <Shield className="text-white" size={24} />
        <span className="text-xl font-bold text-white tracking-widest">LODARK</span>
      </div>

      {/* Links (Desktop) */}
      <div className="hidden md:flex items-center gap-8 text-sm font-medium text-gray-300">
        <Link href="/#features" className="hover:text-white transition-colors">Vantagens</Link>
        <Link href="/#pricing" className="hover:text-white transition-colors">Planos</Link>
        <Link href="/#docs" className="hover:text-white transition-colors">FAQ</Link>
        <Link href="/#discord" className="hover:text-white transition-colors">Discord</Link>
      </div>

      {/* Actions */}
      <div className="flex items-center gap-6">
        <TranslateWidget />
        <Link href="/login" className="text-sm font-medium text-gray-300 hover:text-white transition-colors">
          Login
        </Link>
        <Link href="/dashboard" className="px-5 py-2 bg-white text-black font-semibold rounded-full hover:bg-gray-200 transition-colors text-sm">
          Dashboard
        </Link>
      </div>
    </nav>
  );
}
