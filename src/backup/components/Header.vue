3.
<template>
  <header class="main-header">
    <div class="header-container">
      <div class="logo-section">
        <router-link to="/" class="logo-link">
          <img 
            alt="AlfabetizaFeso Logo" 
            class="logo-image"
          />
        </router-link>
      </div>

      <nav class="nav-menu">
        <div class="nav-links">
          <router-link to="/" class="nav-link">
            <span>Início</span>
          </router-link>
          <router-link to="/cursos" class="nav-link">
            <span>Cursos</span>
          </router-link>
          <router-link to="/educadores" class="nav-link">
            <span>Educadores</span>
          </router-link>
        </div>

        <button 
          class="mobile-menu-btn"
          @click="toggleMobileMenu"
          :class="{ active: isMobileMenuOpen }"
        >
          <span class="hamburger-line"></span>
          <span class="hamburger-line"></span>
          <span class="hamburger-line"></span>
        </button>
      </nav>

      <div 
        class="mobile-menu-overlay"
        :class="{ active: isMobileMenuOpen }"
        @click="closeMobileMenu"
      >
        <div class="mobile-menu" @click.stop>
          <router-link to="/" class="mobile-nav-link" @click="closeMobileMenu">
            <i class="nav-icon">🏠</i>
            <span>Início</span>
          </router-link>
          <router-link to="/cursos" class="mobile-nav-link" @click="closeMobileMenu">
            <i class="nav-icon">📚</i>
            <span>Cursos</span>
          </router-link>
          <router-link to="/educadores" class="mobile-nav-link" @click="closeMobileMenu">
            <i class="nav-icon">👨🏫</i>
            <span>Educadores</span>
          </router-link>
          <router-link to="/auth" class="mobile-nav-link" @click="closeMobileMenu">
            <i class="nav-icon">👤</i>
            <span>Entrar</span>
          </router-link>

        </div>
      </div>
    </div>
  </header>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'

const isMobileMenuOpen = ref(false)

const toggleMobileMenu = () => {
  isMobileMenuOpen.value = !isMobileMenuOpen.value
}

const closeMobileMenu = () => {
  isMobileMenuOpen.value = false
}

const handleResize = () => {
  if (window.innerWidth > 768) {
    isMobileMenuOpen.value = false
  }
}

onMounted(() => {
  window.addEventListener('resize', handleResize)
})

onUnmounted(() => {
  window.removeEventListener('resize', handleResize)
})
</script>

<style scoped>
:root {
  --color-bg-container: #ffffff;
  --color-border: #e0e0e0;
  --color-deep-matcha: #4A6E4F;
  --color-matcha: #8FC089;
  --color-text: #333333;
  --color-bg: #f5f5f5;
}

.main-header {
  background: var(--color-bg-container);
  border-bottom: 2px solid var(--color-border);
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.05);
  position: sticky;
  top: 0;
  z-index: 1000;
  transition: all 0.3s ease;
  max-width: auto;
}

.header-container {
  margin: 0 auto;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0 2rem 0 200px;
  height: 170px;
  position: relative;
  height: 82px;
}

.logo-section {
  position: absolute;
  left: 1rem;
  top: 50%;
  transform: translateY(-50%);
  z-index: 1001;
}

.logo-link {
  display: flex;
  align-items: center;
  gap: 12px;
  text-decoration: none;
  transition: transform 0.2s ease;
}

.logo-link:hover {
  transform: translateY(-2px);
}

.logo-image {
  height: 150px;
  width: 150px;
  object-fit: contain;
}

.nav-menu {
  display: flex;
  align-items: center;
  gap: 2rem;
}

.nav-links {
  display: flex;
  align-items: center;
  gap: 1.5rem;
}

.nav-link {
  display: flex;
  align-items: center;
  padding: 12px 18px;
  border-radius: 25px;
  text-decoration: none;
  color: var(--color-text);
  font-weight: 500;
  font-size: 1rem;
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;
}

.nav-link::before {
  content: '';
  position: absolute;
  top: 0;
  left: -100%;
  width: 100%;
  height: 100%;
  background: linear-gradient(90deg, transparent, rgba(164, 195, 162, 0.1), transparent);
  transition: left 0.5s ease;
}

.nav-link:hover::before {
  left: 100%;
}

.nav-link:hover {
  color: var(--color-deep-matcha);
  background-color: rgba(164, 195, 162, 0.08);
  transform: translateY(-2px);
  box-shadow: 0 4px 10px rgba(164, 195, 162, 0.2);
}

.nav-link.router-link-active {
  color: var(--color-deep-matcha);
  font-weight: 700;
  position: relative;
}

.nav-link.router-link-active::after {
  content: '';
  position: absolute;
  bottom: 0px;
  left: 50%;
  transform: translateX(-50%);
  width: 70%;
  height: 2px;
  background-color: var(--color-deep-matcha);
  border-radius: 1px;
}

.nav-link.router-link-active:hover {
  background-color: transparent;
  color: var(--color-deep-matcha);
}

.mobile-menu-btn {
  display: none;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 40px;
  height: 40px;
  background: transparent;
  border: none;
  cursor: pointer;
  padding: 0;
  z-index: 1001;
}

.hamburger-line {
  width: 25px;
  height: 3px;
  background-color: var(--color-deep-matcha);
  margin: 3px 0;
  transition: all 0.3s ease;
  border-radius: 2px;
}

.mobile-menu-btn.active .hamburger-line:nth-child(1) {
  transform: rotate(45deg) translate(6px, 6px);
}

.mobile-menu-btn.active .hamburger-line:nth-child(2) {
  opacity: 0;
}

.mobile-menu-btn.active .hamburger-line:nth-child(3) {
  transform: rotate(-45deg) translate(6px, -6px);
}

.mobile-menu-overlay {
  display: none;
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.4);
  z-index: 999;
  opacity: 0;
  visibility: hidden;
  transition: all 0.3s ease;
}

.mobile-menu-overlay.active {
  opacity: 1;
  visibility: visible;
}

.mobile-menu {
  position: absolute;
  top: 170px;
  right: 0;
  width: 280px;
  max-width: 90vw;
  background: var(--color-bg-container);
  box-shadow: -5px 0 20px rgba(0, 0, 0, 0.08);
  padding: 1.5rem 0;
  transform: translateX(100%);
  transition: transform 0.3s ease;
}

.mobile-menu-overlay.active .mobile-menu {
  transform: translateX(0);
}

.mobile-nav-link {
  display: flex;
  align-items: center;
  gap: 15px;
  padding: 15px 2rem;
  text-decoration: none;
  color: var(--color-text);
  font-weight: 500;
  font-size: 1.1rem;
  transition: all 0.3s ease;
  border-left: 4px solid transparent;
}

.mobile-nav-link:hover {
  background-color: rgba(164, 195, 162, 0.1);
  border-left-color: var(--color-matcha);
  color: var(--color-deep-matcha);
}

.mobile-nav-link.router-link-active {
  background-color: rgba(164, 195, 162, 0.2);
  border-left-color: var(--color-deep-matcha);
  color: var(--color-deep-matcha);
}

@media (max-width: 768px) {
  .header-container {
    padding: 0 1rem;
    height: 70px;
  }
  
  .logo-image {
    height: 40px;
    width: auto;
  }
  
  .nav-links {
    display: none;
  }
  
  .mobile-menu-btn {
    display: flex;
  }
  
  .mobile-menu-overlay {
    display: block;
  }
}

@media (max-width: 480px) {
  .header-container {
    height: 60px;
  }
  
  .logo-image {
    height: 35px;
    width: auto;
  }
  
  .mobile-menu {
    top: 60px;
  }
}

.nav-link:focus,
.mobile-nav-link:focus,
.logo-link:focus {
  outline: 2px solid var(--color-matcha);
  outline-offset: 2px;
  border-radius: 4px;
}

.mobile-menu-btn:focus {
  outline: 2px solid var(--color-matcha);
  outline-offset: 2px;
  border-radius: 4px;
}
</style>
