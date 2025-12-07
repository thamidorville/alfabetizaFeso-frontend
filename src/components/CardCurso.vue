<template>
  <div class="card-curso">
    <h3 class="titulo">{{ curso.nome }}</h3>
    <p class="descricao">{{ curso.descricao }}</p>

    <div class="botoes">
      <Botao2
        v-if="isAluno"
        :variant="inscrito ? 'alerta' : 'principal'"
        @click="toggleInscricao"
      >
        {{ inscrito ? 'Cancelar Inscrição' : 'Se inscrever' }}
      </Botao2>

      <Botao2 variant="secundario" @click="verMais">Mais Informações</Botao2>
    </div>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router'
import { ref, onMounted } from 'vue'
import { inscrever, cancelarInscricao, verificarInscricao } from '../services/inscricaoService'
import { useAuthStore } from '../stores/authStore'
import Botao2 from './Botao2.vue'

const { curso } = defineProps({
  curso: { type: Object, required: true }
})

const auth = useAuthStore()
const isAluno = auth.isAluno
const inscrito = ref(false)
const router = useRouter()

async function toggleInscricao() {
  try {
    if (inscrito.value) {
      await cancelarInscricao(curso.id)
      inscrito.value = false
    } else {
      await inscrever(curso.id)
      inscrito.value = true
    }
  } catch (err) {
    console.error('Erro ao (des)inscrever:', err)
  }
}

async function checkInscricao() {
  if (isAluno) {
    inscrito.value = await verificarInscricao(curso.id)
  }
}

function verMais() {
  router.push(`/curso/${curso.id}`)
}

onMounted(() => {
  checkInscricao()
})
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Sora:wght@400;600;700&display=swap');

.card-curso {
  width: 100%;
  max-width: 380px;
  background: white;
  border-radius: 12px;
  border-left: 5px solid var(--cor-principal);
  box-shadow: 0 4px 12px rgba(0,0,0,0.06);
  padding: 22px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 14px;
  text-align: center;
}

.titulo {
  color: var(--cor-principal);
  font-weight: 700;
  font-size: 1.2rem;
}

/* Title should be left-aligned within the centered card */
.titulo {
  text-align: left;
  align-self: flex-start;
}

.descricao {
  font-size: 0.95rem;
  color: var(--cor-texto);
  line-height: 1.45;
}

.botoes {
  display: flex;
  gap: 12px;
  justify-content: center;
  width: 100%;
  margin-top: 8px;
}

.card-curso button {
  padding: 8px 14px;
  border-radius: 6px;
  font-weight: 600;
  cursor: pointer;
  font-size: 0.95rem;
}
</style>
