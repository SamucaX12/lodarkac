'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Shield, Key, User, Lock, Mail, Zap } from 'lucide-react';

export default function LoginPage() {
  const [isLogin, setIsLogin] = useState(true);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [accessKey, setAccessKey] = useState('');
  const [twoFactorEnabled, setTwoFactorEnabled] = useState(false);
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
      : { username, password, email, key: accessKey, twoFactorEnabled };

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
    <div className="w-full min-h-screen flex items-center justify-center bg-[#050505] font-sans relative overflow-hidden">
      {/* Decorative Blur */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-purple-600/10 blur-[120px] rounded-full pointer-events-none" />
      
      <div className="w-full max-w-md p-10 bg-[#0A0A0A] rounded-[2.5rem] border border-white/5 shadow-2xl relative z-10 backdrop-blur-sm">
        
        <div className="flex flex-col items-center mb-10 text-center">
          <div className="w-20 h-20 mb-6 bg-white/5 rounded-3xl flex items-center justify-center border border-white/10 shadow-inner group">
             <img 
               src="https://i.postimg.cc/cJrtFJDM/image-removebg-preview.png" 
               alt="Logo" 
               className="w-12 h-12 object-contain drop-shadow-[0_0_10px_rgba(168,85,247,0.5)] group-hover:scale-110 transition-transform" 
             />
          </div>
          <h1 className="text-3xl font-black text-white tracking-tighter uppercase">
            {isLogin ? 'Painel de Acesso' : 'Registrar'}
          </h1>
          <p className="text-gray-500 text-[10px] font-black uppercase tracking-[0.4em] mt-3">
            Lodark Advanced Security
          </p>
        </div>

        {/* Tabs */}
        <div className="flex bg-white/5 p-1.5 rounded-2xl mb-8 border border-white/5">
          <button
            type="button"
            onClick={() => { setIsLogin(true); setError(''); }}
            className={`flex-1 py-3 text-[10px] font-black uppercase tracking-widest rounded-xl transition-all ${isLogin ? 'bg-white text-black shadow-xl' : 'text-gray-500 hover:text-white'}`}
          >
            Acessar
          </button>
          <button
            type="button"
            onClick={() => { setIsLogin(false); setError(''); }}
            className={`flex-1 py-3 text-[10px] font-black uppercase tracking-widest rounded-xl transition-all ${!isLogin ? 'bg-white text-black shadow-xl' : 'text-gray-500 hover:text-white'}`}
          >
            Registrar
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-[9px] font-black text-gray-600 uppercase tracking-widest mb-2 px-1">Usuário</label>
            <div className="relative group">
              <User className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-600 group-focus-within:text-white transition-colors" size={18} />
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full bg-white/5 border border-white/5 rounded-2xl pl-12 pr-4 py-4 text-sm text-white placeholder-gray-700 focus:outline-none focus:border-white/20 focus:bg-white/10 transition-all"
                placeholder="Seu usuário"
                required
              />
            </div>
          </div>

          <div>
            <label className="block text-[9px] font-black text-gray-600 uppercase tracking-widest mb-2 px-1">Senha</label>
            <div className="relative group">
              <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-600 group-focus-within:text-white transition-colors" size={18} />
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-white/5 border border-white/5 rounded-2xl pl-12 pr-4 py-4 text-sm text-white placeholder-gray-700 focus:outline-none focus:border-white/20 focus:bg-white/10 transition-all"
                placeholder="••••••••"
                required
              />
            </div>
          </div>

          {!isLogin && (
            <div className="animate-in fade-in slide-in-from-top-4 duration-500 space-y-5">
              <div>
                <label className="block text-[9px] font-black text-gray-600 uppercase tracking-widest mb-2 px-1">E-mail</label>
                <div className="relative group">
                  <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-600 group-focus-within:text-white transition-colors" size={18} />
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full bg-white/5 border border-white/5 rounded-2xl pl-12 pr-4 py-4 text-sm text-white placeholder-gray-700 focus:outline-none focus:border-white/20 focus:bg-white/10 transition-all"
                    placeholder="contato@exemplo.com"
                  />
                </div>
              </div>
              <div>
                <label className="block text-[9px] font-black text-gray-600 uppercase tracking-widest mb-2 px-1">Chave de Acesso</label>
                <div className="relative group">
                  <Key className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-600 group-focus-within:text-white transition-colors" size={18} />
                  <input
                    type="text"
                    value={accessKey}
                    onChange={(e) => setAccessKey(e.target.value)}
                    className="w-full bg-white/5 border border-white/5 rounded-2xl pl-12 pr-4 py-4 text-sm text-purple-400 font-mono placeholder-gray-700 focus:outline-none focus:border-white/20 focus:bg-white/10 transition-all"
                    placeholder="LDK-XXXX-XXXX"
                    required={!isLogin}
                  />
                </div>
              </div>
              
              <div className="flex items-center space-x-3 px-1">
                <div className="relative flex items-center">
                  <input
                    type="checkbox"
                    id="2fa"
                    checked={twoFactorEnabled}
                    onChange={(e) => setTwoFactorEnabled(e.target.checked)}
                    className="w-5 h-5 rounded-lg border-white/10 bg-white/5 text-purple-600 focus:ring-offset-black transition-all cursor-pointer appearance-none checked:bg-purple-600 border"
                  />
                  {twoFactorEnabled && <Zap size={12} className="absolute left-1 text-white pointer-events-none" />}
                </div>
                <label htmlFor="2fa" className="text-[10px] font-bold text-gray-500 uppercase tracking-widest cursor-pointer hover:text-gray-300 transition-colors">
                  Ativar 2FA de Segurança
                </label>
              </div>
            </div>
          )}

          {error && (
            <div className={`py-4 px-6 rounded-2xl animate-in zoom-in-95 duration-300 border ${error.includes('banido') ? 'bg-red-600/20 border-red-500 shadow-[0_0_20px_rgba(239,68,68,0.2)]' : 'bg-red-500/10 border-red-500/20'}`}>
              <p className={`text-[10px] font-black uppercase tracking-widest text-center leading-relaxed ${error.includes('banido') ? 'text-red-400' : 'text-red-400'}`}>
                {error}
              </p>
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full mt-6 bg-white hover:bg-slate-100 text-black font-black tracking-[0.2em] text-xs uppercase py-5 rounded-[1.5rem] transition-all shadow-xl disabled:opacity-50 hover:scale-[1.02] active:scale-95"
          >
            {loading ? 'Processando...' : (isLogin ? 'Entrar no Painel' : 'Criar minha Conta')}
          </button>
        </form>
      </div>
    </div>
  );
}
