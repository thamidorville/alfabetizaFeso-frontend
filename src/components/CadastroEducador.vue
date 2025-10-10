<template>
  <section class="cadastro">
    <h2>Cadastro de Educador</h2>

    <form @submit.prevent="onSubmit">
      <div>
        <label>Nome</label>
        <input v-model="form.nome" required />
      </div>

      <div>
        <label>Especialidade</label>
        <input v-model="form.especialidade" required />
      </div>

      <div>
        <label>Email</label>
        <input type="email" v-model="form.email" required />
      </div>

      <div>
        <label>Telefone</label>
        <input v-model="form.telefone" required />
      </div>

      <div>
        <label>Descrição</label>
        <textarea v-model="form.descricao" maxlength="240"></textarea>
      </div>

      <div>
        <label>Senha</label>
        <input type="password" v-model="form.password" required minlength="8" />
      </div>

      <div>
        <label>Confirmar Senha</label>
        <input type="password" v-model="form.confirmPassword" required />
      </div>

      <div style="margin-top:12px;">
        <button type="submit" :disabled="loading">Cadastrar</button>
        <span v-if="loading">Enviando...</span>
      </div>

      <div v-if="success" style="color:green;margin-top:8px">{{ success }}</div>
      <div v-if="error" style="color:red;margin-top:8px">{{ error }}</div>
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
.cadastro { max-width:520px; margin:20px auto; }
form > div { margin-bottom:8px; }
label { display:block; font-weight:600; margin-bottom:4px; }
input, textarea { width:100%; padding:6px 8px; box-sizing:border-box; }
button { padding:8px 12px; }
</style>
