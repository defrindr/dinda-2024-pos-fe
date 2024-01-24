<script lang="ts" setup>
import InputField from '@/components/Common/InputField.vue'
import Select2, { type ISelect2Option } from '@/components/Common/Select2.vue'
import { useAppStore } from '@/stores/app'
import { useCategory } from '@/stores/category'
import { useProduct } from '@/stores/product'
import { useStorage } from '@/stores/storage'
import { storeToRefs } from 'pinia'
import { computed, reactive, ref } from 'vue'
import { useRoute } from 'vue-router'

const URL_TARGET = 'master/product'
const { setPageMeta } = useAppStore()
setPageMeta({
  title: 'Tambah Produk',
  breadcrumbs: ['Home', 'Produk', 'Tambah']
})

const route = useRoute()
const prodocuStore = useProduct()

// Dropdown Category
const categoryStore = useCategory()
const selectedCategory = ref<ISelect2Option | null>(null)
const { fetch: fetchCategory } = categoryStore
const { items: categoryItem } = storeToRefs(categoryStore)
const dropdownCategoryItem = computed(() => categoryItem.value.map((item) => ({ value: item.id, label: item.name })))
const searchCategory = async (q: string = '') => {
  await fetchCategory('master/category', q)
}
const onCategorySelected = (selected: any) => {
  selectedCategory.value = selected
}
// End Dropdown Category

// Dropdown Category
const storageStore = useStorage()
const selectedStorage = ref<ISelect2Option | null>(null)
const { fetch: fetchStorage } = storageStore
const { items: storageItem } = storeToRefs(storageStore)
const dropdownStorageItem = computed(() => storageItem.value.map((item) => ({ value: item.id, label: item.name })))
console.log(dropdownStorageItem)
const searchStorage = async (q: string = '') => {
  await fetchStorage('master/storage', q)
}
const onStorageSelected = (selected: any) => {
  selectedStorage.value = selected
}
// End Dropdown Category

interface IForm {
  sku: string
  name: string
  category_id: number | null
  storage_id: number | null
  price: number
  stock: number
}

const form = reactive<IForm>({
  sku: '',
  name: '',
  category_id: null,
  storage_id: null,
  price: 0,
  stock: 0
})

const paramId = route.params?.id

const initial = async () => {
  if (paramId) {
    setPageMeta({
      title: 'Ubah Produk',
      breadcrumbs: ['Home', 'Produk', 'Ubah']
    })

    const oldData = await prodocuStore.first<IForm>(URL_TARGET, route.params.id)
    if (oldData?.category) selectedCategory.value = { value: oldData.category.id, label: oldData.category.name }
    if (oldData?.storage) selectedStorage.value = { value: oldData.storage.id, label: oldData.storage.name }
    Object.assign(form, oldData)
  }

  searchCategory()
  searchStorage()
}

initial()

const submit = () => {
  form.category_id = (selectedCategory?.value?.value as number) ?? null
  form.storage_id = (selectedStorage?.value?.value as number) ?? null

  if (!form.storage_id || !form.category_id) {
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
            <InputField v-model="form.sku" label="SKU" type="text" placeholder="SKU" icon="fas fa-info" />
            <InputField v-model="form.name" label="Nama Produk" type="text" placeholder="Nama Produk" />
            <InputField v-model="form.price" label="Harga" type="number" placeholder="Harga" icon="fas fa-dollar-sign" />
            <InputField v-model="form.stock" label="Stok" type="number" placeholder="Stok" />
            <Select2 placeholder="Cari Kategori ...." :on-select="onCategorySelected" id="category" label="Kategori" :selected="selectedCategory" :options="dropdownCategoryItem" :search="searchCategory" />
            <Select2 placeholder="Cari Rak ...." :on-select="onStorageSelected" id="storage" label="Rak" :selected="selectedStorage" :options="dropdownStorageItem" :search="searchStorage" />
            <div class="form-group">
              <button @click="submit" class="btn btn-primary">Submit</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
