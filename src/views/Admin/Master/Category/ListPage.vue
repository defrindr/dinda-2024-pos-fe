<script lang="ts" setup>
import Pagination from '@/components/Common/PaginationComponent.vue'
import { useAppStore } from '@/stores/app'
import { useCategory } from '@/stores/category'
import { storeToRefs } from 'pinia'
import { ref } from 'vue'

const search = ref('')
const URL_TARGET = 'master/category'
const { setPageMeta } = useAppStore()
setPageMeta({
  title: 'List Kategori',
  breadcrumbs: ['Home', 'Kategori', 'List']
})

const store = useCategory()
const { items, metaRequest } = storeToRefs(store)

/**
 * Fungsi request ke server
 * @param q Keyword dari pencarian
 * @param page Halaman yang dituju
 */
const initialRequest = async (q: string = '', page: number = 1) => {
  await store.fetch(URL_TARGET, q, page)
}

/**
 * Menghapus data berdasarkan [id] yang dipilih
 * @param id [id] dari data yang ingin dihapus
 */
const destroy = async (id: any) => {
  if (confirm('Yakin ingin menghapus data ini ?')) {
    store.destroy(URL_TARGET, id)
  }
}

/**
 * Fungsi ketika menekan tombol pencarian
 */
const onSearch = () => {
  initialRequest(search.value)
}

/**
 * Fungsi ketika menekan tombol enter di field pencarian
 */
const onPressEnter = (event: KeyboardEvent) => {
  if (event?.key === 'Enter') {
    onSearch()
  }
}

/**
 * Berpindah ke halaman yang dituju
 * @param page Halaman yang dituju
 */
const movePage = async (page: number) => {
  initialRequest(search.value, page)
}

/**
 * menjalankan initial fungsi saat onMount
 */
initialRequest()
</script>
<template>
  <div class="row">
    <div class="col-md-12">
      <div class="card card-info">
        <div class="card-header">
          <div class="row justify-content-center" style="align-items: center">
            <div class="col-md-8">
              <router-link to="/admin/master/category/create"> <i class="fas fa-plus"></i> Kategori </router-link>
            </div>
            <div class="col-md-4 d-flex">
              <input @keyup="onPressEnter($event)" v-model="search" type="text" class="form-control" placeholder="Cari ..." />
              <button @click="onSearch" class="btn btn-primary ml-2">
                <i class="fas fa-search"></i>
              </button>
            </div>
          </div>
        </div>
        <div class="card-body">
          <div class="table-responsive">
            <table class="table table-hover table-striped">
              <thead>
                <th>#</th>
                <th>Kategori</th>
                <th>Aksi</th>
              </thead>
              <tbody>
                <tr :key="index" v-for="(item, index) in items">
                  <td>{{ index + 1 + metaRequest?.perPage * (metaRequest?.currentPage - 1) }}</td>
                  <td>{{ item.name }}</td>
                  <td width="150rem">
                    <router-link :to="`/admin/master/category/update/${item.id}`" class="btn btn-warning mb-2 mr-2">
                      <i class="fas fa-pencil-alt"></i>
                    </router-link>
                    <button @click="() => destroy(item.id)" class="btn btn-danger mb-2 mr-2">
                      <i class="fas fa-trash"></i>
                    </button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
        <div class="card-footer">
          <Pagination v-if="metaRequest" :meta="metaRequest" :fetch="movePage" />
        </div>
      </div>
    </div>
  </div>
</template>
