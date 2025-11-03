import { createMemoryHistory, createRouter } from 'vue-router'
import PaginaInicial from '../pages/PaginaInicial.vue'
import TelaLogin from '../pages/TelaLogin.vue'
import Educadores from '../components/Educadores.vue'

const routes = [
  { path: '/', component: PaginaInicial },
  { path: '/cursos', component: () => import('../pages/Cursos.vue') },
  { path: '/educadores', component: Educadores },
  { path: '/login', component: TelaLogin },
  { path: '/cadastro-educador', component: () => import('../components/CadastroEducador.vue') },
  { path: '/cadastro-aluno', component: () => import('../components/CadastroAluno.vue') },
  { path: '/dashboard-educador', component: () => import('../pages/DashboardEducador.vue') },
  { path: '/dashboard-aluno', component: () => import('../pages/DashboardAluno.vue') }
]

export const router = createRouter({
  history: createMemoryHistory(),
  routes,
})