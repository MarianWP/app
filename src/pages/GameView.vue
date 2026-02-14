<script setup>
import NavBlock from '@/components/NavBlock.vue'
import HeaderBlock from '@/components/HeaderBlock.vue'
import Balance from '@/components/BalanceBlock.vue'
// import Clicker from '@/components/ClickerBlock.vue'

// Telegram userId вже передається через App.vue → provide('userId')
// Тому сюди нічого додатково не потрібно
</script>

<template>
  <section class="container">
    <HeaderBlock>
      <div class="text-head">
        <div class="line">КЛІКАЙ,</div>
        <div class="line"><span>ЗБИРАЙ</span></div>
        <div class="text line">монети, обмінюй на подарунки 🪙</div>
      </div>

      <div class="coin-wrapper animate__animated animate__fadeIn animate__delay-1s">
        Монети
        <div class="coin">
          <Balance />
        </div>
      </div>
    </HeaderBlock>

    <Clicker />
    <div style="margin: auto; color: tomato; text-align: center">
      <p class="animate__animated animate__pulse animate__infinite">ЗНАХОДИТЬСЯ В РОЗРОБЦІ!</p>
      <p style="color: darkgrey; margin-top: 0.25rem">
        Для пришвидшення розробки,<br />
        можна підтримати автора донатом 🪙
      </p>
    </div>
  </section>
  <NavBlock />
</template>
