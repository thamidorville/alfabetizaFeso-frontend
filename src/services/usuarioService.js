import { api } from "./api";

// Usuarios (mapeia para os endpoints descritos no OpenAPI)
export async function listarUsuarios() {
  const res = await api.get("/Usuario");
  return res.data;
}

export async function deletarUsuarios() {
  const res = await api.delete("/Usuario");
  return res.data;
}

export async function obterUsuario(id) {
  const res = await api.get(`/Usuario/${id}`);
  return res.data;
}

export async function cadastrarEducador(payload) {
  const res = await api.post("/Usuario/educador", payload);
  return res.data;
}

export async function editarEducador(payload) {
  const res = await api.put("/Usuario/educador", payload);
  return res.data;
}

export async function cadastrarAluno(payload) {
  const res = await api.post("/Usuario/aluno", payload);
  return res.data;
}

export async function editarAluno(payload) {
  const res = await api.put("/Usuario/aluno", payload);
  return res.data;
}

export async function loginUsuario(payload) {
  const res = await api.post("/Usuario/login", payload);
  return res.data;
}

export async function getUsuarioLogado() {
  const res = await api.get("/Usuario/me");
  return res.data;
}

export async function alterarSenha(payload) {
  const res = await api.put("/Usuario/alterar-senha", payload);
  return res.data;
}     

export async function getEducadores() {
  const res = await api.get("/Usuario/educadores");
  return res.data;
}

export async function getAlunos() {
  const res = await api.get("/Usuario/alunos");
  return res.data;
}

