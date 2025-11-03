import { defineStore } from 'pinia'
import { loginUsuario, getUsuarioLogado } from '../services/usuarioService'

export const useAuthStore = defineStore('auth', {
  state: () => ({
    user: null,
    token: null,
    isAuthenticated: false
  }),

  getters: {
    isEducador: (state) => {
      const role = state.user?.role
      if (!role) return false
      return role.toString().toLowerCase() === 'educador'
    },
    isAluno: (state) => {
      const role = state.user?.role
      if (!role) return false
      return role.toString().toLowerCase() === 'aluno'
    },
    userName: (state) => state.user?.nome || '',
    userRole: (state) => state.user?.role || ''
  },

  actions: {
    async login(credentials) {
      try {
        const response = await loginUsuario(credentials)
        
        this.token = response.token
        this.user = response.usuario
        this.isAuthenticated = true
        
        localStorage.setItem('token', this.token)
        
        return { success: true }
      } catch (error) {
        throw error
      }
    },

    logout() {
      this.user = null
      this.token = null
      this.isAuthenticated = false
      
      // Limpar apenas token
      localStorage.removeItem('token')
    },

    async checkAuth() {
      const token = localStorage.getItem('token')
      if (!token) return false
      
      try {
        // Buscar dados atuais via /me
        const userData = await getUsuarioLogado()
        
        this.token = token
        this.user = userData
        this.isAuthenticated = true
        
        return true
      } catch (error) {
        // Token inválido, limpar
        this.logout()
        return false
      }
    }
  }
})