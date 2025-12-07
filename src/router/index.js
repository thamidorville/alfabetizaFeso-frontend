import { createRouter, createWebHistory } from "vue-router";
import { useAuthStore } from "../stores/authStore";

const routes = [
  {
    path: "/sobre",
    component: () => import("../pages/LandingPage.vue"),
    meta: { guestOnly: true }
  },
  {
    path: '/educadores',
    component: () => import("../pages/Educadores.vue"),
  },
  {
    path: '/educador/:id',
    component: () => import("../pages/Educador.vue"),
    meta: { requiresAuth: true }
  },
  {
    path: '/curso/:id',
    component: () => import("../pages/Curso.vue"),
    meta: { requiresAuth: true }
  },
  {
    path: '/cursos',
    component: () => import("../pages/Cursos.vue"),
  },
  {
    path: '/aluno/dashboard',
    component: () => import("../pages/DashboardAluno.vue"),
    meta: { requiresAuth: true }
  },
  {
    path: '/educador/dashboard',
    component: () => import("../pages/DashboardEducador.vue"),
    meta: { requiresAuth: true }
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});


// router guard
router.beforeEach(async (to, from, next) => {
  const auth = useAuthStore();

  if (!auth.isAuthenticated && auth.token) {
    await auth.checkAuth();
  }

  // Se o usuário estiver logado e tentar acessar a landing page
  if (auth.isAuthenticated && to.path === '/sobre') {
    return next('/'); // redireciona para a barra
  }

  // Rotas que exigem autenticação
  if (to.meta.requiresAuth && !auth.isAuthenticated) {
    alert('Você precisa estar logado para acessar esta página.');
    return next('/sobre');
  }

  // Root path quando não autenticado
  if (to.path === '/' && !auth.isAuthenticated) {
    return next('/sobre');
  }

  if (auth.isAluno && to.path === '/') {
    return next('/aluno/dashboard');
  }
  if (auth.isEducador && to.path === '/') {
    return next('/educador/dashboard');
  }
  next();
});


export default router;
