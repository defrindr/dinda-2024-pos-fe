<script lang="ts" setup>
interface IInputField {
  placeholder?: string
  type?: string
  label: string
  icon?: string
  modelValue: any
}

defineProps<IInputField>()
defineEmits(['update:modelValue'])
</script>

<template>
  <div class="form-group">
    <label for="">{{ label }}</label>
    <div class="input-group">
      <textarea :value="modelValue" @input="$emit('update:modelValue', $event.target.value)" :type="type ?? 'text'" class="form-control" :placeholder="placeholder" />
      <div v-if="icon" class="input-group-append">
        <div class="input-group-text">
          <span :class="icon"></span>
        </div>
      </div>
    </div>
  </div>
</template>
