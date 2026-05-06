'use client';

import { useState, useEffect } from 'react';
import { Users, ShieldAlert, Key, MapPin, MonitorPlay, Shield, Circle, User, Lock } from 'lucide-react';

export const dynamic = 'force-dynamic';

export default function StaffAreaPage() {
  const [users, setUsers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchUsers = async () => {
    try {
      const res = await fetch('/api/admin/staff');
      if (res.ok) {
        const data = await res.json();
        setUsers(data.users || []);
      }
    } catch (e) {
      console.error(e);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchUsers();
    const interval = setInterval(fetchUsers, 30000);
    return () => clearInterval(interval);
  }, []);

  const handleRoleChange = async (userId: string, newRole: string) => {
    await fetch('/api/admin/staff', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ userId, role: newRole }),
    });
    fetchUsers();
  };

  const handlePlanChange = async (userId: string, newPlan: string) => {
    await fetch('/api/admin/staff', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ userId, plan: newPlan }),
    });
    fetchUsers();
  };

  const handleRevoke = async (userId: string) => {
    if (!confirm('Revogar chave deste usuário?')) return;
    await fetch('/api/admin/staff', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ userId, revokeKey: true }),
    });
    fetchUsers();
  };

  const handleBan = async (userId: string) => {
    if (!confirm('BANIR permanentemente este usuário?')) return;
    await fetch('/api/admin/staff', {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ userId }),
    });
    fetchUsers();
  };

  const isOnline = (lastActive: string) => {
    if (!lastActive) return false;
    const now = new Date();
    const activeDate = new Date(lastActive);
    const diff = (now.getTime() - activeDate.getTime()) / 1000 / 60;
    return diff < 5;
  };

  const stats = {
    total: users.length,
    online: users.filter(u => isOnline(u.lastActive)).length,
    admins: users.filter(u => u.role === 'admin' || u.role === 'superadmin').length
  };

  return (
    <div className="space-y-12 max-w-[1400px] mx-auto pb-20 px-4">
      {/* Header & Stats */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        <div className="lg:col-span-2 flex items-center gap-6 bg-[#0B0E14] p-10 rounded-3xl border border-white/5 shadow-2xl">
          <div className="w-16 h-16 rounded-2xl bg-purple-500/10 flex items-center justify-center border border-purple-500/20">
            <Users className="text-purple-400" size={32} />
          </div>
          <div>
            <h1 className="text-3xl font-black text-white tracking-tight uppercase italic">STAFF <span className="text-gray-700">CORE.</span></h1>
            <p className="text-[10px] text-gray-500 uppercase tracking-[0.4em] font-black mt-2">Team management & security protocols</p>
          </div>
        </div>

        {[
          { label: 'Network Total', value: stats.total, color: 'text-white' },
          { label: 'Active Nodes', value: stats.online, color: 'text-emerald-500', pulse: true },
          { label: 'Security Auth', value: stats.admins, color: 'text-purple-500' }
        ].map((stat, i) => (
          <div key={i} className="bg-[#0B0E14] p-10 rounded-3xl border border-white/5 flex flex-col justify-between">
             <span className="text-[10px] font-black text-gray-700 uppercase tracking-widest">{stat.label}</span>
             <div className="flex items-center gap-3">
                {stat.pulse && <div className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />}
                <span className={`text-4xl font-black italic tracking-tighter ${stat.color}`}>{stat.value}</span>
             </div>
          </div>
        ))}
      </div>

      <div className="bg-[#0B0E14] rounded-[2.5rem] border border-white/5 overflow-hidden shadow-2xl">
        {loading ? (
          <div className="p-20 text-center flex flex-col items-center gap-4">
             <div className="w-8 h-8 border-2 border-purple-500 border-t-transparent rounded-full animate-spin" />
             <span className="text-[10px] font-black text-gray-600 uppercase tracking-widest">Synchronizing Core Data...</span>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-black/20 border-b border-white/5 text-[10px] font-black uppercase tracking-[0.3em] text-gray-500">
                  <th className="p-8">IDENTITY</th>
                  <th className="p-8">STATUS</th>
                  <th className="p-8">AUTHENTICATION</th>
                  <th className="p-8">LOCATION</th>
                  <th className="p-8">PROTOCOL</th>
                  <th className="p-8 text-right">ACTIONS</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {users.map((user) => (
                  <tr key={user._id} className="hover:bg-white/[0.02] transition-colors group">
                    <td className="p-8">
                      <div className="flex items-center gap-5">
                        <div className="w-14 h-14 rounded-2xl bg-white/5 flex items-center justify-center border border-white/5 group-hover:border-purple-500/30 transition-all overflow-hidden">
                           {user.username.toLowerCase().includes('samuca') ? (
                             <img src="https://i.postimg.cc/3xbh7jhh/image.png" className="w-full h-full object-cover" alt="Avatar" />
                           ) : user.username.toLowerCase().includes('lodark') ? (
                             <img src="https://i.postimg.cc/bJ1fQKtQ/image.png" className="w-full h-full object-cover" alt="Avatar" />
                           ) : (
                             <User className="text-gray-600 group-hover:text-purple-400 transition-colors" size={24} />
                           )}
                        </div>
                        <div className="flex flex-col">
                           <span className="font-black text-white uppercase italic tracking-tight">{user.username}</span>
                           <span className="text-[9px] font-bold text-gray-600 uppercase tracking-widest">User ID: #{user._id.substring(18)}</span>
                        </div>
                      </div>
                    </td>
                    <td className="p-8">
                      {isOnline(user.lastActive) ? (
                        <div className="inline-flex items-center gap-3 px-3 py-1 rounded-full bg-emerald-500/5 border border-emerald-500/10 text-emerald-500">
                          <Circle size={6} fill="currentColor" className="animate-pulse" />
                          <span className="text-[9px] font-black uppercase tracking-widest">Node Active</span>
                        </div>
                      ) : (
                        <div className="inline-flex items-center gap-3 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-gray-600">
                          <Circle size={6} fill="currentColor" />
                          <span className="text-[9px] font-black uppercase tracking-widest">Offline</span>
                        </div>
                      )}
                    </td>
                    <td className="p-8">
                      <div className="flex flex-col gap-1">
                        <span className="text-xs font-black font-mono text-purple-400 tracking-wider">
                           {user.adminKey.startsWith('REVOKED') ? 'REVOKED' : user.adminKey.substring(0, 12) + '...'}
                        </span>
                        <select 
                           value={user.plan || 'Standard'} 
                           onChange={(e) => handlePlanChange(user._id, e.target.value)}
                           className="bg-transparent border-none p-0 text-[9px] font-black uppercase text-gray-600 focus:ring-0 cursor-pointer hover:text-white transition-colors"
                        >
                           <option value="Standard">Standard</option>
                           <option value="Enterprise">Enterprise</option>
                           <option value="Elite">Elite</option>
                        </select>
                      </div>
                    </td>
                    <td className="p-8">
                      <div className="flex items-center gap-2 text-gray-500 font-mono text-xs">
                        <MapPin size={14} className="opacity-30" />
                        <span>{user.lastIp || 'N/A'}</span>
                      </div>
                    </td>
                    <td className="p-8">
                       <select 
                          value={user.role} 
                          onChange={(e) => handleRoleChange(user._id, e.target.value)}
                          disabled={user.role === 'superadmin'}
                          className={`px-3 py-1.5 rounded-lg border text-[9px] font-black uppercase tracking-widest focus:ring-0 cursor-pointer transition-all ${
                             user.role === 'superadmin' ? 'bg-red-500/10 border-red-500/20 text-red-400' :
                             user.role === 'admin' ? 'bg-purple-500/10 border-purple-500/20 text-purple-400' :
                             'bg-white/5 border-white/10 text-gray-400 hover:border-white/20'
                          }`}
                       >
                          <option value="user">USER</option>
                          <option value="screenshare">SCREENSHARE</option>
                          <option value="admin">ADMIN</option>
                          {user.role === 'superadmin' && <option value="superadmin">SUPERADMIN</option>}
                       </select>
                    </td>
                    <td className="p-8 text-right">
                       {user.role !== 'superadmin' && (
                          <div className="flex items-center justify-end gap-3 opacity-0 group-hover:opacity-100 transition-opacity">
                             <button 
                                onClick={() => handleRevoke(user._id)}
                                title="Revoke Access Key"
                                className="w-10 h-10 rounded-xl bg-amber-500/10 text-amber-500 border border-amber-500/20 flex items-center justify-center hover:bg-amber-500 hover:text-white transition-all"
                             >
                                <ShieldAlert size={18} />
                             </button>
                             <button 
                                onClick={() => handleBan(user._id)}
                                title="Permanent Ban"
                                className="w-10 h-10 rounded-xl bg-red-500/10 text-red-500 border border-red-500/20 flex items-center justify-center hover:bg-red-500 hover:text-white transition-all"
                             >
                                <Lock size={18} />
                             </button>
                          </div>
                       )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
