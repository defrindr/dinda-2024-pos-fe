<script lang="ts" setup>
import Alert from '@/components/Common/Alert.vue'
import router from '@/router'
import { useAppStore } from '@/stores/app'
import { useAuthStore } from '@/stores/auth'
import { storeToRefs } from 'pinia'

const appStore = useAppStore()
const authStore = useAuthStore()

const { appName } = storeToRefs(appStore)
const { user } = storeToRefs(authStore)

console.log('auth', user.value)
// Check Authentication
if (user.value) {
  router.push('/admin/home')
}
</script>

<template>
  <div class="login-page">
    <div class="login-box">
      <div class="login-logo">
        <a href="#" style="font-weight: bold">{{ appName }}</a>
      </div>
      <!-- /.login-logo -->
      <div class="card">
        <Alert />
        <router-view />
        <!-- /.login-card-body -->
      </div>
    </div>
  </div>
</template>
