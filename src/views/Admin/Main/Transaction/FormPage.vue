<script lang="ts" setup>
import InputField from '@/components/Common/InputFieldComponent.vue'
import Select2 from '@/components/Common/Select2Component.vue'
import type { IMasterProduct, ISelect2Option } from '@/interfaces'
import { useAppStore } from '@/stores/app'
import { usePelanggan } from '@/stores/pelanggan'
import { useProductStore } from '@/stores/product'
import moment from 'moment'
import { storeToRefs } from 'pinia'
import { computed, reactive, ref, watch } from 'vue'

const URL_TARGET = 'main/transaction'
const { setPageMeta } = useAppStore()
setPageMeta({
  title: 'Tambah Transaksi',
  breadcrumbs: ['Home', 'Transaksi', 'Tambah']
})

// Dropdown Category
const memberStore = usePelanggan()
const selectedMember = ref<ISelect2Option | null>(null)
const { fetch: fetchMember } = memberStore
const { items: memberItems } = storeToRefs(memberStore)
const dropdownItem = computed(() => memberItems.value.map((item) => ({ value: item.id, label: item.name })))
const searchMember = async (q: string = '') => {
  await fetchMember('master/pelanggan', q)
}
const onMemberSelect = (selected: any) => {
  selectedMember.value = selected
}
// End Dropdown Category

// Dropdown Category
const prodocuStore = useProductStore()
const { fetch: fetchProduct } = prodocuStore
const { items: productItems } = storeToRefs(prodocuStore)
const dropdownItemProduct = computed(() => productItems.value.map((item) => ({ value: item.id, label: item.name })))
const searchProduct = async (q: string = '') => {
  await fetchProduct('master/product', q)
}
// End Dropdown Category

interface IForm {
  customer_id?: number | null
  pay: number
  price: number
  total_price: number
  back: number
  items: IFormDetailRequest[]
}

interface IFormDetailRequest {
  product_id: number | null
  amount: number
}

interface IFormDetail {
  product_selected: ISelect2Option | null
  product_id: number | null
  product: IMasterProduct | null
  amount: number
  total_price: number
}

const form = reactive<IForm>({
  customer_id: null,
  price: 0,
  pay: 0,
  total_price: 0,
  back: 0,
  items: []
})

// change dibayarkan
watch(
  () => form.pay,
  () => {
    updateFormField()
  }
)

const purchaseProducts = ref<IFormDetail[]>([])

const onProductSelect = async (selected: any, index: number) => {
  purchaseProducts.value[index].product_selected = selected
  purchaseProducts.value[index].product = (await prodocuStore.first('master/product', selected.value)) ?? null
}

const submit = () => {
  form.customer_id = (selectedMember?.value?.value as number) ?? null

  if (!form.customer_id) {
    delete form.customer_id
  }

  form.items = []
  purchaseProducts.value.map((purchaseItem) => {
    form.items.push({
      product_id: (purchaseItem?.product_selected?.value as number) ?? null,
      amount: purchaseItem.amount
    })
  })

  if (confirm('Yakin ingin menjalankan aksi ini ?')) {
    prodocuStore.create<IForm>(URL_TARGET, form, '/admin/main/transaction')
  }
}

const updateFormField = () => {
  let totalPrice = 0
  purchaseProducts.value.map((item) => (totalPrice += item.total_price))

  form.price = totalPrice
  form.total_price = totalPrice

  const changeMoney = form.pay - form.total_price
  if (changeMoney > 0) {
    form.back = changeMoney
  } else {
    form.back = 0
  }
}

const dynamicFormAdd = () => {
  const lengthItem = purchaseProducts.value.length
  purchaseProducts.value.push({
    product_selected: null,
    product_id: null,
    product: null,
    amount: 0,
    total_price: 0
  })

  const wacherDynamicField = () => {
    let item = purchaseProducts.value[lengthItem] as IFormDetail

    if (!item) return
    // ubah price
    else if (!item.product?.price_sell || !item.amount) {
      item.total_price = 0
    } else if (item.product?.price_sell) {
      let price = parseInt(item?.product.price_sell ?? 0)
      item.total_price = item.amount * price
    }

    updateFormField()
  }

  watch(
    () => purchaseProducts.value[lengthItem]?.amount,
    () => {
      wacherDynamicField()
    }
  )

  watch(
    () => purchaseProducts.value[lengthItem]?.product,
    () => {
      wacherDynamicField()
    }
  )
}

const dynamicFormRemove = (id: number) => {
  if (purchaseProducts.value.length < 2) {
    alert('Setidaknya harus terdapat 1 bidang barang')
    return
  }

  purchaseProducts.value.splice(id, 1)
}

const initial = async () => {
  searchMember()
  searchProduct()
  dynamicFormAdd()
}

initial()
</script>
<template>
  <div class="row">
    <div class="col-md-12">
      <div class="card card-info">
        <div class="card-header">
          <router-link to="/admin/main/transaction"> <i class="fas fa-arrow-left"></i> Kembali </router-link>
        </div>
        <div class="card-body">
          <div class="form">
            <div class="row">
              <div class="col-md-3 mb-2">
                <InputField label="Kode Transaksi" placeholder="** Auto Generated **" :disabled="true" />
                <InputField label="Tanggal" type="date" :value="moment().format('YYYY-MM-DD')" :disabled="true" icon="fas fa-calendar" />
                <Select2 placeholder="Cari Member ...." :on-select="onMemberSelect" id="member" label="Member" :selected="selectedMember" :options="dropdownItem" :search="searchMember" />
              </div>
              <div class="col-md-9 mb-2">
                <div class="card">
                  <div class="card-body">
                    <div class="form">
                      <div class="table-responsive">
                        <table class="table">
                          <thead>
                            <tr>
                              <th>Produk</th>
                              <th>Harga</th>
                              <th>Jumlah</th>
                              <th>Sub Total</th>
                              <th>Aksi</th>
                            </tr>
                          </thead>
                          <tbody>
                            <tr :key="dynamicId" v-for="(detail, dynamicId) in purchaseProducts">
                              <td>
                                <Select2
                                  :selected="detail.product_selected"
                                  placeholder="Cari Produk ..."
                                  :on-select="(selectitem: any) => onProductSelect(selectitem, dynamicId)"
                                  :id="'product_' + dynamicId"
                                  :options="dropdownItemProduct"
                                  :search="searchProduct"
                                />
                              </td>
                              <td width="150px">
                                <InputField :value="detail.product?._price_sell" placeholder="0" :disabled="true" />
                              </td>
                              <td width="100px">
                                <InputField v-model="detail.amount" placeholder="0" />
                              </td>
                              <td width="150px">
                                <InputField v-model="detail.total_price" placeholder="0" :disabled="true" />
                              </td>
                              <td width="100px">
                                <button @click="dynamicFormAdd" class="btn btn-primary btn-sm mb-1 mr-1">
                                  <i class="fas fa-plus"></i>
                                </button>
                                <button @click="dynamicFormRemove(dynamicId)" class="btn btn-danger btn-sm mb-1 mr-1">
                                  <i class="fas fa-trash"></i>
                                </button>
                              </td>
                            </tr>
                          </tbody>
                        </table>
                      </div>

                      <div class="row">
                        <div class="col-md-12">
                          <InputField v-model="form.price" placeholder="0" label="Total Harga" type="number" :disabled="true" />
                        </div>
                        <div class="col-md-4">
                          <InputField v-model="form.total_price" placeholder="0" label="Total Akhir" type="number" :disabled="true" icon="fas fa-wallet" />
                        </div>
                        <div class="col-md-4">
                          <InputField v-model="form.pay" placeholder="0" label="Dibayarkan" type="number" icon="fas fa-dollar-sign" />
                        </div>
                        <div class="col-md-4">
                          <InputField v-model="form.back" placeholder="0" label="Kembalian" type="number" :disabled="true" icon="fas fa-dollar-sign" />
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
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
