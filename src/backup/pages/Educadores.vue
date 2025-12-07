<template>
  <div class="educadores-page">
    <h1 class="sora-section-title">Educadores da Plataforma</h1>

    <div v-if="loading">Carregando educadores...</div>

    <div v-else-if="erro" class="erro">
      Ocorreu um erro ao carregar a lista.
    </div>

    <div v-else class="lista">
      <EducadorCard
        v-for="educador in educadores"
        :key="educador.id"
        :nome="educador.nome"
        :descricao="educador.descricao"
        :foto="educador.foto || '/src/assets/perfil1.png'"
        :especialidade="educador.especialidade"
        @verDetalhes="abrirPagina(educador.id)"
      />
    </div>
  </div>
</template>

<script setup>
import { onMounted, ref } from "vue";
import { useRouter } from "vue-router";

import { getEducadores } from "../services/usuarioService";
import EducadorCard from "../components/EducadorCard.vue";

const router = useRouter();
const educadores = ref([]);
const loading = ref(true);
const erro = ref(null);

function abrirPagina(id) {
  router.push(`/educadores/${id}`);
}

onMounted(async () => {
  try {
    educadores.value = await getEducadores();
  } catch (e) {
    erro.value = e;
  } finally {
    loading.value = false;
  }
});
</script>

<style scoped>
.educadores-page {
  padding: 20px;
}

.lista {
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
}

.erro {
  color: red;
}
</style>
