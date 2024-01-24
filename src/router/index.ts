import { createRouter, createWebHistory } from 'vue-router'
import { AuthRoutes } from './auth'
import { AdminRoutes } from './admin'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      redirect: (to: any) => {
        return { path: '/auth/login' }
      }
    },
    AuthRoutes,
    AdminRoutes
  ]
})

export default router
