// app/page.jsx

"use client";

import { useState, useEffect, useRef } from 'react';
import { parseSystemResponse } from './utils/formatter';
import ListView from './components/ListView';
import HelpView from './components/HelpView';

export default function ShopTerm() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);

  const scrollRef = useRef(null);
  const inputRef = useRef(null);

  // Auto-scroll to bottom
  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // Handle Focus & Busy state
  useEffect(() => {
    if (!loading) {
      inputRef.current?.focus();
    }
  }, [loading]);

  // Auto-expand textarea height based on content
  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.style.height = 'auto';
      inputRef.current.style.height = `${inputRef.current.scrollHeight}px`;
    }
  }, [input]);

  const handleTerminalClick = () => {
    const selection = window.getSelection().toString();
    if (!selection && inputRef.current) {
      inputRef.current.focus();
    }
  };

  const handleSubmit = async (e) => {
    if (e) e.preventDefault();
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
      setMessages(prev => [...prev, { role: 'system', content: parseSystemResponse(data) }]);
    } catch (err) {
      setMessages(prev => [...prev, { 
        role: 'system', 
        content: { type: 'error', payload: 'SYSTEM ERROR: Core unreachable.' } 
      }]);
    } finally {
      setLoading(false);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit();
    }
  };

  return (
    <main
      className="min-h-screen bg-[#0a0a0a] text-[#ededed] font-mono p-4 sm:p-8 flex flex-col items-center select-text"
      onClick={handleTerminalClick}
    >
      <div className="w-full max-w-2xl flex flex-col h-[90vh]">
        <header className="mb-4 text-zinc-500 text-[10px] border-b border-zinc-800 pb-2 uppercase tracking-[0.2em] flex justify-between">
          <span>Shopping List Core v1.0.0</span>
          <span className={loading ? "animate-pulse text-blue-400" : "text-emerald-500"}>
            ● {loading ? 'Processing' : 'Ready'}
          </span>
        </header>

        <div className="flex-1 overflow-y-auto space-y-6 mb-4 scrollbar-hide">
          {messages.length === 0 && (
            <div className="text-zinc-800 text-xs border border-dashed border-zinc-900 p-8 text-center italic">
              Awaiting command. Try "help".
            </div>
          )}

          {messages.map((msg, i) => (
            <div key={i} className="animate-in fade-in slide-in-from-bottom-1 duration-300">
              <div className="flex items-center gap-2 mb-1">
                <span className={msg.role === 'user' ? 'text-blue-500' : 'text-emerald-500 font-bold'}>
                  {msg.role === 'user' ? '❯' : 'SYS'}
                </span>
              </div>
              
              <div className="pl-4">
                {msg.role === 'user' ? (
                  <pre className="text-zinc-100 font-mono whitespace-pre-wrap break-words leading-relaxed">
                    {msg.content}
                  </pre>
                ) : (
                  <div className="mt-1">
                    {msg.content.type === 'interpreted' && (
                      <div className="mb-3">
                        <div className="text-zinc-500 text-xs italic mb-2 border-l border-zinc-800 pl-2">
                          "{msg.content.explanation}"
                        </div>
                        {Array.isArray(msg.content.data) ? <ListView items={msg.content.data} /> : null}
                      </div>
                    )}
                    {msg.content.type === 'help' && <HelpView />}
                    {msg.content.type === 'table' && <ListView items={msg.content.payload} />}
                    {msg.content.type === 'notification' && <div className="text-emerald-400 text-sm">{msg.content.payload}</div>}
                    {msg.content.type === 'error' && (
                      <div className="text-red-500 text-xs border-l border-red-900 pl-2 py-1">
                        ERROR: {msg.content.payload}
                      </div>
                    )}
                    {msg.content.type === 'text' && <div className="text-zinc-400 text-sm">{msg.content.payload}</div>}
                  </div>
                )}
              </div>
            </div>
          ))}
          <div ref={scrollRef} />
        </div>

        <div className="flex border-t border-zinc-800 pt-4 bg-[#0a0a0a]">
          <span className="text-blue-500 mr-3 font-bold mt-1">❯</span>
          <textarea
            ref={inputRef}
            className="bg-transparent outline-none flex-1 text-[#ededed] caret-blue-500 resize-none overflow-hidden py-1 min-h-[24px] max-h-[200px]"
            placeholder={loading ? "..." : "Type a command..."}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            disabled={loading}
            spellCheck="false"
            autoComplete="off"
          />
        </div>
      </div>
    </main>
  );
}
