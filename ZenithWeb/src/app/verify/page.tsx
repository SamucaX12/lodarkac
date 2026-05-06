'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Shield, ChevronRight, Hash, Fingerprint, Lock, ShieldCheck } from 'lucide-react';

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
    <div className="w-full min-h-screen bg-[#020202] flex items-center justify-center p-6 relative overflow-hidden font-sans">
      
      {/* High-End Background Effects */}
      <div className="absolute top-[-20%] left-[-20%] w-[60%] h-[60%] bg-violet-600/5 blur-[180px] rounded-full animate-pulse" />
      <div className="absolute bottom-[-20%] right-[-20%] w-[60%] h-[60%] bg-indigo-600/5 blur-[180px] rounded-full animate-pulse" style={{ animationDelay: '2s' }} />
      
      {/* Cyber Grid Pattern */}
      <div className="absolute inset-0 z-0 opacity-[0.03] pointer-events-none" 
           style={{ backgroundImage: 'radial-gradient(circle, #fff 1px, transparent 1px)', backgroundSize: '40px 40px' }} />

      <div className="w-full max-w-xl relative z-10">
        
        {/* Header - Minimalist & Bold */}
        <div className="flex flex-col items-center text-center mb-16 animate-in fade-in slide-in-from-bottom-8 duration-1000">
          <div className="w-20 h-20 bg-white/[0.02] border border-white/5 rounded-3xl flex items-center justify-center mb-8 shadow-2xl relative group">
            <div className="absolute inset-0 bg-violet-500/10 blur-xl rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity" />
            <Fingerprint className="text-white relative z-10" size={36} />
          </div>
          <h1 className="text-5xl md:text-6xl font-black text-white uppercase italic tracking-tighter mb-4">
            AUTHENTICATE<span className="text-violet-500">.</span>
          </h1>
          <p className="text-gray-500 text-[10px] font-black uppercase tracking-[0.6em]">
            Cryptographic Access Protocol v3.0
          </p>
        </div>

        {/* Verification Card - Glassmorphism */}
        <div className="bg-white/[0.02] border border-white/5 p-12 md:p-16 rounded-[3.5rem] shadow-2xl backdrop-blur-3xl animate-in fade-in slide-in-from-bottom-12 duration-1000 delay-200 relative overflow-hidden">
           <div className="absolute top-0 right-0 p-8">
              <ShieldCheck className="text-emerald-500/20" size={64} />
           </div>

           <form onSubmit={handleSubmit} className="space-y-12 relative z-10">
             <div className="space-y-4 text-center">
                <label className="text-[10px] font-black text-gray-600 uppercase tracking-[0.5em]">Enter Session Identifier</label>
                <div className="relative">
                  <input
                    type="text"
                    maxLength={6}
                    value={pin}
                    onChange={(e) => setPin(e.target.value.replace(/\D/g, ''))}
                    placeholder="------"
                    className="w-full bg-transparent border-none text-center text-7xl md:text-8xl font-black italic tracking-[0.3em] text-white placeholder-gray-900 focus:outline-none focus:ring-0 transition-all"
                    autoFocus
                  />
                </div>
             </div>

             <button
               type="submit"
               disabled={pin.length !== 6 || loading}
               className="w-full group py-8 bg-white text-black rounded-[2rem] font-black uppercase tracking-[0.4em] text-[11px] flex items-center justify-center gap-6 hover:bg-violet-600 hover:text-white transition-all duration-500 disabled:opacity-20 active:scale-95 shadow-2xl"
             >
               {loading ? (
                 <>
                   <div className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
                   DECRYPTING...
                 </>
               ) : (
                 <>
                   INITIALIZE DECRYPT
                   <ChevronRight size={20} className="group-hover:translate-x-2 transition-transform" />
                 </>
               )}
             </button>
           </form>
        </div>

        {/* Footer Info */}
        <div className="mt-20 flex flex-col items-center gap-8 animate-in fade-in duration-1000 delay-500">
           <div className="flex items-center gap-10">
              <div className="flex items-center gap-3">
                 <Lock size={14} className="text-gray-700" />
                 <span className="text-[10px] font-black text-gray-700 uppercase tracking-widest">AES-256 SECURED</span>
              </div>
              <div className="w-px h-4 bg-white/5" />
              <div className="flex items-center gap-3">
                 <Shield size={14} className="text-gray-700" />
                 <span className="text-[10px] font-black text-gray-700 uppercase tracking-widest">CSI-7 PROTOCOL</span>
              </div>
           </div>
           <p className="text-[9px] font-black uppercase tracking-[0.4em] text-gray-800">
             Developed by <span className="text-gray-600">Samuca</span> & <span className="text-gray-600">Lodark</span>
           </p>
        </div>
      </div>
    </div>
  );
}
