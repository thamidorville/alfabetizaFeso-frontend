const BASE = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5098'

function getHeaders() {
  const token = localStorage.getItem('token')
  const headers = { 'Accept': 'application/json' }
  if (token) headers['Authorization'] = `Bearer ${token}`
  return headers
}

export async function apiGet(path) {
  const resp = await fetch(`${BASE}${path}`, {
    headers: getHeaders()
  })
  if (!resp.ok) throw new Error(`GET ${path} → HTTP ${resp.status}`)
  return resp.json()
}

export async function apiPost(path, body) {
  const resp = await fetch(`${BASE}${path}`, {
    method: 'POST',
    headers: {
      ...getHeaders(),
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(body)
  })
  if (!resp.ok) {
    const msg = await safeReadText(resp)
    throw new Error(`POST ${path} → HTTP ${resp.status} ${msg || ''}`)
  }
  return resp.json()
}

export async function apiPut(path, body) {
  const resp = await fetch(`${BASE}${path}`, {
    method: 'PUT',
    headers: {
      ...getHeaders(),
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(body)
  })
  if (!resp.ok) {
    const msg = await safeReadText(resp)
    throw new Error(`PUT ${path} → HTTP ${resp.status} ${msg || ''}`)
  }
  return resp.json()
}

export async function apiDelete(path) {
  const resp = await fetch(`${BASE}${path}`, {
    method: 'DELETE',
    headers: getHeaders()
  })
  if (!resp.ok) {
    const msg = await safeReadText(resp)
    throw new Error(`DELETE ${path} → HTTP ${resp.status} ${msg || ''}`)
  }
  return resp.ok
}

async function safeReadText(resp) {
  try { return await resp.text() } catch { return '' }
}
