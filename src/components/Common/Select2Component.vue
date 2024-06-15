<script lang="ts" setup>
import type { ISelect2 } from '@/interfaces';
import { ref, watch } from 'vue';

const props = withDefaults(defineProps<ISelect2>(), {
  hasSearch: true
})

const isModalOpen = ref(false)
const searchField = ref('')
const searchElement = ref<HTMLInputElement | null>(null)

const openModal = () => {
  isModalOpen.value = true
  // console.log(searchElement.value)
}
const closeModal = () => (isModalOpen.value = false)
const clear = () => {
  props.onSelect(null)
}
const onSelectItem = (item: any) => {
  // console.log('item', item)
  props.onSelect(item)
  closeModal()
}

watch(isModalOpen, (newVal: boolean) => {
  if (newVal == true) {
    setTimeout(() => {
      if (searchElement.value) {
        searchElement.value.focus()
      }
    }, 100)
  }
})
</script>
<template>
  <div class="form-group">
    <label v-if="props.label" for="">{{ props.label }}</label>
    <div @click="openModal" type="text" class="form-control d-flex justify-content-between" style="align-items: center">
      <span style="overflow: hidden; height: 24px">
        {{ props.selected?.label ?? props.placeholder ?? '-- Pilih --' }}
      </span>
      <i :class="'fas fa-chevron-' + (isModalOpen ? 'up' : 'down')"></i>
    </div>

    <div v-if="isModalOpen" class="modal fade show" :id="'modal_select2_' + id" style="display: block">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h4 class="modal-title">{{ props.label }}</h4>
            <button @click="closeModal" type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            <div v-if="props.hasSearch" class="form-group mb-3 d-flex">
              <input ref="searchElement" v-model="searchField" type="text" class="form-control" placeholder="Cari ..." v-on:keyup.enter="props.search(searchField)" v-on:keyup.esc="closeModal" />
              <button @click="() => props.search(searchField)" class="btn btn-primary ml-2">
                <i class="fas fa-search"></i>
              </button>
            </div>
            <div style="max-height: 50vh; overflow-y: auto" class="table-responsive">
              <table class="table table-hover table-striped">
                <tbody>
                  <tr v-for="option in options" :key="option.value">
                    <td :colspan="option.value === props.selected?.value ? 2 : 1" :class="option.value === props.selected?.value && 'bg-primary text-white'">{{ option.label }}</td>
                    <td v-if="option.value !== props.selected?.value" width="50px">
                      <button @click="() => onSelectItem(option)" class="btn btn-success">
                        <i class="fas fa-check"></i>
                      </button>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
          <div class="modal-footer justify-content-between">
            <button @click="closeModal" type="button" class="btn btn-default mb-2 mr-2" data-dismiss="modal">Close</button>
            <button @click="clear" type="button" class="btn btn-danger mb-2 mr-2" data-dismiss="modal">Bersihkan</button>
          </div>
        </div>
        <!-- /.modal-content -->
      </div>
      <!-- /.modal-dialog -->
    </div>
    <div v-if="isModalOpen" class="modal-backdrop fade show"></div>
  </div>
</template>
