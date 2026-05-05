'use client';

import { useState, useEffect } from 'react';
import { Users, ShieldAlert, Key, MapPin, MonitorPlay, Shield, Circle } from 'lucide-react';

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
    // Refresh online status every 30 seconds
    const interval = setInterval(fetchUsers, 30000);
    return () => clearInterval(interval);
  }, []);

  const handleRoleChange = async (userId: string, newRole: string) => {
    const res = await fetch('/api/admin/staff', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ userId, role: newRole }),
    });
    if (res.ok) {
      fetchUsers();
    }
  };

  const isOnline = (lastActive: string) => {
    if (!lastActive) return false;
    const now = new Date();
    const activeDate = new Date(lastActive);
    const diff = (now.getTime() - activeDate.getTime()) / 1000 / 60; // diff in minutes
    return diff < 5;
  };

  return (
    <div className="space-y-8 max-w-[1200px] mx-auto pb-10">
      <div className="flex items-center gap-4 bg-[#0B0E14] p-6 rounded-2xl border border-white/5 shadow-2xl">
        <div className="w-12 h-12 rounded-full bg-purple-500/10 flex items-center justify-center border border-purple-500/20">
          <Users className="text-purple-400" size={24} />
        </div>
        <div>
          <h1 className="text-2xl font-black text-white tracking-wider uppercase">Staff & Members Area</h1>
          <p className="text-xs text-gray-500 uppercase tracking-widest font-bold mt-1">Gerencie permissões, IPs e acessos da equipe</p>
        </div>
      </div>

      <div className="bg-[#0B0E14] rounded-2xl border border-white/5 overflow-hidden shadow-xl">
        {loading ? (
          <div className="p-8 text-center text-gray-500">Carregando usuários...</div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-black/40 border-b border-white/5 text-xs font-black uppercase tracking-widest text-gray-500">
                  <th className="p-4">Username</th>
                  <th className="p-4">Status</th>
                  <th className="p-4">Key/Plan</th>
                  <th className="p-4">IP Address</th>
                  <th className="p-4">Current Role</th>
                  <th className="p-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {users.map((user) => (
                  <tr key={user._id} className="hover:bg-white/5 transition-colors">
                    <td className="p-4">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-purple-500/20 flex items-center justify-center">
                          <Users size={14} className="text-purple-400" />
                        </div>
                        <span className="font-bold text-gray-200">{user.username}</span>
                      </div>
                    </td>
                    <td className="p-4">
                      {isOnline(user.lastActive) ? (
                        <div className="flex items-center gap-2 text-emerald-500">
                          <Circle size={8} fill="currentColor" className="animate-pulse" />
                          <span className="text-[10px] font-black uppercase tracking-widest">Online</span>
                        </div>
                      ) : (
                        <div className="flex items-center gap-2 text-gray-600">
                          <Circle size={8} fill="currentColor" />
                          <span className="text-[10px] font-black uppercase tracking-widest">Offline</span>
                        </div>
                      )}
                    </td>
                    <td className="p-4">
                      <div className="flex flex-col">
                        <span className="text-xs font-mono text-purple-400">{user.adminKey}</span>
                        <span className="text-[10px] uppercase font-bold text-gray-500 tracking-widest">{user.plan}</span>
                      </div>
                    </td>
                    <td className="p-4">
                      <div className="flex items-center gap-2 text-gray-400">
                        <MapPin size={14} />
                        <span className="text-xs font-mono">{user.lastIp || 'Unknown'}</span>
                      </div>
                    </td>
                    <td className="p-4">
                      {user.role === 'superadmin' ? (
                        <span className="px-2 py-1 bg-red-500/20 text-red-400 text-[10px] font-black uppercase tracking-widest rounded-md border border-red-500/20">Super Admin</span>
                      ) : user.role === 'admin' ? (
                        <span className="px-2 py-1 bg-purple-500/20 text-purple-400 text-[10px] font-black uppercase tracking-widest rounded-md border border-purple-500/20">Admin</span>
                      ) : user.role === 'screenshare' ? (
                        <span className="px-2 py-1 bg-purple-500/20 text-purple-400 text-[10px] font-black uppercase tracking-widest rounded-md border border-purple-500/20">Screen Share</span>
                      ) : (
                        <span className="px-2 py-1 bg-gray-500/20 text-gray-400 text-[10px] font-black uppercase tracking-widest rounded-md border border-gray-500/20">User</span>
                      )}
                    </td>
                    <td className="p-4 text-right">
                      {user.role !== 'superadmin' && (
                        <select 
                          value={user.role} 
                          onChange={(e) => handleRoleChange(user._id, e.target.value)}
                          className="bg-black/40 border border-white/10 text-xs font-bold text-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:border-purple-500/50"
                        >
                          <option value="user">User (Basic)</option>
                          <option value="screenshare">Screen Share</option>
                          <option value="admin">Admin</option>
                        </select>
                      )}
                    </td>
                  </tr>
                ))}
                {users.length === 0 && (
                  <tr>
                    <td colSpan={6} className="p-8 text-center text-gray-500 font-bold uppercase tracking-widest text-xs">Nenhum usuário registrado.</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
