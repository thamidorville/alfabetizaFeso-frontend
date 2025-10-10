<!-- <template>
  <div class="auth-view container text-center">
    <div class="auth-container">
      <div class="auth-tabs">
        <button 
          @click="activeTab = 'login'" 
          :class="['tab', { active: activeTab === 'login' }]">
          Login
        </button>
        <button 
          @click="activeTab = 'cadastro'" 
          :class="['tab', { active: activeTab === 'cadastro' }]">
          Cadastrar
        </button>
      </div>

      <div class="auth-content">
        <LoginEducador v-if="activeTab === 'login'" />
        <CadastroEducador v-else />
      </div>
    </div>
  </div>
</template> -->

<template>
    <el-tabs class="auth-container" stretch>
      <el-tab-pane  label="Login">
        <LoginEducador />
      </el-tab-pane>
      <el-tab-pane label="Registro">
        <CadastroEducador />
      </el-tab-pane>
    </el-tabs>
</template>

<script setup>
import { ref } from 'vue'
import LoginEducador from '../components/LoginEducador.vue'
import CadastroEducador from '../components/CadastroEducador.vue'

const activeTab = ref('login')
</script>

<style scoped>
.auth-container {
  max-width: 450px;
  margin: 0 auto;
  background: var(--color-bg-container);
  padding: 1rem;
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(0,0,0,0.05);
}

.auth-tabs {
  display: flex;
  justify-content: space-around;
  margin-bottom: 2rem;
  border-bottom: 2px solid var(--color-border);
}

.tab {
  flex: 1;
  padding: 0.75rem 0;
  cursor: pointer;
  font-weight: 600;
  color: var(--color-text);
  border-bottom: 3px solid transparent;
  transition: 0.2s;
  background-color: var(--color-bg-container);
}

.tab.active {
  color: var(--color-deep-matcha);
  border-color: var(--color-deep-matcha);
}

.auth-content {
  margin-top: 1rem;
}
</style>
