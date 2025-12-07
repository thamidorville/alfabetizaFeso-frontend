<template>
  <section class="educador">
    <div class="perfil-educador">
      <img src="../assets/perfil1.png" alt="Foto do educador" class="foto" />
      <div class="info">
        <h2>{{ educador.nome }}</h2>
        <p v-if="educador.especialidade"><strong>Especialidade:</strong> {{ educador.especialidade }}</p>
        <p><strong>Email:</strong> {{ educador.email }}</p>
        <p><strong>Telefone:</strong> {{ educador.telefone }}</p>
        <p v-if="educador.descricao"><strong>Descrição:</strong> {{ educador.descricao }}</p>
      </div>
    </div>

    <h3 class="cursos-titulo">Cursos</h3>
    <div class="cards-cursos">
      <CardCurso
        v-for="curso in cursos"
        :key="curso.id"
        :curso="curso"
      />
    </div>
  </section>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { obterUsuario } from '../services/usuarioService'
import { listarCursosPorEducador } from '../services/cursoService'
import CardCurso from '../components/CardCurso.vue'

const route = useRoute()
const educadorId = route.params.id

const educador = ref({})
const cursos = ref([])

onMounted(async () => {
  try {
    educador.value = await obterUsuario(educadorId)
    cursos.value = await listarCursosPorEducador(educadorId)
  } catch (err) {
    console.error('Erro ao buscar dados do educador:', err)
  }
})
</script>

<style scoped>
.educador {
  padding: 40px 60px;
  font-family: 'Sora', sans-serif;
  background: var(--cor-bg);
  min-height: 100vh;
}

/* PERFIL DO EDUCADOR */
.perfil-educador {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 40px;
  margin-bottom: 50px;
  background: var(--cor-bg);
  padding: 30px;
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(0,0,0,0.08);
}

.perfil-educador .foto {
  width: 160px;
  height: 160px;
  border-radius: 50%;
  object-fit: cover;
}

.perfil-educador .info {
  flex: 1;
  min-width: 220px;
}

.perfil-educador .info h2 {
  color: var(--cor-principal);
  font-size: 1.8rem;
  margin-bottom: 12px;
}

.perfil-educador .info p {
  color: #333;
  margin-bottom: 6px;
  line-height: 1.4;
}

/* CURSOS */
.cursos-titulo {
  color: var(--cor-principal);
  font-size: 1.6rem;
  margin-bottom: 20px;
}

.cards-cursos {
  display: grid;
  gap: 24px;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
}
</style>
