<script lang="ts" setup>
import { useAppStore } from '@/stores/app'
import { storeToRefs } from 'pinia'
import SidebarItem from './SidebarItem.vue'
import { useAuthStore } from '@/stores/auth'
import { ROLE_ADMIN } from '@/stores/auth'

const store = useAppStore()
const { appName, appLogo } = storeToRefs(store)

const authStore = useAuthStore()
const { user } = storeToRefs(authStore)

const isAdmin = user.value?.role == ROLE_ADMIN
</script>
<template>
  <!-- Main Sidebar Container -->
  <aside class="main-sidebar sidebar-dark-primary elevation-4">
    <!-- Brand Logo -->
    <a href="#" class="brand-link">
      <img :src="appLogo" :alt="appName" class="brand-image img-circle elevation-3" style="opacity: 0.8" />
      <span class="brand-text font-weight-light">{{ appName }}</span>
    </a>

    <!-- Sidebar -->
    <div class="sidebar">
      <!-- Sidebar Menu -->
      <nav class="mt-2">
        <ul class="nav nav-pills nav-sidebar flex-column" data-widget="treeview" role="menu" data-accordion="false">
          <SidebarItem label="Beranda" to="/admin/home" icon="fas fa-home" />
          <li class="nav-header">PENJUALAN</li>
          <SidebarItem label="Transaksi" to="/admin/main/transaction" icon="fas fa-wallet" />
          <li v-if="isAdmin" class="nav-header">MASTER</li>
          <SidebarItem v-if="isAdmin" label="Kategori" to="/admin/master/category" icon="fas fa-database" />
          <SidebarItem v-if="isAdmin" label="Pelanggan" to="/admin/master/pelanggan" icon="fas fa-users" />
          <SidebarItem v-if="isAdmin" label="Produk" to="/admin/master/product" icon="fas fa-box" />
          <li v-if="isAdmin" class="nav-header">SISTEM</li>
          <SidebarItem v-if="isAdmin" label="Pengguna" to="/admin/master/user" icon="fas fa-user" />
        </ul>
      </nav>
      <!-- /.sidebar-menu -->
    </div>
    <!-- /.sidebar -->
  </aside>
</template>
