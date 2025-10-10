<!-- <template>
  <section class="login">
    <h2>Login de Educador</h2>

    <form @submit.prevent="onLogin">
      <div class="form-group">
        <label>Email</label>
        <input type="email" v-model="email" required />
      </div>

      <div class="form-group">
        <label>Senha</label>
        <input type="password" v-model="password" required />
      </div>

      <div class="form-actions">
        <button type="submit" class="btn btn-primary" :disabled="loading">Entrar</button>
        <span v-if="loading">Validando...</span>
      </div>

      <div v-if="error" class="form-error">{{ error }}</div>
    </form>
  </section>
</template> -->

<template>
  <form @submit.prevent="onLogin" class="container-login">
    <h2>Login de Educador</h2>

    <el-input v-model="email" placeholder="Email" />
    <el-input v-model="password" type="password" show-password placeholder="Senha" />
    <div style="display:flex;gap:8px;align-items:center;justify-content:center;margin-top:8px">
      <button type="submit" class="btn btn-primary" :disabled="loading">Entrar</button>
      <span v-if="loading">Validando...</span>
    </div>

    <div v-if="error" class="form-error" style="color:red;margin-top:8px;text-align:center">{{ error }}</div>
  </form>
</template>
  
<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { LoginEducador as loginService } from '../services/educadorService'

const router = useRouter()
const email = ref('')
const password = ref('')
const loading = ref(false)
const error = ref(null)

async function onLogin() {
  error.value = null
  loading.value = true
  try {
    const payload = { Email: email.value, Password: password.value }
    const res = await loginService(payload)
    const token = res?.token || res?.data?.token
    if (!token) {
      throw new Error('Credenciais inválidas')
    }
    localStorage.setItem('token', token)
    await router.push('/educadores')
  } catch (err) {
    console.error('Login error:', err)
    error.value = err?.message || String(err)
  } finally {
    loading.value = false
  }
}
</script>

<style scoped>
.container-login {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  text-align: center;
  justify-content: center;
  color: var(--color-deep-matcha)
}

.container-login h2 {
  padding: 1rem;
}
/* .login {
  display: flex;
  flex-direction: column;
  text-align: left;
}

.login h2 {
  color: var(--color-deep-matcha);
  margin-bottom: 1rem;
  text-align: center;
}

.form-group {
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
}

.form-group input {
  padding: 0.6rem;
  border: 1px solid var(--color-border);
  border-radius: 6px;
  font-family: var(--font-main);
}

.form-group input:focus {
  outline: none;
  border-color: var(--color-deep-matcha);
  box-shadow: 0 0 0 2px rgba(107,142,107,0.2);
}

.form-actions {
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-top: 1rem;
}

.form-error {
  color: red;
  margin-top: 0.5rem;
} */
</style>
