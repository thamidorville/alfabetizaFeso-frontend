import { api } from './api'

export async function marcarPresenca(payload) {
  const res = await api.post(`/PresencaAula`, payload)
  return res.data
}

export async function obterPorInscricaoEAula(inscricaoId, aulaId) {
  const res = await api.get(`/PresencaAula/inscricao/${inscricaoId}/aula/${aulaId}`)
  return res.data
}

export async function listarPorAula(aulaId) {
  const res = await api.get(`/PresencaAula/aula/${aulaId}`)
  return res.data
}

export async function obterPorInscricao(inscricaoId) {
  const res = await api.get(`/PresencaAula/inscricao/${inscricaoId}`)
  return res.data
}

export async function deletarPresenca(id) {
  const res = await api.delete(`/PresencaAula/${id}`)
  return res.data
}
