'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Shield, ChevronRight, Hash, Fingerprint } from 'lucide-react';

export default function VerifyPage() {
  const [pin, setPin] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (pin.length === 6) {
      setLoading(true);
      router.push(`/result/${pin}`);
    }
  };

  return (
    <div className="w-full min-h-screen bg-[#050505] flex items-center justify-center p-6 relative overflow-hidden">
      {/* Background Orbs */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-violet-600/10 blur-[120px] rounded-full" />
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-indigo-600/10 blur-[120px] rounded-full" />

      <div className="w-full max-w-lg relative z-10">
        <div className="flex flex-col items-center text-center mb-16 animate-in fade-in slide-in-from-bottom-4 duration-1000">
          <div className="w-16 h-16 bg-white/5 rounded-2xl flex items-center justify-center border border-white/10 mb-8 group hover:scale-110 transition-transform cursor-pointer">
            <Fingerprint className="text-violet-500 group-hover:text-white transition-colors" size={32} />
          </div>
          <h1 className="text-4xl md:text-5xl font-black text-white uppercase italic tracking-tighter mb-4">
            VERIFY<span className="text-gray-700">.PIN</span>
          </h1>
          <p className="text-gray-500 text-[10px] font-black uppercase tracking-[0.4em]">
            Enter your 6-digit cryptographic session identifier
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-12 animate-in fade-in slide-in-from-bottom-8 duration-1000 delay-200">
          <div className="relative group">
            <div className="absolute -inset-1 bg-gradient-to-r from-violet-600 to-indigo-600 rounded-[2rem] opacity-20 group-focus-within:opacity-40 transition-opacity blur-lg" />
            <div className="relative flex items-center gap-6 bg-[#0A0A0A] p-4 rounded-[2rem] border border-white/5 group-focus-within:border-white/10 transition-all">
              <div className="w-16 h-16 rounded-2xl bg-white/5 flex items-center justify-center text-gray-600 group-focus-within:text-white transition-colors">
                <Hash size={24} />
              </div>
              <input
                type="text"
                maxLength={6}
                value={pin}
                onChange={(e) => setPin(e.target.value.replace(/\D/g, ''))}
                placeholder="000000"
                className="flex-1 bg-transparent border-none text-4xl font-black italic tracking-[0.5em] text-white placeholder-gray-800 focus:outline-none focus:ring-0"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={pin.length !== 6 || loading}
            className="w-full group py-8 bg-white text-black rounded-[2rem] font-black uppercase tracking-[0.3em] text-xs flex items-center justify-center gap-4 hover:bg-violet-600 hover:text-white transition-all duration-500 disabled:opacity-20 active:scale-95 shadow-2xl"
          >
            {loading ? 'Decrypting Session...' : 'Open Forensic Report'}
            <ChevronRight size={18} className="group-hover:translate-x-2 transition-transform" />
          </button>
        </form>

        <div className="mt-24 pt-8 border-t border-white/5 flex justify-between items-center opacity-30 animate-in fade-in duration-1000 delay-500">
           <div className="flex items-center gap-2">
              <Shield size={12} />
              <span className="text-[9px] font-black uppercase tracking-widest italic">Samuca Core v3.0</span>
           </div>
           <span className="text-[9px] font-black uppercase tracking-widest text-gray-500 italic">Protocol: CSI-7_SECURED</span>
        </div>
      </div>
    </div>
  );
}
