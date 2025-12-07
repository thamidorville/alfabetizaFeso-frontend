<template>
  <div class="card-aula" :class="{ clicavel: isProfessor || isAluno }">
    <div class="conteudo">
      <h3 class="titulo">{{ aula.titulo }}</h3>
      <p class="descricao">{{ aula.descricao }}</p>

      <div class="datas-bloco">
        <span class="data">{{ formatarData(aula.dataInicio) }}</span>
        <span class="separador"> - </span>
        <span class="data">{{ formatarData(aula.dataFinal) }}</span>
      </div>

    </div>

    <!-- BOTÕES -->
    <div class="botoes">
      <Botao2 v-if="aula.linkAula && antesFimAula()" variant="principal" @click="abrirLink"
        class="btn-acessar">Acessar Aula</Botao2>
      <Botao2 v-if="isProfessor && depoisInicioAula()" variant="principal" @click="$emit('gerenciar-presenca', aula)" class="btn-gerenciar">
        Gerenciar Presenças
      </Botao2>
    </div>
  </div>
</template>

<script setup>
const { aula, isProfessor, isAluno } = defineProps({
  aula: { type: Object, required: true },
  isProfessor: { type: Boolean, default: false },
  isAluno: { type: Boolean, default: false }
})

import Botao2 from './Botao2.vue'

function formatarData(data) {
  if (!data) return ''
  const d = new Date(data)
  if (isNaN(d)) return ''
  return d.toLocaleString('pt-BR', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  })
}

function antesFimAula() {
  if (!aula || !aula.dataFinal) return false
  const fim = new Date(aula.dataFinal)
  if (isNaN(fim)) return false
  return fim > new Date()
}

function depoisInicioAula() {
  if (!aula || !aula.dataInicio) return false
  const inicio = new Date(aula.dataInicio)
  if (isNaN(inicio)) return false
  return new Date() >= inicio
}

function abrirLink() {
  if (!aula || !aula.linkAula) return
  try {
    window.open(aula.linkAula, '_blank', 'noopener,noreferrer')
  } catch (e) {
    // fallback
    window.location.href = aula.linkAula
  }
}
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Sora:wght@400;600;700&display=swap');

.card-aula {
  width: 100%;
  max-width: 380px;
  padding: 22px;
  border-radius: 12px;
  background: white;
  border-left: 5px solid var(--cor-principal);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.06);
  display: flex;
  flex-direction: column;
  gap: 18px;
  position: relative;
  transition: transform .15s ease, box-shadow .15s ease;
  cursor: default;
}

.link-bloco {
  display: flex;
  justify-content: center;
  margin-top: 8px;
}

.link-aula {
  background: var(--cor-principal);
  color: white;
  padding: 8px 12px;
  border-radius: 8px;
  text-decoration: none;
  font-weight: 600;
  font-size: 0.95rem;
}

.link-aula:hover {
  opacity: 0.95;
}

.titulo {
  font-size: 1.2rem;
  font-weight: 700;
  color: var(--cor-principal);
  margin-bottom: 4px;
}

.descricao {
  font-size: 0.95rem;
  color: var(--cor-texto);
  line-height: 1.4;
}

.datas-bloco {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 6px;
  margin-top: 10px;
}

.data {
  font-size: 0.88rem;
  color: var(--cor-secundaria);
  font-weight: 600;
}

.separador {
  color: var(--cor-texto-secundario);
  font-weight: 700;
}

.botoes {
  display: flex;
  justify-content: center;
  margin-top: 4px;
}
</style>
