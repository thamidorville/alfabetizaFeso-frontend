<template>
  <section class="curso">
    <h1 class="titulo-curso">{{ curso.nome }}</h1>
    <p class="descricao-curso">{{ curso.descricao }}</p>

    <!-- Botões -->
    <div class="botoes">
      <Botao2
        v-if="isAluno"
        :variant="inscrito ? 'alerta' : 'principal'"
        @click="toggleInscricao"
      >
        {{ inscrito ? 'Cancelar Inscrição' : 'Se inscrever' }}
      </Botao2>

      <Botao2 v-else-if="isProfessor" variant="principal" @click="mostrarModalCriarAula = true">Criar Aula</Botao2>
    </div>

    <!-- AULAS -->
    <template v-if="isProfessor">
      <h2 class="subtitulo">Próximas Aulas</h2>
      <div class="cards-aulas">
        <CardAula
        v-for="aula in aulasFuturas"
        :key="aula.id"
        :aula="aula"
        :isProfessor="true"
        :isAluno="false"
        @gerenciar-presenca="abrirModalPresenca"
        />
      </div>
      
    <template v-if="isProfessor">
    </template>
      <h2 class="subtitulo" v-if="aulasPassadas.length">Aulas Anteriores</h2>
      <div class="cards-aulas" v-if="aulasPassadas.length">
        <CardAula
          v-for="aula in aulasPassadas"
          :key="aula.id"
          :aula="aula"
          :isProfessor="true"
          :isAluno="false"
          @gerenciar-presenca="abrirModalPresenca"
        />
      </div>
    </template>

    <template v-else>
      <h2 class="subtitulo">Próximas Aulas</h2>
      <div class="cards-aulas">
        <CardAula
          v-for="aula in aulasOrdenadas"
          :key="aula.id"
          :aula="aula"
          :isProfessor="false"
          :isAluno="auth.isAluno"
          @gerenciar-presenca="abrirModalPresenca"
        />
      </div>
    </template>

    <ModalPresenca
      v-if="mostrarModalPresenca"
      :aula="aulaSelecionada"
      :alunos="alunosDaAula"
      @close="mostrarModalPresenca = false"
    />

    <ModalCriarAula
      v-if="mostrarModalCriarAula"
      :cursoId="curso.id"
      @close="mostrarModalCriarAula = false"
      @aula-criada="adicionarNovaAula"
    />
  </section>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue'
import { useRoute } from 'vue-router'
import { useAuthStore } from '../stores/authStore'
import CardAula from '../components/CardAula.vue'
import ModalPresenca from '../components/ModalPresenca.vue'
import ModalCriarAula from '../components/ModalCriarAula.vue'
import Botao2 from '../components/Botao2.vue'
import { obterCurso, listarAulas } from '../services/cursoService'
import { listarAlunosPorAula } from '../services/inscricaoService'
import { inscrever, cancelarInscricao, verificarInscricao } from '../services/inscricaoService'

const route = useRoute()
const auth = useAuthStore()
const isAluno = auth.isAluno

const cursoId = route.params.id

const curso = ref({})
const aulas = ref([])
const isProfessor = ref(false)

const mostrarModalPresenca = ref(false)
const aulaSelecionada = ref(null)
const alunosDaAula = ref([])
const mostrarModalCriarAula = ref(false)

const inscrito = ref(false)

// Ordena aulas cronologicamente
const aulasOrdenadas = computed(() => {
  return [...aulas.value].sort((a, b) => new Date(a.dataInicio) - new Date(b.dataInicio))
})

// Próximas aulas (futuro) e aulas passadas (anterior) para educador
const aulasFuturas = computed(() => {
  const agora = new Date()
  return aulas.value
    .filter(a => new Date(a.dataInicio) > agora)
    .sort((a, b) => new Date(a.dataInicio) - new Date(b.dataInicio))
})

const aulasPassadas = computed(() => {
  const agora = new Date()
  return aulas.value
    .filter(a => new Date(a.dataInicio) <= agora)
    .sort((a, b) => new Date(a.dataInicio) - new Date(b.dataInicio))
})

async function carregarCursoEAulas() {
  try {
    curso.value = await obterCurso(cursoId)
    aulas.value = await listarAulas(cursoId)
    isProfessor.value = auth.user?.id === curso.value.educadorId

    if (isAluno) {
      inscrito.value = await verificarInscricao(cursoId)
    }
  } catch (err) {
    console.error('Erro ao carregar curso ou aulas:', err)
  }
}

async function toggleInscricao() {
  try {
    if (inscrito.value) {
      await cancelarInscricao(curso.value.id)
      inscrito.value = false
    } else {
      await inscrever(curso.value.id)
      inscrito.value = true
    }
  } catch (err) {
    console.error('Erro ao (des)inscrever:', err)
  }
}

async function abrirModalPresenca(aula) {
  aulaSelecionada.value = aula
  mostrarModalPresenca.value = true
  try {
    alunosDaAula.value = await listarAlunosPorAula(aula.id)
  } catch (err) {
    console.error('Erro ao buscar alunos da aula:', err)
  }
}

function adicionarNovaAula(novaAula) {
  aulas.value.push(novaAula)
  aulas.value.sort((a, b) => new Date(a.dataInicio) - new Date(b.dataInicio))
}

onMounted(() => carregarCursoEAulas())
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Sora:wght@400;500;700&display=swap');

.curso {
  padding: 50px;
  font-family: 'Sora', sans-serif;
  background: var(--cor-bg);
}

.titulo-curso {
  font-size: 2rem;
  font-weight: 700;
  color: var(--cor-principal);
  margin-bottom: 12px;
  text-align: left;
}

.descricao-curso {
  font-size: 1rem;
  color: var(--cor-texto);
  margin-bottom: 20px;
}

.subtitulo {
  font-size: 1.5rem;
  font-weight: 600;
  color: var(--cor-secundaria);
  margin: 32px 0 20px 0;
}

.cards-aulas {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 56px;
}

.botoes {
  display: flex;
  gap: 12px;
  width: 100%;
  margin-bottom: 20px;
}
</style>
