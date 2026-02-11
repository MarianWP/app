<script setup>
import { RouterView } from 'vue-router'
import { onMounted } from 'vue'
import InfoToast from '@/components/InfoToast.vue'
onMounted(async () => {
  if (window.Telegram?.WebApp) {
    const webApp = window.Telegram.WebApp


    webApp.ready()
    webApp.expand()
    webApp.disableVerticalSwipes()

    const isMobile =
      /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
        navigator.userAgent
      )

    if (isMobile) {
      webApp.requestFullscreen()
      webApp.setBottomBarColor('#242424')
    }
  } else {
    console.log('Telegram WebApp не найден (локальный запуск)')
  }
})
</script>

<template>
  <RouterView />
  <InfoToast />
</template>

<style scoped>

</style>
