<script lang="ts" setup>
interface IInputField {
  placeholder?: string
  type: string
  icon: string
  modelValue: any
}

defineProps<IInputField>()
defineEmits(['update:modelValue'])
</script>

<template>
  <div class="input-group mb-3">
    <input :value="modelValue" @input="$emit('update:modelValue', ($event.target as any).value)" :type="type" class="form-control" :placeholder="placeholder" />
    <div v-if="icon" class="input-group-append">
      <div class="input-group-text">
        <span :class="icon"></span>
      </div>
    </div>
  </div>
</template>
