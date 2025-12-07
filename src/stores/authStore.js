import { defineStore } from 'pinia'
import { loginUsuario, getUsuarioLogado } from '../services/usuarioService'

export const useAuthStore = defineStore('auth', {
  state: () => ({
    user: null,
    token: localStorage.getItem("token") || null
  }),

  getters: {
    isAuthenticated: (state) => !!state.token && !!state.user,

    isEducador: (state) => {
      const role = state.user?.role
      return role?.toString().trim().toLowerCase() === 'educador'
    },

    isAluno: (state) => {
      const role = state.user?.role
      return role?.toString().trim().toLowerCase() === 'aluno'
    },

    userName: (state) => state.user?.nome || '',
    userRole: (state) => state.user?.role || ''
  },

  actions: {
    async login(credentials) {
      try {
        const response = await loginUsuario(credentials)

        // Primeiro garante persistência
        localStorage.setItem('token', response.token)

        // Depois atualiza estado
        this.token = response.token
        this.user = response.usuario

        return { success: true }
      } catch (error) {
        throw error
      }
    },

    logout() {
      this.user = null
      this.token = null
      localStorage.removeItem('token')
    },

    async checkAuth() {
      const token = localStorage.getItem('token')

      if (!token) {
        this.logout()
        return false
      }

      try {
        const userData = await getUsuarioLogado()

        this.token = token
        this.user = userData

        return true
      } catch {
        this.logout()
        return false
      }
    }
  }
})
