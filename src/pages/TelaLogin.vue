<template>
  <div class="login-page">
    <div class="login-container">
      <div class="login-header">
        <div class="icon-wrapper">
          <svg width="32" height="32" viewBox="0 0 24 24" fill="none">
            <path d="M15 3H19C20.1046 3 21 3.89543 21 5V19C21 20.1046 20.1046 21 19 21H15" stroke="currentColor" stroke-width="2"/>
            <path d="M10 17L15 12L10 7" stroke="currentColor" stroke-width="2"/>
            <path d="M15 12H3" stroke="currentColor" stroke-width="2"/>
          </svg>
        </div>
        <h1>Bem-vindo de volta!</h1>
        <p>Faça login para continuar</p>
      </div>
      <FormLogin />
      <div class="cadastro-link">
        <p>Não tem uma conta? <router-link to="/">Cadastre-se aqui</router-link></p>
      </div>
    </div>
  </div>
</template>

<script setup>
import FormLogin from '../components/FormLogin.vue'
</script>

<style scoped>
.login-page {
  min-height: 100vh;
  background: linear-gradient(135deg, #fafbfc 0%, #f1f3f4 100%);
  display: grid;
  place-items: center;
  padding: 2rem 1rem;
}

.login-container {
  width: 100%;
  max-width: 500px;
  background: white;
  border-radius: 24px;
  padding: clamp(2rem, 5vw, 3rem);
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.08);
  border: 1px solid rgba(42, 126, 158, 0.1);
}

.login-header {
  text-align: center;
  margin-bottom: 2rem;
}

.icon-wrapper {
  width: 64px;
  height: 64px;
  background: linear-gradient(135deg, #2A7E9E 0%, #61BB87 100%);
  border-radius: 50%;
  display: grid;
  place-items: center;
  margin: 0 auto 1rem;
  color: white;
}

.login-header h1 {
  font-size: clamp(1.75rem, 4vw, 2.25rem);
  font-weight: 800;
  color: #1a1a1a;
  margin-bottom: 0.5rem;
  letter-spacing: -0.025em;
}

.login-header p {
  color: #6b7280;
  font-size: 1rem;
  margin: 0;
}

.cadastro-link {
  text-align: center;
  margin-top: 1.5rem;
  color: #6b7280;
}

.cadastro-link a {
  color: #2A7E9E;
  font-weight: 600;
  text-decoration: none;
  transition: color 0.3s ease;
}

.cadastro-link a:hover {
  color: #61BB87;
}
</style>
