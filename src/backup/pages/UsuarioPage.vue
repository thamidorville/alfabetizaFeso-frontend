<template>
  <section class="users-page">
    <h1>Lista de Usuários</h1>

    <Botao2 variant="secundario" @click="carregarUsuarios">Recarregar</Botao2>

    <ul>
      <li v-for="user in usuarios" :key="user.id">
        {{ user.nome }}
      </li>
    </ul>

    <p v-if="usuarios.length === 0">Nenhum usuário encontrado.</p>
  </section>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { getUsuarios } from "../services/usuarioService";
import Botao2 from '../../components/Botao2.vue'

// estado local da página
const usuarios = ref([]);

// função que busca dados
async function carregarUsuarios() {
  const { data } = await getUsuarios();
  usuarios.value = data;
}

// busca automática ao abrir a página
onMounted(carregarUsuarios);
</script>

<style scoped>
.users-page {
  padding: 20px;
}
</style>
