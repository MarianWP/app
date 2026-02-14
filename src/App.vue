<script setup>
import { RouterView } from 'vue-router'
import { onMounted, provide } from 'vue'

let tg = null

onMounted(() => {
  if (window.Telegram?.WebApp) {
    tg = window.Telegram.WebApp

    tg.ready()
    tg.expand()
    tg.disableVerticalSwipes()

    const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
      navigator.userAgent
    )

    if (isMobile) {
      tg.requestFullscreen()
      tg.setBottomBarColor('#242424')
    }
  } else {
    console.log('Telegram WebApp не найден (локальный запуск)')
  }
})

/* --- HAPTIC FUNCTION --- */
const haptic = (type = 'light') => {
  if (tg?.HapticFeedback) {
    tg.HapticFeedback.impactOccurred(type)
  }
}

/* Робимо доступним у всіх компонентах */
provide('haptic', haptic)
</script>


<template>
  <RouterView />
</template>
