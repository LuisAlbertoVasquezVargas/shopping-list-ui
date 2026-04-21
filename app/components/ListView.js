// app/components/ListView.js

export default function ListView({ items }) {
  if (!items || items.length === 0) {
    return (
      <div className="border border-dashed border-zinc-800 p-8 text-center text-zinc-600 text-sm">
        List is currently empty.
      </div>
    );
  }

  return (
    <div className="my-4 border border-zinc-800 rounded-sm bg-zinc-900/20">
      <table className="w-full text-left border-collapse">
        <thead>
          <tr className="border-b border-zinc-800 text-[10px] uppercase tracking-tighter text-zinc-500">
            <th className="px-3 py-2 w-16">ID</th>
            <th className="px-3 py-2">Item</th>
            <th className="px-3 py-2 text-right w-24">Status</th>
          </tr>
        </thead>
        <tbody>
          {items.map((item) => (
            <tr key={item.id} className="group border-b border-zinc-900/50 last:border-0 hover:bg-zinc-800/30 transition-colors">
              <td className="px-3 py-2 font-mono text-xs text-zinc-600">
                {String(item.id).padStart(2, '0')}
              </td>
              <td className={`px-3 py-2 text-sm ${item.status === 'bought' ? 'text-zinc-500 line-through' : 'text-zinc-200'}`}>
                {item.name}
              </td>
              <td className="px-3 py-2 text-right">
                <span className={`text-[9px] font-bold px-1.5 py-0.5 rounded-xs uppercase ${
                  item.status === 'bought' 
                    ? 'bg-emerald-500/10 text-emerald-500' 
                    : 'bg-blue-500/10 text-blue-400'
                }`}>
                  {item.status || 'pending'}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
