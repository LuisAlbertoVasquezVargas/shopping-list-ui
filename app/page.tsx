// app/page.js

"use client";

import { useState, useEffect, useRef } from 'react';
import { parseSystemResponse } from './utils/formatter';
import ListView from './components/ListView';

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
        content: parseSystemResponse(data) 
      }]);
    } catch (err) {
      setMessages(prev => [...prev, { 
        role: 'system', 
        content: { type: 'error', payload: 'SYSTEM ERROR: Core unreachable.' } 
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
            <div className="text-zinc-600 italic border border-dashed border-zinc-800 p-4 text-center">
              Awaiting commands... (e.g. "list", "add milk")
            </div>
          )}
          {messages.map((msg, i) => (
            <div key={i} className="animate-in fade-in slide-in-from-bottom-1 duration-200">
              <div className="flex items-center gap-2 mb-1">
                <span className={msg.role === 'user' ? 'text-blue-400' : 'text-emerald-500'}>
                  {msg.role === 'user' ? '❯' : 'SYSTEM'}
                </span>
              </div>
              
              <div className="pl-4">
                {msg.role === 'user' ? (
                  <span className="text-zinc-100">{msg.content}</span>
                ) : (
                  <div className="mt-1">
                    {msg.content.type === 'table' && <ListView items={msg.content.payload} />}
                    {msg.content.type === 'notification' && <div className="text-emerald-400">{msg.content.payload}</div>}
                    {msg.content.type === 'error' && <div className="text-red-400 font-bold">{msg.content.payload}</div>}
                    {msg.content.type === 'text' && <div className="text-zinc-300">{msg.content.payload}</div>}
                  </div>
                )}
              </div>
            </div>
          ))}
          <div ref={scrollRef} />
        </div>

        <form onSubmit={handleSubmit} className="flex border-t border-zinc-800 pt-4 bg-[#0a0a0a]">
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
