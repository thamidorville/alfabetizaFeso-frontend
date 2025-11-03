import { apiGet, apiPost } from './api'

export async function cadastrarEducador(payload) {
  return apiPost('/api/usuario/educador', payload)
}

export async function cadastrarAluno(payload) {
  return apiPost('/api/usuario/aluno', payload)
}

export async function loginUsuario(payload) {
  return apiPost('/api/usuario/login', payload)
}

export async function getUsuarioLogado() {
  return apiGet('/api/usuario/me')
}

export async function getEducadores() {
  const res = await apiGet('/api/usuario/educadores')
  return Array.isArray(res) ? res : (res?.data || [])
}

export async function getAlunos() {
  const res = await apiGet('/api/usuario/alunos')
  return Array.isArray(res) ? res : (res?.data || [])
}
