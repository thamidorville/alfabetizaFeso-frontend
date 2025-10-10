<template>
  <div class="pagina-inicial container text-center">
    <h1 class="welcome-title">Bem-vindo ao AlfabetizaFeso!</h1>
    <p class="welcome-subtitle">Aprenda, ensine e conecte-se com educadores.</p>

    <div class="cta-buttons">
      <router-link to="/auth">
        <button class="btn btn-primary">Crie Sua Conta</button>
      </router-link>
    </div>

  </div>
</template>

<script setup>
import Educadores from '../components/Educadores.vue'
</script>

<style scoped>
.welcome-title {
  font-size: 2rem;
  margin-bottom: 0.5rem;
  color: var(--color-deep-matcha);
}

.welcome-subtitle {
  font-size: 1.1rem;
  margin-bottom: 2rem;
  color: var(--color-text);
}

.cta-buttons {
  margin-bottom: 3rem;
}

.cta-buttons .btn {
  font-size: 1rem;
  padding: 0.75rem 1.5rem;
}
</style>
