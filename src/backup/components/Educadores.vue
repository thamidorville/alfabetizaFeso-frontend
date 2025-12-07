<template>
  <section class="educadores">
    <h1>Educadores Cadastrados</h1>

    <div class="cards">
      <el-card
        v-for="educador in educadores"
        :key="educador.id"
        class="card"
        shadow="hover"
      >
        <div class="card-header">
          <h3>{{ educador.nome }}</h3>
          <span class="badge">{{ educador.especialidade }}</span>
        </div>
        <div class="card-body">
          <p class="info"><strong>Email:</strong> {{ educador.email }}</p>
          <p class="info"><strong>Telefone:</strong> {{ educador.telefone }}</p>
          <p class="description">{{ educador.descricao }}</p>
        </div>
      </el-card>
    </div>
  </section>
</template>

<script setup>
import { onMounted, ref } from 'vue'
import { getEducadores } from '../services/usuarioService'

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

<style scoped>
.educadores {
  width: 100%;
}

h1 {
  color: var(--color-deep-matcha);
  margin-bottom: 2rem;
  text-align: center;
}

.cards {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 1.5rem;
  margin-top: 2rem;
}

.card {
  border-radius: 12px;
  border: 2px solid var(--color-matcha);
  transition: all 0.3s ease;
}

.card:hover {
  transform: translateY(-5px);
  box-shadow: 0 8px 20px rgba(105, 130, 105, 0.2);
  border-color: var(--color-redbean);
}

.card-header {
  display: flex;
  flex-direction: column;
  margin-bottom: 1rem;
  gap: 0.4rem;
  padding-bottom: 0.8rem;
  border-bottom: 2px solid var(--color-deep-matcha);
}

.card-header h3 {
  margin: 0;
  color: var(--color-matcha);
  font-size: 1.4rem;
}

.badge {
  background-color: var(--color-redbean);
  color: var(--color-bg-container);
  padding: 0.3rem 0.8rem;       
  border-radius: 6px;
  font-size: 0.85rem;
  font-weight: 600;

  white-space: nowrap;          
  overflow: hidden;             
  text-overflow: ellipsis;      
}




.info {
  margin: 0.5rem 0;
  font-size: 0.95rem;
  color: #555;
}

.info strong {
  color: var(--color-deep-matcha);
}

.description {
  margin-top: 1rem;
  padding-top: 1rem;
  border-top: 1px solid var(--color-deep-matcha);
  color: #666;
  line-height: 1.5;
  font-style: italic;
}

</style>
