<template>
  <div class="pagina-inicial">
    <h1>Página Inicial</h1>
  
    <Educadores />
  </div>
</template>

<script setup>
import Educadores from '../components/Educadores.vue'
</script>

<style scoped>
.pagina-inicial {
  padding: 20px;
}

.pagina-inicial h1 {
  margin-bottom: 16px;
  color: #1e3a8a; /* azul escuro */
}
</style>
