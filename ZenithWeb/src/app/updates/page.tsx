import { Shield, Zap, Bug, GitCommit, ArrowLeft } from 'lucide-react';
import Link from 'next/link';

export const metadata = {
  title: 'Changelog & Updates | Lodark AC',
  description: 'Acompanhe as atualizações, detecções adicionadas e melhorias do Lodark Anti-Cheat.',
};

export default function UpdatesPage() {
  const updates = [
    {
      version: 'v2.1.0',
      date: 'Maio 01, 2026',
      type: 'major',
      title: 'Heurística YARA e Forense UEFI',
      description: 'Implementação de detecção de Rootkits de baixo nível e aprimoramento da leitura de memória.',
      changes: [
        { type: 'added', text: 'Adicionada análise de Forense UEFI (Secure Boot & Cadeia de Boot).' },
        { type: 'added', text: 'Integração de regras YARA para bootkits BlackLotus e CosmicStrand.' },
        { type: 'added', text: 'Detecção de injeção de DLL (CreateRemoteThread, ManualMap).' },
        { type: 'added', text: 'Detecção de ferramentas de Engenharia Reversa (x64dbg, Cheat Engine, IDA).' },
        { type: 'added', text: 'Nova categoria de detecção de Overlay / ESP Hacks (DirectX Overlay, DrawESP).' },
        { type: 'improved', text: 'Otimização na varredura de processos e emuladores (Bluestacks, MSI).' },
      ]
    },
    {
      version: 'v2.0.5',
      date: 'Abril 28, 2026',
      type: 'minor',
      title: 'Caça ao Zimo e Real Pecinhas',
      description: 'Adicionadas assinaturas pesadas contra os principais cheats públicos e privados do cenário.',
      changes: [
        { type: 'added', text: 'Bloqueio de API e Discord RPC do Real Pecinhas.' },
        { type: 'added', text: 'Detecção de autenticação ZeroAuth e KeyAuth.' },
        { type: 'added', text: 'Blacklist de tamanho físico para Zimo External, Internal e Free.' },
        { type: 'added', text: 'Varredura por Chams (.dll Hijacking) nos diretórios de emulador.' },
        { type: 'removed', text: 'Falsos positivos com o serviço Sysmon removidos.' },
      ]
    },
    {
      version: 'v2.0.0',
      date: 'Abril 15, 2026',
      type: 'major',
      title: 'Lançamento do Lodark AC Enterprise',
      description: 'Reestruturação completa do sistema com novo painel web e cliente C++.',
      changes: [
        { type: 'added', text: 'Painel web Next.js com relatórios detalhados em tempo real.' },
        { type: 'added', text: 'Auto-Login Inteligente via leitura de nome de arquivo (PIN).' },
        { type: 'added', text: 'Sistema de Revendedores (Admin Keys).' },
        { type: 'added', text: 'Proteção Anti-Dump (Erase PE Header) e Anti-Debug no cliente C++.' },
      ]
    }
  ];

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'added': return <Zap size={14} className="text-purple-400 mt-0.5" />;
      case 'improved': return <Shield size={14} className="text-purple-400 mt-0.5" />;
      case 'removed': return <Bug size={14} className="text-red-400 mt-0.5" />;
      default: return <GitCommit size={14} className="text-gray-400 mt-0.5" />;
    }
  };

  const getBadgeColor = (type: string) => {
    switch (type) {
      case 'added': return 'bg-purple-500/10 text-purple-400 border-purple-500/20';
      case 'improved': return 'bg-purple-500/10 text-purple-400 border-purple-500/20';
      case 'removed': return 'bg-red-500/10 text-red-400 border-red-500/20';
      default: return 'bg-gray-500/10 text-gray-400 border-gray-500/20';
    }
  };

  return (
    <div className="min-h-screen bg-[#0a0a0f] text-gray-200 py-20 px-4 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-zenith-primary/10 blur-[120px] rounded-full"></div>
        <div className="absolute bottom-[-10%] right-[-10%] w-[30%] h-[30%] bg-purple-600/10 blur-[100px] rounded-full"></div>
      </div>

      <div className="max-w-4xl mx-auto relative z-10">
        
        <div className="mb-12 flex flex-col items-center text-center">
          <Link href="/" className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors mb-6 self-start">
            <ArrowLeft size={16} /> Voltar para o início
          </Link>
          
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4 tracking-tight">
            Changelog & <span className="text-transparent bg-clip-text bg-gradient-to-r from-zenith-primary to-purple-400">Updates</span>
          </h1>
          <p className="text-gray-400 max-w-2xl text-lg">
            Acompanhe o desenvolvimento contínuo do Lodark AC. Nós atualizamos mais rápido que os cheats.
          </p>
        </div>

        <div className="space-y-12 relative before:absolute before:inset-0 before:ml-5 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-white/10 before:to-transparent">
          
          {updates.map((update, index) => (
            <div key={index} className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active">
              
              {/* Timeline dot */}
              <div className="flex items-center justify-center w-10 h-10 rounded-full border border-white/10 bg-[#111827] shadow shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 shadow-zenith-primary/20">
                <GitCommit size={18} className={update.type === 'major' ? 'text-zenith-primary' : 'text-gray-400'} />
              </div>
              
              {/* Card */}
              <div className="w-[calc(100%-4rem)] md:w-[calc(50%-3rem)] p-6 rounded-2xl bg-[#111827]/80 border border-white/5 backdrop-blur-sm hover:border-white/10 transition-colors shadow-xl">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-zenith-primary font-bold text-xl">{update.version}</span>
                  <span className="text-xs text-gray-500 font-mono">{update.date}</span>
                </div>
                
                <h3 className="text-lg font-bold text-white mb-2">{update.title}</h3>
                <p className="text-sm text-gray-400 mb-6">{update.description}</p>
                
                <div className="space-y-3">
                  {update.changes.map((change, cIdx) => (
                    <div key={cIdx} className="flex items-start gap-3">
                      {getTypeIcon(change.type)}
                      <span className="text-sm text-gray-300 leading-relaxed">{change.text}</span>
                    </div>
                  ))}
                </div>
              </div>

            </div>
          ))}

        </div>
      </div>
    </div>
  );
}
