import { BASE_URL } from '@/config'
import Request from '@/helpers/requests'
import type { IMeta, ITransaction } from '@/interfaces'
import router from '@/router'
import { defineStore } from 'pinia'
import qs from 'qs'
import { ref } from 'vue'
import { useAlertStore } from './alert'

export const useTransaction = defineStore('main.transaction', () => {
  const { setErrorAlert, setSuccessAlert } = useAlertStore()

  const items = ref<ITransaction[]>([])
  const metaRequest = ref<IMeta>({
    currentPage: 0,
    total: 0,
    perPage: 0,
    path: 0,
    totalPage: 0
  })

  const fetch = async (url: string, search: string = '', page: number = 1) => {
    const params = qs.stringify({ search, page })
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

      // aliasing variable
      const data = handler.json.data

      // assign data to ref
      metaRequest.value = data.meta
      items.value = data.items
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

      // response jika berhasil
      setSuccessAlert(handler.json.message)
      window.open(`${BASE_URL}/main/transaction/print-struk/${handler.json.data.invoice}`, '_blank', 'noreferrer')
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

  const first = async (url: string, id: any): Promise<ITransaction | null> => {
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

      const data: ITransaction = handler.json.data
      return data
    } catch (error) {
      setErrorAlert('Terjadi kesalahan saat menjalankan aksi')
      console.log('catching', error)
      return null
    }
  }
  const destroy = async (url: string, id: any) => {
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
