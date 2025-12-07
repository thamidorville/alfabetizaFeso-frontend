import { api } from "./api";

// Cursos
export async function listarCursos() {
  const res = await api.get("/Curso");
  return res.data;
}

export async function obterCurso(id) {
  const res = await api.get(`/Curso/${id}`);
  return res.data;
}

export async function criarCurso(data) {
  const res = await api.post("/Curso", data);
  return res.data;
}

export async function atualizarCurso(id, data) {
  const res = await api.put(`/Curso/${id}`, data);
  return res.data;
}

export async function deletarCurso(id) {
  const res = await api.delete(`/Curso/${id}`);
  return res.data;
}

export async function listarAulas(cursoId) {
  const res = await api.get(`/curso/${cursoId}/aula`);
  return res.data;
}

export async function listarCursosPorEducador(educadorId) {
  const res = await api.get(`/curso/educador/${educadorId}`);
  return res.data;
}
