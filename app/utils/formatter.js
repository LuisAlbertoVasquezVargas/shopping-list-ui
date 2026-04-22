// app/utils/formatter.ts
export function parseSystemResponse(data: any) {
  if (!data) return { type: 'error', payload: 'Empty response from server.' };
  
  // Return the result object directly to the page logic
  if (data.result) return data.result;
  
  // Fallback for direct type-based responses
  if (data.type) return data;

  return { type: 'text', payload: JSON.stringify(data) };
}
