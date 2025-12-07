<template>
  <div class="card-educador">
    <img class="foto" :src="foto" alt="Foto do educador" />

    <h3 class="nome">{{ educador.nome }}</h3>
    <p class="especialidade">{{ educador.especialidade }}</p>
    <p class="descricao">{{ educador.descricao }}</p>

    <Botao2 class="btn-info" variant="principal" @click="verMais">Mais Informações</Botao2>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router'
import perfil1 from '../assets/perfil1.png'
import Botao2 from './Botao2.vue'

const props = defineProps({
  educador: { type: Object, required: true }
})

const router = useRouter()
const foto = perfil1

function verMais() {
  router.push(`/educador/${props.educador.id}`)
}
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Sora:wght@400;600;700&display=swap');

.card-educador {
  width: 100%;
  max-width: 380px;
  background: white;
  border-radius: 12px;
  border-left: 5px solid var(--cor-principal);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.06);
  padding: 22px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 14px;
  text-align: center;
  justify-content: space-between;
  height: 100%
}

.foto {
  width: 100px;
  height: 100px;
  border-radius: 50%;
  object-fit: cover;
}

.nome {
  color: var(--cor-principal);
  font-weight: 700;
  font-size: 1.15rem;
}

.especialidade {
  font-weight: 600;
  color: var(--cor-secundaria);
  font-size: 0.95rem;
}

.descricao {
  font-size: 0.9rem;
  color: var(--cor-texto);
  line-height: 1.4;
  max-width: 90%;
}
</style>
