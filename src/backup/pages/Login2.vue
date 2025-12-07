<template>
  <div class="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
    <div class="bg-white rounded-lg shadow-xl p-8 w-full max-w-md">
      <div class="text-center mb-8">
        <h1 class="text-3xl font-bold text-gray-900">Meus Cursos</h1>
        <p class="text-gray-600 mt-2">Faça login para continuar</p>
      </div>

      <form @submit.prevent="handleLogin" class="space-y-6">
        <div>
          <label for="email" class="block text-sm font-medium text-gray-700 mb-2">
            Email
          </label>
          <input
            id="email"
            v-model="form.email"
            type="email"
            required
            class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="seu@email.com"
          />
        </div>

        <div>
          <label for="password" class="block text-sm font-medium text-gray-700 mb-2">
            Senha
          </label>
          <input
            id="password"
            v-model="form.password"
            type="password"
            required
            class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="••••••••"
          />
        </div>

        <Botao2
          type="submit"
          :disabled="loading"
          variant="principal"
          class="w-full"
        >
          {{ loading ? 'Entrando...' : 'Entrar' }}
        </Botao2>

        <div v-if="error" class="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-sm">
          {{ error }}
        </div>
      </form>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import usuarioService from '../services/usuarioService'
import Botao2 from '../../components/Botao2.vue'

const router = useRouter()
const form = ref({ email: '', password: '' })
const loading = ref(false)
const error = ref('')

const handleLogin = async () => {
  error.value = ''
  loading.value = true

  try {
    const response = await usuarioService.login(form.value)
    // Armazene o token (ajuste conforme sua API retorna)
    localStorage.setItem('token', response.data.token || response.data)
    router.push('/dashboard')
  } catch (err) {
    error.value = err.response?.data?.message || 'Erro ao fazer login. Tente novamente.'
  } finally {
    loading.value = false
  }
}
</script>