<script lang="ts" setup>
import InputField from '@/components/Common/InputField.vue'
import { useAppStore } from '@/stores/app'
import { useCategory } from '@/stores/category'
import { reactive } from 'vue'
import { useRoute } from 'vue-router'

const { setPageMeta } = useAppStore()
const URL_TARGET = 'master/category'
setPageMeta({
  title: 'Tambah Kategori',
  breadcrumbs: ['Home', 'Kategori', 'Tambah']
})

const route = useRoute()
const masterStore = useCategory()

interface IForm {
  name: string
  // location: string
}
const form = reactive<IForm>({
  name: ''
  // location: ''
})

const paramId = route.params?.id

const initial = async () => {
  if (paramId) {
    setPageMeta({
      title: 'Ubah Kategori',
      breadcrumbs: ['Home', 'Kategori', 'Ubah']
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
      masterStore.update<IForm>(URL_TARGET, paramId, form, '/admin/master/category')
    } else {
      masterStore.create<IForm>(URL_TARGET, form, '/admin/master/category')
    }
  }
}
</script>
<template>
  <div class="row">
    <div class="col-md-12">
      <div class="card card-info">
        <div class="card-header">
          <router-link to="/admin/master/category"> <i class="fas fa-arrow-left"></i> Kembali </router-link>
        </div>
        <div class="card-body">
          <div class="form">
            <InputField v-model="form.name" label="Kategori" type="text" placeholder="Kategori" icon="fas fa-database" />
            <div class="form-group">
              <button @click="submit" class="btn btn-primary">Submit</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
