import { BASE_URL } from '@/config'
import { defineStore } from 'pinia'
import { ref } from 'vue'
import { useAlertStore } from './alert'
import router from '@/router'

export const ROLE_ADMIN   = 'Admin'
export const ROLE_KASIR   = 'Kasir'
export const ROLE_MANAGER = 'Manager'

interface ILogin {
  username: string
  password: string
}
export interface IUser {
  id: number
  name: string
  username: string
  email: string
  email_verified_at: string
  role: string
  created_at: string
  updated_at: string
}

const LOCALSTORAGE_KEY_TOKEN = 'auth.local.key'
const LOCALSTORAGE_KEY_USER = 'auth.local.user'

export const useAuthStore = defineStore('auth', () => {
  const alertStore = useAlertStore()

  const token = ref<string>(localStorage.getItem(LOCALSTORAGE_KEY_TOKEN) ?? '')

  let userRaw: string | null = localStorage.getItem(LOCALSTORAGE_KEY_USER)
  let defaultUser: IUser | null = userRaw ? JSON.parse(userRaw) : null
  const user = ref<IUser | null>(defaultUser)

  const getDefaultHeader = () => {
    let defaultHeader: any = {
      'Content-Type': 'application/json',
      Accept: 'application/json'
    }

    if (token.value) defaultHeader['Authorization'] = `Bearer ${token.value}`
    return defaultHeader
  }

  const getUser = async () => {
    try {
      const response = await fetch(`${BASE_URL}/auth/me`, {
        method: 'GET',
        headers: getDefaultHeader()
      })

      const json = await response.json()

      return json.data
    } catch (error: any) {
      error = error?.message ?? error
      alertStore.setErrorAlert(error)
    }
  }

  const actionLogin = async (LoginProps: ILogin) => {
    try {
      const response = await fetch(`${BASE_URL}/auth/login`, {
        method: 'POST',
        body: JSON.stringify(LoginProps),
        headers: getDefaultHeader()
      })

      const json = await response.json()

      if (response.status === 200) {
        localStorage.setItem(LOCALSTORAGE_KEY_TOKEN, json.access_token)
        token.value = json.access_token

        const me = await getUser()
        localStorage.setItem(LOCALSTORAGE_KEY_USER, JSON.stringify(me))
        user.value = me

        router.push('/admin/home')
      } else {
        let message = json?.message ?? json
        alertStore.setErrorAlert(message)
      }
    } catch (error: any) {
      error = error?.message ?? error
      alertStore.setErrorAlert(error)
    }
  }

  const actionLogout = async () => {
    token.value = ''
    user.value = null
    localStorage.removeItem(LOCALSTORAGE_KEY_TOKEN)
    localStorage.removeItem(LOCALSTORAGE_KEY_USER)

    router.push('/auth')
  }

  return { token, user, actionLogin, getUser, actionLogout }
})
