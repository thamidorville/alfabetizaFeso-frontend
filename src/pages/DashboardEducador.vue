<template>
  <div class="dashboard-educador">
    <header class="dashboard-header">
      <div class="user-info">
        <h1>Olá, Professor(a) {{ authStore.userName }}!</h1>
        <span class="role-badge">Educador</span>
      </div>
      <el-button @click="logout" type="danger" plain>Sair</el-button>
    </header>

    <div class="dashboard-content">
      <!-- Formulário de Cadastro de Curso -->
      <el-card class="form-card" shadow="hover">
        <h2>Criar Novo Curso</h2>
        <form @submit.prevent="handleCriarCurso">
          <div class="form-row">
            <div class="form-field">
              <label>Nome *</label>
              <input v-model="formCurso.nome" required />
            </div>
            <div class="form-field">
              <label>Carga Horária (horas) *</label>
              <input v-model.number="formCurso.cargaHoraria" type="number" min="1" max="1000" required />
            </div>
          </div>
          <div class="form-field">
            <label>Descrição *</label>
            <textarea v-model="formCurso.descricao" rows="3" required></textarea>
          </div>
          <div class="form-row">
            <div class="form-field">
              <label>Data Início *</label>
              <input v-model="formCurso.dataInicio" type="datetime-local" required />
            </div>
            <div class="form-field">
              <label>Data Fim</label>
              <input v-model="formCurso.dataFim" type="datetime-local" />
            </div>
          </div>
          <button type="submit" class="btn-primary" :disabled="loading">{{ loading ? 'Criando...' : 'Criar Curso' }}</button>
        </form>
      </el-card>

      <!-- Lista de Cursos -->
      <div class="meus-cursos-section">
        <h2>Meus Cursos</h2>
        <div v-if="loadingCursos" class="loading">Carregando cursos...</div>
        <div v-else-if="cursos.length === 0" class="empty">Nenhum curso cadastrado ainda.</div>
        <div v-else class="cursos-grid">
          <el-card v-for="curso in cursos" :key="curso.id" class="curso-card" shadow="hover">
            <div class="curso-header">
              <h3>{{ curso.nome }}</h3>
              <el-tag type="success">{{ curso.totalAulas }} aulas</el-tag>
            </div>
            <p class="curso-descricao">{{ curso.descricao }}</p>
            <div class="curso-info">
              <p><strong>Carga Horária:</strong> {{ curso.cargaHoraria }}h</p>
              <p><strong>Matriculados:</strong> {{ curso.totalInscricoes }} alunos</p>
              <p><strong>Status:</strong> {{ curso.status }}</p>
            </div>
            <div class="curso-actions">
              <el-button size="small" type="primary" @click="abrirModalAula(curso.id)">Cadastrar Aula</el-button>
            </div>
          </el-card>
        </div>
      </div>
    </div>

    <!-- Modal de Cadastro de Aula -->
    <el-dialog v-model="modalAulaVisible" title="Cadastrar Nova Aula" width="500px">
      <form @submit.prevent="handleCriarAula">
        <div class="form-field">
          <label>Título *</label>
          <input v-model="formAula.titulo" required />
        </div>
        <div class="form-field">
          <label>Descrição *</label>
          <textarea v-model="formAula.descricao" rows="3" required></textarea>
        </div>
        <div class="form-field">
          <label>Data/Hora Início *</label>
          <input v-model="formAula.dataInicio" type="datetime-local" required />
        </div>
        <div class="form-field">
          <label>Data/Hora Final *</label>
          <input v-model="formAula.dataFinal" type="datetime-local" required />
        </div>
        <div class="modal-actions">
          <button type="button" class="btn-secondary" @click="modalAulaVisible = false">Cancelar</button>
          <button type="submit" class="btn-primary" :disabled="loading">{{ loading ? 'Criando...' : 'Criar Aula' }}</button>
        </div>
      </form>
    </el-dialog>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '../stores/authStore'
import cursoService from '../services/cursoService'
import aulaService from '../services/aulaService'
import { ElMessage } from 'element-plus'

const router = useRouter()
const authStore = useAuthStore()

const cursos = ref([])
const loading = ref(false)
const loadingCursos = ref(false)
const modalAulaVisible = ref(false)
const cursoIdSelecionado = ref(null)

const formCurso = ref({
  nome: '',
  descricao: '',
  cargaHoraria: null,
  dataInicio: '',
  dataFim: ''
})

const formAula = ref({
  titulo: '',
  descricao: '',
  dataInicio: '',
  dataFinal: ''
})

async function carregarCursos() {
  loadingCursos.value = true
  try {
    cursos.value = await cursoService.getMeusCursos()
  } catch (error) {
    ElMessage.error('Erro ao carregar cursos: ' + error.message)
  } finally {
    loadingCursos.value = false
  }
}

async function handleCriarCurso() {
  loading.value = true
  try {
    const dados = {
      nome: formCurso.value.nome,
      descricao: formCurso.value.descricao,
      cargaHoraria: formCurso.value.cargaHoraria,
      dataInicio: new Date(formCurso.value.dataInicio).toISOString(),
      dataFim: formCurso.value.dataFim ? new Date(formCurso.value.dataFim).toISOString() : null
    }
    await cursoService.criar(dados)
    ElMessage.success('Curso criado com sucesso!')
    formCurso.value = { nome: '', descricao: '', cargaHoraria: null, dataInicio: '', dataFim: '' }
    await carregarCursos()
  } catch (error) {
    ElMessage.error('Erro ao criar curso: ' + error.message)
  } finally {
    loading.value = false
  }
}

function abrirModalAula(cursoId) {
  cursoIdSelecionado.value = cursoId
  modalAulaVisible.value = true
}

async function handleCriarAula() {
  loading.value = true
  try {
    const dados = {
      titulo: formAula.value.titulo,
      descricao: formAula.value.descricao,
      dataInicio: new Date(formAula.value.dataInicio).toISOString(),
      dataFinal: new Date(formAula.value.dataFinal).toISOString()
    }
    await aulaService.criar(cursoIdSelecionado.value, dados)
    ElMessage.success('Aula criada com sucesso!')
    formAula.value = { titulo: '', descricao: '', dataInicio: '', dataFinal: '' }
    modalAulaVisible.value = false
    await carregarCursos()
  } catch (error) {
    ElMessage.error('Erro ao criar aula: ' + error.message)
  } finally {
    loading.value = false
  }
}

function logout() {
  authStore.logout()
  router.push('/')
}

onMounted(() => {
  if (!authStore.isAuthenticated || !authStore.isEducador) {
    router.push('/login')
    return
  }
  carregarCursos()
})
</script>

<style scoped>
.dashboard-educador {
  min-height: 100vh;
  background: var(--color-bg);
}

.dashboard-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 2rem;
  background: var(--color-bg-container);
  border-bottom: 1px solid var(--color-border);
}

.user-info h1 {
  color: var(--color-deep-matcha);
  margin: 0;
}

.role-badge {
  background: var(--color-matcha);
  color: white;
  padding: 0.25rem 0.75rem;
  border-radius: 12px;
  font-size: 0.85rem;
  font-weight: 600;
}

.dashboard-content {
  padding: 2rem;
  max-width: 1200px;
  margin: 0 auto;
}

.form-card {
  margin-bottom: 3rem;
  padding: 1.5rem;
}

.form-card h2 {
  color: var(--color-deep-matcha);
  margin: 0 0 1.5rem 0;
}

.form-row {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1rem;
}

.form-field {
  margin-bottom: 1rem;
}

.form-field label {
  display: block;
  margin-bottom: 0.5rem;
  color: var(--color-deep-matcha);
  font-weight: 500;
}

.form-field input,
.form-field textarea {
  width: 100%;
  padding: 0.75rem;
  border: 2px solid var(--color-border);
  border-radius: 8px;
  font-size: 1rem;
  transition: border-color 0.3s;
}

.form-field input:focus,
.form-field textarea:focus {
  outline: none;
  border-color: var(--color-matcha);
}

.btn-primary {
  background: var(--color-matcha);
  color: white;
  padding: 0.75rem 2rem;
  border: none;
  border-radius: 8px;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s;
}

.btn-primary:hover:not(:disabled) {
  background: var(--color-deep-matcha);
  transform: translateY(-2px);
}

.btn-primary:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

.btn-secondary {
  background: white;
  color: var(--color-deep-matcha);
  padding: 0.75rem 2rem;
  border: 2px solid var(--color-border);
  border-radius: 8px;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s;
}

.btn-secondary:hover {
  border-color: var(--color-matcha);
}

.meus-cursos-section h2 {
  color: var(--color-deep-matcha);
  margin-bottom: 1.5rem;
}

.loading,
.empty {
  text-align: center;
  padding: 2rem;
  color: var(--color-text);
}

.cursos-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
  gap: 1.5rem;
}

.curso-card {
  border: 2px solid var(--color-border);
  transition: all 0.3s ease;
}

.curso-card:hover {
  border-color: var(--color-matcha);
  transform: translateY(-2px);
}

.curso-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
}

.curso-header h3 {
  color: var(--color-deep-matcha);
  margin: 0;
}

.curso-descricao {
  color: var(--color-text);
  margin-bottom: 1rem;
  line-height: 1.5;
}

.curso-info {
  margin-bottom: 1rem;
}

.curso-info p {
  margin: 0.25rem 0;
  font-size: 0.9rem;
  color: var(--color-text);
}

.curso-actions {
  display: flex;
  gap: 0.5rem;
}

.modal-actions {
  display: flex;
  justify-content: flex-end;
  gap: 1rem;
  margin-top: 1.5rem;
}
</style>
