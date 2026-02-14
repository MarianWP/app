<script setup>
import HeaderBlock from '@/components/HeaderBlock.vue'
import MainCard from '@/components/MainCard.vue'
import NavBlock from '@/components/NavBlock.vue'
</script>

<template>
  <section class="container">
    <HeaderBlock>
      <div class="text-head">
        <div class="line">ПРИВІТ,</div>
        <div class="line"><span>КОЗАЧЕ!</span></div>
        <div class="text line">Якщо ти вже тут, підтримай автора, дякую ❤️</div>
      </div>
    </HeaderBlock>
    <div class="cards-list">
    <MainCard
      class="animate__animated animate__fadeInUp animate__delay-1s"
      href="https://send.monobank.ua/jar/8Kun5xwrMJ"
      title="Донат | Monobank"
      badge="озвучка на стрімі"
      description="Підтримати стрім"
      minAmount="10 грн"
      backgroundVariant="monodonat"
      image="/img/kit.png"
    />
    <MainCard
      class="animate__animated animate__fadeInUp animate__delay-2s"
      href="https://donatello.to/MARiK"
      title="Донат | Donatello"
      badge="озвучка на стрімі"
      description="Підтримати стрім"
      minAmount="10 грн"
      backgroundVariant="donat"
    />
    </div>
    <div class="menu-wrapper"></div>
  </section>
  <NavBlock />
</template>
