import AuthLayout from '@/layouts/AuthLayout.vue'
import LoginView from '@/views/Auth/LoginView.vue'

export const AuthRoutes = {
  path: '/auth',
  component: AuthLayout,
  redirect: (to: any) => {
    return { path: '/auth/login' }
  },
  children: [
    {
      path: 'login',
      component: LoginView
    }
  ]
}
