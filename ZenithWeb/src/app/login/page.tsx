'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Shield, Key, User, Lock, Mail, Zap, Terminal, ShieldCheck, Eye, EyeOff, Github, Globe } from 'lucide-react';
import Link from 'next/link';

export default function LoginPage() {
  const [isLogin, setIsLogin] = useState(true);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [accessKey, setAccessKey] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    const endpoint = isLogin ? '/api/admin/login' : '/api/admin/register';
    const payload = isLogin 
      ? { username, password }
      : { username, password, email, key: accessKey };

    try {
      const res = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      if (res.ok) {
        window.location.href = '/dashboard';
      } else {
        const data = await res.json();
        setError(data.error || 'Erro na requisição');
      }
    } catch (err) {
      setError('Erro de conexão com o servidor');
    }
    setLoading(false);
  };

  return (
    <div className="w-full min-h-screen flex items-center justify-center bg-[#020202] font-sans relative overflow-hidden selection:bg-purple-500/30">
      
      {/* OCEAN STYLE BACKGROUND */}
      <div className="absolute inset-0 bg-gradient-to-b from-purple-900/5 to-transparent pointer-events-none" />
      <div className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] bg-purple-600/5 blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[500px] h-[500px] bg-violet-600/5 blur-[120px] rounded-full pointer-events-none" />

      <div className="w-full max-w-[480px] relative z-10 p-6 animate-in fade-in slide-in-from-bottom-4 duration-1000">
        
        {/* LOGO AREA */}
        <div className="flex flex-col items-center mb-10 text-center">
            <div className="w-20 h-20 mb-6 bg-white/[0.02] border border-white/5 rounded-[2rem] flex items-center justify-center backdrop-blur-xl shadow-2xl group transition-all duration-500 hover:border-purple-500/30">
                <Shield size={32} className="text-white group-hover:text-purple-500 transition-colors" />
            </div>
            <h1 className="text-2xl font-black text-white tracking-tighter uppercase italic">
                LODARK<span className="text-purple-600">.AC</span>
            </h1>
            <p className="text-[9px] text-slate-500 font-black uppercase tracking-[0.5em] mt-3">
                Acesso ao Terminal de Auditoria
            </p>
        </div>

        {/* LOGIN CARD */}
        <div className="bg-[#050505] border border-white/5 rounded-[2.5rem] p-10 md:p-12 shadow-[0_40px_100px_rgba(0,0,0,0.8)] relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-purple-500/20 to-transparent" />
            
            <div className="mb-10">
                <h2 className="text-xl font-black text-white uppercase tracking-tight italic">
                    {isLogin ? 'Bem-vindo de volta' : 'Criar Operador'}
                </h2>
                <p className="text-xs font-bold text-slate-600 mt-2 uppercase tracking-wide">
                    {isLogin ? 'Entre com suas credenciais para continuar' : 'Cadastre-se para acessar o ecossistema'}
                </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                    <label className="block text-[10px] font-black text-slate-500 uppercase tracking-widest mb-3 ml-1">Usuário ou E-mail</label>
                    <div className="relative group">
                        <User className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-700 group-focus-within:text-purple-500 transition-colors" size={16} />
                        <input
                            type="text"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            className="w-full bg-white/[0.02] border border-white/5 rounded-2xl pl-14 pr-6 py-4.5 text-xs text-white placeholder-slate-800 focus:outline-none focus:border-purple-500/30 transition-all font-bold"
                            placeholder="lodark_admin"
                            required
                        />
                    </div>
                </div>

                <div>
                    <label className="block text-[10px] font-black text-slate-500 uppercase tracking-widest mb-3 ml-1">Senha de Acesso</label>
                    <div className="relative group">
                        <Lock className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-700 group-focus-within:text-purple-500 transition-colors" size={16} />
                        <input
                            type={showPassword ? 'text' : 'password'}
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full bg-white/[0.02] border border-white/5 rounded-2xl pl-14 pr-14 py-4.5 text-xs text-white placeholder-slate-800 focus:outline-none focus:border-purple-500/30 transition-all font-bold"
                            placeholder="••••••••"
                            required
                        />
                        <button 
                            type="button"
                            onClick={() => setShowPassword(!showPassword)}
                            className="absolute right-5 top-1/2 -translate-y-1/2 text-slate-700 hover:text-white transition-colors"
                        >
                            {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                        </button>
                    </div>
                </div>

                {!isLogin && (
                    <div className="animate-in fade-in slide-in-from-top-2 duration-500 space-y-6">
                        <div>
                            <label className="block text-[10px] font-black text-slate-500 uppercase tracking-widest mb-3 ml-1">E-mail para Contato</label>
                            <input
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="w-full bg-white/[0.02] border border-white/5 rounded-2xl px-6 py-4.5 text-xs text-white placeholder-slate-800 focus:outline-none focus:border-purple-500/30 transition-all font-bold"
                                placeholder="samu@lodark.com"
                            />
                        </div>
                        <div>
                            <label className="block text-[10px] font-black text-slate-500 uppercase tracking-widest mb-3 ml-1">Chave Enterprise (License)</label>
                            <input
                                type="text"
                                value={accessKey}
                                onChange={(e) => setAccessKey(e.target.value)}
                                className="w-full bg-white/[0.02] border border-white/5 rounded-2xl px-6 py-4.5 text-xs text-purple-400 font-mono placeholder-slate-800 focus:outline-none focus:border-purple-500/30 transition-all"
                                placeholder="LDK-XXXX-XXXX-XXXX"
                                required={!isLogin}
                            />
                        </div>
                    </div>
                )}

                {error && (
                    <div className="py-4 px-6 rounded-2xl bg-red-500/5 border border-red-500/10 animate-in zoom-in-95 text-center">
                        <p className="text-[10px] font-black uppercase tracking-widest text-red-500">
                            {error}
                        </p>
                    </div>
                )}

                <button
                    type="submit"
                    disabled={loading}
                    className="w-full bg-white text-black font-black tracking-[0.3em] text-[10px] uppercase py-5 rounded-2xl hover:bg-purple-600 hover:text-white transition-all shadow-[0_20px_40px_rgba(255,255,255,0.05)] disabled:opacity-50 active:scale-95"
                >
                    {loading ? 'PROCESSANDO...' : (isLogin ? 'INICIAR SESSÃO' : 'CRIAR OPERADOR')}
                </button>
            </form>

            <div className="mt-8 pt-8 border-t border-white/5 text-center">
                <button 
                    onClick={() => { setIsLogin(!isLogin); setError(''); }}
                    className="text-[10px] font-black text-slate-600 uppercase tracking-widest hover:text-purple-500 transition-all"
                >
                    {isLogin ? 'Não tem conta? Cadastre-se' : 'Já possui conta? Entre aqui'}
                </button>
            </div>
        </div>

        {/* FOOTER LINKS */}
        <div className="mt-10 flex justify-center items-center gap-8 opacity-20">
            <Link href="/" className="text-[9px] font-black uppercase tracking-widest hover:opacity-100 transition-opacity flex items-center gap-2">
                <Globe size={12} /> Home
            </Link>
            <a href="https://discord.gg/teamlodark" target="_blank" className="text-[9px] font-black uppercase tracking-widest hover:opacity-100 transition-opacity flex items-center gap-2">
                <Globe size={12} /> Discord
            </a>
            <span className="text-[9px] font-black uppercase tracking-widest flex items-center gap-2">
                <ShieldCheck size={12} /> AES-256
            </span>
        </div>

      </div>
    </div>
  );
}
