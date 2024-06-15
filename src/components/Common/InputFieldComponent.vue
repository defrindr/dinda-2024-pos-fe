<script lang="ts" setup>
interface IInputField {
  placeholder?: string
  type?: string
  label?: string
  icon?: string
  modelValue?: any
  value?: any
  disabled?: boolean
  readonly?: boolean
  max?: number
  min?: number
}

const props = withDefaults(defineProps<IInputField>(), {
  disabled: false,
  type: 'text'
})
const emit = defineEmits(['update:modelValue'])

function emitModelValue(event: Event) {
  emit('update:modelValue', (event.target as any).value)
}
</script>

<template>
  <div class="form-group">
    <label v-if="props.label" for="">{{ props.label }}</label>
    <div class="input-group">
      <input :readonly="readonly" :disabled="props.disabled" :value="modelValue ?? props.value" @input="emitModelValue" :type="props.type" class="form-control" :placeholder="props.placeholder" :max="max" :min="min" />
      <div v-if="props.icon" class="input-group-append">
        <div class="input-group-text">
          <span :class="props.icon"></span>
        </div>
      </div>
    </div>
  </div>
</template>
