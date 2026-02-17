<script setup>
import { computed, inject, ref } from 'vue'
import BaseIcon from '@/components/BaseIcon.vue'

const coinsRef = inject('coins', ref(0))
const displayCoins = computed(() => Number(coinsRef?.value ?? 0))
</script>

<template>
  <div class="balance-wrapper">
    <p>Монети</p>
    <div class="balance"><BaseIcon name="coins" size="24" /> {{ displayCoins }}</div>
  </div>
</template>
