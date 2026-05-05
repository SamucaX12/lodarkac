import Link from 'next/link';
import { PlayCircle, Check, ShieldCheck, Settings, Search, HelpCircle, CheckCircle2, Zap, MessageSquare, Heart, Shield, Terminal } from 'lucide-react';

export default function Home() {
  return (
    <div className="relative w-full min-h-screen bg-[#050505] overflow-x-hidden flex flex-col font-sans text-slate-200">
      {/* Premium Background Gradient */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute -top-[20%] -left-[10%] w-[70%] h-[70%] bg-purple-900/10 blur-[120px] rounded-full" />
        <div className="absolute top-[20%] -right-[10%] w-[50%] h-[50%] bg-blue-900/5 blur-[100px] rounded-full" />
      </div>
      
      {/* Navbar */}
      <nav className="flex justify-between items-center px-8 py-6 sticky top-0 z-50 bg-black/40 backdrop-blur-xl border-b border-white/5">
        <div className="flex items-center gap-4">
          <img 
            src="https://i.postimg.cc/cJrtFJDM/image-removebg-preview.png" 
            alt="Lodark AC Logo" 
            className="w-10 h-10 object-contain drop-shadow-[0_0_10px_rgba(168,85,247,0.5)]" 
          />
          <div className="flex flex-col">
            <span className="text-xl font-black text-white tracking-tighter leading-none">LODARK</span>
            <span className="text-[10px] font-bold text-purple-500 tracking-[0.3em] uppercase">Advanced Security</span>
          </div>
        </div>
        <div className="hidden md:flex items-center gap-8">
          <a href="#features" className="text-sm font-bold text-gray-400 hover:text-white transition-colors uppercase tracking-widest">Recursos</a>
          <a href="#partners" className="text-sm font-bold text-gray-400 hover:text-white transition-colors uppercase tracking-widest">Parceiros</a>
          <a href="#pricing" className="text-sm font-bold text-gray-400 hover:text-white transition-colors uppercase tracking-widest">Planos</a>
          <a href="#team" className="text-sm font-bold text-gray-400 hover:text-white transition-colors uppercase tracking-widest">Equipe</a>
        </div>
        <Link href="/login" className="px-6 py-2.5 rounded-full bg-white/5 hover:bg-white/10 text-white text-xs font-black uppercase tracking-widest transition-all border border-white/10 hover:border-purple-500/50 shadow-xl">
          Painel Admin
        </Link>
      </nav>

      {/* Hero Section */}
      <main className="flex flex-col items-center justify-center relative z-10 px-6 pt-32 pb-24 min-h-[90vh]">
        <div className="max-w-5xl text-center space-y-10 w-full mx-auto">
          
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-purple-500/10 border border-purple-500/20 mb-4">
            <Zap size={14} className="text-purple-400" />
            <span className="text-[10px] font-black text-purple-400 uppercase tracking-widest">Versão 2.2.0 Estável</span>
          </div>

          <h1 className="text-6xl md:text-8xl font-black text-white tracking-tighter leading-[0.9] drop-shadow-[0_0_30px_rgba(255,255,255,0.05)]">
            FEITO POR QUEM<br />
            <span className="bg-gradient-to-r from-purple-400 via-magenta-500 to-purple-600 bg-clip-text text-transparent">ENTENDE DE BYPASS.</span>
          </h1>
          
          <p className="text-lg md:text-xl text-slate-400 max-w-2xl mx-auto font-medium leading-relaxed">
            Desenvolvido por <span className="text-white font-bold">Samuca</span> & <span className="text-white font-bold">Lodark</span>. A solução definitiva contra Zimo, Internal Cheats e Partições Invisíveis.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-6 pt-6">
            <Link 
              href="/dashboard"
              className="flex items-center gap-3 px-10 py-5 bg-white text-black font-black rounded-full transition-all hover:scale-105 shadow-[0_0_40px_rgba(255,255,255,0.2)] text-sm uppercase tracking-widest"
            >
              <PlayCircle size={20} />
              Iniciar Lodark AC
            </Link>
            <a 
              href="https://discord.gg/tSQEGQqHKe"
              target="_blank"
              className="px-10 py-5 bg-black/40 border border-white/10 hover:bg-white/5 text-white font-black rounded-full transition-all hover:scale-105 text-sm uppercase tracking-widest backdrop-blur-md flex items-center gap-3"
            >
              <MessageSquare size={18} />
              Discord Oficial
            </a>
          </div>

          {/* Platform Logos */}
          <div className="pt-20 flex flex-wrap justify-center items-center gap-12 opacity-40 grayscale hover:grayscale-0 transition-all duration-500">
            <img src="https://i.postimg.cc/L5z1j0xv/image.png" alt="Free Fire" className="h-12 object-contain" />
            <img src="https://i.postimg.cc/yYsJwjQ6/image.png" alt="FiveM" className="h-10 object-contain" />
            <div className="h-8 w-px bg-white/10 hidden md:block" />
            <span className="text-xs font-black tracking-[0.4em] uppercase text-white/50">Trusted by Professional Leagues</span>
          </div>
        </div>
      </main>

      {/* Stats Bar Section */}
      <section className="relative z-10 py-16 border-y border-white/5 bg-black/20 backdrop-blur-sm">
        <div className="max-w-6xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className="flex flex-col items-center group">
              <span className="text-4xl font-black text-white group-hover:text-purple-500 transition-colors">3+</span>
              <span className="text-[10px] text-slate-500 font-black uppercase tracking-[0.2em] mt-2">Anos de Experiência</span>
            </div>
            <div className="flex flex-col items-center group">
              <span className="text-4xl font-black text-white group-hover:text-purple-500 transition-colors">18k+</span>
              <span className="text-[10px] text-slate-500 font-black uppercase tracking-[0.2em] mt-2">Deteções Únicas</span>
            </div>
            <div className="flex flex-col items-center group">
              <span className="text-4xl font-black text-white group-hover:text-purple-500 transition-colors">24/7</span>
              <span className="text-[10px] text-slate-500 font-black uppercase tracking-[0.2em] mt-2">Proteção Ativa</span>
            </div>
            <div className="flex flex-col items-center group">
              <span className="text-4xl font-black text-white group-hover:text-purple-500 transition-colors">100%</span>
              <span className="text-[10px] text-slate-500 font-black uppercase tracking-[0.2em] mt-2">Cloud Synced</span>
            </div>
        </div>
      </section>

      {/* Partners Section */}
      <section id="partners" className="relative z-10 py-32 px-6 overflow-hidden">
        <div className="max-w-6xl mx-auto text-center relative z-10">
          <div className="mb-24">
            <h2 className="text-4xl md:text-5xl font-black text-white mb-6 tracking-tighter uppercase">Cidades & Parceiros</h2>
            <p className="text-slate-500 max-w-xl mx-auto font-medium">As maiores comunidades competitivas que utilizam nossa tecnologia.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            {/* Quebrada RP */}
            <a href="https://discord.gg/cqCprMUEEq" target="_blank" className="group p-1 rounded-3xl bg-gradient-to-b from-white/5 to-transparent hover:from-green-500/20 transition-all duration-500">
              <div className="bg-[#0A0A0A] rounded-[calc(1.5rem-1px)] p-10 flex flex-col items-center text-center h-full">
                <div className="w-24 h-24 mb-6 rounded-full overflow-hidden border-2 border-white/5 shadow-2xl group-hover:border-green-500/50 transition-all">
                  <img src="https://i.postimg.cc/RhvywqmQ/image.png" alt="Quebrada RP" className="w-full h-full object-cover" />
                </div>
                <h3 className="text-xl font-black text-white mb-2 uppercase">Quebrada RP</h3>
                <p className="text-slate-500 text-[10px] font-bold uppercase tracking-widest">Cidade Parceira</p>
              </div>
            </a>

            {/* ZK PVP */}
            <a href="https://discord.gg/zkpvpgg" target="_blank" className="group p-1 rounded-3xl bg-gradient-to-b from-white/5 to-transparent hover:from-yellow-500/20 transition-all duration-500">
              <div className="bg-[#0A0A0A] rounded-[calc(1.5rem-1px)] p-10 flex flex-col items-center text-center h-full">
                <div className="w-24 h-24 mb-6 rounded-full overflow-hidden border-2 border-white/5 shadow-2xl group-hover:border-yellow-500/50 transition-all">
                  <img src="https://i.postimg.cc/h4bqhRnY/image.png" alt="ZK PVP" className="w-full h-full object-cover" />
                </div>
                <h3 className="text-xl font-black text-white mb-2 uppercase">ZK PVP</h3>
                <p className="text-slate-500 text-[10px] font-bold uppercase tracking-widest">Cidade Parceira</p>
              </div>
            </a>

            {/* Team Lodark */}
            <a href="https://discord.gg/tSQEGQqHKe" target="_blank" className="group p-1 rounded-3xl bg-gradient-to-b from-white/5 to-transparent hover:from-purple-500/20 transition-all duration-500">
              <div className="bg-[#0A0A0A] rounded-[calc(1.5rem-1px)] p-10 flex flex-col items-center text-center h-full">
                <div className="w-24 h-24 mb-6 rounded-full overflow-hidden border-2 border-white/5 shadow-2xl group-hover:border-purple-500/50 transition-all">
                  <img src="https://i.postimg.cc/cJrtFJDM/image-removebg-preview.png" alt="Team Lodark" className="w-full h-full object-contain p-2" />
                </div>
                <h3 className="text-xl font-black text-white mb-2 uppercase">Team Lodark</h3>
                <p className="text-slate-500 text-[10px] font-bold uppercase tracking-widest">Screen Share Elite</p>
              </div>
            </a>
          </div>
        </div>
      </section>

      {/* Team Credits Section */}
      <section id="team" className="relative z-10 py-32 px-6 bg-black/40">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-24">
            <h2 className="text-4xl md:text-5xl font-black text-white mb-6 tracking-tighter uppercase font-outline-2">DESENVOLVIDO POR</h2>
            <p className="text-slate-500 max-w-xl mx-auto font-medium">Conheça as mentes por trás da segurança do Lodark AC.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 max-w-4xl mx-auto">
            {/* Samuca */}
            <div className="group relative">
               <div className="absolute -inset-1 bg-gradient-to-r from-purple-600 to-magenta-600 rounded-[3rem] blur opacity-25 group-hover:opacity-60 transition duration-1000 group-hover:duration-200"></div>
               <div className="relative bg-[#0A0A0A] rounded-[2.8rem] p-10 border border-white/5 flex flex-col items-center text-center">
                  <div className="w-32 h-32 mb-8 rounded-3xl overflow-hidden border-2 border-white/10 shadow-2xl group-hover:scale-105 transition-all duration-500">
                    <img src="https://i.postimg.cc/3xbh7jhh/image.png" alt="Samuca" className="w-full h-full object-cover" />
                  </div>
                  <div className="flex items-center gap-2 mb-2">
                    <Terminal size={18} className="text-purple-500" />
                    <h3 className="text-2xl font-black text-white tracking-tighter uppercase">Samuca Ant Bypass</h3>
                  </div>
                  <span className="text-[10px] font-black text-purple-400 uppercase tracking-[0.4em] mb-6">Lead Developer / Forensic Engineer</span>
                  
                  <div className="grid grid-cols-1 w-full gap-3">
                    <div className="bg-white/5 px-4 py-3 rounded-2xl border border-white/5 flex justify-between items-center">
                      <span className="text-[9px] font-black text-gray-500 uppercase">User</span>
                      <span className="text-xs font-bold text-white">samucadev1</span>
                    </div>
                    <div className="bg-white/5 px-4 py-3 rounded-2xl border border-white/5 flex justify-between items-center">
                      <span className="text-[9px] font-black text-gray-500 uppercase">Discord ID</span>
                      <span className="text-xs font-mono text-purple-400">1312495175376834647</span>
                    </div>
                  </div>
               </div>
            </div>

            {/* Lodark */}
            <div className="group relative">
               <div className="absolute -inset-1 bg-gradient-to-r from-blue-600 to-purple-600 rounded-[3rem] blur opacity-25 group-hover:opacity-60 transition duration-1000 group-hover:duration-200"></div>
               <div className="relative bg-[#0A0A0A] rounded-[2.8rem] p-10 border border-white/5 flex flex-col items-center text-center">
                  <div className="w-32 h-32 mb-8 rounded-3xl overflow-hidden border-2 border-white/10 shadow-2xl group-hover:scale-105 transition-all duration-500">
                    <img src="https://i.postimg.cc/bJ1fQKtQ/image.png" alt="Lodark" className="w-full h-full object-cover" />
                  </div>
                  <div className="flex items-center gap-2 mb-2">
                    <Shield size={18} className="text-blue-500" />
                    <h3 className="text-2xl font-black text-white tracking-tighter uppercase">!ⱽᵘˡᵍᵒ 𝖑𝖔𝖉𝖆𝖗𝐤.𝖉𝖑𝖑</h3>
                  </div>
                  <span className="text-[10px] font-black text-blue-400 uppercase tracking-[0.4em] mb-6">CEO / Founder / Security Specialist</span>
                  
                  <div className="grid grid-cols-1 w-full gap-3">
                    <div className="bg-white/5 px-4 py-3 rounded-2xl border border-white/5 flex justify-between items-center">
                      <span className="text-[9px] font-black text-gray-500 uppercase">User</span>
                      <span className="text-xs font-bold text-white">lodark1</span>
                    </div>
                    <div className="bg-white/5 px-4 py-3 rounded-2xl border border-white/5 flex justify-between items-center">
                      <span className="text-[9px] font-black text-gray-500 uppercase">Discord ID</span>
                      <span className="text-xs font-mono text-blue-400">1231375867419299930</span>
                    </div>
                  </div>
               </div>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="relative z-10 py-32 px-6 bg-[#030303]">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-24">
            <h2 className="text-4xl md:text-5xl font-black text-white mb-6 tracking-tighter">PLANOS PROFISSIONAIS</h2>
            <p className="text-slate-500 max-w-xl mx-auto font-medium">Escolha o nível de proteção ideal para sua comunidade.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Mensal */}
            <div className="bg-[#0A0A0A] border border-white/5 rounded-3xl p-10 flex flex-col hover:border-white/20 transition-all group">
              <h3 className="text-sm font-black text-slate-500 uppercase tracking-widest mb-4">Start</h3>
              <div className="flex items-baseline gap-2 mb-8">
                <span className="text-5xl font-black text-white">R$ 80</span>
                <span className="text-slate-500 text-sm">/mês</span>
              </div>
              <ul className="space-y-4 mb-10 flex-1">
                <li className="flex items-center gap-3 text-sm text-slate-400 group-hover:text-slate-200 transition-colors"><Check size={16} className="text-purple-500" /> PINs Ilimitados</li>
                <li className="flex items-center gap-3 text-sm text-slate-400 group-hover:text-slate-200 transition-colors"><Check size={16} className="text-purple-500" /> Scan Completo do Sistema</li>
                <li className="flex items-center gap-3 text-sm text-slate-400 group-hover:text-slate-200 transition-colors"><Check size={16} className="text-purple-500" /> Atualizações Mensais</li>
              </ul>
              <button className="w-full py-4 rounded-2xl bg-white/5 border border-white/10 text-white font-black text-xs uppercase tracking-widest hover:bg-white/10 transition-all">Adquirir Agora</button>
            </div>

            {/* Enterprise */}
            <div className="bg-purple-600 rounded-3xl p-10 flex flex-col relative shadow-[0_0_50px_rgba(168,85,247,0.3)] transform md:-translate-y-6">
              <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-white text-purple-600 text-[10px] font-black px-4 py-1.5 rounded-full uppercase tracking-widest">Mais Popular</div>
              <h3 className="text-sm font-black text-white/70 uppercase tracking-widest mb-4">Enterprise</h3>
              <div className="flex items-baseline gap-2 mb-8">
                <span className="text-5xl font-black text-white">R$ 120</span>
                <span className="text-white/60 text-sm">/mês</span>
              </div>
              <ul className="space-y-4 mb-10 flex-1">
                <li className="flex items-center gap-3 text-sm text-white/90 font-bold"><Check size={16} /> Personalização Total</li>
                <li className="flex items-center gap-3 text-sm text-white/90 font-bold"><Check size={16} /> Cores e Nomes Custom</li>
                <li className="flex items-center gap-3 text-sm text-white/90 font-bold"><Check size={16} /> Strings & Yara Privadas</li>
                <li className="flex items-center gap-3 text-sm text-white/90 font-bold"><Check size={16} /> Suporte Prioritário</li>
              </ul>
              <button className="w-full py-4 rounded-2xl bg-white text-purple-600 font-black text-xs uppercase tracking-widest hover:bg-slate-100 transition-all shadow-xl">Adquirir Enterprise</button>
            </div>

            {/* Privado */}
            <div className="bg-[#0A0A0A] border border-white/5 rounded-3xl p-10 flex flex-col hover:border-white/20 transition-all group">
              <h3 className="text-sm font-black text-slate-500 uppercase tracking-widest mb-4">Privado</h3>
              <div className="flex items-baseline gap-2 mb-8">
                <span className="text-5xl font-black text-white">R$ 200</span>
                <span className="text-slate-500 text-sm">/mês</span>
              </div>
              <ul className="space-y-4 mb-10 flex-1">
                <li className="flex items-center gap-3 text-sm text-slate-400 group-hover:text-slate-200 transition-colors"><Check size={16} className="text-purple-500" /> Tudo do Enterprise</li>
                <li className="flex items-center gap-3 text-sm text-slate-400 group-hover:text-slate-200 transition-colors"><Check size={16} className="text-purple-500" /> Detects DMA & UEFI</li>
                <li className="flex items-center gap-3 text-sm text-slate-400 group-hover:text-slate-200 transition-colors"><Check size={16} className="text-purple-500" /> Webhook Discord (Auto-Log)</li>
                <li className="flex items-center gap-3 text-sm text-slate-400 group-hover:text-slate-200 transition-colors"><Check size={16} className="text-purple-500" /> Atualizações Semanais</li>
              </ul>
              <button className="w-full py-4 rounded-2xl bg-white/5 border border-white/10 text-white font-black text-xs uppercase tracking-widest hover:bg-white/10 transition-all">Adquirir Privado</button>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative z-10 py-16 px-8 border-t border-white/5 bg-black">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="flex items-center gap-3">
            <img src="https://i.postimg.cc/cJrtFJDM/image-removebg-preview.png" alt="Logo" className="w-8 h-8 opacity-50" />
            <span className="text-xs font-black text-white/30 uppercase tracking-[0.3em]">Lodark Advanced Security</span>
          </div>
          <p className="text-[10px] font-bold text-slate-600 uppercase tracking-widest">© 2026 Lodark AC. Todos os direitos reservados.</p>
          <div className="flex gap-6">
            <a href="#" className="text-slate-600 hover:text-white transition-colors"><ShieldCheck size={20} /></a>
            <a href="#" className="text-slate-600 hover:text-white transition-colors"><Settings size={20} /></a>
          </div>
        </div>
      </footer>
    </div>
  );
}
