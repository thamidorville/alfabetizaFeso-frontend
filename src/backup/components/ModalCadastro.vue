<template>
  <el-dialog :visible.sync="visible" title="Cadastro" width="640px" @close="onClose">
    <div class="choice">
      <el-button :type="type==='aluno' ? 'primary' : 'default'" @click="type='aluno'">Sou aluno</el-button>
      <el-button :type="type==='educador' ? 'primary' : 'default'" @click="type='educador'">Sou educador</el-button>
    </div>

    <form @submit.prevent="onSubmit">
      <div class="form-grid">
        <div class="form-group">
          <label>Nome completo</label>
          <el-input v-model="form.nome" placeholder="Nome completo" />
        </div>

        <div class="form-group" v-if="type==='educador'">
          <label>Especialidade</label>
          <el-input v-model="form.especialidade" placeholder="Ex: Matemática" />
        </div>

        <div class="form-group">
          <label>Email</label>
          <el-input v-model="form.email" type="email" placeholder="seu@email.com" />
        </div>

        <div class="form-group">
          <label>Telefone</label>
          <el-input v-model="form.telefone" placeholder="(11) 99999-9999" />
        </div>

        <div class="form-group">
          <label>Descrição (opcional)</label>
          <el-input v-model="form.descricao" />
        </div>

        <div class="form-group">
          <label>Senha</label>
          <el-input v-model="form.senha" type="password" show-password placeholder="Senha" />
        </div>

        <div class="form-group">
          <label>Confirmar senha</label>
          <el-input v-model="form.confirmarSenha" type="password" show-password placeholder="Confirmar senha" />
        </div>
      </div>

      <div class="actions">
        <el-button @click="onClose">Cancelar</el-button>
        <el-button type="primary" :loading="loading" native-type="submit">Cadastrar</el-button>
      </div>

      <div v-if="success" class="alert success">{{ success }}</div>
      <div v-if="error" class="alert error">{{ error }}</div>
    </form>
  </el-dialog>
</template>

<script setup>
import { reactive, ref, watch } from 'vue'
import { cadastrarAluno, cadastrarEducador } from '../services/usuarioService'

const props = defineProps({ modelValue: { type: Boolean, default: false } })
const emit = defineEmits(['update:modelValue'])

const visible = ref(props.modelValue)
watch(() => props.modelValue, v => visible.value = v)
watch(visible, v => emit('update:modelValue', v))

const type = ref('aluno')
const form = reactive({ nome: '', especialidade: '', email: '', telefone: '', descricao: '', senha: '', confirmarSenha: '' })
const loading = ref(false)
const error = ref(null)
const success = ref(null)

function onClose() {
  visible.value = false
  error.value = null
  success.value = null
}

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
      confirmarSenha: form.confirmarSenha,
    }

    let res
    if (type.value === 'educador') {
      payload.especialidade = form.especialidade
      res = await cadastrarEducador(payload)
    } else {
      res = await cadastrarAluno(payload)
    }

    success.value = 'Cadastro realizado com sucesso.'
    Object.keys(form).forEach(k => form[k] = '')
  } catch (err) {
    error.value = err?.response?.data?.message || err?.message || String(err)
  } finally {
    loading.value = false
  }
}
</script>

<style scoped>
.choice { display:flex; gap:0.5rem; margin-bottom:1rem }
.form-grid { display:grid; grid-template-columns:1fr 1fr; gap:1rem }
.form-group { display:flex; flex-direction:column }
.form-group label { font-weight:600; margin-bottom:0.25rem }
.actions { display:flex; justify-content:flex-end; gap:0.5rem; margin-top:1rem }
.alert { margin-top:1rem; padding:0.5rem; border-radius:6px }
.alert.success { background:rgba(34,197,94,0.08); color:#059669 }
.alert.error { background:rgba(239,68,68,0.08); color:#dc2626 }

@media (max-width:640px) { .form-grid { grid-template-columns:1fr } }
</style>
