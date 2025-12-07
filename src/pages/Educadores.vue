<template>
  <section class="educadores">
    <h1 class="titulo-pagina">Educadores</h1>

    <div class="cards-educadores">
      <CardEducador
        v-for="educador in educadores"
        :key="educador.id"
        :educador="educador"
      />
    </div>
  </section>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { getEducadores } from '../services/usuarioService'
import CardEducador from '../components/CardEducador.vue'

const educadores = ref([])

onMounted(async () => {
  try {
    educadores.value = await getEducadores()
  } catch (err) {
    console.error('Erro ao buscar educadores:', err)
  }
})
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Sora:wght@400;500;700&display=swap');

.educadores {
  padding: 50px;
  font-family: 'Sora', sans-serif;
  background: var(--cor-bg);
}

.titulo-pagina {
  font-size: 2rem;
  font-weight: 700;
  color: var(--cor-principal);
  margin-bottom: 30px;
  text-align: left;
}
  
.cards-educadores {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 24px;
}

</style>
