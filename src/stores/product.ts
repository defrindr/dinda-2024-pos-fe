import { BASE_URL } from '@/config'
import { defineStore } from 'pinia'
import { ref, type Ref } from 'vue'
import { useAlertStore } from './alert'
import router from '@/router'
import Request from '@/helpers/requests'
import qs from 'qs'
import type { IMasterCategory } from './category'
import type { IMasterStorage } from './storage'

export interface IProduct {
  id: number
  sku: string
  name: string
  category_id: number | null
  storage_id: number | null
  category: IMasterCategory | null
  storage: IMasterStorage | null
  price: number
  stock: number
}

interface IMeta {
  currentPage: number
  total: number
  perPage: number
  path: number
  totalPage: number
}

export const useProduct = defineStore('master.product', () => {
  const { setErrorAlert, setSuccessAlert } = useAlertStore()

  const items = ref<IProduct[]>([])
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

      metaRequest.value = {
        currentPage: handler.json.current_page,
        total: handler.json.total,
        perPage: handler.json.per_page,
        path: handler.json.path,
        totalPage: handler.json.last_page
      }
      items.value = data
    } catch (error) {
      setErrorAlert('Terjadi kesalahan saat menjalankan aksi')
      console.log('catching', error)
    }
  }

  const create = async <T>(url: string, body: T, redirect: string) => {
    console.log(body)
    try {
      const handler = await Request.post(`${BASE_URL}/${url}`, body)
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
      const handler = await Request.put(`${BASE_URL}/${url}/${id}`, body)
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

  const first = async <T>(url: string, id: any): Promise<IProduct | null> => {
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

      const data: IProduct = handler.json.data
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
