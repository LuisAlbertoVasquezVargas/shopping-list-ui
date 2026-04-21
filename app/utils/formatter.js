// app/utils/formatter.js

export const parseSystemResponse = (data) => {
  if (!data.success) return { type: 'error', payload: data.result?.error || 'Unknown failure' };

  const res = data.result;

  if (res?.items && Array.isArray(res.items)) {
    return { type: 'table', payload: res.items };
  }

  if (res?.id && res?.name) {
    return { type: 'notification', payload: `+ Added "${res.name}" (ID: ${res.id})` };
  }

  if (typeof res === 'boolean') {
    return { type: 'notification', payload: res ? "✓ Success" : "✗ Failed" };
  }

  return { type: 'text', payload: String(res) };
};
