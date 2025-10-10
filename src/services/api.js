const BASE = (import.meta.env.VITE_API_BASE_URL || 'http://localhost:5098/') + '/api';

export async function apiGet(path) {
  const resp = await fetch(`${BASE}${path}`, {
    headers: { 'Accept': 'application/json' },
  });
  if (!resp.ok) throw new Error(`GET ${path} → HTTP ${resp.status}`);
  return resp.json();
}

export async function apiPost(path, body) {
  const resp = await fetch(`${BASE}${path}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    },
    body: JSON.stringify(body),
  });
  if (!resp.ok) {
    const msg = await safeReadText(resp);
    throw new Error(`POST ${path} → HTTP ${resp.status} ${msg || ''}`);
  }
  return resp.json();
}

async function safeReadText(resp) {
  try { return await resp.text(); } catch { return ''; }
}
