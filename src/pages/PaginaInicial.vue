<template>
  <div class="pagina-inicial">
    <h1>Página Inicial</h1>
    <div class="row">
      <div class="col">
        <CadastroEducador />
      </div>
      <div class="col">
        <LoginEducador />
      </div>
    </div>

    <hr />

    <Educadores />
  </div>
</template>

<script setup>
import Educadores from '../components/Educadores.vue'
import CadastroEducador from '../components/CadastroEducador.vue'
import LoginEducador from '../components/LoginEducador.vue'
</script>

<style scoped>
.pagina-inicial {
  padding: 20px;
}

.pagina-inicial h1 {
  margin-bottom: 16px;
  color: #1e3a8a; 
}
</style>
