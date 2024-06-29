import { BASE_URL } from '@/config'
import Request from '@/helpers/requests'
import type { IMasterSetting, IMeta } from '@/interfaces'
import router from '@/router'
import { defineStore } from 'pinia'
import { ref } from 'vue'
import { useAlertStore } from './alert'

export const useSetting = defineStore('master.setting', () => {
  const { setErrorAlert, setSuccessAlert } = useAlertStore()

  const items = ref<IMasterSetting[]>([])
  const metaRequest = ref<IMeta>({
    currentPage: 0,
    total: 0,
    perPage: 0,
    path: 0,
    totalPage: 0
  })

  const update = async <T>(url: string, id: any, body: T, redirect: string) => {
    try {
      // request ke server
      const handler = await Request.put(`${BASE_URL}/${url}${id ? '/' + id : ''}`, body)

      // handle dari request
      if (handler.error) {
        setErrorAlert('Gagal mengirim permintaan')
        console.log('request error', handler.error)
        return
      } else if (handler.response?.status !== 200) {
        setErrorAlert(handler.json.message)
        console.log('response gagal')
        return
      }

      // response jika berhasil
      setSuccessAlert(handler.json.message)
      router.push(redirect)
    } catch (error) {
      // error tidak diketahui
      setErrorAlert('Terjadi kesalahan saat menjalankan aksi')
      console.log('catching', error)
    }
  }

  const first = async <T>(url: string, id: any) => {
    try {
      // request ke server
      const handler = await Request.get(`${BASE_URL}/${url}/${id ?? ''}`)

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
      const data: T = handler.json.data
      return data
    } catch (error) {
      // error yang tidak diketahui
      setErrorAlert('Terjadi kesalahan saat menjalankan aksi')
      console.log('catching', error)
    }
  }
  const destroy = async (url: string, id: any) => {
    try {
      // request ke server
      const handler = await Request.delete(`${BASE_URL}/${url}/${id}`)

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

      // jika berhasil perbaharui / request ulang data
      setSuccessAlert(handler.json.message)
      await fetch(url)
    } catch (error) {
      // error tidak diketahui
      setErrorAlert('Terjadi kesalahan saat menjalankan aksi')
      console.log('catching', error)
    }
  }

  // bundle fungsi yang dapat di gunakan diluar modul
  return { items, metaRequest, update, first, destroy }
})
