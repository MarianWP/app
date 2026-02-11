<script setup>
import HeaderBlock from '@/components/HeaderBlock.vue'
import MainCard from '@/components/MainCard.vue'
import NavBlock from '@/components/NavBlock.vue'
</script>

<template>
  <section class="container">
    <HeaderBlock>
      <div class="text-head">ПРИВІТ,<br /><span>КОЗАЧЕ!</span></div>
      <div class="text">Якщо ти вже тут, підтримай автора, дякую ❤️</div>
    </HeaderBlock>
    <MainCard />
    <div class="menu-wrapper"></div>
  </section>
  <NavBlock />
</template>
