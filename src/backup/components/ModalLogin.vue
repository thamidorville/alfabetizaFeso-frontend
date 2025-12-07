<template>
  <el-dialog :visible.sync="visible" title="Entrar" width="420px" @close="onClose">
    <form @submit.prevent="onSubmit">
      <div class="form-group">
        <label>Email</label>
        <el-input v-model="form.email" type="email" placeholder="seu@email.com"/>
      </div>

      <div class="form-group">
        <label>Senha</label>
        <el-input v-model="form.password" type="password" show-password placeholder="Senha"/>
      </div>

      <div class="actions">
        <el-button @click="onClose">Cancelar</el-button>
        <el-button type="primary" :loading="loading" native-type="submit">Entrar</el-button>
      </div>

      <div v-if="error" class="alert">{{ error }}</div>
    </form>
  </el-dialog>
</template>

<script setup>
import { reactive, ref, watch } from 'vue'
import { useAuthStore } from '../stores/authStore'
import { useRouter } from 'vue-router'

const props = defineProps({ modelValue: { type: Boolean, default: false } })
const emit = defineEmits(['update:modelValue'])

const visible = ref(props.modelValue)
watch(() => props.modelValue, v => visible.value = v)
watch(visible, v => emit('update:modelValue', v))

const form = reactive({ email: '', password: '' })
const loading = ref(false)
const error = ref(null)

const auth = useAuthStore()
const router = useRouter()

function onClose() {
  visible.value = false
  error.value = null
}

async function onSubmit() {
  error.value = null
  loading.value = true
  try {
    await auth.login({ email: form.email, senha: form.password })
    visible.value = false
    // optional: redirect after login if needed
  } catch (err) {
    error.value = err?.response?.data?.message || err?.message || 'Erro ao autenticar'
  } finally {
    loading.value = false
  }
}
</script>

<style scoped>
.form-group { margin-bottom: 1rem }
.form-group label { display:block; font-weight:600; margin-bottom:0.5rem }
.actions { display:flex; justify-content:flex-end; gap:0.5rem; margin-top:1rem }
.alert { margin-top:1rem; color:#c0392b }
</style>
