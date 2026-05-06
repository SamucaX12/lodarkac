'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Shield, Key, User, Lock, Mail, Zap, Terminal, ShieldCheck } from 'lucide-react';

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
    <div className="w-full min-h-screen flex items-center justify-center bg-[#020202] font-sans relative overflow-hidden">
      
      {/* BACKGROUND EFFECTS */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-violet-600/5 blur-[150px] rounded-full pointer-events-none" />
      <div className="absolute inset-0 z-0 opacity-[0.02] pointer-events-none" 
           style={{ backgroundImage: 'linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)', backgroundSize: '50px 50px' }} />

      <div className="w-full max-w-lg relative z-10 p-1 animate-in zoom-in-95 duration-700">
        <div className="bg-white/[0.02] border border-white/5 p-12 md:p-16 rounded-[3.5rem] shadow-2xl backdrop-blur-3xl relative overflow-hidden">
           
           <div className="absolute top-0 right-0 p-10 opacity-[0.05]">
              <Terminal size={120} />
           </div>

           <div className="flex flex-col items-center mb-12 text-center relative z-10">
              <div className="w-24 h-24 mb-8 bg-white/[0.03] rounded-3xl flex items-center justify-center border border-white/10 shadow-inner group overflow-hidden">
                 <img 
                   src="https://i.postimg.cc/cJrtFJDM/image-removebg-preview.png" 
                   alt="Logo" 
                   className="w-14 h-14 object-contain drop-shadow-[0_0_15px_rgba(139,92,246,0.6)] group-hover:scale-110 transition-transform" 
                 />
              </div>
              <h1 className="text-4xl font-black text-white tracking-tighter uppercase italic">
                 {isLogin ? 'OPERATOR LOGIN' : 'CREATE ACCOUNT'}
              </h1>
              <p className="text-gray-600 text-[10px] font-black uppercase tracking-[0.6em] mt-3">
                 Samuca Forensic Control
              </p>
           </div>

           {/* Tabs - ULTRA CLEAN */}
           <div className="flex bg-white/[0.03] p-1.5 rounded-2xl mb-10 border border-white/5 relative z-10">
             <button
               type="button"
               onClick={() => { setIsLogin(true); setError(''); }}
               className={`flex-1 py-4 text-[10px] font-black uppercase tracking-widest rounded-xl transition-all ${isLogin ? 'bg-white text-black shadow-2xl' : 'text-gray-500 hover:text-white'}`}
             >
               SIGN IN
             </button>
             <button
               type="button"
               onClick={() => { setIsLogin(false); setError(''); }}
               className={`flex-1 py-4 text-[10px] font-black uppercase tracking-widest rounded-xl transition-all ${!isLogin ? 'bg-white text-black shadow-2xl' : 'text-gray-500 hover:text-white'}`}
             >
               REGISTER
             </button>
           </div>

           <form onSubmit={handleSubmit} className="space-y-6 relative z-10">
             <div>
               <div className="relative group">
                 <User className="absolute left-6 top-1/2 -translate-y-1/2 text-gray-700 group-focus-within:text-violet-500 transition-colors" size={18} />
                 <input
                   type="text"
                   value={username}
                   onChange={(e) => setUsername(e.target.value)}
                   className="w-full bg-white/[0.03] border border-white/5 rounded-2xl pl-16 pr-6 py-5 text-sm text-white placeholder-gray-800 focus:outline-none focus:border-violet-500/30 transition-all font-medium"
                   placeholder="Operator Username"
                   required
                 />
               </div>
             </div>

             <div>
               <div className="relative group">
                 <Lock className="absolute left-6 top-1/2 -translate-y-1/2 text-gray-700 group-focus-within:text-violet-500 transition-colors" size={18} />
                 <input
                   type="password"
                   value={password}
                   onChange={(e) => setPassword(e.target.value)}
                   className="w-full bg-white/[0.03] border border-white/5 rounded-2xl pl-16 pr-6 py-5 text-sm text-white placeholder-gray-800 focus:outline-none focus:border-violet-500/30 transition-all font-medium"
                   placeholder="••••••••"
                   required
                 />
               </div>
             </div>

             {!isLogin && (
               <div className="animate-in fade-in slide-in-from-top-4 duration-500 space-y-6">
                 <div className="relative group">
                   <Mail className="absolute left-6 top-1/2 -translate-y-1/2 text-gray-700 group-focus-within:text-violet-500 transition-colors" size={18} />
                   <input
                     type="email"
                     value={email}
                     onChange={(e) => setEmail(e.target.value)}
                     className="w-full bg-white/[0.03] border border-white/5 rounded-2xl pl-16 pr-6 py-5 text-sm text-white placeholder-gray-800 focus:outline-none focus:border-violet-500/30 transition-all font-medium"
                     placeholder="Contact Email"
                   />
                 </div>
                 <div className="relative group">
                   <Key className="absolute left-6 top-1/2 -translate-y-1/2 text-gray-700 group-focus-within:text-violet-500 transition-colors" size={18} />
                   <input
                     type="text"
                     value={accessKey}
                     onChange={(e) => setAccessKey(e.target.value)}
                     className="w-full bg-white/[0.03] border border-white/5 rounded-2xl pl-16 pr-6 py-5 text-sm text-violet-400 font-mono placeholder-gray-800 focus:outline-none focus:border-violet-500/30 transition-all"
                     placeholder="LDK-XXXX-XXXX"
                     required={!isLogin}
                   />
                 </div>
               </div>
             )}

             {error && (
               <div className="py-4 px-6 rounded-2xl bg-red-500/10 border border-red-500/20 animate-in zoom-in-95">
                 <p className="text-[10px] font-black uppercase tracking-widest text-center text-red-400">
                   {error}
                 </p>
               </div>
             )}

             <button
               type="submit"
               disabled={loading}
               className="w-full mt-8 bg-white hover:bg-violet-600 text-black hover:text-white font-black tracking-[0.4em] text-[11px] uppercase py-6 rounded-2xl transition-all shadow-2xl disabled:opacity-50 active:scale-95"
             >
               {loading ? 'PROCESSING...' : (isLogin ? 'INITIALIZE SESSION' : 'REGISTER OPERATOR')}
             </button>
           </form>

           <div className="mt-12 flex justify-center items-center gap-4 opacity-20">
              <ShieldCheck size={16} />
              <span className="text-[9px] font-black uppercase tracking-widest">Protocol Secured & Verified</span>
           </div>
        </div>
      </div>
    </div>
  );
}
