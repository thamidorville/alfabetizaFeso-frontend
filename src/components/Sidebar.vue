<template>
  <aside class="sidebar">
    <div class="logo">
      <img src="../assets/logo.png" alt="Logo" />
    </div>

    <nav class="menu">
      <ul>
        <li v-for="item in menuOptions" :key="item.label">
          <RouterLink v-if="item.to" :to="item.to">
            <div class="menu-item-content">
              <i :class="item.icon"></i>
              <span>{{ item.label }}</span>
            </div>
          </RouterLink>

          <div v-else-if="item.action === 'logout'" class="menu-item-content">
            <Botao type="alerta" width="100%" :texto="item.label" @click="handleLogout"
              icon="arrow-right-from-bracket" />
          </div>
        </li>
      </ul>
    </nav>
  </aside>
</template>

<script setup>
import { computed } from 'vue'
import { useAuthStore } from '../stores/authStore'
import { useRouter } from 'vue-router'
import Botao from '../components/Botao.vue'

const auth = useAuthStore()
const router = useRouter()

function handleLogout() {
  auth.logout()
  router.push('/sobre')
}

const menuOptions = computed(() => {
  if (!auth.isAuthenticated) {
    return [
      { label: "Sobre", to: "/sobre", icon: "fa-solid fa-circle-info" },
      { label: "Educadores", to: "/educadores", icon: "fa-solid fa-chalkboard-user" },
      { label: "Cursos", to: "/cursos", icon: "fa-solid fa-book" },
    ]
  }
  
  if (auth.isAluno) {
    return [
      { label: "Painel", to: "/aluno/dashboard", icon: "fa-solid fa-chart-bar" },
      { label: "Educadores", to: "/educadores", icon: "fa-solid fa-chalkboard-user" },
      { label: "Cursos", to: "/cursos", icon: "fa-solid fa-book" },
      { label: "Sair", action: "logout" }
    ]
  }
  
  if (auth.isEducador) {
    return [     
      { label: "Painel", to: "/educador/dashboard", icon: "fa-solid fa-chart-bar" },
      { label: "Sair", action: "logout" }
    ]
  }

  return []
})
</script>

<style scoped>
.sidebar {
  height: 100vh;
  width: 380px;
  position: fixed;
  top: 0;
  left: 0;
  background-color: var(--cor-bg);
  padding: 64px 32px;
  box-sizing: border-box;
  box-shadow: var(--sombra);
  overflow-x: hidden;
  z-index: 1;
}

.logo img {
  width: 100%;
  object-fit: contain;
  margin-bottom: 80px;
}

.menu ul {
  list-style: none;
  padding: 0;
  margin: 0;
}

.menu li {
  margin-bottom: 48px;
}

.menu a {
  display: block;
  width: auto;
  text-decoration: none;
  font-family: "Sora", sans-serif;
  font-size: 25px;
  color: var(--cor-principal);
  border-radius: 8px;
}

.menu a:hover,
.menu a.router-link-active,
.menu a.router-link-exact-active {
  background-color: var(--cor-bg-2);
}

.menu-item-content {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 16px;
  width: 100%;
}
</style>
