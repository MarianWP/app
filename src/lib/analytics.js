// Google Analytics 4 (GA4) — лёгкая обёртка.
// ID берётся из env (VITE_GA_ID). Если его нет — все вызовы no-op,
// поэтому локальная разработка и сборки без ключа не ломаются.

const GA_ID = import.meta.env.VITE_GA_ID
let enabled = false

export function initAnalytics() {
  if (!GA_ID || typeof window === 'undefined') return

  // подгружаем gtag.js
  const script = document.createElement('script')
  script.async = true
  script.src = `https://www.googletagmanager.com/gtag/js?id=${GA_ID}`
  document.head.appendChild(script)

  window.dataLayer = window.dataLayer || []
  function gtag() {
    window.dataLayer.push(arguments)
  }
  window.gtag = gtag

  gtag('js', new Date())
  // отключаем авто-page_view: это SPA, страницы шлём вручную при смене роута
  gtag('config', GA_ID, { send_page_view: false })

  enabled = true
}

export function trackPageView(path, title, name) {
  if (!enabled || !window.gtag) return
  window.gtag('event', 'page_view', {
    page_path: path,
    page_title: title || document.title,
    page_location: window.location.href,
    // человекочитаемое имя экрана: donate / socials / map
    ...(name ? { page_name: name } : {}),
  })
}

export function trackEvent(name, params = {}) {
  if (!enabled || !window.gtag) return
  window.gtag('event', name, params)
}
