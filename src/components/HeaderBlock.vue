<script setup></script>

<template>
  <header class="header">
    <slot />
  </header>
</template>

<style scoped>
:deep(.header__title) {
  font-family: var(--font-family);
  font-weight: 700;
  font-size: 1.125rem;
  text-align: center;
  color: #fff;
}
</style>
