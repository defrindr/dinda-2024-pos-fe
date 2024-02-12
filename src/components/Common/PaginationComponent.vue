<script lang="ts" setup>
interface IPaginationMeta {
  currentPage: number
  totalPage: number
  total: number
}
interface IPagination {
  meta: IPaginationMeta
  fetch: any
}

const props = defineProps<IPagination>()
const neighborSize = 2
</script>
<template>
  <ul class="pagination m-0 float-right">
    <li v-if="props.meta.currentPage !== 1" class="page-item"><button @click="() => fetch(1)" class="page-link" href="#">«</button></li>
    <li
      v-for="page in Array.from(Array(props.meta.totalPage + 1).keys()).filter((page) => page >= props.meta.currentPage - neighborSize && page <= props.meta.currentPage + neighborSize && page >= 1 && page <= props.meta.totalPage)"
      :class="'page-item ' + (props.meta.currentPage == page && 'active')"
      :key="page"
    >
      <button @click="() => props.meta.currentPage !== page && fetch(page)" :class="'page-link ' + (props.meta.currentPage == page && 'active')" href="#">{{ page }}</button>
    </li>
    <li v-if="props.meta.totalPage !== props.meta.currentPage" class="page-item"><button @click="() => fetch(props.meta.totalPage)" class="page-link" href="#">»</button></li>
  </ul>
</template>
