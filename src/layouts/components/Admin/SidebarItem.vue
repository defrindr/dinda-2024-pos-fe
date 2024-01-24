<template>
  <li class="nav-item">
    <router-link :to="to" class="nav-link">
      <i :class="'nav-icon ' + icon"></i>
      <p>
        {{ label }}
        <span v-if="badge" class="badge badge-info right">{{ badge }}</span>
      </p>
    </router-link>
  </li>
</template>

<script lang="ts" setup>
interface ISidebarItem {
  to: string
  label: string
  icon: string
  badge?: string | undefined
}

defineProps<ISidebarItem>()
</script>
