import { createMemoryHistory, createRouter } from 'vue-router'
import PaginaInicial from '../pages/PaginaInicial.vue'
import Educadores from '../components/Educadores.vue'



const routes = [
  { path: '/', component: PaginaInicial },
  { path: '/educadores', component: Educadores },
]

export const router = createRouter({
  history: createMemoryHistory(),
  routes,
})