<script lang="ts" setup>
import { useAlertStore } from '@/stores/alert'
import { storeToRefs } from 'pinia'
import { watch } from 'vue'

const alertStore = useAlertStore()

const { alert } = storeToRefs(alertStore)

const dismissAlert = () => {
  alertStore.clearAlert()
}

watch(
  () => alert.value?.message,
  () => {
    setTimeout(() => {
      alertStore.clearAlert()
    }, 5000)
  }
)
</script>

<template>
  <div v-if="alert" :class="'toast alert alert-dismissible fade show m-1 ' + (alert.type == 'error' ? 'alert-danger' : 'alert-success')" role="alert">
    <strong>{{ alert.type === 'error' ? 'Peringatan !!' : 'Berhasil !!' }}</strong>
    <br />
    {{ alert.message }}
    <button type="button" class="close" aria-label="Close" @click="dismissAlert">
      <span aria-hidden="true">&times;</span>
    </button>
  </div>
</template>
