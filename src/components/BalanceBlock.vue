<script setup>
import BaseIcon from '@/components/BaseIcon.vue'
let coins = 5
</script>

<template>
  <div class="balance">
    <BaseIcon name="coins" size="24" />
    <span>{{ coins }}</span>
  </div>
</template>

<style scoped>
.balance {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-weight: 600;
  font-size: 18px;
  color: #fff;
}
</style>
