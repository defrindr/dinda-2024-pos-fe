<script lang="ts" setup>
import { confirmModal } from '@/helpers/utils'
import { useAppStore } from '@/stores/app'
import { useProductStore } from '@/stores/product'
import { storeToRefs } from 'pinia'
import { inject, ref } from 'vue'
const Swal = inject('$swal')

// inisiasi konstanta dan store
const { setPageMeta } = useAppStore()
const store = useProductStore()
const URL_TARGET = 'master/product'

// inisiasi variable
const search = ref<string>('')
const { items } = storeToRefs(store)

// mengatur page meta
setPageMeta({
  title: 'List Produk',
  breadcrumbs: ['Home', 'Produk', 'List']
})

/**
 * Fungsi pencarian dan paginasi data
 * @param q Keyword
 * @param page Halaman yang dituju
 */
const initialRequest = async (q: string = '', page: number = 1) => {
  await store.fetch(URL_TARGET, q, page)
}

/**
 * Fungsi untuk menghapus data
 * @param id Item yang dipilih
 */
const destroy = async (id: any) => {
  confirmModal({
    Swal,
    text: 'Yakin ingin menghapus data ini ?',
    callback: () => {
      store.destroy(URL_TARGET, id)
    }
  })
}

/**
 * Fungsi yang akan dijalankan
 * ketika tombol pencarian di klik
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
 * Fungsi untuk berpindah halaman
 * @param page Halaman yang dituju
 */
// const movePage = async (page: number) => {
//   initialRequest(search.value, page)
// }

/**
 * onMount
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
              <router-link to="/admin/master/product/create"> <i class="fas fa-plus"></i> Produk </router-link>
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
                <th>Kode Produk</th>
                <th>Nama Produk</th>
                <!-- <th>Satuan Besar</th>
                <th>Satuan Kecil</th> -->
                <th>Per Pack</th>
                <!-- <th>Per Item</th> -->
                <th>Jml Stok</th>
                <th>Harga Beli</th>
                <th>Harga Jual</th>
                <th>Harga Per Item</th>
                <!-- <th>Deskripsi Produk</th> -->
                <th>Tanggal Masuk</th>
                <th>Foto</th>
                <th>Aksi</th>
              </thead>
              <tbody>
                <tr :key="index" v-for="(item, index) in items">
                  <td>{{ index + 1 }}</td>
                  <td>{{ item.category.name }}</td>
                  <td>{{ item.code }}</td>
                  <td>{{ item.name }}</td>
                  <!-- <td>{{ item.satuan_pack }}</td>
                  <td>{{ item.satuan_ecer }}</td> -->
                  <td>{{ item.per_pack }}</td>
                  <!-- <td>{{ item.jumlah_ecer }}</td> -->
                  <td>{{ item.stock_pack }} {{ item.satuan_ecer }}</td>
                  <td>{{ item.harga_beli }}</td>
                  <td>{{ item.harga_pack }}</td>
                  <td>{{ item.harga_ecer }}</td>
                  <!-- <td>{{ item.description }}</td> -->
                  <td>{{ item.date }}</td>
                  <td>
                    <img :src="item.photo" :alt="item.name" class="img img-fluid" style="max-width: 75px" />
                  </td>
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
        <!-- <div class="card-footer">
          <Pagination v-if="metaRequest" :meta="metaRequest" :fetch="movePage" />
        </div> -->
      </div>
    </div>
  </div>
</template>
