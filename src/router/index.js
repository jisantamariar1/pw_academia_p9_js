import { createRouter, createWebHistory } from 'vue-router'
import LoginView from '@/views/LoginView.vue'
import EstudiantesView from '@/views/EstudiantesView.vue'
import CursosView from '@/views/CursosView.vue'
import InscripcionesView from '@/views/InscripcionesView.vue'

const routes = [
  {
    path: '/login',
    name: 'login',
    component: LoginView
  },
  {
    path: '/estudiantes',
    name: 'estudiantes',
    component: EstudiantesView
  },
  {
    path: '/cursos',
    name: 'cursos',
    component: CursosView
  },
  {
    path: '/inscripcion/:id', // El :id es para el estudiante
    name: 'inscripcion',
    component: InscripcionesView
  }

]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
