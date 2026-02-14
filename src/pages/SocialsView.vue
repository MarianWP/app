<script setup>
import NavBlock from '@/components/NavBlock.vue'
import HeaderBlock from '@/components/HeaderBlock.vue'
import MainCard from '@/components/MainCard.vue'
</script>

<template>
  <section class="container">
    <HeaderBlock>
      <div class="text-head">
        <div class="line">КЛІКАЙ,</div>
        <div class="line"><span>ПІДПИСУЙСЯ!</span></div>
      </div>
    </HeaderBlock>
    <div class="cards-list">
      <MainCard
        class="animate__animated animate__fadeInUp animate__delay-1s"
        href="https://www.youtube.com/@marik_str"
        title="Youtube"
        description="Підтримай автора - підпишись"
        backgroundVariant=""
      />
      <MainCard
        class="animate__animated animate__fadeInUp animate__delay-2s"
        href="https://www.twitch.tv/marik_str"
        title="Twitch"
        description="Підтримай автора - підпишись"
        backgroundVariant=""
      />
      <MainCard
        class="animate__animated animate__fadeInUp animate__delay-3s"
        href="https://t.me/MARiK_streams"
        title="Telegram"
        description="Підтримай автора - підпишись"
        backgroundVariant=""
      />
      <MainCard
        class="animate__animated animate__fadeInUp animate__delay-4s"
        href="https://www.tiktok.com/@marik.str"
        title="TikTok"
        description="Підтримай автора - підпишись"
        backgroundVariant=""
      />
    </div>
  </section>
  <NavBlock />
</template>

<style>
@media (min-width: 1024px) {
  .about {
    display: flex;
    align-items: center;
    justify-content: center;
  }
}
</style>
