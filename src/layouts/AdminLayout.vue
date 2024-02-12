<script lang="ts" setup>
import '@/assets/main.css'
import Alert from '@/components/Common/NotificationAlert.vue'
import Content from '@/layouts/components/Admin/ContentAdminLayout.vue'
import Footer from '@/layouts/components/Admin/FooterAdminLayout.vue'
import Header from '@/layouts/components/Admin/HeaderAdminLayout.vue'
import Sidebar from '@/layouts/components/Admin/SidebarAdminLayout.vue'
import router from '@/router'
import { useAppStore } from '@/stores/app'
import { useAuthStore } from '@/stores/auth'
import { storeToRefs } from 'pinia'

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
