<template>
  <div id="app">
  
    <header class="header">
      <h1>AlfabetizaFeso Frontend</h1>
      <nav>
        <router-link to="/" class="link">Início</router-link>
        <router-link to="/educadores" class="link">Educadores</router-link>
      </nav>
    </header>

    <main class="conteudo">
      <router-view />
    </main>
  </div>
</template>

<script setup>

</script>

<style scoped>
#app {
  font-family: Arial, Helvetica, sans-serif;
  color: #1f2937; /* cinza escuro */
  background-color: #f9fafb; /* cinza claro */
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

.header {
  background: #1e3a8a; /* azul escuro */
  color: white;
  padding: 12px 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.header h1 {
  margin: 0;
  font-size: 18px;
}

.header nav {
  display: flex;
  gap: 12px;
}

.link {
  color: white;
  text-decoration: none;
  font-weight: 500;
}

.link:hover {
  text-decoration: underline;
}

.conteudo {
  flex: 1;
  padding: 20px;
}
</style>
