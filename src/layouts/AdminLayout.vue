<script lang="ts" setup>
import '@/assets/main.css'
import Preload from '@/layouts/components/Admin/Preload.vue'
import Header from '@/layouts/components/Admin/Header.vue'
import Sidebar from '@/layouts/components/Admin/Sidebar.vue'
import Content from '@/layouts/components/Admin/Content.vue'
import Footer from '@/layouts/components/Admin/Footer.vue'
import Alert from '@/components/Common/Alert.vue'
import { useAuthStore } from '@/stores/auth'
import { storeToRefs } from 'pinia'
import router from '@/router'
import { useAppStore } from '@/stores/app'

const appStore = useAppStore()
const { sidebarCollapse } = storeToRefs(appStore)

const authStore = useAuthStore()
const { user } = storeToRefs(authStore)

// Authentication Check
console.log('admin', user.value)
if (!user.value) {
  router.push('/auth/login')
}

const hideSidebar = () => {
  console.log(sidebarCollapse.value)
  appStore.changeSidebarCollapse(!sidebarCollapse.value)
}
</script>

<template>
  <div :class="'hold-transition sidebar-mini layout-fixed ' + (sidebarCollapse ? 'sidebar-closed sidebar-collapse' : 'sidebar-open')">
    <div class="wrapper">
      <!-- <Preload /> -->
      <Header />
      <Sidebar />
      <Content>
        <template #content>
          <Alert />
          <router-view />
        </template>
      </Content>
      <Footer />
      <div @click="hideSidebar()" id="sidebar-overlay"></div>
    </div>
  </div>
</template>
