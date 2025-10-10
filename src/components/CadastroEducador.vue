<template>
  <section class="cadastro">
    <h2>Cadastro de Educador</h2>

    <form @submit.prevent="onSubmit">
      <div class="form-group">
        <label>Nome</label>
        <input v-model="form.nome" required />
      </div>

      <div class="form-group">
        <label>Especialidade</label>
        <input v-model="form.especialidade" required />
      </div>

      <div class="form-group">
        <label>Email</label>
        <input type="email" v-model="form.email" required />
      </div>

      <div class="form-group">
        <label>Telefone</label>
        <input v-model="form.telefone" required />
      </div>

      <div class="form-group">
        <label>Descrição</label>
        <textarea v-model="form.descricao" maxlength="240"></textarea>
      </div>

      <div class="form-group">
        <label>Senha</label>
        <input type="password" v-model="form.password" required minlength="8" />
      </div>

      <div class="form-group">
        <label>Confirmar Senha</label>
        <input type="password" v-model="form.confirmPassword" required />
      </div>

      <div class="form-actions">
        <button type="submit" class="btn btn-primary" :disabled="loading">Cadastrar</button>
        <span v-if="loading">Enviando...</span>
      </div>

      <div v-if="success" class="form-success">{{ success }}</div>
      <div v-if="error" class="form-error">{{ error }}</div>
    </form>
  </section>
</template>

<script setup>
import { reactive, ref } from 'vue'
import { CriarEducador } from '../services/educadorService'

const form = reactive({
  nome: '',
  especialidade: '',
  email: '',
  telefone: '',
  descricao: '',
  password: '',
  confirmPassword: ''
})

const loading = ref(false)
const error = ref(null)
const success = ref(null)

async function onSubmit() {
  error.value = null
  success.value = null

  if (form.password !== form.confirmPassword) {
    error.value = 'Senhas não coincidem.'
    return
  }

  loading.value = true
  try {
    const payload = {
      Nome: form.nome,
      Especialidade: form.especialidade,
      Email: form.email,
      Telefone: form.telefone,
      Descricao: form.descricao,
      Password: form.password,
      ConfirmPassword: form.confirmPassword
    }
    const res = await CriarEducador(payload)
    success.value = 'Cadastro realizado com sucesso.'
    Object.keys(form).forEach(k => form[k] = '')
    console.log('Resposta do backend:', res)
  } catch (err) {
    console.error(err)
    error.value = err?.message || String(err)
  } finally {
    loading.value = false
  }
}
</script>

<style scoped>
.cadastro {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  text-align: left;
}

.cadastro h2 {
  color: var(--color-deep-matcha);
  margin-bottom: 1rem;
  text-align: center;
}

.form-group {
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
}

.form-group input,
.form-group textarea {
  padding: 0.6rem;
  border: 1px solid var(--color-border);
  border-radius: 6px;
  font-family: var(--font-main);
}

.form-group input:focus,
.form-group textarea:focus {
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

.form-success {
  color: green;
  margin-top: 0.5rem;
}

.form-error {
  color: red;
  margin-top: 0.5rem;
}
</style>
