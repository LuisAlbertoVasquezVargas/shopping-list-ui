// app/components/ListView.js

export default function ListView({ items }) {
  if (items.length === 0) return <div className="text-zinc-500 italic">The list is empty.</div>;

  return (
    <div className="border border-zinc-800 rounded-sm overflow-hidden my-2">
      <table className="w-full text-left border-collapse">
        <thead>
          <tr className="bg-zinc-900 text-zinc-500 text-[10px] uppercase">
            <th className="p-2 border-b border-zinc-800 w-12">ID</th>
            <th className="p-2 border-b border-zinc-800">Item Name</th>
            <th className="p-2 border-b border-zinc-800 text-right">Status</th>
          </tr>
        </thead>
        <tbody>
          {items.map((item) => (
            <tr key={item.id} className="border-b border-zinc-900 last:border-0 hover:bg-zinc-900/50 transition-colors">
              <td className="p-2 font-mono text-zinc-500 text-xs">{String(item.id).padStart(2, '0')}</td>
              <td className="p-2 text-zinc-200">{item.name}</td>
              <td className="p-2 text-right">
                <span className={`text-[10px] px-1.5 py-0.5 rounded-sm ${
                  item.status === 'bought' ? 'bg-emerald-900/30 text-emerald-500' : 'bg-zinc-800 text-zinc-400'
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
