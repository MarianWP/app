import './assets/main.css'

import { createApp } from 'vue'
import App from './App.vue'
import router from './router'

async function ensureFreshBuild() {
  const currentBuildId = String(__APP_BUILD_ID__)
  const url = new URL(window.location.href)
  const currentUrlBuildId = url.searchParams.get('v')

  if (currentUrlBuildId !== currentBuildId) {
    url.searchParams.set('v', currentBuildId)
    window.location.replace(url.toString())
    return false
  }

  try {
    const versionUrl = `${import.meta.env.BASE_URL}version.json?ts=${Date.now()}`
    const response = await fetch(versionUrl, { cache: 'no-store' })
    if (!response.ok) return true

    const remote = await response.json()
    const remoteBuildId = String(remote?.buildId || '')

    if (remoteBuildId && remoteBuildId !== currentBuildId) {
      url.searchParams.set('v', remoteBuildId)
      window.location.replace(url.toString())
      return false
    }
  } catch {
    // Ignore network/cache probe errors and continue boot.
  }

  return true
}

async function bootstrap() {
  const canStart = await ensureFreshBuild()
  if (!canStart) return

  const app = createApp(App)
  app.use(router)
  app.mount('#app')
}

bootstrap()
