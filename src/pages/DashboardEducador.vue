<template>
  <section class="dashboard-educador">
    <h1 class="titulo">Olá, {{ usuario.nome }}</h1>

    <!-- CARDS DE ESTATÍSTICAS -->
    <div class="cards-topo">
      <div class="card">
        <h3>Cursos Criados</h3>
        <p>{{ cursos.length }}</p>
      </div>

      <div class="card">
        <h3>Próximas Aulas</h3>
        <p>{{ aulasFuturas.length }}</p>
      </div>
    </div>

    <!-- CURSOS -->
    <div>
      <div class="header">
        <h2 class="subtitulo">Meus Cursos</h2>
        <Botao2 variant="principal" @click="mostrarModalCriarCurso = true">Criar Novo Curso</Botao2>
      </div>

      <div class="cards-cursos">
        <CardCurso v-for="curso in cursos" :key="curso.id" :curso="curso" />
      </div>
    </div>

    <!-- PRÓXIMAS AULAS -->
    <div>
      <h2 class="subtitulo">Próximas Aulas</h2>
      <div class="lista-aulas">
        <div v-for="aula in aulasFuturas" :key="aula.id" class="aula-item">
          <h3 class="nome-aula">{{ aula.titulo }}</h3>
          <p class="curso-nome">{{ aula.nomeCurso }}</p>
          <p class="data-aula">{{ formatDate(aula.dataInicio) }} - {{ formatDate(aula.dataFinal) }}</p>
        </div>
      </div>
    </div>

    <ModalCriarCurso v-if="mostrarModalCriarCurso" @close="mostrarModalCriarCurso = false"
      @curso-criado="adicionarNovoCurso" />
  </section>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue'
import { useAuthStore } from '../stores/authStore'
import CardCurso from '../components/CardCurso.vue'
import ModalCriarCurso from '../components/ModalCriarCurso.vue'
import Botao2 from '../components/Botao2.vue'
import { listarCursosPorEducador } from '../services/cursoService'
import { obterUsuario } from '../services/usuarioService'
import { listarAulasPorEducador } from '../services/aulaService'

const auth = useAuthStore()
const usuario = ref({})
const cursos = ref([])
const aulas = ref([])
const mostrarModalCriarCurso = ref(false)

// Formata datas em estilo pt-BR curto
function formatDate(date) {
  if (!date) return ''
  return new Date(date).toLocaleString([], { dateStyle: 'short', timeStyle: 'short' })
}

// Filtra apenas aulas futuras e ordena cronologicamente
const aulasFuturas = computed(() => {
  const agora = new Date()
  return aulas.value
    .filter(a => new Date(a.dataInicio) > agora)
    .sort((a, b) => new Date(a.dataInicio) - new Date(b.dataInicio))
})

// Adiciona novo curso à lista
function adicionarNovoCurso(novoCurso) {
  cursos.value.push(novoCurso)
}

async function carregarDashboard() {
  const educadorId = auth.user.id
  usuario.value = await obterUsuario(educadorId)

  // Cursos do educador
  cursos.value = await listarCursosPorEducador(educadorId)

  // Todas as aulas do educador
  const aulasEducador = await listarAulasPorEducador(educadorId)
  aulas.value = aulasEducador.map(a => ({
    ...a,
    dataInicio: new Date(a.dataInicio),
    dataFinal: new Date(a.dataFinal)
  }))
}

onMounted(() => carregarDashboard())
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Sora:wght@400;500;700&display=swap');

.dashboard-educador {
  padding: 50px;
  font-family: 'Sora', sans-serif;
  display: flex;
  flex-direction: column;
  background: var(--cor-bg);
  gap: 48px;
}

.titulo {
  font-size: 2rem;
  font-weight: 700;
  color: var(--cor-principal);
  margin-bottom: 25px;
}

/* CARDS DE ESTATÍSTICAS */
.cards-topo {
  display: flex;
  gap: 20px;
  margin-bottom: 40px;
}

.card {
  flex: 1;
  background: white;
  border-radius: 12px;
  padding: 20px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.08);
  border-left: 6px solid var(--cor-secundaria);
}

.card h3 {
  font-size: 1.1rem;
  font-weight: 600;
  color: var(--cor-secundaria);
  margin-bottom: 10px;
}

.card p {
  font-size: 1.6rem;
  font-weight: 700;
  color: var(--cor-principal);
}

/* HEADER DOS CURSOS */
.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
}

.subtitulo {
  font-size: 1.5rem;
  font-weight: 600;
  color: var(--cor-secundaria);
  margin-bottom: 20px;
}

/* CARDS DE CURSOS */
.cards-cursos {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 24px;
  margin-bottom: 40px;
}

/* PRÓXIMAS AULAS */
.lista-aulas {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.aula-item {
  background: white;
  border-radius: 12px;
  padding: 18px;
  border-left: 4px solid var(--cor-principal);
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.06);
}

.nome-aula {
  font-size: 1.2rem;
  font-weight: 600;
  color: var(--cor-principal);
  margin-bottom: 4px;
}

.curso-nome {
  font-size: 0.95rem;
  color: var(--cor-texto);
  margin-bottom: 6px;
}

.data-aula {
  color: var(--cor-secundaria);
  font-weight: 500;
}
</style>
