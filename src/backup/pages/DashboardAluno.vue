<template>
  <div class="dashboard-aluno">
    <header class="dashboard-header">
      <div class="user-info">
        <h1>Olá, {{ authStore.userName }}!</h1>
        <span class="role-badge">Aluno</span>
      </div>
      <el-button @click="logout" type="danger" plain>Sair</el-button>
    </header>

    <div class="dashboard-content">
      <div class="aulas-disponiveis-section">
        <h2>Aulas Disponíveis</h2>
        <div class="aulas-grid">
          <el-card v-for="aula in aulasDisponiveis" :key="aula.id" class="aula-card" shadow="hover">
            <div class="aula-header">
              <h3>{{ aula.titulo }}</h3>
              <el-tag type="success">{{ aula.status }}</el-tag>
            </div>
            <p class="aula-descricao">{{ aula.descricao }}</p>
            <div class="aula-info">
              <p><strong>Educador:</strong> {{ aula.educador }}</p>
              <p><strong>Data:</strong> {{ formatarData(aula.dataInicio) }}</p>
              <p><strong>Vagas:</strong> {{ aula.vagasDisponiveis }} disponíveis</p>
            </div>
            <div class="aula-actions">
              <el-button type="primary" @click="inscreverSe(aula.id)">Inscrever-se</el-button>
              <el-button type="info" plain @click="verDetalhes(aula.id)">Ver Detalhes</el-button>
            </div>
          </el-card>
        </div>
      </div>

      <div class="minhas-inscricoes-section">
        <h2>Minhas Inscrições</h2>
        <div class="inscricoes-lista">
          <el-card v-for="inscricao in minhasInscricoes" :key="inscricao.id" class="inscricao-card">
            <div class="inscricao-header">
              <h3>{{ inscricao.titulo }}</h3>
              <el-tag :type="getStatusType(inscricao.status)">{{ inscricao.status }}</el-tag>
            </div>
            <div class="inscricao-info">
              <p><strong>Educador:</strong> {{ inscricao.educador }}</p>
              <p><strong>Data:</strong> {{ formatarData(inscricao.dataInicio) }}</p>
              <p><strong>Inscrito em:</strong> {{ formatarData(inscricao.dataInscricao) }}</p>
            </div>
            <div class="inscricao-actions">
              <el-button v-if="inscricao.status === 'Agendada'" size="small" type="danger" plain @click="cancelarInscricao(inscricao.id)">
                Cancelar Inscrição
              </el-button>
              <el-button v-if="inscricao.status === 'Concluída'" size="small" type="info" @click="verCertificado(inscricao.id)">
                Ver Certificado
              </el-button>
            </div>
          </el-card>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '../stores/authStore'

const router = useRouter()
const authStore = useAuthStore()

// Dados de exemplo (futuramente virão da API)
const aulasDisponiveis = ref([
  {
    id: 1,
    titulo: 'Matemática Básica',
    descricao: 'Operações fundamentais e resolução de problemas',
    educador: 'Prof. Maria Silva',
    dataInicio: '2024-01-25T09:00:00',
    status: 'Agendada',
    vagasDisponiveis: 5
  },
  {
    id: 2,
    titulo: 'Português Avançado',
    descricao: 'Gramática e produção textual',
    educador: 'Prof. João Santos',
    dataInicio: '2024-01-30T14:00:00',
    status: 'Agendada',
    vagasDisponiveis: 8
  }
])

const minhasInscricoes = ref([
  {
    id: 1,
    titulo: 'Alfabetização Básica',
    educador: 'Prof. Ana Costa',
    dataInicio: '2024-01-15T10:00:00',
    dataInscricao: '2024-01-10T15:30:00',
    status: 'Concluída'
  },
  {
    id: 2,
    titulo: 'Leitura e Interpretação',
    educador: 'Prof. Carlos Lima',
    dataInicio: '2024-01-22T16:00:00',
    dataInscricao: '2024-01-18T09:15:00',
    status: 'Agendada'
  }
])

function logout() {
  authStore.logout()
  router.push('/')
}

function inscreverSe(aulaId) {
  // Futura implementação
  console.log('Inscrever-se na aula:', aulaId)
}

function verDetalhes(aulaId) {
  // Futura implementação
  console.log('Ver detalhes da aula:', aulaId)
}

function cancelarInscricao(inscricaoId) {
  // Futura implementação
  console.log('Cancelar inscrição:', inscricaoId)
}

function verCertificado(inscricaoId) {
  // Futura implementação
  console.log('Ver certificado:', inscricaoId)
}

function getStatusType(status) {
  const types = {
    'Agendada': 'warning',
    'Concluída': 'success',
    'Cancelada': 'danger'
  }
  return types[status] || 'info'
}

function formatarData(dataString) {
  return new Date(dataString).toLocaleDateString('pt-BR', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  })
}

onMounted(() => {
  // Verificar autenticação
  if (!authStore.isAuthenticated || !authStore.isAluno) {
    router.push('/login')
  }
})
</script>

<style scoped>
.dashboard-aluno {
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
  background: var(--color-redbean);
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

.aulas-disponiveis-section,
.minhas-inscricoes-section {
  margin-bottom: 3rem;
}

.aulas-disponiveis-section h2,
.minhas-inscricoes-section h2 {
  color: var(--color-deep-matcha);
  margin-bottom: 1.5rem;
}

.aulas-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
  gap: 1.5rem;
}

.inscricoes-lista {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.aula-card,
.inscricao-card {
  border: 2px solid var(--color-border);
  transition: all 0.3s ease;
}

.aula-card:hover,
.inscricao-card:hover {
  border-color: var(--color-redbean);
  transform: translateY(-2px);
}

.aula-header,
.inscricao-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
}

.aula-header h3,
.inscricao-header h3 {
  color: var(--color-deep-matcha);
  margin: 0;
}

.aula-descricao {
  color: var(--color-text);
  margin-bottom: 1rem;
  line-height: 1.5;
}

.aula-info,
.inscricao-info {
  margin-bottom: 1rem;
}

.aula-info p,
.inscricao-info p {
  margin: 0.25rem 0;
  font-size: 0.9rem;
  color: var(--color-text);
}

.aula-actions,
.inscricao-actions {
  display: flex;
  gap: 0.5rem;
}
</style>