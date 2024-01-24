<script lang="ts" setup>
import FileField from '@/components/Common/FileField.vue'
import InputField from '@/components/Common/InputField.vue'
import Select2, { type ISelect2Option } from '@/components/Common/Select2.vue'
import router from '@/router'
import { useAppStore } from '@/stores/app'
import { ROLE_KASIR, ROLE_ADMIN, ROLE_MANAGER } from '@/stores/auth'
import { useCategory } from '@/stores/category'
import { useProduct } from '@/stores/product'
import { useStorage } from '@/stores/storage'
import { useUser, type IUser } from '@/stores/user'
import { storeToRefs } from 'pinia'
import { computed, reactive, ref, watch } from 'vue'
import { useRoute } from 'vue-router'

const URL_TARGET = 'master/user'
const { setPageMeta } = useAppStore()
setPageMeta({
  title: 'Tambah Pengguna',
  breadcrumbs: ['Home', 'Pengguna', 'Tambah']
})

const route = useRoute()
const userStore = useUser()

const selectedRole = ref<ISelect2Option | null>(null)
const dropdownRoleItem: ISelect2Option[] = [
  { value: ROLE_ADMIN, label: 'Admin' },
  { value: ROLE_KASIR, label: 'Kasir' },
  { value: ROLE_MANAGER, label: 'Manager' }
]
const onRoleSelected = (selected: any) => {
  selectedRole.value = selected
}

interface IForm {
  code: string
  username: string
  email: string
  name: string
  role: string
  photo: string
  phone: string
  password?: string
}

const form = reactive<IForm>({
  code: '',
  username: '',
  email: '',
  name: '',
  role: '',
  photo: '',
  phone: '',
  password: ''
})

const paramId = route.params?.id

const initial = async () => {
  if (paramId) {
    setPageMeta({
      title: 'Ubah Pengguna',
      breadcrumbs: ['Home', 'Pengguna', 'Ubah']
    })

    const oldData: IUser | null = await userStore.first<IForm>(URL_TARGET, route.params.id)
    if (!oldData) return router.push('/admin/master/user')
    selectedRole.value = { value: oldData.role, label: oldData.role }
    Object.assign(form, {
      code: oldData.code,
      username: oldData.username,
      phone: oldData.phone,
      email: oldData.email,
      name: oldData.name,
      role: oldData.role
    })
  }
}

initial()

const submit = () => {
  form.role = (selectedRole?.value?.value as string) ?? null

  if (!form.role) {
    alert('Hak akses tidak boleh kosong')
    return
  }

  if (!form.password) {
    delete form.password
  }

  if (confirm('Yakin ingin menjalankan aksi ini ?')) {
    if (paramId) {
      userStore.update<IForm>(URL_TARGET, paramId, form, '/admin/master/user')
    } else {
      userStore.create<IForm>(URL_TARGET, form, '/admin/master/user')
    }
  }
}
</script>
<template>
  <div class="row">
    <div class="col-md-12">
      <div class="card card-info">
        <div class="card-header">
          <router-link to="/admin/master/user"> <i class="fas fa-arrow-left"></i> Kembali </router-link>
        </div>
        <div class="card-body">
          <div class="form">
            <div class="row">
              <div class="col-md-6">
                <InputField v-model="form.username" label="Username" type="text" placeholder="john.doe" icon="fas fa-user" />
              </div>
              <div class="col-md-6">
                <InputField v-model="form.password" label="Kata sandi" type="password" placeholder="***********" icon="fas fa-key" />
              </div>
              <div class="col-md-12">
                <hr />
              </div>
              <div class="col-md-6">
                <InputField v-model="form.code" label="NID" type="text" placeholder="9016527ZJA" icon="fas fa-id-card" />
              </div>
              <div class="col-md-6">
                <InputField v-model="form.name" label="Nama" type="text" placeholder="John Doe" icon="fas fa-user" />
              </div>
              <div class="col-md-4">
                <InputField v-model="form.email" label="Email" type="text" placeholder="john.doe@mail.co.id" icon="fas fa-envelope" />
              </div>
              <div class="col-md-4">
                <InputField v-model="form.phone" label="No HP" type="text" placeholder="628**********" icon="fas fa-phone" />
              </div>
              <div class="col-md-4">
                <FileField accept="image/*" v-model="form.photo" label="Foto" type="file" icon="fas fa-file" />
              </div>
              <div class="col-md-12">
                <hr />
              </div>
              <div class="col-md-12">
                <Select2 placeholder="-- Pilih --" :on-select="onRoleSelected" id="role" label="Hak Akses" :selected="selectedRole" :options="dropdownRoleItem" :has-search="false" />
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
