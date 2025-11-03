<template>
  <div id="app">
    <Header />

    <main>
      <router-view />
    </main>

    <footer>
      © 2025 Serial3 Corporation. Todos os direitos reservados.
    </footer>
  </div>
</template>

<script setup>
import Header from './components/Header.vue'
</script>


<style scoped>
#app {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

main {
  flex: 1;
  padding-top: 0;
}

footer {
  text-align: center;
  padding: 2rem 0;
  font-size: 0.85rem;
  color: #6b7280;
  background: #f8f9fa;
  border-top: 1px solid #e5e7eb;
  margin-top: 0;
}
</style>


