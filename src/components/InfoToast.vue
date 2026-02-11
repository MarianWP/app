<script setup>
import { useToastStore } from '@/stores/toastStore'
import BaseIcon from '@/components/BaseIcon.vue'

const toast = useToastStore()
</script>

<template>
  <transition name="toast">
    <div v-if="toast.state.visible" class="info-toast" role="status" aria-live="polite">
      <div class="info-toast__icon">
        <BaseIcon name="checks" size="22" />
      </div>

      <div class="info-toast__text">
        {{ toast.state.message }}
      </div>
      <div
        class="info-toast__progress"
        :style="{ animationDuration: toast.state.duration + 'ms' }"
      ></div>
    </div>
  </transition>
</template>

<style scoped>
/* контейнер */
.info-toast {
  position: fixed;
  left: 0.75rem;
  right: 0.75rem;
  top: calc(3rem + var(--tg-safe-area-inset-top, 0px));
  z-index: 9999;

  display: flex;
  align-items: center;
  gap: 0.875rem;

  padding: 0.875rem 1rem;
  border-radius: 1.125rem;

  background: rgba(36, 54, 44, 1); /* временно */
  border: 0.0625rem solid rgba(34, 197, 94, 0.25);
  box-shadow: 0 0.625rem 1.875rem rgba(0,0,0,.35);
}

.info-toast__icon {
  width: 2.75rem;
  height: 2.75rem;
  border-radius: 0.875rem;
  display: grid;
  place-items: center;
  background: rgba(22, 163, 74, 1);
  color: #fff;
  flex: 0 0 auto;
}

.info-toast__text {
  font-weight: 700;
  line-height: 1.2;
}

/* анимация появления/скрытия */
.toast-enter-active,
.toast-leave-active {
  transition: transform 220ms ease, opacity 220ms ease;
}
.toast-enter-from,
.toast-leave-to {
  transform: translateY(-0.5rem);
  opacity: 0;
}
.info-toast__progress {
  position: absolute;
  left: 1.125rem;
  bottom: 0;
  height: 0.125rem;
  width:98%;
  background: #22c55e;

  transform-origin: left;
  animation: toast-progress linear forwards;
}

/* анимация “утекания времени” */
@keyframes toast-progress {
  from {
    transform: scaleX(1);
  }
  to {
    transform: scaleX(0);
  }
}
</style>
