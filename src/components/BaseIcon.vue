<script setup>
  import sprite from '@/assets/icons/sprite.svg?raw'
defineProps({
  name: { type: String, required: true }, // "truck", "check"
  size: { type: [Number, String], default: 20 },
  color: { type: String, default: 'currentColor' }
})
</script>

<template>
  <div v-html="sprite" style="display:none"></div>
  <svg
    class="base-icon"
    :class="`icon-${name}`"
    :width="size"
    :height="size"
    :style="{ color }"
    aria-hidden="true"
  >
    <use :href="`#icon-${name}`" />
  </svg>
</template>

<style scoped>
.base-icon {
  display: inline-block;
  vertical-align: middle;
  fill: currentColor;
}
</style>
