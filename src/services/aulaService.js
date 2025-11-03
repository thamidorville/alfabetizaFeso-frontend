import { apiGet, apiPost, apiPut, apiDelete } from './api'

class AulaService {
  listar(cursoId) {
    return apiGet(`/api/curso/${cursoId}/aula`)
  }

  criar(cursoId, dados) {
    return apiPost(`/api/curso/${cursoId}/aula`, dados)
  }

  editar(cursoId, aulaId, dados) {
    return apiPut(`/api/curso/${cursoId}/aula/${aulaId}`, dados)
  }

  deletar(cursoId, aulaId) {
    return apiDelete(`/api/curso/${cursoId}/aula/${aulaId}`)
  }
}

export default new AulaService()
