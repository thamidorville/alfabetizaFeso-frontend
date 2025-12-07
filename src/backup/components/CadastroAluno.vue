<template>
  <div class="cadastro-page">
    <div class="cadastro-container">
      <div class="cadastro-header">
        <div class="icon-wrapper">
          <svg width="32" height="32" viewBox="0 0 24 24" fill="none">
            <path d="M19 14C19 18.4183 15.4183 22 11 22C6.58172 22 3 18.4183 3 14C3 9.58172 6.58172 6 11 6" stroke="currentColor" stroke-width="2"/>
            <path d="M21 2L13 10L16 13L21 8V2Z" stroke="currentColor" stroke-width="2"/>
          </svg>
        </div>
        <h1>Cadastro de Aluno</h1>
        <p>Comece sua jornada de aprendizado</p>
      </div>
      
      <form @submit.prevent="onSubmit" class="cadastro-form">
        <div class="form-grid">
          <div class="form-group">
            <label>Nome completo</label>
            <el-input v-model="form.nome" placeholder="Digite seu nome completo" size="large"/>
          </div>
          
          <div class="form-group">
            <label>Email</label>
            <el-input v-model="form.email" type="email" placeholder="seu@email.com" size="large"/>
          </div>
          
          <div class="form-group">
            <label>Telefone</label>
            <el-input v-model="form.telefone" placeholder="(11) 99999-9999" size="large"/>
          </div>
          
          <div class="form-group">
            <label>Descrição (opcional)</label>
            <el-input v-model="form.descricao" placeholder="Conte um pouco sobre você" size="large"/>
          </div>
          
          <div class="form-group">
            <label>Senha</label>
            <el-input v-model="form.senha" type="password" show-password placeholder="Mínimo 6 caracteres" size="large"/>
          </div>
          
          <div class="form-group">
            <label>Confirmar senha</label>
            <el-input v-model="form.confirmarSenha" type="password" show-password placeholder="Digite a senha novamente" size="large"/>
          </div>
        </div>
        
        <div class="form-actions">
          <button type="submit" class="btn-submit" :disabled="loading">
            <span v-if="loading" class="loading-spinner"></span>
            {{ loading ? 'Cadastrando...' : 'Criar conta' }}
          </button>
        </div>
        
        <div v-if="success" class="alert alert-success">{{ success }}</div>
        <div v-if="error" class="alert alert-error">{{ error }}</div>
      </form>
    </div>
  </div>
</template>

<script setup>
import { reactive, ref } from 'vue'
import { cadastrarAluno } from '../services/usuarioService'

const form = reactive({
  nome: '',
  email: '',
  telefone: '',
  descricao: '',
  senha: '',
  confirmarSenha: ''
})

const loading = ref(false)
const error = ref(null)
const success = ref(null)

async function onSubmit() {
  error.value = null
  success.value = null

  if (form.senha !== form.confirmarSenha) {
    error.value = 'Senhas não coincidem.'
    return
  }

  loading.value = true
  try {
    const payload = {
      nome: form.nome,
      email: form.email,
      telefone: form.telefone,
      descricao: form.descricao,
      senha: form.senha,
      confirmarSenha: form.confirmarSenha
    }
    const res = await cadastrarAluno(payload)
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
.cadastro-page {
  min-height: 100vh;
  background: linear-gradient(135deg, #fafbfc 0%, #f1f3f4 100%);
  display: grid;
  place-items: center;
  padding: 2rem 1rem;
}

.cadastro-container {
  width: min(100%, 600px);
  background: white;
  border-radius: 24px;
  padding: clamp(2rem, 5vw, 3rem);
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.08);
  border: 1px solid rgba(74, 124, 89, 0.1);
}

.cadastro-header {
  text-align: center;
  margin-bottom: 2rem;
}

.icon-wrapper {
  width: 64px;
  height: 64px;
  background: linear-gradient(135deg, #4a7c59 0%, #5d8a6b 100%);
  border-radius: 50%;
  display: grid;
  place-items: center;
  margin: 0 auto 1rem;
  color: white;
}

.cadastro-header h1 {
  font-size: clamp(1.75rem, 4vw, 2.25rem);
  font-weight: 800;
  color: #1a1a1a;
  margin-bottom: 0.5rem;
  letter-spacing: -0.025em;
}

.cadastro-header p {
  color: #6b7280;
  font-size: 1rem;
  margin: 0;
}

.form-grid {
  display: grid;
  gap: 1.5rem;
  margin-bottom: 2rem;
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

.btn-submit {
  width: 100%;
  padding: 1rem 2rem;
  background: linear-gradient(135deg, #4a7c59 0%, #5d8a6b 100%);
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
}

.btn-submit:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 24px rgba(74, 124, 89, 0.4);
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
  margin-top: 1rem;
}

.alert-success {
  background: rgba(34, 197, 94, 0.1);
  color: #059669;
  border: 1px solid rgba(34, 197, 94, 0.2);
}

.alert-error {
  background: rgba(239, 68, 68, 0.1);
  color: #dc2626;
  border: 1px solid rgba(239, 68, 68, 0.2);
}

@media (min-width: 640px) {
  .form-grid {
    grid-template-columns: repeat(2, 1fr);
  }
  
  .form-group:nth-child(n+4) {
    grid-column: 1 / -1;
  }
}
</style>