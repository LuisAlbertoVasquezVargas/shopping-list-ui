// app/components/HelpView.js
export default function HelpView() {
  const commands = [
    { cmd: 'list', desc: 'Display all pending items grouped by category.' },
    { cmd: 'add [item]', desc: 'Natural language add (e.g., "add 5 apples and milk").' },
    { cmd: 'remove [id/name]', desc: 'Delete items by their ID or name.' },
    { cmd: 'clear', desc: 'Wipe the entire list state.' },
  ];

  return (
    <div className="my-2 border border-zinc-800 bg-zinc-900/10 p-4 rounded-sm animate-in fade-in duration-500">
      <div className="text-zinc-500 text-[10px] font-bold mb-3 uppercase tracking-widest">Manual / Commands</div>
      <div className="space-y-2">
        {commands.map((c) => (
          <div key={c.cmd} className="grid grid-cols-[120px_1fr] gap-2 items-start">
            <code className="text-blue-400 text-xs font-bold">{c.cmd}</code>
            <span className="text-zinc-500 text-[11px] leading-tight">{c.desc}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
