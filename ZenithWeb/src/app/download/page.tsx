'use client';

import { useEffect, useState, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { Download, ShieldCheck, Cpu, CheckCircle2 } from 'lucide-react';
import Image from 'next/image';

function DownloadContent() {
  const searchParams = useSearchParams();
  const pin = searchParams.get('pin');
  
  const [config, setConfig] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    fetch('/api/config')
      .then(res => res.json())
      .then(data => {
        setConfig(data);
        setLoading(false);
      });
  }, []);

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
        <div className="w-12 h-12 border-4 border-indigo-500 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#020617] flex flex-col items-center justify-center p-4 text-white relative overflow-hidden font-sans">
      {/* Background Elements */}
      <div className="absolute inset-0 bg-[#020617] z-0" />
      
      {/* Particles Effect */}
      <div className="absolute inset-0 z-0 opacity-40 mix-blend-screen pointer-events-none" style={{ backgroundImage: 'radial-gradient(circle at center, #9333ea 1px, transparent 1px)', backgroundSize: '30px 30px' }}></div>
      <div className="absolute inset-0 z-0 opacity-20 pointer-events-none animate-pulse" style={{ backgroundImage: 'radial-gradient(circle at center, #c084fc 2px, transparent 2px)', backgroundSize: '80px 80px' }}></div>
      
      <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-purple-600/20 blur-[150px] rounded-full pointer-events-none"></div>
      <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-indigo-600/10 blur-[150px] rounded-full pointer-events-none"></div>

      <div className="z-10 w-full max-w-md bg-[#0B0E14] border border-white/10 backdrop-blur-2xl p-10 rounded-3xl shadow-[0_0_50px_rgba(147,51,234,0.15)] flex flex-col items-center text-center relative overflow-hidden">
        {/* Glow inner */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-32 bg-purple-500/20 blur-[60px] rounded-full pointer-events-none" />

        <Image 
          src="https://cdn.discordapp.com/attachments/1446714823999094847/1500269450379792474/image-removebg-preview.png?ex=69f7d24e&is=69f680ce&hm=f66174eb851135edbe36990f905797d75996f5920679d4abc79569ee583511cb&"
          alt="Lodark Logo"
          width={80}
          height={80}
          unoptimized
          className="mb-6 drop-shadow-[0_0_15px_rgba(147,51,234,0.4)]"
        />
        
        <h1 className="text-3xl font-black mb-2 tracking-widest text-white">{config?.scannerName || 'LODARK AC'}</h1>
        <p className="text-gray-400 text-xs uppercase tracking-widest font-bold mb-8">Ferramenta oficial de análise</p>

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
              className="mt-6 text-xs font-bold uppercase tracking-widest text-gray-500 hover:text-purple-400 transition-colors flex items-center justify-center gap-2 w-full"
            >
              {copied ? <CheckCircle2 size={16} className="text-green-500" /> : <ShieldCheck size={16} />}
              {copied ? <span className="text-green-500">PIN Copiado!</span> : 'Clique para copiar'}
            </button>
          </div>
        ) : (
          <div className="w-full bg-red-500/10 border border-red-500/20 rounded-xl p-4 mb-8">
            <p className="text-red-400 text-xs font-bold uppercase tracking-widest">Nenhum PIN fornecido.</p>
          </div>
        )}

        <div className="w-full space-y-4 relative z-10">
          {config?.downloadLink || 'https://github.com/SamucaX12/zenith-scanner-site/raw/main/Lodark%20AC.exe' ? (
            <a 
              href={config?.downloadLink || 'https://github.com/SamucaX12/zenith-scanner-site/raw/main/Lodark%20AC.exe'}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full flex items-center justify-center gap-3 bg-purple-600 hover:bg-purple-500 text-white font-black tracking-widest text-xs uppercase py-5 px-6 rounded-xl transition-all shadow-[0_0_20px_rgba(147,51,234,0.3)] hover:shadow-[0_0_30px_rgba(147,51,234,0.5)] hover:-translate-y-1"
            >
              <Download size={18} />
              Baixar Scanner Oficial
            </a>
          ) : (
            <button disabled className="w-full flex items-center justify-center gap-3 bg-gray-800/50 text-gray-500 font-black tracking-widest text-xs uppercase py-5 px-6 rounded-xl cursor-not-allowed">
              <Download size={18} />
              Download indisponível
            </button>
          )}

          <div className="flex items-center justify-center gap-2 text-[10px] uppercase font-bold text-gray-600 tracking-widest pt-4">
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
        <div className="w-12 h-12 border-4 border-indigo-500 border-t-transparent rounded-full animate-spin"></div>
      </div>
    }>
      <DownloadContent />
    </Suspense>
  );
}
