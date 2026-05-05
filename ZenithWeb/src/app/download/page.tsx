'use client';

import { useEffect, useState, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { Download, ShieldCheck, Cpu, CheckCircle2, Shield } from 'lucide-react';
import Image from 'next/image';

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
        <div className="w-12 h-12 border-4 border-purple-500 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#020617] flex flex-col items-center justify-center p-4 text-white relative overflow-hidden font-sans">
      {/* Background Elements */}
      <div className="absolute inset-0 bg-[#020617] z-0" />
      
      {/* Particles Effect */}
      <div className="absolute inset-0 z-0 opacity-40 mix-blend-screen pointer-events-none" style={{ backgroundImage: 'radial-gradient(circle at center, #9333ea 1px, transparent 1px)', backgroundSize: '30px 30px' }}></div>
      
      <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-purple-600/20 blur-[150px] rounded-full pointer-events-none"></div>
      <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-indigo-600/10 blur-[150px] rounded-full pointer-events-none"></div>

      <div className="z-10 w-full max-w-md bg-[#0B0E14] border border-white/10 backdrop-blur-2xl p-10 rounded-3xl shadow-[0_0_50px_rgba(147,51,234,0.15)] flex flex-col items-center text-center relative overflow-hidden">
        
        <div className="flex items-center gap-4 mb-8">
           <img 
             src="https://i.postimg.cc/h4bqhRnY/image.png" 
             alt="ZK Logo" 
             className="w-12 h-12 object-contain drop-shadow-[0_0_10px_rgba(168,85,247,0.5)]" 
           />
           <div className="w-px h-8 bg-white/10" />
           <img 
             src="https://i.postimg.cc/RhvywqmQ/image.png" 
             alt="Quebrada Logo" 
             className="w-12 h-12 object-contain drop-shadow-[0_0_10px_rgba(168,85,247,0.5)]" 
           />
        </div>

        <div className="relative mb-6">
           <div className="absolute inset-0 bg-purple-500/20 blur-xl rounded-full" />
           <div className="relative w-20 h-20 bg-white/5 rounded-2xl border border-white/10 flex items-center justify-center overflow-hidden p-3">
              <img 
                src={pinInfo?.game === 'FiveM' ? "https://i.postimg.cc/yYsJwjQ6/image.png" : "https://i.postimg.cc/L5z1j0xv/image.png"} 
                alt="Game Logo" 
                className="w-full h-full object-contain" 
              />
           </div>
        </div>
        
        <h1 className="text-3xl font-black mb-2 tracking-widest text-white">{config?.scannerName || 'LODARK AC'}</h1>
        <p className="text-gray-400 text-[10px] uppercase tracking-[0.3em] font-black mb-8">
           Sistema de Análise {pinInfo?.game === 'FiveM' ? 'FiveM' : 'Free Fire'}
        </p>

        {pin ? (
          <div className="w-full bg-black/60 border border-white/5 rounded-2xl p-6 mb-8 relative group hover:border-purple-500/30 transition-colors shadow-inner">
            <p className="text-[10px] text-purple-400 uppercase tracking-widest mb-3 font-black">Seu PIN de Acesso</p>
            <div className="flex items-center justify-center gap-3">
              <span className="text-5xl font-black text-white tracking-widest drop-shadow-[0_0_10px_rgba(255,255,255,0.2)]">
                {pin}
              </span>
            </div>
            <button 
              onClick={handleCopyPin}
              className="mt-6 text-[9px] font-black uppercase tracking-widest text-gray-500 hover:text-purple-400 transition-colors flex items-center justify-center gap-2 w-full"
            >
              {copied ? <CheckCircle2 size={14} className="text-green-500" /> : <Shield size={14} />}
              {copied ? <span className="text-green-500">PIN Copiado!</span> : 'Clique para copiar PIN'}
            </button>
          </div>
        ) : (
          <div className="w-full bg-red-500/10 border border-red-500/20 rounded-xl p-4 mb-8">
            <p className="text-red-400 text-xs font-bold uppercase tracking-widest">Nenhum PIN fornecido.</p>
          </div>
        )}

        <div className="w-full space-y-4 relative z-10">
          <a 
            href={config?.downloadLink || 'https://github.com/SamucaX12/zenith-scanner-site/raw/main/Lodark%20AC.exe'}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full flex items-center justify-center gap-3 bg-white hover:bg-slate-100 text-black font-black tracking-widest text-[10px] uppercase py-5 px-6 rounded-2xl transition-all shadow-[0_0_30px_rgba(255,255,255,0.1)] hover:-translate-y-1"
          >
            <Download size={18} />
            Baixar Scanner {pinInfo?.game === 'FiveM' ? 'FiveM' : 'Free Fire'}
          </a>

          <div className="flex items-center justify-center gap-2 text-[9px] uppercase font-black text-gray-600 tracking-[0.2em] pt-4">
            <Cpu size={14} />
            <span>Processamento em nuvem seguro</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function DownloadPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-[#050505] flex items-center justify-center">
        <div className="w-12 h-12 border-4 border-purple-500 border-t-transparent rounded-full animate-spin"></div>
      </div>
    }>
      <DownloadContent />
    </Suspense>
  );
}
