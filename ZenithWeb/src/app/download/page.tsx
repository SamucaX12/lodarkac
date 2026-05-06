'use client';

import { useEffect, useState, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { Download, ShieldCheck, Cpu, CheckCircle2, Shield, ArrowRight } from 'lucide-react';

function DownloadContent() {
  const searchParams = useSearchParams();
  const pin = searchParams.get('pin');
  
  const [config, setConfig] = useState<any>(null);
  const [pinInfo, setPinInfo] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
       try {
          const configRes = await fetch('/api/config');
          const configData = await configRes.json();
          setConfig(configData);

          if (pin) {
             const pinRes = await fetch(`/api/pin-info?code=${pin}`);
             if (pinRes.ok) {
                const pinData = await pinRes.json();
                setPinInfo(pinData);
             }
          }
       } catch (e) {
          console.error(e);
       }
       setLoading(false);
    };
    fetchData();
  }, [pin]);

  const handleCopyPin = () => {
    if (pin) {
      navigator.clipboard.writeText(pin);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#050505] flex items-center justify-center">
        <div className="w-10 h-10 border-2 border-white/10 border-t-white rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#050505] text-white flex flex-col items-center justify-center p-6 font-sans selection:bg-violet-500/30">
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-violet-600/5 blur-[120px] rounded-full" />
      </div>

      <main className="relative z-10 w-full max-w-xl animate-in fade-in slide-in-from-bottom-8 duration-1000">
        <div className="bg-black border border-white/5 rounded-[3rem] p-12 lg:p-16 flex flex-col items-center text-center shadow-2xl">
          
          <div className="w-20 h-20 bg-white rounded-[2rem] flex items-center justify-center mb-10 shadow-2xl">
            <Shield size={32} className="text-black" />
          </div>

          <h1 className="text-4xl font-black tracking-tighter uppercase italic mb-2">
            DEPLOY<br />
            <span className="text-gray-700">SCANNER.</span>
          </h1>
          
          <p className="text-[10px] font-black text-violet-500 uppercase tracking-[0.5em] mb-12">
            {pinInfo?.game || 'System'} Forensic Engine
          </p>

          {pin ? (
            <div className="w-full bg-white/[0.02] border border-white/5 rounded-3xl p-10 mb-12 group hover:border-white/10 transition-colors">
              <span className="text-[10px] font-black text-gray-600 uppercase tracking-widest block mb-6">Identification Protocol</span>
              <div className="flex flex-col items-center gap-4">
                <span className="text-7xl font-black tracking-tighter italic text-white">
                  {pin}
                </span>
                <button 
                  onClick={handleCopyPin}
                  className="px-6 py-2 rounded-full bg-white/5 border border-white/10 text-[9px] font-black uppercase tracking-widest text-gray-500 hover:text-white transition-all flex items-center gap-2"
                >
                  {copied ? <CheckCircle2 size={12} className="text-emerald-500" /> : <Shield size={12} />}
                  {copied ? 'Copied to Clipboard' : 'Copy PIN Code'}
                </button>
              </div>
            </div>
          ) : (
            <div className="w-full py-10 rounded-3xl border border-dashed border-white/5 mb-12">
              <span className="text-[10px] font-black text-red-500 uppercase tracking-widest">No PIN identified</span>
            </div>
          )}

          <div className="w-full space-y-6">
            <a 
              href={config?.downloadLink || '#'}
              className="group w-full py-6 bg-white text-black rounded-2xl font-black text-xs uppercase tracking-widest flex items-center justify-center gap-3 hover:bg-violet-600 hover:text-white transition-all duration-500 active:scale-95"
            >
              Start Analysis
              <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
            </a>
            
            <div className="pt-6 flex items-center justify-center gap-4 text-[9px] font-black text-gray-700 uppercase tracking-widest">
              <div className="flex items-center gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                Live Node
              </div>
              <div className="w-px h-3 bg-white/5" />
              <span>SHA-256 Verified</span>
              <div className="w-px h-3 bg-white/5" />
              <span>v2.5.0</span>
            </div>
          </div>
        </div>

        <p className="mt-12 text-[9px] font-black text-gray-700 uppercase tracking-[0.4em] text-center opacity-40">
          © 2026 Lodark AC. All rights reserved.
        </p>
      </main>
    </div>
  );
}

export default function DownloadPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-[#050505] flex items-center justify-center">
        <div className="w-10 h-10 border-2 border-white/10 border-t-white rounded-full animate-spin"></div>
      </div>
    }>
      <DownloadContent />
    </Suspense>
  );
}
