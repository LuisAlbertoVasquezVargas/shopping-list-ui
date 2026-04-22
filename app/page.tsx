// app/page.tsx
"use client";

import { useState, useEffect, useRef, KeyboardEvent } from 'react';
import ListView from './components/ListView';
import HelpView from './components/HelpView';

export default function ShopTerm() {
  const [messages, setMessages] = useState<any[]>([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);

  const scrollRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  useEffect(() => {
    if (!loading) inputRef.current?.focus();
  }, [loading]);

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.style.height = 'auto';
      inputRef.current.style.height = `${inputRef.current.scrollHeight}px`;
    }
  }, [input]);

  const handleSubmit = async () => {
    if (!input.trim() || loading) return;

    const userMsg = input;
    setInput('');
    setMessages(prev => [...prev, { role: 'user', content: userMsg }]);
    setLoading(true);

    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: userMsg }),
      });

      const data = await res.json();
      const result = data.result;

      // Unified: Push text and data as one atomic entry
      setMessages(prev => [...prev, { role: 'system', content: result }]);

    } catch (err) {
      setMessages(prev => [...prev, {
        role: 'system',
        content: { type: 'error', payload: 'SYSTEM ERROR: Connection refused.' }
      }]);
    } finally {
      setLoading(false);
    }
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit();
    }
  };

  return (
    <main className="min-h-screen bg-[#0a0a0a] text-[#ededed] font-mono p-4 sm:p-8 flex flex-col items-center">
      <div className="w-full max-w-2xl flex flex-col h-[90vh]">
        <header className="mb-4 text-zinc-500 text-[10px] border-b border-zinc-800 pb-2 uppercase tracking-[0.2em] flex justify-between">
          <span>Shopping List Core v1.1.0</span>
          <span className={loading ? "animate-pulse text-blue-400" : "text-emerald-500"}>
            ● {loading ? 'Processing' : 'Ready'}
          </span>
        </header>

        <div className="flex-1 overflow-y-auto space-y-8 mb-4 scrollbar-hide">
          {messages.length === 0 && (
            <div className="text-zinc-800 text-xs border border-dashed border-zinc-900 p-8 text-center italic">
              Awaiting command. Try "help".
            </div>
          )}

          {messages.map((msg, i) => (
            <div key={i} className="animate-in fade-in slide-in-from-bottom-1 duration-300">
              {/* User Icon shown only for users */}
              {msg.role === 'user' && (
                <div className="text-blue-500 mb-1">❯</div>
              )}

              <div className={msg.role === 'user' ? 'pl-4' : 'pl-0'}>
                {msg.role === 'user' ? (
                  <pre className="text-zinc-100 whitespace-pre-wrap break-words leading-relaxed">
                    {msg.content}
                  </pre>
                ) : (
                  <div className="mt-1">
                    {/* Integrated Brain Message */}
                    {msg.content.meta?.message && (
                      <div className="text-zinc-300 text-sm mb-4 leading-relaxed max-w-xl">
                        {msg.content.meta.message}
                      </div>
                    )}

                    {/* Conditional Rendering of Views */}
                    {msg.content.type === 'help' && <HelpView />}
                    {msg.content.type === 'table' && <ListView items={msg.content.payload} />}
                    {msg.content.type === 'error' && (
                      <div className="text-red-500 text-xs border-l border-red-900 pl-2 py-1">
                        ERROR: {msg.content.payload}
                      </div>
                    )}
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
            rows={1}
            className="bg-transparent outline-none flex-1 text-[#ededed] caret-blue-500 resize-none overflow-hidden py-1"
            placeholder={loading ? "..." : "Type a command..."}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            disabled={loading}
            spellCheck="false"
          />
        </div>
      </div>
    </main>
  );
}
