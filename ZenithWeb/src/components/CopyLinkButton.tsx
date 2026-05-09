'use client';

import { useState } from 'react';
import { Link as LinkIcon, CheckCircle2 } from 'lucide-react';

export default function CopyLinkButton({ pinCode }: { pinCode: string }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    const link = `${window.location.origin}/download?pin=${pinCode}`;
    navigator.clipboard.writeText(link);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <button 
      onClick={handleCopy}
      className={`px-3 py-1.5 flex items-center gap-1.5 text-xs font-medium rounded-lg border transition-colors ${
        copied 
          ? 'bg-purple-500/10 text-purple-400 border-purple-500/20' 
          : 'bg-indigo-500/10 hover:bg-indigo-500/20 text-indigo-400 border-indigo-500/20'
      }`}
      title="Copiar link de download limpo para o cliente"
    >
      {copied ? <CheckCircle2 size={14} /> : <LinkIcon size={14} />}
      {copied ? 'Copiado!' : 'Link'}
    </button>
  );
}
