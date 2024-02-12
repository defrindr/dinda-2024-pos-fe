import AuthLayout from '@/layouts/AuthLayout.vue'
import LoginView from '@/views/Auth/LoginPage.vue'

export const AuthRoutes = {
  path: '/auth',
  component: AuthLayout,
  redirect: (path: any = '/auth/login') => {
    return { path }
  },
  children: [
    {
      path: 'login',
      component: LoginView
    }
  ]
}
