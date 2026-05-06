'use client';
import { useState, useRef } from 'react';
import { UploadCloud, Search, AlertTriangle, FileCode2, Copy, Check } from 'lucide-react';

export default function StringExtractor() {
  const [file, setFile] = useState<File | null>(null);
  const [strings, setStrings] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [copied, setCopied] = useState(false);
  const [error, setError] = useState('');
  
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setFile(e.target.files[0]);
      setStrings([]);
      setError('');
    }
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      setFile(e.dataTransfer.files[0]);
      setStrings([]);
      setError('');
    }
  };

  const extractStrings = async () => {
    if (!file) return;
    
    setLoading(true);
    setError('');
    setStrings([]);

    try {
      // Usar FileReader para ler o arquivo como ArrayBuffer (limitando a 10MB para não travar o navegador)
      const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10MB
      
      let buffer: ArrayBuffer;
      if (file.size > MAX_FILE_SIZE) {
        // Se for maior que 10MB, lê apenas os primeiros 10MB (geralmente strings estão espalhadas)
        buffer = await file.slice(0, MAX_FILE_SIZE).arrayBuffer();
        setError(`Aviso: Arquivo grande. Extraindo apenas os primeiros 10MB.`);
      } else {
        buffer = await file.arrayBuffer();
      }

      const view = new Uint8Array(buffer);
      const extracted: string[] = [];
      let currentString = '';
      
      // Lógica super rápida para extrair ASCII strings (>= 4 caracteres)
      for (let i = 0; i < view.length; i++) {
        const charCode = view[i];
        
        // Verifica caracteres imprimíveis ASCII (32 ao 126)
        if (charCode >= 32 && charCode <= 126) {
          currentString += String.fromCharCode(charCode);
        } else {
          // Quando quebra a string, se tiver tamanho >= 4, adiciona
          if (currentString.length >= 4) {
            extracted.push(currentString);
          }
          currentString = '';
        }
      }
      // Adiciona a última se existir
      if (currentString.length >= 4) {
        extracted.push(currentString);
      }

      // Remover duplicatas e ordenar por tamanho
      const uniqueStrings = Array.from(new Set(extracted)).sort((a, b) => b.length - a.length);
      setStrings(uniqueStrings);
      
    } catch (err: any) {
      setError('Erro ao processar arquivo: ' + err.message);
    } finally {
      setLoading(false);
    }
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const filteredStrings = strings.filter(s => s.toLowerCase().includes(searchTerm.toLowerCase()));

  // Destaque de strings interessantes (cheat keywords)
  const isSuspicious = (str: string) => {
    const s = str.toLowerCase();
    return s.includes('cheat') || s.includes('aimbot') || s.includes('bypass') || 
           s.includes('esp') || s.includes('wallhack') || s.includes('inject') || 
           s.includes('keyauth') || s.includes('discord.gg') || s.includes('hook') || 
           s.includes('zimo') || s.includes('pecinha');
  };

  return (
    <div className="bg-zenith-card rounded-xl border border-white/5 p-6 shadow-2xl">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Left Column: Upload Area */}
        <div className="space-y-4">
          <div 
            className="border-2 border-dashed border-white/10 rounded-xl p-8 flex flex-col items-center justify-center text-center cursor-pointer hover:bg-white/5 transition-colors group"
            onClick={() => fileInputRef.current?.click()}
            onDragOver={handleDragOver}
            onDrop={handleDrop}
          >
            <input 
              type="file" 
              ref={fileInputRef} 
              onChange={handleFileChange} 
              className="hidden" 
              accept=".exe,.dll,.sys,.bin,.txt" 
            />
            <div className="w-16 h-16 rounded-full bg-purple-500/10 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
              <FileCode2 className="text-purple-500" size={32} />
            </div>
            <h3 className="text-lg font-bold text-white mb-2">
              {file ? file.name : "Clique ou Arraste o arquivo"}
            </h3>
            <p className="text-sm text-gray-500">
              {file ? `${(file.size / 1024 / 1024).toFixed(2)} MB` : "Suporta .exe, .dll, .sys, etc."}
            </p>
            {!file && <p className="text-xs text-gray-600 mt-4">Tudo processado localmente no navegador.</p>}
          </div>

          <button 
            onClick={extractStrings}
            disabled={!file || loading}
            className="w-full py-3 bg-purple-600 hover:bg-purple-700 disabled:opacity-50 disabled:cursor-not-allowed text-white font-bold rounded-lg transition-colors flex items-center justify-center gap-2"
          >
            {loading ? (
              <span className="flex items-center gap-2">
                <UploadCloud className="animate-pulse" size={20} /> Extraindo...
              </span>
            ) : (
              <span className="flex items-center gap-2">
                <Search size={20} /> Extrair Strings
              </span>
            )}
          </button>

          {error && (
            <div className="p-3 bg-orange-500/10 border border-orange-500/20 rounded-lg flex items-start gap-2 text-sm text-orange-400">
              <AlertTriangle size={18} className="shrink-0 mt-0.5" />
              <span>{error}</span>
            </div>
          )}

          {strings.length > 0 && (
            <div className="bg-black/30 p-4 rounded-lg border border-white/5 space-y-2">
              <h4 className="text-sm font-bold text-gray-300">Estatísticas</h4>
              <p className="text-xs text-gray-500 flex justify-between">
                <span>Total de Strings:</span> <span className="text-white font-mono">{strings.length}</span>
              </p>
              <p className="text-xs text-gray-500 flex justify-between">
                <span>Suspeitas Encontradas:</span> 
                <span className="text-red-400 font-mono font-bold">
                  {strings.filter(isSuspicious).length}
                </span>
              </p>
            </div>
          )}
        </div>

        {/* Right Column: Results Area */}
        <div className="lg:col-span-2 bg-[#0a0f1a] rounded-xl border border-white/5 flex flex-col h-[600px] overflow-hidden">
          {/* Top Bar com Busca */}
          <div className="p-4 border-b border-white/5 bg-[#111827]">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" size={18} />
              <input 
                type="text" 
                placeholder="Pesquisar por 'aimbot', 'zimo', 'discord'..." 
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full bg-black/40 border border-white/10 rounded-lg pl-10 pr-4 py-2.5 text-sm text-white focus:outline-none focus:border-purple-500/50 transition-colors"
                disabled={strings.length === 0}
              />
            </div>
          </div>

          {/* Results List */}
          <div className="flex-1 overflow-y-auto p-4 space-y-2 custom-scrollbar">
            {strings.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-gray-500">
                <Search size={48} className="opacity-20 mb-4" />
                <p>Nenhuma string extraída ainda.</p>
              </div>
            ) : filteredStrings.length === 0 ? (
              <div className="text-center py-8 text-gray-500 text-sm">
                Nenhuma string encontrada para a pesquisa.
              </div>
            ) : (
              filteredStrings.map((str, idx) => {
                const susp = isSuspicious(str);
                return (
                  <div 
                    key={idx} 
                    className={`flex items-center justify-between p-2.5 rounded-lg border text-sm font-mono transition-colors group
                      ${susp ? 'bg-red-500/10 border-red-500/20 text-red-400 hover:bg-red-500/20' : 'bg-white/5 border-transparent text-gray-300 hover:bg-white/10'}`}
                  >
                    <span className="truncate pr-4 select-all">{str}</span>
                    <button 
                      onClick={() => copyToClipboard(str)}
                      className="opacity-0 group-hover:opacity-100 p-1.5 hover:bg-white/10 rounded-md transition-all text-gray-400 shrink-0"
                      title="Copiar"
                    >
                      {copied ? <Check size={16} className="text-purple-500" /> : <Copy size={16} />}
                    </button>
                  </div>
                );
              })
            )}
          </div>
        </div>
        
      </div>
    </div>
  );
}
