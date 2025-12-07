<template>
  <section class="dashboard">
    <h1 class="titulo">Olá, {{ usuario.nome }}</h1>

    <!-- CARDS DE ESTATÍSTICAS -->
    <div class="cards-topo">
      <div class="card">
        <h3>Cursos Inscritos</h3>
        <p>{{ cursosUnicos.length }}</p>
      </div>

      <div class="card">
        <h3>Carga Horária Assistida</h3>
        <p>{{ cargaHorariaHoras }} h</p>
      </div>
    </div>

    <!-- CURSOS -->
    <h2 class="subtitulo">Meus Cursos</h2>
    <div class="cards-cursos">
      <CardCurso
        v-for="curso in cursosUnicos"
        :key="curso.id"
        :curso="curso"
      />
    </div>

    <!-- HISTÓRICO DE AULAS -->
    <h2 class="subtitulo">Histórico de Aulas Assistidas</h2>

    <div class="lista-aulas">
      <div v-for="aula in aulasPresente" :key="aula.id" class="aula-item">
        <h3 class="nome-aula">{{ aula.titulo }}</h3>
        <p class="curso-nome">{{ aula.nomeCurso }}</p>
        <p class="data-aula">
          {{ formatDate(aula.dataInicio) }} — {{ formatDate(aula.dataFinal) }}
        </p>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useAuthStore } from '../stores/authStore'
import { obterUsuario } from '../services/usuarioService'
import { minhasInscricoes } from '../services/inscricaoService'
import { listarAulasPresentesPorAluno, obterCargaHorariaPorAluno } from '../services/inscricaoService'
import CardCurso from '../components/CardCurso.vue'

const auth = useAuthStore()
const usuario = ref({})
const inscricoes = ref([])
const aulasPresente = ref([])
const cargaHorariaHoras = ref(0)

function formatDate(date) {
  return new Date(date).toLocaleString([], { dateStyle: 'short', timeStyle: 'short' })
}

function extrairCurso(inscricao) {
  return {
    id: inscricao.curso?.id ?? inscricao.cursoId,
    nome: inscricao.curso?.nome ?? inscricao.nomeCurso,
    descricao: inscricao.curso?.descricao ?? ''
  }
}

const cursosUnicos = computed(() => {
  const map = new Map()
  for (const inscr of inscricoes.value) {
    const curso = extrairCurso(inscr)
    if (curso.id && !map.has(curso.id)) map.set(curso.id, curso)
  }
  return [...map.values()]
})

async function carregarDashboard() {
  const alunoId = auth.user.id

  usuario.value = await obterUsuario(alunoId)
  inscricoes.value = await minhasInscricoes()

  const aulas = await listarAulasPresentesPorAluno(alunoId)
  aulasPresente.value = aulas.map(a => ({
    ...a,
    dataInicio: new Date(a.dataInicio),
    dataFinal: new Date(a.dataFinal)
  }))

  const carga = await obterCargaHorariaPorAluno(alunoId)
  cargaHorariaHoras.value = carga.totalHoras ?? 0
}

onMounted(() => carregarDashboard())
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Sora:wght@400;600;700&display=swap');

.dashboard {
  padding: 50px;
  font-family: 'Sora', sans-serif;
  display: flex;
  flex-direction: column;
  background: var(--cor-bg);
  gap: 16px;
}

.titulo {
  font-size: 2rem;
  font-weight: 700;
  color: var(--cor-principal);
  margin-bottom: 25px;
}

/* CARDS DE CIMA */
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
  box-shadow: 0 4px 10px rgba(0,0,0,0.08);
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

/* CURSOS */
.subtitulo {
  font-size: 1.5rem;
  font-weight: 600;
  color: var(--cor-secundaria);
  margin: 30px 0 20px 0;
}

.cards-cursos {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 30px;
  margin-bottom: 50px;
}

/* HISTÓRICO DE AULAS */
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
  box-shadow: 0 4px 10px rgba(0,0,0,0.06);
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
