<script setup>
import BaseIcon from './BaseIcon.vue'
</script>

<template>
  <nav class="nav">
    <RouterLink to="/" class="nav__item" exact-active-class="active">
      <BaseIcon class="nav__item-icon" name="donate" size="24" />
      Донат
    </RouterLink>

    <RouterLink to="/tasks" class="nav__item" active-class="active">
      <BaseIcon class="nav__item-icon" name="socials" size="24" />
      Соц.Мережі
    </RouterLink>

    <!-- <RouterLink to="/menu" class="nav__item" active-class="active">
      <BaseIcon class="nav__item-icon" name="menu" size="24" />
      Меню
    </RouterLink> -->
  </nav>
</template>

<style scoped>
.nav {
  display: flex;
  justify-content: space-between;
  width: 90%;
  gap: 0.125rem;
  border-radius: 6.25rem;
  padding: 0.25rem;
  margin-left: auto;
  margin-right: auto;
  margin-bottom: var(--tg-safe-area-inset-bottom);
  position: relative;
  background: var(--background-elements-darker);
  backdrop-filter: blur(5px);
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
    transform: scale(1.12);
  }
  100% {
    transform: scale(1.08);
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
