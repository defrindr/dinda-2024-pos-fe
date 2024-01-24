<script lang="ts" setup>
interface IBoxInfo {
  title: string
  total?: number | null | string
  icon: string
  size?: string
  color?: string
}

const props = withDefaults(defineProps<IBoxInfo>(), {
  total: 0,
  size: 'col-lg-3 col-6',
  color: 'bg-info'
})
</script>

<template>
  <div :class="props.size">
    <div :class="'small-box ' + props.color">
      <div class="inner">
        <h3>{{ props.total }}</h3>

        <p>{{ props.title }}</p>
      </div>
      <div class="icon">
        <i :class="props.icon"></i>
      </div>
    </div>
  </div>
</template>
