import { api } from './api'

// Inscrição do usuário em cursos
export async function inscrever(cursoId) {
  const res = await api.post(`/Inscricao/curso/${cursoId}`)
  return res.data
}

// Cancelar inscrição
export async function cancelarInscricao(cursoId) {
  const res = await api.delete(`/Inscricao/curso/${cursoId}`)
  return res.data
}

// Listar alunos inscritos em uma aula
export async function listarAlunosPorAula(aulaId) {
  const res = await api.get(`/Inscricao/aula/${aulaId}/alunos`)
  return res.data
}

// Listar aulas em que um aluno está inscrito
export async function listarAulasPorAluno(alunoId) {
  const res = await api.get(`/Inscricao/aluno/${alunoId}/aulas`)
  return res.data
}

// Listar inscrições do usuário logado
export async function minhasInscricoes() {
  const res = await api.get(`/Inscricao/minhas-inscricoes`)
  return res.data
}

// Listar inscrições de um aluno específico
export async function listarInscricoesAluno(alunoId) {
  const res = await api.get(`/Inscricao/aluno/${alunoId}/inscricoes`)
  return res.data
}

// Verificar se o usuário logado já está inscrito em um curso
export async function verificarInscricao(cursoId) {
  const res = await api.get(`/Inscricao/minhas-inscricoes`)
  const idNum = Number(cursoId)
  return res.data.some(inscricao => inscricao.cursoId === idNum)
}

export async function verificarInscricaoAlunoCurso(alunoId, cursoId) {
  const res = await api.get(`/Inscricao/aluno/${alunoId}/curso/${cursoId}`)
  const idNum = Number(cursoId)
  return res.data
}

export async function listarAulasPresentesPorAluno(alunoId) {
  const res = await api.get(`/Inscricao/aluno/${alunoId}/aulas-presentes`)
  return res.data
}

export async function obterCargaHorariaPorAluno(alunoId) {
  const res = await api.get(`/Inscricao/aluno/${alunoId}/presencas/carga-horaria`)
  return res.data
}
