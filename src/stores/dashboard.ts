import { BASE_URL } from '@/config'
import Request from '@/helpers/requests'
import { defineStore } from 'pinia'
import { ref } from 'vue'
import { useAlertStore } from './alert'
import type { IProduct } from './product'

interface IDashboardInfo {
  category: number
  storage: number
  product: number
  member: number
  totalTransaction: number
  countTransaction: number
}

interface IDashboardProductBestSelling {
  id: number
  name: string
  jumlah_terjual: number
}

interface IDashboardOutOfStock {
  productOutOfStock: IProduct[]
}

interface IDashboardBestSelling {
  info: IDashboardInfo
  productBestSelling: IDashboardProductBestSelling[]
}

export const useDashboard = defineStore('main.dashboard', () => {
  const { setErrorAlert, setSuccessAlert } = useAlertStore()

  const outOfStock = ref<IDashboardOutOfStock>()
  const bestSelling = ref<IDashboardBestSelling>()

  const fetchOutOfStock = async (stock: number) => {
    try {
      const handler = await Request.get(`${BASE_URL}/main/dashboard/out-of-stock?stock=${stock}`)
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

      const data = handler.json.items
      outOfStock.value = data
    } catch (error) {
      setErrorAlert('Terjadi kesalahan saat menjalankan aksi')
      console.log('catching', error)
    }
  }

  const fetchBestSelling = async (from: string, to: string) => {
    try {
      const handler = await Request.get(`${BASE_URL}/main/dashboard/best-selling?from=${from}&to=${to}`)
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

      const data = handler.json.items
      bestSelling.value = data
    } catch (error) {
      setErrorAlert('Terjadi kesalahan saat menjalankan aksi')
      console.log('catching', error)
    }
  }

  return { bestSelling, outOfStock, fetchBestSelling, fetchOutOfStock }
})
