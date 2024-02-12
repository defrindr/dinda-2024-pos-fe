<script lang="ts" setup>
import { useAppStore } from '@/stores/app'
import { storeToRefs } from 'pinia'

const appStore = useAppStore()
const { appName } = storeToRefs(appStore)
</script>

<template>
  <footer class="main-footer">
    <strong
      >Copyright &copy; 2023 <a href="https://localhost">{{ appName }}</a
      >.</strong
    >
    All rights reserved.
    <div class="float-right d-none d-sm-inline-block"><b>Version</b> 3.2.0</div>
  </footer>
</template>
