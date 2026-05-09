'use client';

import { useState } from 'react';
import { UserPlus, Loader2, Key } from 'lucide-react';
import { useRouter } from 'next/navigation';

interface Props {
  ownerKey: string;
  maxSubKeys: number;
  generatedCount: number;
}

export default function GenerateSubKeyButton({ ownerKey, maxSubKeys, generatedCount }: Props) {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleGenerate = async () => {
    if (generatedCount >= maxSubKeys) return;
    
    setLoading(true);
    try {
      const res = await fetch('/api/admin/team/generate', {
        method: 'POST',
      });
      
      if (res.ok) {
        router.refresh();
      } else {
        const data = await res.json();
        alert(data.error || 'Erro ao gerar key');
      }
    } catch (error) {
      alert('Erro de conexão');
    }
    setLoading(false);
  };

  const isDisabled = generatedCount >= maxSubKeys || loading;

  return (
    <button
      onClick={handleGenerate}
      disabled={isDisabled}
      className={`
        flex items-center gap-3 px-10 py-5 rounded-[1.5rem] font-black text-[10px] uppercase tracking-[0.4em] transition-all active:scale-95 shadow-2xl
        ${isDisabled 
          ? 'bg-white/5 text-slate-700 cursor-not-allowed border border-white/5' 
          : 'bg-white text-black hover:bg-purple-600 hover:text-white border border-transparent'
        }
      `}
    >
      {loading ? (
        <Loader2 className="animate-spin w-4 h-4" />
      ) : (
        <UserPlus size={16} />
      )}
      {loading ? 'GERANDO...' : 'ADICIONAR MEMBRO'}
    </button>
  );
}
