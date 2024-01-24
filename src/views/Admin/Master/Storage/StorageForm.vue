<script lang="ts" setup>
import InputField from '@/components/Common/InputField.vue'
import TextAreaField from '@/components/Common/TextAreaField.vue'
import { useAppStore } from '@/stores/app'
import { useStorage } from '@/stores/storage'
import { reactive } from 'vue'
import { useRoute } from 'vue-router'

const { setPageMeta } = useAppStore()

setPageMeta({
  title: 'Tambah Rak',
  breadcrumbs: ['Home', 'Rak', 'Tambah']
})

const URL_TARGET = 'master/storage'
const route = useRoute()
const masterStore = useStorage()

interface IForm {
  name: string
  location: string
}
const form = reactive<IForm>({
  name: '',
  location: ''
})

const paramId = route.params?.id

const initial = async () => {
  if (paramId) {
    setPageMeta({
      title: 'Ubah Rak',
      breadcrumbs: ['Home', 'Rak', 'Ubah']
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
      masterStore.update<IForm>(URL_TARGET, paramId, form, '/admin/master/storage')
    } else {
      masterStore.create<IForm>(URL_TARGET, form, '/admin/master/storage')
    }
  }
}
</script>
<template>
  <div class="row">
    <div class="col-md-12">
      <div class="card card-info">
        <div class="card-header">
          <router-link to="/admin/master/storage"> <i class="fas fa-arrow-left"></i> Kembali </router-link>
        </div>
        <div class="card-body">
          <div class="form">
            <InputField v-model="form.name" label="Nama Rak" type="text" placeholder="Nama Rak" icon="fas fa-box" />
            <TextAreaField v-model="form.location" label="Deksripsi Rak" type="text" placeholder="Deskripsi" />
            <div class="form-group">
              <button @click="submit" class="btn btn-primary">Submit</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
