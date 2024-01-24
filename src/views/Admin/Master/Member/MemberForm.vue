<script lang="ts" setup>
import InputField from '@/components/Common/InputField.vue'
import TextAreaField from '@/components/Common/TextAreaField.vue'
import { useAppStore } from '@/stores/app'
import { useMember } from '@/stores/member'
import { reactive } from 'vue'
import { useRoute } from 'vue-router'
const URL_TARGET = 'master/member'
const { setPageMeta } = useAppStore()
setPageMeta({
  title: 'Tambah Pelanggan',
  breadcrumbs: ['Home', 'Pelanggan', 'Tambah']
})

const route = useRoute()
const masterStore = useMember()

interface IForm {
  name: string
  address: string
}

const form = reactive<IForm>({
  name: '',
  address: ''
})

const paramId = route.params?.id

const initial = async () => {
  if (paramId) {
    setPageMeta({
      title: 'Ubah Pelanggan',
      breadcrumbs: ['Home', 'Pelanggan', 'Ubah']
    })

    const oldData = await masterStore.first<IForm>(URL_TARGET, route.params.id)

    Object.assign(form, oldData)
    console.log(form)
  }
}

initial()

const submit = () => {
  if (confirm('Yakin ingin menjalankan aksi ini ?')) {
    if (paramId) {
      masterStore.update<IForm>(URL_TARGET, paramId, form, '/admin/master/member')
    } else {
      masterStore.create<IForm>(URL_TARGET, form, '/admin/master/member')
    }
  }
}
</script>
<template>
  <div class="row">
    <div class="col-md-12">
      <div class="card card-info">
        <div class="card-header">
          <router-link to="/admin/master/member"> <i class="fas fa-arrow-left"></i> Kembali </router-link>
        </div>
        <div class="card-body">
          <div class="form">
            <InputField v-model="form.name" label="Nama Lengkap" type="text" placeholder="Nama Lengkap" icon="fas fa-user" />
            <TextAreaField v-model="form.address" label="Alamat Pelanggan" type="text" placeholder="Deskripsi" icon="fas fa-map" />
            <div class="form-group">
              <button @click="submit" class="btn btn-primary">Submit</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
