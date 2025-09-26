<template>
  <section>
    <h1>Lista de Educadores</h1>

    <div class="cards">
      <el-card
        v-for="educador in educadores"
        :key="educador.id"
        class="card"
        shadow="hover"
      >
        <h3>{{ educador.nome }}</h3>
        <p><strong>Email:</strong> {{ educador.email }}</p>
        <p><strong>Especialidade:</strong> {{ educador.especialidade }}</p>
        <p><strong>Telefone:</strong> {{ educador.telefone }}</p>
        <p>{{ educador.descricao }}</p>
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
    console.log('Lista de educadores que vem da API:', response)
    educadores.value = response
  } catch (error) {
    console.error('Erro ao listar educadores:', error)
  }
}

onMounted(() => {
  listarEducadores()
})
</script>

<style scoped>
.cards {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
  gap: 16px;
  margin-top: 20px;
}

.card {
  border-radius: 10px;
}
</style>
