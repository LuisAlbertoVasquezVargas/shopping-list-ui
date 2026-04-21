// app/utils/formatter.js

export const parseSystemResponse = (data) => {
  // Handle cases where the backend returns success: true but the result itself is an error object
  const res = data.result;

  if (res?.error) {
    return { type: 'error', payload: res.error };
  }

  if (!data.success) {
    return { type: 'error', payload: res?.message || 'Unknown failure' };
  }

  if (res?.type === 'help') {
    return { type: 'help' };
  }

  if (res?.explanation) {
    return { 
      type: 'interpreted', 
      explanation: res.explanation, 
      data: res.items || res 
    };
  }

  if (res?.items && Array.isArray(res.items)) {
    return { type: 'table', payload: res.items };
  }

  if (res?.id && res?.name) {
    const meta = res.metadata ? ` [${res.metadata}]` : "";
    return { type: 'notification', payload: `+ Processed "${res.name}"${meta}` };
  }

  return { type: 'text', payload: typeof res === 'object' ? JSON.stringify(res) : String(res) };
};
