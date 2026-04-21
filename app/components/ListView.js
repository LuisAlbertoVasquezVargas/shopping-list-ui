// app/components/ListView.js

export default function ListView({ items }) {
  if (!items || items.length === 0) {
    return (
      <div className="border border-dashed border-zinc-800 p-8 text-center text-zinc-600 text-sm italic">
        Your list is currently empty.
      </div>
    );
  }

  return (
    <div className="my-4 border border-zinc-800 rounded-sm bg-zinc-900/20">
      <table className="w-full text-left border-collapse">
        <thead>
          <tr className="border-b border-zinc-800 text-[10px] uppercase tracking-wider text-zinc-500">
            <th className="px-3 py-2 w-16">ID</th>
            <th className="px-3 py-2">Pending Item</th>
            <th className="px-3 py-2 text-zinc-600">Metadata / Notes</th>
          </tr>
        </thead>
        <tbody>
          {items.map((item) => (
            <tr key={item.id} className="border-b border-zinc-900/50 last:border-0 hover:bg-zinc-800/30 transition-colors">
              <td className="px-3 py-2 font-mono text-xs text-zinc-500">
                {String(item.id).padStart(2, '0')}
              </td>
              <td className="px-3 py-2 text-sm text-zinc-200">
                {item.name}
              </td>
              <td className="px-3 py-2 text-xs text-zinc-500 italic font-light">
                {item.metadata || "—"}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
