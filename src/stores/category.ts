import { BASE_URL } from '@/config'
import Request from '@/helpers/requests'
import type { IMasterCategory, IMeta } from '@/interfaces'
import router from '@/router'
import { defineStore } from 'pinia'
import qs from 'qs'
import { ref } from 'vue'
import { useAlertStore } from './alert'

export const useCategory = defineStore('master.category', () => {
  const { setErrorAlert, setSuccessAlert } = useAlertStore()

  const items = ref<IMasterCategory[]>([])
  const metaRequest = ref<IMeta>({
    currentPage: 0,
    total: 0,
    perPage: 0,
    path: 0,
    totalPage: 0
  })

  const fetch = async (url: string, search: string = '', page: number = 1) => {
    try {
      // request ke server
      const params = qs.stringify({ search, page })
      const handler = await Request.get(`${BASE_URL}/${url}?${params}`)

      // handle error
      if (handler.error) {
        setErrorAlert('Gagal mengirim permintaan')
        console.log('request error', handler.error)
        return
      } else if (handler.response?.status !== 200) {
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
      // handle error tidak diketahui
      setErrorAlert('Terjadi kesalahan saat menjalankan aksi')
      console.log('catching', error)
    }
  }

  const create = async <T>(url: string, body: T, redirect: string) => {
    try {
      // request ke server
      const handler: any = await Request.post(`${BASE_URL}/${url}`, body)
      console.log('handler', handler)
      // handle dari request
      if (handler?.error) {
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

  const update = async <T>(url: string, id: any, body: T, redirect: string) => {
    try {
      // request ke server
      const handler = await Request.put(`${BASE_URL}/${url}/${id}`, body)

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
      const handler = await Request.get(`${BASE_URL}/${url}/${id}`)

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
  return { items, metaRequest, fetch, create, update, first, destroy }
})
