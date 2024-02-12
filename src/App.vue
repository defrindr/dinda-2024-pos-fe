<script setup lang="ts">
import { RouterView } from 'vue-router'
import { useSetting } from './stores/setting'
import { useAppStore } from './stores/app'
import type { IMasterSetting } from './interfaces'

const appStore = useAppStore()
const store = useSetting()

const initialApp = async () => {
  let response: IMasterSetting | undefined = await store.first<IMasterSetting>('master/setting', null)
  if (response) {
    appStore.changeAppName(response.nama_aplikasi)
    appStore.changeLogo(response.logo)
  }
}

initialApp()
</script>

<template>
  <RouterView />
</template>
