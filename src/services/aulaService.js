import { api } from "./api";

// Export individual
export async function listarAulasDoCurso(cursoId) {
  const res = await api.get(`/curso/${cursoId}/aula`);
  return res.data;
}

export async function obterAula(cursoId, aulaId) {
  const res = await api.get(`/curso/${cursoId}/aula/${aulaId}`);
  return res.data;
}

export async function criarAula(cursoId, data) {
  const res = await api.post(`/curso/${cursoId}/aula`, data);
  return res.data;
}

export async function atualizarAula(cursoId, aulaId, data) {
  const res = await api.put(`/curso/${cursoId}/aula/${aulaId}`, data);
  return res.data;
}

export async function deletarAula(cursoId, aulaId) {
  const res = await api.delete(`/curso/${cursoId}/aula/${aulaId}`);
  return res.data;
}

export async function listarAulasPorEducador(educadorId) {
  const res = await api.get(`/Curso/educador/${educadorId}/aulas`);
  return res.data;
} 