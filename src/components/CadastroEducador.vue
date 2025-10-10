<template>
  <form @submit.prevent="onSubmit" class="container-cadastro">
    <h2>Cadastro de Educador</h2>
    <el-input v-model="form.nome" placeholder="Nome"/>
    <el-input v-model="form.especialidade" placeholder="Especialidade" />
    <el-input v-model="form.email" placeholder="Email"/>
    <el-input v-model="form.telefone" placeholder="Telefone"/>
    <el-input v-model="form.password" type="password" show-password placeholder="Senha" />
    <el-input v-model="form.confirmPassword" type="password" show-password placeholder="Confirmar Senha" />
    <button type="submit" class="btn btn-primary" :disabled="loading">Cadastrar</button>
    <span v-if="loading">Enviando...</span>
    <div v-if="success" class="form-success">{{ success }}</div>
    <div v-if="error" class="form-error">{{ error }}</div>
  </form>
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

.container-cadastro {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  text-align: center;
  justify-content: center;
  color: var(--color-deep-matcha)
}

.container-cadastro h2 {
  padding: 1rem;
}

.cadastro {
  display: flex;
  flex-direction: column;
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
  text-align: center;
  justify-content: center;
  color: var(--color-deep-matcha)
}

.form-actions {
  display: flex;
  flex-direction: column; 
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
