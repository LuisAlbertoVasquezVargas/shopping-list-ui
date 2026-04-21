// app/page.js

"use client";

import { useState, useEffect, useRef } from 'react';
import { formatSystemResponse } from './utils/formatter';

export default function ShopTerm() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  
  const scrollRef = useRef(null);
  const inputRef = useRef(null);

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  useEffect(() => {
    inputRef.current?.focus();
  }, [loading, messages]);

  const handleSubmit = async (e) => {
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
      
      setMessages(prev => [...prev, { 
        role: 'system', 
        content: formatSystemResponse(data) 
      }]);
    } catch (err) {
      setMessages(prev => [...prev, { 
        role: 'system', 
        content: 'SYSTEM ERROR: Core unreachable.' 
      }]);
    } finally {
      setLoading(false);
      inputRef.current?.focus();
    }
  };

  const handleTerminalClick = () => {
    inputRef.current?.focus();
  };

  return (
    <main 
      className="min-h-screen bg-[#0a0a0a] text-[#ededed] font-mono p-4 sm:p-8 flex flex-col items-center cursor-text"
      onClick={handleTerminalClick}
    >
      <div className="w-full max-w-2xl flex flex-col h-[90vh]">
        
        <header className="mb-4 text-zinc-500 text-xs border-b border-zinc-800 pb-2 uppercase tracking-widest flex justify-between">
          <span>Shopping List Core UI</span>
          <span className={loading ? "animate-pulse text-blue-400" : "text-emerald-500"}>
            ● {loading ? 'Busy' : 'Ready'}
          </span>
        </header>

        <div className="flex-1 overflow-y-auto space-y-6 mb-4 scrollbar-hide">
          {messages.length === 0 && (
            <div className="text-zinc-600 italic">Enter command to begin...</div>
          )}
          {messages.map((msg, i) => (
            <div key={i} className="whitespace-pre-wrap animate-in fade-in slide-in-from-bottom-1 duration-200">
              <span className={msg.role === 'user' ? 'text-blue-400' : 'text-emerald-500'}>
                {msg.role === 'user' ? '❯ ' : 'SYSTEM: '}
              </span>
              <span className={msg.role === 'system' ? 'text-zinc-300' : ''}>
                {msg.content}
              </span>
            </div>
          ))}
          <div ref={scrollRef} />
        </div>

        <form onSubmit={handleSubmit} className="flex border-t border-zinc-800 pt-4">
          <span className="text-blue-400 mr-2">❯</span>
          <input
            ref={inputRef}
            autoFocus
            className="bg-transparent outline-none flex-1 text-[#ededed] caret-blue-400"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            disabled={loading}
            spellCheck="false"
            autoComplete="off"
          />
        </form>
      </div>
    </main>
  );
}
