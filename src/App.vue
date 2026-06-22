<script setup>
import { RouterView } from 'vue-router'
import { onMounted, provide } from 'vue'

let tg = null

onMounted(() => {
  if (!window.Telegram?.WebApp) {
    console.log('Telegram WebApp not found (local launch)')
    return
  }

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
})

const haptic = (type = 'medium') => {
  if (tg?.HapticFeedback) tg.HapticFeedback.impactOccurred(type)
}

provide('haptic', haptic)
</script>

<template>
  <RouterView />
</template>
