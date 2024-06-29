<script lang="ts" setup>
import { useAppStore } from '@/stores/app'
import { useAuthStore } from '@/stores/auth'
import { storeToRefs } from 'pinia'

const appStore = useAppStore()
const { sidebarCollapse } = storeToRefs(appStore)
const authStore = useAuthStore()

const logout = async () => {
  await authStore.actionLogout()
}
</script>
<template>
  <nav class="main-header navbar navbar-expand navbar-white navbar-light">
    <!-- Left navbar links -->
    <ul class="navbar-nav">
      <li class="nav-item">
        <a class="nav-link" href="#" role="button" @click="() => appStore.changeSidebarCollapse(!sidebarCollapse)">
          <i class="fas fa-bars"></i>
        </a>
      </li>
    </ul>
    <ul class="navbar-nav ml-auto">
      <li class="nav-item d-inline-block">
        <a @click="logout" class="nav-link" style="cursor: pointer">
          <i class="fas fa-door-open"></i>
          Logout
        </a>
      </li>
    </ul>
  </nav>
</template>
