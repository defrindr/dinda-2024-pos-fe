<script lang="ts" setup>
import Pagination from '@/components/Common/Pagination.vue'
import { useAppStore } from '@/stores/app'
import { useProduct } from '@/stores/product'
import { storeToRefs } from 'pinia'
import { ref } from 'vue'

const search = ref('')
const { setPageMeta } = useAppStore()
const URL_TARGET = 'master/product'
setPageMeta({
  title: 'List Produk',
  breadcrumbs: ['Home', 'Produk', 'List']
})

const masterStore = useProduct()
const { items, metaRequest } = storeToRefs(masterStore)

const initialRequest = async (q: string = '', page: number = 1) => {
  await masterStore.fetch(URL_TARGET, q, page)
}

const destroy = async (id: any) => {
  if (confirm('Yakin ingin menghapus data ini ?')) {
    masterStore.destroy(URL_TARGET, id)
  }
}

const onSearch = () => {
  initialRequest(search.value)
}

const movePage = async (page: number) => {
  initialRequest(search.value, page)
}

initialRequest()
</script>
<template>
  <div class="row">
    <div class="col-md-12">
      <div class="card card-info">
        <div class="card-header">
          <div class="row justify-content-center" style="align-items: center">
            <div class="col-md-8">
              <router-link to="/admin/master/product/create"> <i class="fas fa-plus"></i> Produk </router-link>
            </div>
            <div class="col-md-4 d-flex">
              <input v-model="search" type="text" class="form-control" placeholder="Cari ..." />
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
                <th>SKU</th>
                <th>Nama Produk</th>
                <th>Kategori</th>
                <th>Rak</th>
                <th>Harga</th>
                <th>Stok</th>
                <th>Aksi</th>
              </thead>
              <tbody>
                <tr v-if="items.length > 0" v-for="(item, index) in items">
                  <td>{{ index + 1 + metaRequest?.perPage * (metaRequest?.currentPage - 1) }}</td>
                  <td>{{ item.sku }}</td>
                  <td>{{ item.name }}</td>
                  <td>{{ item.category?.name }}</td>
                  <td>{{ item.storage?.name }}</td>
                  <td>{{ item.price }}</td>
                  <td>{{ item.stock }}</td>
                  <td width="150rem">
                    <router-link :to="`/admin/master/product/update/${item.id}`" class="btn btn-warning mb-2 mr-2">
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
