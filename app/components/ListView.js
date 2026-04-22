// app/components/ListView.js
export default function ListView({ items }) {
  if (!items || items.length === 0) {
    return (
      <div className="border border-dashed border-zinc-800 p-8 text-center text-zinc-600 text-sm italic">
        Your list is currently empty.
      </div>
    );
  }

  const groups = items.reduce((acc, item) => {
    const cat = item.category || 'Other';
    if (!acc[cat]) acc[cat] = [];
    acc[cat].push(item);
    return acc;
  }, {});

  return (
    <div className="my-4 space-y-8">
      {Object.entries(groups).map(([category, catItems]) => (
        <div key={category} className="animate-in fade-in duration-700">
          <div className="flex items-center gap-2 mb-2 px-1">
            <span className="text-blue-500 text-[10px] font-bold">#</span>
            <span className="text-zinc-500 text-[10px] uppercase tracking-widest font-black">
              {category}
            </span>
            <div className="h-[1px] flex-1 bg-zinc-900/50 ml-2" />
          </div>
          
          <div className="border border-zinc-800/50 rounded-sm bg-zinc-900/10 overflow-hidden">
            <table className="w-full text-left border-collapse">
              <tbody>
                {catItems.map((item) => (
                  <tr key={item.id} className="border-b border-zinc-900/50 last:border-0 hover:bg-zinc-800/20 transition-colors group">
                    <td className="px-3 py-2 w-12 font-mono text-[10px] text-zinc-600">
                      {String(item.id).padStart(2, '0')}
                    </td>
                    <td className="px-3 py-2 text-sm text-zinc-200">
                      {item.name}
                    </td>
                    <td className="px-3 py-2 text-[11px] text-zinc-600 italic font-light text-right">
                      {item.metadata || ""}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      ))}
    </div>
  );
}
