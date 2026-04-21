// app/utils/formatter.js

export const formatSystemResponse = (data) => {
  if (!data.success) return `ERROR: ${data.result?.error || 'Unknown failure'}`;

  const res = data.result;

  // Case: Full List (READ)
  if (res?.items && Array.isArray(res.items)) {
    if (res.items.length === 0) return "List is empty.";
    return res.items
      .map((item) => `[${String(item.id).padStart(2, '0')}] ${item.name}`)
      .join('\n');
  }

  // Case: Single Item Added (ADD)
  if (res?.id && res?.name) {
    return `+ Added "${res.name}" (ID: ${res.id})`;
  }

  // Case: Boolean Result (DELETE/UPDATE)
  if (typeof res === 'boolean') {
    return res ? "✓ Operation successful." : "✗ Operation failed.";
  }

  // Fallback for raw data
  return typeof res === 'object' ? JSON.stringify(res, null, 2) : String(res);
};
