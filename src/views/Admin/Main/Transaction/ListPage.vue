<script lang="ts" setup>
import Modal from '@/components/Common/ModalComponent.vue'
import Pagination from '@/components/Common/PaginationComponent.vue'
import { BASE_URL } from '@/config'
import type { ITransaction } from '@/interfaces'
import { useAppStore } from '@/stores/app'
import { useTransaction } from '@/stores/transaction'
import { storeToRefs } from 'pinia'
import { ref } from 'vue'

const search = ref('')
const { setPageMeta } = useAppStore()
const URL_TARGET = 'main/transaction'
setPageMeta({
  title: 'List Transaksi',
  breadcrumbs: ['Home', 'Transaksi', 'List']
})

const transactionStore = useTransaction()
const { items, metaRequest } = storeToRefs(transactionStore)

const initialRequest = async (q: string = '', page: number = 1) => {
  await transactionStore.fetch(URL_TARGET, q, page)
}

const onSearch = () => {
  initialRequest(search.value)
}

const movePage = async (page: number) => {
  initialRequest(search.value, page)
}

initialRequest()

// Modal
const isOpenModal = ref(false)
const onDismissModal = () => (isOpenModal.value = false)
const onOpenModal = () => (isOpenModal.value = true)
const selectedItem = ref<ITransaction | null>(null)

const detail = (item: ITransaction) => {
  onOpenModal()
  selectedItem.value = item
}
const openStruk = (transactionCode: string) => {
  window.open(`${BASE_URL}/main/transaction/print-struk/${transactionCode}`, '_blank', 'noreferrer')
}
</script>
<template>
  <div class="row">
    <Modal v-if="selectedItem" title="Detail Transaksi" :is-open="isOpenModal" :dismiss="onDismissModal">
      <div class="table-responsive mb-4">
        <table class="table table-hover table-striped">
          <tbody>
            <tr>
              <th>Kode Transaksi</th>
              <td>:</td>
              <td>{{ selectedItem?.invoice }}</td>
            </tr>
            <tr>
              <th>Tanggal</th>
              <td>:</td>
              <td>{{ selectedItem?._date }}</td>
            </tr>
            <tr>
              <th>Member</th>
              <td>:</td>
              <td>{{ selectedItem.pelanggan?.name ?? '-' }}</td>
            </tr>
            <tr>
              <th>Total Harga</th>
              <td>:</td>
              <td>{{ selectedItem.total_price }}</td>
            </tr>
            <tr>
              <th>Dibayarkan</th>
              <td>:</td>
              <td>{{ selectedItem.total_pay }}</td>
            </tr>
            <tr>
              <th>Kembalian</th>
              <td>:</td>
              <td>{{ selectedItem.total_return }}</td>
            </tr>
          </tbody>
        </table>
      </div>
      <h4>Detail Transaksi</h4>

      <div class="table-responsive mb-4">
        <table class="table table-hover table-striped">
          <thead>
            <th>#</th>
            <th>Produk</th>
            <th>Satuan</th>
            <th>Harga</th>
            <th>Jumlah</th>
            <th>Sub Total</th>
            <!-- <th>H.beli</th>
            <th>Untung</th> -->
          </thead>
          <tbody>
            <tr :key="index" v-for="(detail, index) in selectedItem.items">
              <td>{{ index + 1 }}</td>
              <td>{{ detail.product?.name }}</td>
              <td>{{ detail.satuan }}</td>
              <td>{{ detail.price }}</td>
              <td>{{ detail.quantity }}</td>
              <td>{{ detail.total_price }}</td>
              <!-- <td>{{ detail.product?.harga_beli }}</td>
              <td>{{ detail.total_price.replace('Rp', '').replace(',00', '').replaceAll('.', '') - detail.product?.harga_beli * detail.quantity }}</td> -->
            </tr>
          </tbody>
        </table>
      </div>

      <template #footer>
        <button class="btn btn-warning text-dark" @click="openStruk(selectedItem?.invoice)">
          <i class="fas fa-print"></i>
          Struk
        </button>
      </template>
    </Modal>
    <div class="col-md-12">
      <div class="card card-info">
        <div class="card-header">
          <div class="row justify-content-center" style="align-items: center">
            <div class="col-md-8">
              <router-link to="/admin/main/transaction/create"> <i class="fas fa-plus"></i> Transaksi </router-link>
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
                <th>Tanggal</th>
                <th>Kode</th>
                <th>Member</th>
                <th>Total Harga</th>
                <th>Aksi</th>
              </thead>
              <tbody>
                <tr :key="index" v-for="(item, index) in items">
                  <td>{{ index + 1 + metaRequest?.perPage * (metaRequest?.currentPage - 1) }}</td>
                  <td>{{ item._date }}</td>
                  <td>{{ item.invoice }}</td>
                  <td>{{ item?.pelanggan?.name ?? '-' }}</td>
                  <td>{{ item.total_price }}</td>
                  <td width="150rem">
                    <button @click="detail(item)" class="btn btn-primary mb-2 mr-2">
                      <i class="fas fa-eye"></i>
                    </button>
                    <button class="btn btn-warning text-dark mb-2 mr-2" @click="openStruk(item.invoice)">
                      <i class="fas fa-print"></i>
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
