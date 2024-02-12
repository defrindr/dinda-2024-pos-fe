import Request from '@/helpers/requests'
import { defineStore } from 'pinia'
import { ref } from 'vue'
import { useAlertStore } from './alert'
import { BASE_URL } from '@/config'

type itemsInterface = {
  icon: string
  title: string
  total: number
}
export const useDashboardStore = defineStore('store.dashboard', () => {
  // use another store
  const { setErrorAlert } = useAlertStore()

  const items = ref<itemsInterface[] | null>(null)

  /**
   * Mendapatkan data items untuk dashboard
   */
  const getItems = async () => {
    const handler = await Request.get(`${BASE_URL}/main/dashboard/datacount`)

    // handle jika request error
    if (handler.error) {
      setErrorAlert('Gagal mengirim permintaan')
      console.log('request error', handler.error)
      return
    } else if (handler.response?.status !== 200) {
      setErrorAlert(handler.json.message)
      console.log('response gagal')
      return
    }

    // kembalikan data response
    const data: itemsInterface[] = handler.json.data
    items.value = data
  }

  return {
    items,
    getItems
  }
})
