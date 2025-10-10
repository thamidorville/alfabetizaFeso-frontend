<template>
  <div id="app">
    <header>
      <h1 class="logo">AlfabetizaFeso</h1>
      <nav class="nav-links">
        <router-link to="/">Início</router-link>
        <router-link to="/educadores">Educadores</router-link>
        <router-link to="/auth">Login | Registrar</router-link>
      </nav>
    </header>

    <main>
      <router-view />
    </main>

    <footer>
      © 2025 Serial3 Corporation. Todos os direitos reservados.
    </footer>
  </div>
</template>

<script setup>
</script>


<style>
#app {
  height: 100vh;
  display: flex;
  flex-direction: column;
}

header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem 2rem;
  border-bottom: 1px solid var(--color-border);
}

.logo {
  color: var(--color-deep-matcha);
  font-weight: 700;
  font-size: 1.5rem;
}

.nav-links {
  display: flex;
  gap: 1.5rem;
}

.nav-links a,
.nav-links .dark-mode-toggle {
  font-weight: 500;
  color: var(--color-text);
  transition: color 0.2s;
  cursor: pointer;
  display: flex;
  align-items: center;
}

.nav-links a:hover,
.nav-links .dark-mode-toggle:hover {
  color: var(--color-matcha);
}

footer {
  text-align: center;
  padding: 1.5rem 0;
  font-size: 0.9rem;
  color: #777;
  border-top: 1px solid var(--color-border);
}


</style>


