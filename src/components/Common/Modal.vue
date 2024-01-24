<script setup lang="ts">
import { ref } from 'vue'

interface IModal {
  title?: string
  isOpen: boolean
  dismiss: any
}

const props = defineProps<IModal>()
</script>
<template>
  <div v-if="props.isOpen">
    <div class="modal fade show" :id="'modal'" style="display: block; overflow: auto">
      <div class="modal-dialog modal-lg">
        <div class="modal-content">
          <div class="modal-header">
            <h4 class="modal-title">{{ props.title }}</h4>
            <button @click="dismiss" type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            <slot />
          </div>
          <div class="modal-footer justify-content-between">
            <button @click="dismiss" type="button" class="btn btn-default mb-2 mr-2" data-dismiss="modal">Close</button>
            <slot name="footer" />
          </div>
        </div>
        <!-- /.modal-content -->
      </div>
      <!-- /.modal-dialog -->
    </div>
    <div class="modal-backdrop fade show"></div>
  </div>
</template>
