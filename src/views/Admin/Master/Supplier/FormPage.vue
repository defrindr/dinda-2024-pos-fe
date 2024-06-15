<script lang="ts" setup>
import InputField from '@/components/Common/InputFieldComponent.vue'
import Select2 from '@/components/Common/Select2Component.vue'
import TextAreaField from '@/components/Common/TextAreaFieldComponent.vue'
import { confirmModal } from '@/helpers/utils'
import type { ISelect2Option } from '@/interfaces'
import { useAppStore } from '@/stores/app'
import { useSupplier } from '@/stores/supplier'
import { reactive, ref } from 'vue'
import { useRoute } from 'vue-router'
import { inject } from 'vue'
const Swal = inject('$swal')

const { setPageMeta } = useAppStore()
const URL_TARGET = 'master/supplier'
setPageMeta({
  title: 'Tambah Supplier',
  breadcrumbs: ['Home', 'Supplier', 'Tambah']
})

const route = useRoute()
const store = useSupplier()

interface IForm {
  code: string
  name: string
  phone: string
  address: string
  status: string
}
const form = reactive<IForm>({
  code: '',
  name: '',
  phone: '',
  address: '',
  status: ''
})

const selectedStatus = ref<ISelect2Option | null>(null)

const paramId = route.params?.id

const optionsStatus: ISelect2Option[] = [
  { value: 'active', label: 'Aktif' },
  { value: 'nonactive', label: 'Tidak Aktif' }
]

const onSelectStatus = (item: ISelect2Option) => {
  selectedStatus.value = item
}

const initial = async () => {
  if (paramId) {
    setPageMeta({
      title: 'Ubah Supplier',
      breadcrumbs: ['Home', 'Supplier', 'Ubah']
    })

    const oldData = await store.first<IForm>(URL_TARGET, route.params.id)
    Object.assign(form, oldData)

    selectedStatus.value = optionsStatus.filter((item) => item.value === form.status)[0]
  }
}

/**
 * Fungsi ketika submit form
 */
const submit = () => {
  confirmModal({
    Swal,
    text: 'Yakin ingin menjalankan aksi ini ?',
    callback: () => {
      form.status = selectedStatus.value?.value.toString() ?? ''

      if (paramId) {
        store.update<IForm>(URL_TARGET, paramId, form, '/admin/master/supplier')
      } else {
        store.create<IForm>(URL_TARGET, form, '/admin/master/supplier')
      }
    }
  })
}

// onMount
initial()
</script>
<template>
  <div class="row">
    <div class="col-md-12">
      <div class="card card-info">
        <div class="card-header">
          <router-link :to="`/admin/master/supplier`"> <i class="fas fa-arrow-left"></i> Kembali </router-link>
        </div>
        <div class="card-body">
          <div class="form">
            <div class="row">
              <div class="col-md-6">
                <InputField v-model="form.code" label="Kode" type="text" placeholder="SPL00000001" icon="fas fa-id-card" readonly />
              </div>
              <div class="col-md-6">
                <InputField v-model="form.name" label="Nama" type="text" placeholder="John Doe" icon="fas fa-id-card" />
              </div>
              <div class="col-md-6">
                <InputField v-model="form.phone" label="No HP" type="text" placeholder="6285********" icon="fas fa-phone" />
              </div>
              <div class="col-md-6">
                <Select2 id="status" :hasSearch="false" v-model="form.status" label="Status" type="date" icon="fas fa-status" :onSelect="onSelectStatus" :selected="selectedStatus" :options="optionsStatus" />
              </div>
              <div class="col-md-12">
                <TextAreaField v-model="form.address" label="Alamat" placeholder="Ds. Ngadirojo Kec. Megilan" icon="fas fa-map-marker" />
              </div>
            </div>
            <div class="form-group">
              <button @click="submit" class="btn btn-primary">Submit</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
