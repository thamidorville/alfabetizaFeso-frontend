<template>
  <section class="educadores-section container">
    <h1 class="section-title">Educadores Cadastrados</h1>

    <div class="cards">
      <el-card
        v-for="educador in educadores"
        :key="educador.id"
        class="card"
        shadow="hover"
      >
        <h3 class="card-title">{{ educador.nome }}</h3>
        <p><strong>Email:</strong> {{ educador.email }}</p>
        <p><strong>Especialidade:</strong> {{ educador.especialidade }}</p>
        <p><strong>Telefone:</strong> {{ educador.telefone }}</p>
        <p class="card-desc">{{ educador.descricao }}</p>
      </el-card>
    </div>
  </section>
</template>

<script setup>
import { onMounted, ref } from 'vue'
import { getEducadores } from '../services/educadorService'

const educadores = ref([])

async function listarEducadores() {
  try {
    const response = await getEducadores()
    educadores.value = response
  } catch (error) {
    console.error('Erro ao listar educadores:', error)
  }
}

onMounted(() => {
  listarEducadores()
})
</script>

<style>
.educadores-section {
  text-align: center;
}

.section-title {
  font-size: 1.8rem;
  color: var(--color-deep-matcha);
  margin-bottom: 2rem;
}

.cards {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 1.5rem;
}

.card {
  background: white;
  border-radius: 12px;
  padding: 1.5rem;
  text-align: left;
  transition: transform 0.2s, box-shadow 0.2s;
}

.card:hover {
  transform: translateY(-5px);
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.1);
}

.card-title {
  color: var(--color-matcha);
  margin-bottom: 0.5rem;
}

.card-desc {
  margin-top: 0.75rem;
  color: var(--color-text);
  font-size: 0.95rem;
}
</style>
