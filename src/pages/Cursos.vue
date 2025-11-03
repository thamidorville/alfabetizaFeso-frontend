<template>
  <div class="cursos-page">
    <h1>Cursos Disponíveis</h1>
    <div v-if="loading" class="loading">Carregando cursos...</div>
    <div v-else-if="cursos.length === 0" class="empty">Nenhum curso disponível no momento.</div>
    <div v-else class="cursos-grid">
      <el-card v-for="curso in cursos" :key="curso.id" class="curso-card" shadow="hover">
        <div class="curso-header">
          <h3>{{ curso.nome }}</h3>
          <el-tag type="success">{{ curso.totalAulas }} aulas</el-tag>
        </div>
        <p class="curso-descricao">{{ curso.descricao }}</p>
        <div class="curso-info">
          <p><strong>Educador:</strong> {{ curso.nomeEducador }}</p>
          <p><strong>Carga Horária:</strong> {{ curso.cargaHoraria }}h</p>
          <p><strong>Status:</strong> {{ curso.status }}</p>
        </div>
      </el-card>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import cursoService from '../services/cursoService'
import { ElMessage } from 'element-plus'

const cursos = ref([])
const loading = ref(false)

async function carregarCursos() {
  loading.value = true
  try {
    cursos.value = await cursoService.listarTodos()
  } catch (error) {
    ElMessage.error('Erro ao carregar cursos: ' + error.message)
  } finally {
    loading.value = false
  }
}

onMounted(() => {
  carregarCursos()
})
</script>

<style scoped>
.cursos-page {
  min-height: 100vh;
  padding: 2rem;
  max-width: 1200px;
  margin: 0 auto;
}

h1 {
  color: var(--color-deep-matcha);
  margin-bottom: 2rem;
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
</style>
