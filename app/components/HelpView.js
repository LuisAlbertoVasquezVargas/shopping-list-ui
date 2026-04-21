// app/components/HelpView.js

export default function HelpView() {
  const commands = [
    { cmd: 'list', desc: 'Display all pending items.' },
    { cmd: 'add [item] (note)', desc: 'Add item with optional notes in brackets.' },
    { cmd: 'remove [id/name]', desc: 'Remove an item by ID or name.' },
    { cmd: 'clear', desc: 'Delete all items from the list.' },
  ];

  return (
    <div className="my-2 border border-blue-900/20 bg-blue-900/5 p-4 rounded-sm animate-in fade-in duration-500">
      <div className="text-blue-400 text-[10px] font-bold mb-3 uppercase tracking-widest">Manual / Commands</div>
      <div className="space-y-2">
        {commands.map((c) => (
          <div key={c.cmd} className="grid grid-cols-[100px_1fr] gap-2 items-start">
            <code className="text-emerald-500 text-xs font-bold">{c.cmd}</code>
            <span className="text-zinc-500 text-[11px] leading-tight">{c.desc}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
