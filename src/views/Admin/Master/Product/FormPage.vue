<script lang="ts" setup>
import FileField from '@/components/Common/FileFieldComponent.vue'
import InputField from '@/components/Common/InputFieldComponent.vue'
import Select2 from '@/components/Common/Select2Component.vue'
import TextAreaField from '@/components/Common/TextAreaFieldComponent.vue'
import type { IMasterProduct, ISelect2Option } from '@/interfaces'
import { useAppStore } from '@/stores/app'
import { useCategory } from '@/stores/category'
import { useProductStore } from '@/stores/product'
import { storeToRefs } from 'pinia'
import { computed, reactive, ref } from 'vue'
import { useRoute } from 'vue-router'

interface IForm {
  category_id: number | null
  code: string
  name: string
  unit: string
  stock: number
  price_buy: number
  price_sell: number
  description: string
  date: string
  photo: any
  per_pack: number
  per_item: number
  unit_item: string
  price_sell_item: number
}

const URL_TARGET = 'master/product'

const { setPageMeta } = useAppStore()
const route = useRoute()
const prodocuStore = useProductStore()
const categoryStore = useCategory()

const selectedCategory = ref<ISelect2Option | null>(null)
const selectedPhoto = ref(null)
const paramId = route.params?.id
const form = reactive<IForm>({
  category_id: null,
  code: 'PRD',
  name: '',
  unit: '',
  stock: 0,
  price_buy: 0,
  price_sell: 0,
  description: '',
  date: '',
  photo: null,
  per_pack: 0,
  per_item: 0,
  unit_item: '',
  price_sell_item: 0
})

const { fetch: fetchCategory } = categoryStore
const { items: categoryItem } = storeToRefs(categoryStore)
const dropdownCategoryItem = computed(() => categoryItem.value.map((item) => ({ value: item.id, label: item.name })))

/**
 * Mengatur page meta
 */
setPageMeta({
  title: 'Tambah Produk',
  breadcrumbs: ['Home', 'Produk', 'Tambah']
})

/**
 * Mencari kategori berdasarkan keyword
 * @param q keyword
 */
const searchCategory = async (q: string = '') => {
  await fetchCategory('master/category', q)
}

/**
 * Fungsi untuk memilih produk
 * @param selected
 */
const onCategorySelected = (selected: any) => {
  selectedCategory.value = selected
}

/**
 * Fungsi onMount yang akan dijalankan ketika halaman pertama
 * kali dibuka
 */
const initial = async () => {
  if (paramId) {
    setPageMeta({
      title: 'Ubah Produk',
      breadcrumbs: ['Home', 'Produk', 'Ubah']
    })

    const oldData = await prodocuStore.first<IMasterProduct>(URL_TARGET, route.params.id)
    Object.assign(form, oldData)
    if (oldData?.category_id) selectedCategory.value = { value: oldData.category.id, label: oldData.category.name }
  }

  searchCategory()
}

/**
 * Fungsi ketika submit data
 */
const submit = () => {
  form.category_id = (selectedCategory?.value?.value as number) ?? null
  if (selectedPhoto.value) {
    form.photo = selectedPhoto.value
  } else {
    form.photo = ''
  }

  if (!form.category_id) {
    alert('Kategori / Rak tidak boleh kosong')
    return
  }

  if (confirm('Yakin ingin menjalankan aksi ini ?')) {
    if (paramId) {
      prodocuStore.update<IForm>(URL_TARGET, paramId, form, '/admin/master/product')
    } else {
      prodocuStore.create<IForm>(URL_TARGET, form, '/admin/master/product')
    }
  }
}

/**
 * fungsi onMount
 */
initial()
</script>
<template>
  <div class="row">
    <div class="col-md-12">
      <div class="card card-info">
        <div class="card-header">
          <router-link to="/admin/master/product"> <i class="fas fa-arrow-left"></i> Kembali </router-link>
        </div>
        <div class="card-body">
          <div class="form">
            <div class="row">
              <div class="col-md-4">
                <InputField v-model="form.code" label="Kode produk" type="text" placeholder="PRD00000001" icon="fas fa-info" />
              </div>
              <div class="col-md-4">
                <InputField v-model="form.name" label="Nama" type="text" placeholder="Nescafe" />
              </div>
              <div class="col-md-4">
                <InputField v-model="form.unit" label="Satuan Besar" type="text" placeholder="Karung" icon="fas fa-info" />
              </div>
              <div class="col-md-4">
                <InputField v-model="form.unit_item" label="Satuan Kecil" type="text" placeholder="KG" icon="fas fa-info" />
              </div>
              <div class="col-md-4">
                <InputField v-model="form.per_item" label="Per Item" type="number" placeholder="1" icon="fas fa-info" />
              </div>
              <div class="col-md-4">
                <InputField v-model="form.per_pack" label="Per Pack" type="number" placeholder="20" icon="fas fa-info" />
              </div>
              <div class="col-md-4">
                <InputField v-model="form.stock" label="Stok" type="number" placeholder="0" icon="fas fa-box" />
              </div>
              <div class="col-md-4">
                <InputField v-model="form.price_sell" label="Harga Jual" type="number" placeholder="999999" icon="fas fa-dollar-sign" />
              </div>
              <div class="col-md-4">
                <InputField v-model="form.price_buy" label="Harga Beli" type="number" placeholder="999999" icon="fas fa-dollar-sign" />
              </div>
              <div class="col-md-4">
                <InputField v-model="form.price_sell_item" label="Harga Jual Satuan" type="number" placeholder="999999" icon="fas fa-dollar-sign" />
              </div>
              <div class="col-md-6">
                <InputField v-model="form.date" label="Tanggal Masuk" type="date" placeholder="" icon="fas fa-calendar" />
              </div>
              <div class="col-md-6">
                <FileField v-model="selectedPhoto" label="Foto" type="file" placeholder="" icon="fas fa-image" accept="image/*" />
              </div>
              <div class="col-md-12">
                <TextAreaField v-model="form.description" label="Deskripsi Produk" type="text" placeholder=".........." icon="fas fa-info" :rows="4" />
              </div>
              <div class="col-md-12">
                <Select2 placeholder="Cari Kategori ...." :on-select="onCategorySelected" id="category" label="Kategori" :selected="selectedCategory" :options="dropdownCategoryItem" :search="searchCategory" />
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
