<script lang="ts" setup>
import FileField from '@/components/Common/FileFieldComponent.vue'
import InputField from '@/components/Common/InputFieldComponent.vue'
import TextAreaField from '@/components/Common/TextAreaFieldComponent.vue'
import { useAppStore } from '@/stores/app'
import { useSetting } from '@/stores/setting'
import { reactive, ref } from 'vue'

const { setPageMeta } = useAppStore()
const URL_TARGET = 'master/setting'
setPageMeta({
  title: 'Ubah Setting',
  breadcrumbs: ['Home', 'Setting', 'Ubah']
})

const store = useSetting()

const selectedLogo = ref<any>(null)

interface IForm {
  nama_aplikasi: string
  alamat: string
  no_telp: string
  website: string
  logo: any
}
const form = reactive<IForm>({
  nama_aplikasi: '',
  alamat: '',
  no_telp: '',
  website: '',
  logo: ''
})

const initial = async () => {
  const oldData = await store.first<IForm>(URL_TARGET, null)
  Object.assign(form, oldData)
}

/**
 * Fungsi ketika submit form
 */
const submit = () => {
  if (confirm('Yakin ingin menjalankan aksi ini ?')) {
    if (selectedLogo.value) {
      form.logo = selectedLogo.value
    } else {
      form.logo = ''
    }

    console.log(form)
    store.update<IForm>(URL_TARGET, null, form, '/admin/master/setting')
    initial()
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
          <h3>{{ form.nama_aplikasi }}</h3>
        </div>
        <div class="card-body">
          <div class="form">
            <div class="row">
              <div class="col-md-12">
                <img :src="form.logo" :alt="form.nama_aplikasi" class="img img-fluid m-auto d-block" style="max-width: 150px" />
                <FileField v-model="selectedLogo" label="Logo Aplikasi" icon="fas fa-image" accept="image/*" />
              </div>
              <div class="col-md-4">
                <InputField v-model="form.nama_aplikasi" label="Nama Aplikasi" type="text" placeholder="POS APP" icon="fas fa-id-card" />
              </div>
              <div class="col-md-4">
                <InputField v-model="form.website" label="Website" type="text" placeholder="hhtp://" icon="fas fa-globe" />
              </div>
              <div class="col-md-4">
                <InputField v-model="form.no_telp" label="No HP" type="text" placeholder="6285********" icon="fas fa-phone" />
              </div>
              <div class="col-md-12">
                <TextAreaField v-model="form.alamat" label="Alamat" placeholder="Ds. Ngadirojo Kec. Megilan" icon="fas fa-map-marker" />
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
