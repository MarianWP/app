<script setup>
import { RouterView } from 'vue-router'
import { ref, onMounted, onBeforeUnmount, provide } from 'vue'
import { useCoins } from '@/composables/useCoins'

const userId = ref(null)
const userDisplayName = ref('')
let tg = null
provide('userId', userId)
provide('userDisplayName', userDisplayName)

const coins = ref(0)
provide('coins', coins)

const coinsController = useCoins(userId, coins, userDisplayName)
provide('coinsController', coinsController)

let waitForUserInterval = null
const devUserId = import.meta.env.VITE_DEV_USER_ID || 'dev-local-user'

function buildDisplayName(tgUser) {
  const firstName = String(tgUser?.first_name || '').trim()
  const lastName = String(tgUser?.last_name || '').trim()
  const fullName = `${firstName} ${lastName}`.trim()
  if (fullName) return fullName

  const username = String(tgUser?.username || '').trim()
  if (username) return `@${username}`

  if (tgUser?.id) return `User ${tgUser.id}`
  return 'Unknown user'
}

async function setUserAndLoad(id, label, displayName = '') {
  userId.value = String(id)
  userDisplayName.value = String(displayName || '').trim()
  console.log(`${label}:`, userId.value)
  await coinsController.loadCoins()
}

onMounted(async () => {
  if (!window.Telegram?.WebApp) {
    console.log('Telegram WebApp not found (local launch)')
    await setUserAndLoad(devUserId, 'DEV USER ID', 'Developer')
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

  const immediateTgUserId = tg.initDataUnsafe?.user?.id
  const hasInitData = Boolean(tg.initData)
  if (!immediateTgUserId && !hasInitData) {
    console.warn('Telegram initData is empty, using fallback user id')
    await setUserAndLoad(devUserId, 'FALLBACK USER ID', 'Developer')
    return
  }

  let attempts = 0
  const maxAttempts = 40 // 2s

  waitForUserInterval = setInterval(async () => {
    attempts += 1
    const tgUser = tg.initDataUnsafe?.user

    if (tgUser?.id) {
      clearInterval(waitForUserInterval)
      waitForUserInterval = null
      await setUserAndLoad(tgUser.id, 'USER ID', buildDisplayName(tgUser))
      return
    }

    if (attempts >= maxAttempts) {
      clearInterval(waitForUserInterval)
      waitForUserInterval = null

      console.warn('Telegram user id not received, using fallback user id')
      await setUserAndLoad(devUserId, 'FALLBACK USER ID', 'Developer')
    }
  }, 50)
})

onBeforeUnmount(() => {
  if (waitForUserInterval) {
    clearInterval(waitForUserInterval)
    waitForUserInterval = null
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
