import { BASE_URL } from '@/config'
import Request from '@/helpers/requests'
import router from '@/router'
import { defineStore } from 'pinia'
import qs from 'qs'
import { ref } from 'vue'
import { useAlertStore } from './alert'

export interface IUser {
  id: number
  code: string
  username: string
  name: string
  email: string
  phone: string
  photo: string
  role: string
}

interface IMeta {
  currentPage: number
  total: number
  perPage: number
  path: number
  totalPage: number
}

export const useUser = defineStore('master.user', () => {
  const { setErrorAlert, setSuccessAlert } = useAlertStore()

  const items = ref<IUser[]>([])
  const metaRequest = ref<IMeta>({
    currentPage: 0,
    total: 0,
    perPage: 0,
    path: 0,
    totalPage: 0
  })

  const fetch = async (url: string, search: string = '', page: number = 1) => {
    let params = qs.stringify({ search, page })
    try {
      const handler = await Request.get(`${BASE_URL}/${url}?${params}`)
      if (handler.error) {
        setErrorAlert('Gagal mengirim permintaan')
        console.log('request error', handler.error)
        return
      }

      if (handler.response?.status !== 200) {
        setErrorAlert(handler.json.message)
        console.log('response gagal')
        return
      }
      const data = handler.json.data

      metaRequest.value = data.meta
      items.value = data.items
    } catch (error) {
      setErrorAlert('Terjadi kesalahan saat menjalankan aksi')
      console.log('catching', error)
    }
  }

  const create = async <T>(url: string, body: T, redirect: string) => {
    try {
      const handler = await Request.post(`${BASE_URL}/${url}`, body, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      })
      if (handler.error) {
        setErrorAlert('Gagal mengirim permintaan')
        console.log('request error', handler.error)
        return
      }

      if (handler.response?.status !== 200) {
        setErrorAlert(handler.json.message)
        console.log('response gagal')
        return
      }

      setSuccessAlert(handler.json.message)
      router.push(redirect)
    } catch (error) {
      setErrorAlert('Terjadi kesalahan saat menjalankan aksi')
      console.log('catching', error)
    }
  }

  const update = async <T>(url: string, id: any, body: T, redirect: string) => {
    try {
      const handler = await Request.put(`${BASE_URL}/${url}/${id}`, body, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      })
      if (handler.error) {
        setErrorAlert('Gagal mengirim permintaan')
        console.log('request error', handler.error)
        return
      }

      if (handler.response?.status !== 200) {
        setErrorAlert(handler.json.message)
        console.log('response gagal')
        return
      }

      setSuccessAlert(handler.json.message)
      router.push(redirect)
    } catch (error) {
      setErrorAlert('Terjadi kesalahan saat menjalankan aksi')
      console.log('catching', error)
    }
  }

  const first = async <T>(url: string, id: any): Promise<IUser | null> => {
    try {
      const handler = await Request.get(`${BASE_URL}/${url}/${id}`)
      if (handler.error) {
        setErrorAlert('Gagal mengirim permintaan')
        console.log('request error', handler.error)
        return null
      }

      if (handler.response?.status !== 200) {
        setErrorAlert(handler.json.message)
        console.log('response gagal')
        return null
      }

      const data: IUser = handler.json.data
      return data
    } catch (error) {
      setErrorAlert('Terjadi kesalahan saat menjalankan aksi')
      console.log('catching', error)
      return null
    }
  }
  const destroy = async <T>(url: string, id: any) => {
    try {
      const handler = await Request.delete(`${BASE_URL}/${url}/${id}`)
      if (handler.error) {
        setErrorAlert('Gagal mengirim permintaan')
        console.log('request error', handler.error)
        return
      }

      if (handler.response?.status !== 200) {
        setErrorAlert(handler.json.message)
        console.log('response gagal')
        return
      }

      setSuccessAlert(handler.json.message)
      await fetch(url)
    } catch (error) {
      setErrorAlert('Terjadi kesalahan saat menjalankan aksi')
      console.log('catching', error)
    }
  }

  return { items, metaRequest, fetch, create, update, first, destroy }
})
