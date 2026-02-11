<script setup>
import { computed } from 'vue'

const props = defineProps({
  variant: {
    type: String,
    default: 'secondary',
    validator: (v) => ['primary', 'secondary', 'danger', 'ghost'].includes(v),
  },
})

const classes = computed(() => [
  'main-button',
  props.variant, // добавит: primary | secondary | danger | ghost
])
</script>

<template>
  <button :class="classes">
    <slot />
  </button>
</template>

<style scoped>
.main-button {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  font-size: clamp(0.875rem, 0.7rem + 0.25vw, 1rem);
  border-radius: 0.75rem;
  padding: 0.9375rem 1rem;
  width: 100%;
  max-height: 3rem;
  color: var(--color-text);
  cursor: pointer;
  font-family: var(--font-sans);
  font-weight: 700;
  background: var(--btn-grey);
  user-select: none;
  white-space: nowrap;
}
.main-button:active{
  background: var(--accent);
}
.main-button.primary {
  background: var(--accent);
}
.main-button.secondary {
  background: var(--btn-grey);
}
.main-button.danger {
  background: red;
}
.main-button.ghost {
  background: transparent;
}
</style>
