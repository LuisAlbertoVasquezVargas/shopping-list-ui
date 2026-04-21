// app/page.tsx

"use client";

import { useState, useEffect, useRef } from 'react';

type Message = { role: 'user' | 'system'; content: any };

export default function ShopTerm() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || loading) return;

    const userMsg = input;
    setInput('');
    setMessages(prev => [...prev, { role: 'user', content: userMsg }]);
    setLoading(true);

    try {
      const res = await fetch('/api', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: userMsg }),
      });
      const data = await res.json();
      
      let displayContent = data.success ? data.result : `Error: ${data.result.error}`;
      setMessages(prev => [...prev, { role: 'system', content: displayContent }]);
    } catch (err) {
      setMessages(prev => [...prev, { role: 'system', content: 'SYSTEM ERROR: Core unreachable.' }]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-[#0a0a0a] text-[#ededed] font-mono p-4 sm:p-8 flex flex-col items-center">
      <div className="w-full max-w-2xl flex flex-col h-[90vh]">
        
        <header className="mb-4 text-zinc-500 text-xs border-b border-zinc-800 pb-2 uppercase tracking-widest">
          Shopping List Core UI // Status: {loading ? 'Processing' : 'Idle'}
        </header>

        <div className="flex-1 overflow-y-auto space-y-4 mb-4 scrollbar-hide">
          {messages.length === 0 && (
            <div className="text-zinc-600">Type "list" or "show items" to begin...</div>
          )}
          {messages.map((msg, i) => (
            <div key={i} className="whitespace-pre-wrap animate-in fade-in duration-300">
              <span className={msg.role === 'user' ? 'text-blue-400' : 'text-emerald-500'}>
                {msg.role === 'user' ? '❯ ' : 'SYSTEM: '}
              </span>
              {typeof msg.content === 'object' 
                ? JSON.stringify(msg.content, null, 2) 
                : msg.content}
            </div>
          ))}
          <div ref={scrollRef} />
        </div>

        <form onSubmit={handleSubmit} className="flex border-t border-zinc-800 pt-4">
          <span className="text-blue-400 mr-2">❯</span>
          <input
            autoFocus
            className="bg-transparent outline-none flex-1 text-[#ededed]"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            disabled={loading}
            spellCheck={false}
            placeholder={loading ? "..." : ""}
          />
        </form>
      </div>
    </main>
  );
}
