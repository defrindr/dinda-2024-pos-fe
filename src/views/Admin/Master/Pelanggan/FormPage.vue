<script lang="ts" setup>
import InputField from '@/components/Common/InputFieldComponent.vue'
import Select2 from '@/components/Common/Select2Component.vue'
import TextAreaField from '@/components/Common/TextAreaFieldComponent.vue'
import type { ISelect2Option } from '@/interfaces'
import { useAppStore } from '@/stores/app'
import { usePelanggan } from '@/stores/pelanggan'
import { reactive, ref } from 'vue'
import { useRoute } from 'vue-router'

const { setPageMeta } = useAppStore()
const URL_TARGET = 'master/pelanggan'
setPageMeta({
  title: 'Tambah Pelanggan',
  breadcrumbs: ['Home', 'Pelanggan', 'Tambah']
})

const route = useRoute()
const store = usePelanggan()

interface IForm {
  code: string
  nik: string
  name: string
  phone: string
  address: string
  gender: string
  dob: string
  status: string
}
const form = reactive<IForm>({
  code: '',
  nik: '',
  name: '',
  phone: '',
  address: '',
  gender: '',
  dob: '',
  status: ''
})

const selectedGender = ref<ISelect2Option | null>(null)
const selectedStatus = ref<ISelect2Option | null>(null)

const paramId = route.params?.id

const optionsGender: ISelect2Option[] = [
  { value: 'L', label: 'Laki-Laki' },
  { value: 'P', label: 'Perempuan' }
]
const optionsStatus: ISelect2Option[] = [
  { value: 'active', label: 'Aktif' },
  { value: 'nonactive', label: 'Tidak Aktif' }
]

const onSelectGender = (item: ISelect2Option) => {
  selectedGender.value = item
}

const onSelectStatus = (item: ISelect2Option) => {
  selectedStatus.value = item
}

const initial = async () => {
  if (paramId) {
    setPageMeta({
      title: 'Ubah Pelanggan',
      breadcrumbs: ['Home', 'Pelanggan', 'Ubah']
    })

    const oldData = await store.first<IForm>(URL_TARGET, route.params.id)
    Object.assign(form, oldData)

    selectedGender.value = optionsGender.filter((item) => item.value === form.gender)[0]
    selectedStatus.value = optionsStatus.filter((item) => item.value === form.status)[0]
  }
}

/**
 * Fungsi ketika submit form
 */
const submit = () => {
  if (confirm('Yakin ingin menjalankan aksi ini ?')) {
    form.status = selectedStatus.value?.value.toString() ?? ''
    form.gender = selectedGender.value?.value.toString() ?? ''

    if (paramId) {
      store.update<IForm>(URL_TARGET, paramId, form, '/admin/master/pelanggan')
    } else {
      store.create<IForm>(URL_TARGET, form, '/admin/master/pelanggan')
    }
  }
}

// onMount
initial()
</script>
<template>
  <div class="row">
    <div class="col-md-12">
      <div class="card card-info">
        <div class="card-header">
          <router-link :to="`/admin/master/pelanggan`"> <i class="fas fa-arrow-left"></i> Kembali </router-link>
        </div>
        <div class="card-body">
          <div class="form">
            <div class="row">
              <div class="col-md-6">
                <InputField v-model="form.code" label="Kode" type="text" placeholder="PLG00000001" icon="fas fa-id-card" />
              </div>
              <div class="col-md-6">
                <InputField v-model="form.nik" label="NIK" type="text" placeholder="350207********" icon="fas fa-id-card" />
              </div>
              <div class="col-md-6">
                <InputField v-model="form.name" label="Nama" type="text" placeholder="John Doe" icon="fas fa-user" />
              </div>
              <div class="col-md-6">
                <InputField v-model="form.phone" label="No HP" type="text" placeholder="6285********" icon="fas fa-phone" />
              </div>
              <div class="col-md-6">
                <InputField v-model="form.dob" label="Tanggal Lahir" type="date" icon="fas fa-calendar" />
              </div>
              <div class="col-md-6">
                <Select2 id="gender" :hasSearch="false" v-model="form.gender" label="Jenis Kelamin" icon="fas fa-genders" :onSelect="onSelectGender" :selected="selectedGender" :options="optionsGender" />
              </div>
              <div class="col-md-12">
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
