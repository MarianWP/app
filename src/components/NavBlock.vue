<script setup>
import BaseIcon from './BaseIcon.vue'
import { inject } from 'vue'
import { useRoute, useRouter } from 'vue-router'

const haptic = inject('haptic')
const route = useRoute()
const router = useRouter()

const items = [
  { to: '/', icon: 'donate', label: 'Донат' },
  { to: '/tasks', icon: 'socials', label: 'Соц.Мережі' },
  { to: '/map', icon: 'map', label: 'Карта України' },
]

const MOVE_THRESHOLD = 10 // px — больше = считаем жестом/скроллом, не кликом

let startX = 0
let startY = 0
let moved = false
let canceled = false
let pointerNavigated = false

function isActive(to) {
  return route.path === to
}

function go(to) {
  if (route.path !== to) router.push(to)
}

function onPointerDown(e) {
  startX = e.clientX
  startY = e.clientY
  moved = false
  canceled = false
  if (haptic) haptic('medium')
}

function onPointerMove(e) {
  if (Math.abs(e.clientX - startX) > MOVE_THRESHOLD || Math.abs(e.clientY - startY) > MOVE_THRESHOLD) {
    moved = true
  }
}

function onPointerCancel() {
  canceled = true
}

function onPointerUp(to) {
  if (canceled || moved) return
  // навигируем сразу по pointerup, не дожидаясь click (который может быть подавлен)
  pointerNavigated = true
  go(to)
  // сбрасываем флаг, чтобы последующий keyboard/mouse click работал
  setTimeout(() => {
    pointerNavigated = false
  }, 0)
}

function onClick(to) {
  // fallback для клавиатуры/мыши, когда pointerup уже не навигировал
  if (pointerNavigated) return
  go(to)
}
</script>

<template>
  <nav class="nav">
    <div class="nav__wrapper">
      <button
        v-for="item in items"
        :key="item.to"
        type="button"
        class="nav__item"
        :class="{ active: isActive(item.to) }"
        @pointerdown="onPointerDown"
        @pointermove="onPointerMove"
        @pointercancel="onPointerCancel"
        @pointerup="onPointerUp(item.to)"
        @click="onClick(item.to)"
      >
        <BaseIcon class="nav__item-icon" :name="item.icon" size="24" />
        {{ item.label }}
      </button>
    </div>
  </nav>
</template>

<style scoped>
.nav {
  display: flex;
  justify-content: space-between;
  width: 95%;
  gap: 0.125rem;
  margin-left: auto;
  margin-right: auto;
  margin-bottom: var(--tg-safe-area-inset-bottom);
  position: fixed;
  left: 50%;
  transform: translateX(-50%);
  bottom: 1%;
}
.nav__wrapper {
  display: flex;
  background: rgba(255, 255, 255, 0.02);
  backdrop-filter: blur(0.625rem);
  border-radius: 6.25rem;
  border: 0.0625rem solid rgba(255, 255, 255, 0.05);
  padding: 0.25rem;
}
.sm {
  width: 3.375rem !important;
}
:deep(.base-icon) {
  flex-shrink: 0;
}
.nav__item {
  flex-grow: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.375rem;
  border-radius: 6.25rem;
  padding: 0 1.125rem;
  height: 3.375rem;
  font-weight: bold;
  color: var(--grey);
  font-size: clamp(0.875rem, 0.7rem + 0.25vw, 1rem);
  width: 100%;
  /* сброс стилей button + надёжный тап */
  background: transparent;
  border: none;
  font-family: inherit;
  cursor: pointer;
  touch-action: manipulation;
  -webkit-tap-highlight-color: transparent;
  -webkit-user-select: none;
  user-select: none;
  text-align: left;
}

:deep(.nav__item svg) {
  display: inline-block; /* важно для transform на svg */
  transform-origin: center;
  will-change: transform;
}

/* активная иконка остаётся чуть приподнятой */
:deep(.nav__item.active svg) {
  transform: scale(1.02);
}

/* анимация “поп” только в момент переключения */
:deep(.nav__item.active svg) {
  animation: tg-pop 200ms ease-in-out;
}

/* ключ: в 100% возвращаем в тот же transform, что в active */
@keyframes tg-pop {
  0% {
    transform: translateY(0) scale(1);
  }
  60% {
    transform: scale(1.13);
  }
  100% {
    transform: scale(1.09);
  }
}

@media (prefers-reduced-motion: reduce) {
  :deep(.base-icon) {
    animation: none;
  }
}
.nav__item.active {
  color: var(--accent);
  background: rgba(56, 225, 194, 0.1);
}
@media (max-width: 365px) {
  :deep(.nav__item) {
    gap: 0.125rem;
    flex-direction: column;
    flex-grow: 0;
    font-size: 0.75rem;
    text-align: center;
  }
}
</style>
