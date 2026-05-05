'use client';
import { useState, useEffect, useRef } from 'react';
import { Send, Users, Shield } from 'lucide-react';

export default function TeamChat({ ownerKey }: { ownerKey: string }) {
  const [messages, setMessages] = useState<any[]>([]);
  const [input, setInput] = useState('');
  const [username, setUsername] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // MOCK: Em produção isso viria do MongoDB
  useEffect(() => {
    // Pega o nome do user pelo auth cookie (mocking here)
    const cookies = document.cookie.split(';');
    const auth = cookies.find(c => c.trim().startsWith('admin_auth='));
    if (auth) {
      const parts = auth.split('=')[1].split('%7C'); // URL encoded |
      if (parts.length >= 4) {
        setUsername(parts[3]);
      } else {
        setUsername(parts[0]);
      }
    } else {
      setUsername('Admin');
    }

    setMessages([
      { id: 1, sender: 'SamucaX', text: 'Bem-vindo ao chat da equipe, arrombado.', time: '10:00', isOwner: true },
      { id: 2, sender: 'Lodark.dll', text: 'Só os cria aqui, bora foder os cheaters.', time: '10:05', isOwner: true },
    ]);
  }, []);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    const newMsg = {
      id: Date.now(),
      sender: username,
      text: input,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      isOwner: false
    };

    setMessages([...messages, newMsg]);
    setInput('');
  };

  return (
    <div className="bg-zenith-card rounded-xl border border-white/5 overflow-hidden flex flex-col h-[500px]">
      <div className="px-6 py-4 border-b border-white/5 bg-[#111827] flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-purple-500/10 rounded-lg text-purple-400">
            <Users size={20} />
          </div>
          <div>
            <h2 className="text-lg font-semibold text-white">Team Chat - Private</h2>
            <p className="text-xs text-gray-500">Owner: {ownerKey || 'Equipe'}</p>
          </div>
        </div>
        <div className="flex items-center gap-2 text-xs text-purple-400 bg-purple-500/10 px-3 py-1.5 rounded-full border border-purple-500/20">
          <div className="w-2 h-2 rounded-full bg-purple-500 animate-pulse"></div>
          Online
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-6 space-y-4 custom-scrollbar bg-black/20">
        {messages.map((msg) => (
          <div key={msg.id} className={`flex flex-col ${msg.sender === username ? 'items-end' : 'items-start'}`}>
            <div className="flex items-baseline gap-2 mb-1">
              <span className={`text-xs font-bold ${msg.isOwner ? 'text-red-400 flex items-center gap-1' : 'text-gray-400'}`}>
                {msg.isOwner && <Shield size={10} />}
                {msg.sender}
              </span>
              <span className="text-[10px] text-gray-600">{msg.time}</span>
            </div>
            <div className={`px-4 py-2.5 rounded-2xl max-w-[80%] text-sm ${msg.sender === username ? 'bg-purple-600 text-white rounded-br-none' : 'bg-[#1f2937] border border-white/5 text-gray-200 rounded-bl-none'}`}>
              {msg.text}
            </div>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>

      <div className="p-4 bg-[#111827] border-t border-white/5">
        <form onSubmit={handleSend} className="flex items-center gap-3">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Digite a fita pra equipe..."
            className="flex-1 bg-black/40 border border-white/10 rounded-lg px-4 py-2.5 text-sm text-white focus:outline-none focus:border-purple-500/50 transition-colors"
          />
          <button 
            type="submit"
            disabled={!input.trim()}
            className="p-2.5 bg-purple-600 hover:bg-purple-700 disabled:opacity-50 disabled:cursor-not-allowed text-white rounded-lg transition-colors"
          >
            <Send size={18} />
          </button>
        </form>
      </div>
    </div>
  );
}
