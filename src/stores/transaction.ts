import { BASE_URL } from '@/config'
import Request from '@/helpers/requests'
import router from '@/router'
import { defineStore } from 'pinia'
import qs from 'qs'
import { ref } from 'vue'
import { useAlertStore } from './alert'
import type { IMember } from './member'
import type { IProduct } from './product'

export interface ITransactionDetail {
  id: number
  product_id: number
  product: IProduct
  price: number
  amount: number
  discount: number
  total_price: number

  price_formatted: number
  amount_formatted: number
  discount_formatted: number
  total_price_formatted: number
}

export interface ITransaction {
  id: number
  transaction_code: string
  transaction_date: string
  member_id: number
  member: IMember
  details: ITransactionDetail[]
  price: number
  discount: number
  total_price: number
  pay: number
  back: number
  price_formatted: number
  discount_formatted: number
  total_price_formatted: number
  pay_formatted: number
  back_formatted: number
}

interface IMeta {
  currentPage: number
  total: number
  perPage: number
  path: number
  totalPage: number
}

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

  const first = async <T>(url: string, id: any): Promise<ITransaction | null> => {
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
