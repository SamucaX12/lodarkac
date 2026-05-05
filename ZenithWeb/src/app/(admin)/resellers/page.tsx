'use client';

import { useState, useEffect } from 'react';
import { Users, Key, Plus, Trash2, ShieldCheck, CheckCircle } from 'lucide-react';

interface AdminKey {
  _id: string;
  key: string;
  plan: string;
  game: string;
  isActive: boolean;
  createdAt: string;
  isSubKey?: boolean;
  maxSubKeys?: number;
  generatedSubKeys?: number;
}

export default function ResellersPage() {
  const [keys, setKeys] = useState<AdminKey[]>([]);
  const [plan, setPlan] = useState('Enterprise');
  const [game, setGame] = useState('FiveM');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [copiedKey, setCopiedKey] = useState<string | null>(null);
  const [maxSubKeys, setMaxSubKeys] = useState(0);
  const [isAdmin, setIsAdmin] = useState(false);
  const [resellerStats, setResellerStats] = useState({ max: 0, generated: 0 });

  useEffect(() => {
    fetchKeys();
  }, []);

  const fetchKeys = async () => {
    try {
      const res = await fetch('/api/admin/resellers');
      const data = await res.json();
      if (res.ok) {
        setKeys(data.keys);
        setIsAdmin(data.isSuperAdmin);
        if (!data.isSuperAdmin) {
            setResellerStats({ max: data.maxSubKeys, generated: data.generatedSubKeys });
        }
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleGenerateKey = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const res = await fetch('/api/admin/resellers', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ plan, game, maxSubKeys: isAdmin ? maxSubKeys : undefined }),
      });

      const data = await res.json();

      if (res.ok) {
        setKeys([data.keyRecord, ...keys]);
        if (!isAdmin) {
            setResellerStats(prev => ({ ...prev, generated: data.generatedSubKeys }));
        }
      } else {
        setError(data.error || 'Failed to generate key');
      }
    } catch (err) {
      setError('An error occurred');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string, isSubKey: boolean) => {
    if (!confirm('Tem certeza que deseja deletar/desativar esta Key?')) return;
    
    try {
      const res = await fetch(`/api/admin/resellers?id=${id}`, {
        method: 'DELETE',
      });
      if (res.ok) {
        setKeys(keys.filter(k => k._id !== id));
        if (!isAdmin && isSubKey) {
            setResellerStats(prev => ({ ...prev, generated: Math.max(0, prev.generated - 1) }));
        }
      }
    } catch (err) {
      console.error(err);
    }
  };

  const copyToClipboard = (key: string) => {
    navigator.clipboard.writeText(key);
    setCopiedKey(key);
    setTimeout(() => setCopiedKey(null), 2000);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3">
        <div className="p-3 bg-indigo-500/10 rounded-xl text-indigo-400 border border-indigo-500/20 shadow-[0_0_15px_rgba(99,102,241,0.2)]">
          <Users size={28} />
        </div>
        <div>
          <h1 className="text-3xl font-bold text-white tracking-tight">Admin Keys (Revendedores)</h1>
          <p className="text-gray-400">Gerencie chaves de acesso ao painel para clientes e parceiros.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-1 space-y-6">
          <div className="bg-zenith-card p-6 rounded-xl border border-white/5 shadow-lg">
            <div className="flex items-center gap-2 mb-6">
              <Key className="text-zenith-primary" size={20} />
              <h2 className="text-xl font-bold text-white">Gerar Nova Key</h2>
            </div>
            
            {!isAdmin && (
              <div className="mb-4 bg-indigo-500/10 border border-indigo-500/20 p-4 rounded-lg">
                <p className="text-sm text-indigo-300 font-medium">Limites de Equipe</p>
                <div className="flex justify-between items-center mt-2">
                  <span className="text-2xl font-bold text-white">{resellerStats.generated} / {resellerStats.max}</span>
                  <span className="text-xs text-indigo-400 uppercase tracking-wider">Sub-Keys</span>
                </div>
                <div className="w-full bg-black/40 h-2 rounded-full mt-2 overflow-hidden">
                  <div 
                    className="h-full bg-indigo-500" 
                    style={{ width: `${resellerStats.max > 0 ? (resellerStats.generated / resellerStats.max) * 100 : 0}%` }}
                  ></div>
                </div>
              </div>
            )}

            <form onSubmit={handleGenerateKey} className="space-y-4">
              {isAdmin && (
                <>
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">Plano do Painel</label>
                    <select
                      value={plan}
                      onChange={(e) => setPlan(e.target.value)}
                      className="w-full bg-black/40 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-zenith-primary focus:ring-1 focus:ring-zenith-primary transition-all"
                    >
                      <option value="Mensal">Mensal</option>
                      <option value="Enterprise">Enterprise</option>
                      <option value="Privado">Privado</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">Jogo (Game)</label>
                    <select
                      value={game}
                      onChange={(e) => setGame(e.target.value)}
                      className="w-full bg-black/40 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-zenith-primary focus:ring-1 focus:ring-zenith-primary transition-all"
                    >
                      <option value="FiveM">FiveM</option>
                      <option value="FF">Free Fire</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">Limite de Sub-Keys (Para Teams)</label>
                    <input
                      type="number"
                      min="0"
                      value={maxSubKeys}
                      onChange={(e) => setMaxSubKeys(parseInt(e.target.value))}
                      placeholder="0 = Não pode criar equipe"
                      className="w-full bg-black/40 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-zenith-primary focus:ring-1 focus:ring-zenith-primary transition-all"
                    />
                    <p className="text-xs text-gray-500 mt-1">Quantas keys este cliente pode gerar para a equipe dele.</p>
                  </div>
                </>
              )}

              {!isAdmin && (
                <p className="text-sm text-gray-400 mb-4">
                  Ao gerar uma key, ela terá o mesmo plano e jogo que a sua key principal.
                </p>
              )}

              {error && <p className="text-red-400 text-sm">{error}</p>}

              <button
                type="submit"
                disabled={loading || (!isAdmin && resellerStats.generated >= resellerStats.max)}
                className="w-full mt-4 flex items-center justify-center gap-2 bg-indigo-600 hover:bg-indigo-500 text-white font-semibold py-3 rounded-lg transition-all disabled:opacity-50 shadow-[0_0_15px_rgba(99,102,241,0.3)] hover:shadow-[0_0_20px_rgba(99,102,241,0.5)]"
              >
                {loading ? 'Gerando...' : (
                  <>
                    <Plus size={18} />
                    Criar Access Key
                  </>
                )}
              </button>
            </form>
          </div>
        </div>

        <div className="lg:col-span-2">
          <div className="bg-zenith-card rounded-xl border border-white/5 shadow-lg overflow-hidden h-full flex flex-col">
            <div className="px-6 py-5 border-b border-white/5 flex items-center justify-between">
              <h2 className="text-lg font-semibold text-white">Keys de Acesso Ativas</h2>
              <span className="bg-white/5 text-gray-300 text-xs px-3 py-1 rounded-full border border-white/10">
                {keys.length} Registros
              </span>
            </div>
            
            <div className="flex-1 overflow-auto p-6">
              {keys.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center text-gray-500">
                  <ShieldCheck size={48} className="mb-4 opacity-20" />
                  <p>Nenhuma Admin Key gerada ainda.</p>
                </div>
              ) : (
                <div className="grid gap-4">
                  {keys.map((key) => (
                    <div key={key._id} className="bg-black/40 border border-white/5 rounded-lg p-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 group hover:border-white/10 transition-colors">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <span className="font-mono text-indigo-400 font-medium tracking-wide">
                            {key.key}
                          </span>
                          <span className="px-2 py-0.5 text-xs rounded-md bg-white/10 text-gray-300">
                            {key.plan}
                          </span>
                          <span className="px-2 py-0.5 text-xs rounded-md bg-zenith-primary/20 text-zenith-primary border border-zenith-primary/30">
                            {key.game}
                          </span>
                        </div>
                        <p className="text-xs text-gray-500">
                          Criada em: {new Date(key.createdAt).toLocaleString()}
                        </p>
                      </div>
                      
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => copyToClipboard(key.key)}
                          className="p-2 bg-white/5 hover:bg-white/10 text-gray-300 rounded-lg transition-colors"
                          title="Copiar Key"
                        >
                          {copiedKey === key.key ? <CheckCircle size={18} className="text-purple-400" /> : 'Copiar'}
                        </button>
                        <button
                          onClick={() => handleDelete(key._id, key.isSubKey || false)}
                          className="p-2 bg-red-500/10 hover:bg-red-500/20 text-red-400 rounded-lg transition-colors border border-red-500/20"
                          title="Deletar Key"
                        >
                          <Trash2 size={18} />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
