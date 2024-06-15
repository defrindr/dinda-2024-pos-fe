<script lang="ts" setup>
import BoxInfo from '@/components/Common/BoxInfoComponent.vue'
import { useAppStore } from '@/stores/app'
import { useDashboardStore } from '@/stores/dashboard'
import { storeToRefs } from 'pinia'

const { setPageMeta } = useAppStore()
setPageMeta({
  title: 'Informasi Toko',
  breadcrumbs: ['Home', 'Informasi Toko']
})

const { getItems } = useDashboardStore()
const { items } = storeToRefs(useDashboardStore())

getItems()
</script>
<template>
  <div class="row">
    <BoxInfo :key="item.title" v-for="item in items" :title="item.title" :total="item.total" :icon="'fas ' + item.icon" />
  </div>
</template>
