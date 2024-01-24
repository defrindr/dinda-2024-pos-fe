import { BASE_URL } from '@/config'
import Request from '@/helpers/requests'
import { defineStore } from 'pinia'
import { ref } from 'vue'
import { useAlertStore } from './alert'
import qs from 'qs'

export const useReport = defineStore('main.reports', () => {
  const { setErrorAlert, setSuccessAlert } = useAlertStore()

  const items = ref()

  const fetch = async (month = '', year = '') => {
    let params = qs.stringify({ month, year })
    try {
      const handler = await Request.get(`${BASE_URL}/main/report?${params}`)
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
      items.value = data
    } catch (error) {
      setErrorAlert('Terjadi kesalahan saat menjalankan aksi')
      console.log('catching', error)
    }
  }

  return { items, fetch }
})
