<script lang="ts" setup>
import Modal from '@/components/Common/ModalComponent.vue'
import { BASE_URL } from '@/config'
import { useAppStore } from '@/stores/app'
import { ref } from 'vue'
import Request from '@/helpers/requests'
import BoxInfo from '@/components/Common/BoxInfoComponent.vue'

// setup page
const { setPageMeta } = useAppStore()
setPageMeta({
  title: 'Laporan Penjualan',
  breadcrumbs: ['Home', 'Transaksi', 'Laporan']
})

// page component
const tanggalAwal = ref('')
const tanggalAkhir = ref('')
const fetched = ref(false)
const result = ref(null)

tanggalAwal.value = new Date().toISOString().split('T')[0]

const tomorrow = new Date()
tomorrow.setDate(tomorrow.getDate() + 1)
tanggalAkhir.value = tomorrow.toISOString().split('T')[0]

const onFetch = async () => {
  fetched.value = false
  if (!tanggalAkhir.value || !tanggalAwal.value) return alert('Harap isikan tanggal awal dan akhir dulu !')

  let res = await Request.get(`${BASE_URL}/main/transaction/report?tanggal_awal=${tanggalAwal.value}&tanggal_akhir=${tanggalAkhir.value}`)
  if (!res.response.ok) {
    alert(res.json.message)
    return
  }

  result.value = res.json.data
  fetched.value = true
}

// function
</script>

<template>
  <div class="col-md-12 mb-4">
    <div class="card card-info">
      <div class="card-body">
        <div class="form-group">
          <label for="">Tanggal Awal</label>
          <input v-model="tanggalAwal" type="date" name="tanggal_awal" id="" class="form-control" />
        </div>
        <div class="form-group">
          <label for="">Tanggal Akhir</label>
          <input v-model="tanggalAkhir" type="date" name="tanggal_akhir" id="" class="form-control" />
        </div>
        <div class="form-group">
          <button class="btn btn-primary" @click="onFetch">
            <i class="fa fa-eye"></i>
            Lihat Laporan
          </button>
        </div>
      </div>
    </div>
  </div>
  <div class="col-md-12 mb-4" v-if="fetched">
    <BoxInfo v-if="result" :title="result.laba.title" :total="result.laba.total" :icon="'fas ' + result.laba.icon" size="col-lg-12 col-12" />
  </div>
  <div class="col-md-12 mb-4" v-if="fetched">
    <div class="card card-info">
      <div class="card-body">
        <table class="table table-hover table-striped">
          <thead>
            <th>Nama Produk</th>
            <th>Jumlah Terjual</th>
          </thead>
          <tbody>
            <tr v-for="transaction in result.transactions">
              <td>{{ transaction.product.name }}</td>
              <td>{{ transaction.jumlahTerjual }}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>
