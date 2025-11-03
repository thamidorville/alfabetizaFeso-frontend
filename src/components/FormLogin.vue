<template>
  <form @submit.prevent="handleLogin" class="form-login">
    <div class="form-group">
      <label>Email</label>
      <input 
        type="email" 
        v-model="email" 
        placeholder="seu@email.com"
        required 
      />
    </div>
    
    <div class="form-group">
      <label>Senha</label>
      <input 
        type="password" 
        v-model="password" 
        placeholder="Digite sua senha"
        required 
      />
    </div>
    
    <button type="submit" class="btn-submit" :disabled="loading">
      <span v-if="loading" class="loading-spinner"></span>
      {{ loading ? 'Entrando...' : 'Entrar' }}
    </button>
    
    <div v-if="error" class="alert alert-error">{{ error }}</div>
  </form>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '../stores/authStore'

const router = useRouter()
const authStore = useAuthStore()

const email = ref('')
const password = ref('')
const loading = ref(false)
const error = ref(null)

async function handleLogin() {
  error.value = null
  loading.value = true
  
  try {
    await authStore.login({
      email: email.value,
      senha: password.value
    })
    
    // Redirecionamento baseado em role
    if (authStore.isEducador) {
      await router.push('/dashboard-educador')
    } else if (authStore.isAluno) {
      await router.push('/dashboard-aluno')
    } else {
      await router.push('/educadores')
    }
  } catch (err) {
    error.value = err?.message || 'Erro ao fazer login'
  } finally {
    loading.value = false
  }
}
</script>

<style scoped>
.form-login {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.form-group {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.form-group label {
  font-weight: 600;
  color: #374151;
  font-size: 0.875rem;
  letter-spacing: 0.025em;
}

.form-group input {
  width: 100%;
  padding: 0.875rem 1rem;
  border: 2px solid #e5e7eb;
  border-radius: 12px;
  font-size: 1rem;
  transition: all 0.3s ease;
  font-family: inherit;
}

.form-group input:focus {
  outline: none;
  border-color: #2A7E9E;
  box-shadow: 0 0 0 3px rgba(42, 126, 158, 0.1);
}

.form-group input::placeholder {
  color: #9ca3af;
}

.btn-submit {
  width: 100%;
  padding: 1rem 2rem;
  background: #89B385;
  color: white;
  border: none;
  border-radius: 12px;
  font-weight: 600;
  font-size: 1rem;
  cursor: pointer;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  margin-top: 0.5rem;
}

.btn-submit:hover:not(:disabled) {
  background: #7FAA7B;
  transform: translateY(-2px);
  box-shadow: 0 8px 24px rgba(137, 179, 133, 0.4);
}

.btn-submit:disabled {
  opacity: 0.7;
  cursor: not-allowed;
  transform: none;
}

.loading-spinner {
  width: 16px;
  height: 16px;
  border: 2px solid rgba(255, 255, 255, 0.3);
  border-top: 2px solid white;
  border-radius: 50%;
  animation: spin 1s linear infinite;
}

@keyframes spin {
  to { transform: rotate(360deg); }
}

.alert {
  padding: 1rem;
  border-radius: 8px;
  font-weight: 500;
  text-align: center;
}

.alert-error {
  background: rgba(239, 68, 68, 0.1);
  color: #dc2626;
  border: 1px solid rgba(239, 68, 68, 0.2);
}
</style>
