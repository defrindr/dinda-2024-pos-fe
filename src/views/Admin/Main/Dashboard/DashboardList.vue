<script lang="ts" setup>
import BoxInfo from '@/components/Common/BoxInfo.vue'
import { useAppStore } from '@/stores/app'
import { useDashboard } from '@/stores/dashboard'
import { storeToRefs } from 'pinia'
import { ref } from 'vue'

const { setPageMeta } = useAppStore()
setPageMeta({
  title: 'Dashboard',
  breadcrumbs: ['Home', 'Dashboard']
})
</script>
<template>
  <div class="row">
    <BoxInfo title="Kategori" :total="10" icon="fa fa-tree" />
    <BoxInfo title="Member" :total="5" icon="fa fa-users" color="bg-warning" />
    <BoxInfo title="Produkt" :total="2" icon="fa fa-box" color="bg-primary" />
    <BoxInfo title="Rak" :total="3" icon="fa fa-database" color="bg-danger" />
  </div>
</template>
