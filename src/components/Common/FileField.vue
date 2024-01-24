<script lang="ts" setup>
interface IFileField {
  placeholder?: string
  label?: string
  icon?: string
  modelValue?: any
  value?: any
  disabled?: boolean
  accept?: string
}

const props = withDefaults(defineProps<IFileField>(), {
  disabled: false,
  type: 'text'
})
const emit = defineEmits(['update:modelValue'])

function onFileChanged($event: Event) {
  const target = $event.target as HTMLInputElement
  if (target && target.files) {
    let file = target.files[0]
    emit('update:modelValue', file)
  }
}
</script>

<template>
  <div class="form-group">
    <label v-if="props.label" for="">{{ props.label }}</label>
    <div class="input-group">
      <input :disabled="props.disabled" :accept="accept" @change="onFileChanged($event)" type="file" class="form-control" :placeholder="props.placeholder" />
      <div v-if="props.icon" class="input-group-append">
        <div class="input-group-text">
          <span :class="props.icon"></span>
        </div>
      </div>
    </div>
  </div>
</template>
