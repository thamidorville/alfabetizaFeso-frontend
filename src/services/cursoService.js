import { apiGet, apiPost, apiPut, apiDelete } from './api'

class CursoService {
  listarTodos() {
    return apiGet('/api/curso')
  }

  getMeusCursos() {
    return apiGet('/api/curso/meus-cursos')
  }

  criar(dados) {
    return apiPost('/api/curso', dados)
  }

  editar(id, dados) {
    return apiPut(`/api/curso/${id}`, dados)
  }

  deletar(id) {
    return apiDelete(`/api/curso/${id}`)
  }
}

export default new CursoService()
