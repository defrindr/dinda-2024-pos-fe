import { defineStore } from 'pinia'
import { ref } from 'vue'

interface IAlert {
  type: string
  message: string
}

export const useAlertStore = defineStore('alert', () => {
  const alert = ref<IAlert | null>(null)

  const setSuccessAlert = (message: string) => {
    alert.value = {
      type: 'success',
      message
    }
  }

  const setErrorAlert = (message: string) => {
    alert.value = {
      type: 'error',
      message
    }
  }

  const clearAlert = () => {
    alert.value = null
  }

  return { alert, setSuccessAlert, setErrorAlert, clearAlert }
})
