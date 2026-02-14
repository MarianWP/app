<script setup>
import BaseIcon from './BaseIcon.vue'
import { inject } from 'vue'
const haptic = inject('haptic')
</script>

<template>
  <nav class="nav">
    <div class="nav__wrapper">
      <RouterLink
        to="/"
        class="nav__item"
        exact-active-class="active"
        @pointerdown="haptic && haptic('light')"
      >
        <BaseIcon class="nav__item-icon" name="donate" size="24" />
        Донат
      </RouterLink>

      <RouterLink
        to="/tasks"
        class="nav__item"
        active-class="active"
        @pointerdown="haptic && haptic('light')"
      >
        <BaseIcon class="nav__item-icon" name="socials" size="24" />
        Соц.Мережі
      </RouterLink>
    </div>
    <div class="nav__wrapper">
      <RouterLink
        to="/game"
        class="nav__item sm"
        active-class="active"
        @pointerdown="haptic && haptic('light')"
      >
        <BaseIcon class="nav__item-icon" name="game" size="24" />
      </RouterLink>
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
  background: rgba(0, 0, 0, 0.2);
  backdrop-filter: blur(0.625rem);
  border-radius: 6.25rem;
  border: 0.0625rem solid rgba(255, 255, 255, 0.03);
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
  }
}
</style>
