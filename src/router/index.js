import { createMemoryHistory, createRouter } from 'vue-router'
import PaginaInicial from '../pages/PaginaInicial.vue'
import Educadores from '../components/Educadores.vue'
import AutenticacaoTabs from '../components/AutenticacaoTabs.vue'



const routes = [
  { path: '/', component: PaginaInicial },
  { path: '/educadores', component: Educadores },
  { path: '/auth', component: AutenticacaoTabs}
]

export const router = createRouter({
  history: createMemoryHistory(),
  routes,
})