import { BASE_URL } from '@/config'
import type { IAuth, IFormLogin } from '@/interfaces'
import router from '@/router'
import { defineStore } from 'pinia'
import { ref } from 'vue'
import { useAlertStore } from './alert'

export const ROLE_ADMIN = 'ADMIN'
export const ROLE_KASIR = 'KASIR'
export const ROLE_MANAGER = 'MANAGER'

const LOCALSTORAGE_KEY_TOKEN = 'auth.local.key'
const LOCALSTORAGE_KEY_USER = 'auth.local.user'

export const useAuthStore = defineStore('auth', () => {
  const alertStore = useAlertStore()

  const token = ref<string>(localStorage.getItem(LOCALSTORAGE_KEY_TOKEN) ?? '')

  const userRaw: string | null = localStorage.getItem(LOCALSTORAGE_KEY_USER)
  const defaultUser: IAuth | null = userRaw ? JSON.parse(userRaw) : null
  const user = ref<IAuth | null>(defaultUser)

  const getDefaultHeader = () => {
    const defaultHeader: any = {
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
      const message = error?.message ?? error
      alertStore.setErrorAlert(message)
    }
  }

  const actionLogin = async (LoginProps: IFormLogin) => {
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
        const message = json?.message ?? json
        alertStore.setErrorAlert(message)
      }
    } catch (error: any) {
      const message = error?.message ?? error
      alertStore.setErrorAlert(message)
    }
  }

  const actionLogout = async () => {
    token.value = ''
    user.value = null
    localStorage.removeItem(LOCALSTORAGE_KEY_TOKEN)
    localStorage.removeItem(LOCALSTORAGE_KEY_USER)

    console.log('Suksse Logout')

    router.replace('/auth/login')
  }

  return { token, user, actionLogin, getUser, actionLogout }
})
