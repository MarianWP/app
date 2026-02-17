<script setup>
import { inject, ref } from 'vue'

const coinsController = inject('coinsController', null)
const popups = ref([])
const ripples = ref([])
const isPressed = ref(false)

let popupId = 0
let rippleId = 0
let lastTriggerTs = 0

function addPopup(x, y) {
  const id = ++popupId
  popups.value.push({ id, x, y })
  setTimeout(() => {
    popups.value = popups.value.filter((item) => item.id !== id)
  }, 820)
}

function addRipple(x, y) {
  const id = ++rippleId
  ripples.value.push({ id, x, y })
  setTimeout(() => {
    ripples.value = ripples.value.filter((item) => item.id !== id)
  }, 450)
}

function handleClick(e) {
  const now = Date.now()
  if (now - lastTriggerTs < 120) return
  lastTriggerTs = now

  e?.preventDefault?.()
  coinsController?.addCoin?.()

  const rect = e?.currentTarget?.getBoundingClientRect?.()
  const clickX = Number(e?.clientX)
  const clickY = Number(e?.clientY)
  const x = rect && Number.isFinite(clickX) ? clickX - rect.left : 75
  const y = rect && Number.isFinite(clickY) ? clickY - rect.top : 75

  addPopup(x, y)
  addRipple(x, y)
  isPressed.value = true
  setTimeout(() => {
    isPressed.value = false
  }, 140)
}
</script>

<template>
  <button
    class="clicker clicker-fx"
    :class="{ 'is-pressed': isPressed }"
    @pointerdown.prevent="handleClick"
    @click.prevent="handleClick"
  >
    <span class="coin-emoji">💰</span>

    <transition-group name="plus-float">
      <span
        v-for="popup in popups"
        :key="popup.id"
        class="plus-one"
        :style="{ left: `${popup.x}px`, top: `${popup.y}px` }"
      >
        +1
      </span>
    </transition-group>

    <transition-group name="ripple">
      <span
        v-for="ripple in ripples"
        :key="ripple.id"
        class="ripple-burst"
        :style="{ left: `${ripple.x}px`, top: `${ripple.y}px` }"
      />
    </transition-group>
  </button>
</template>

<style scoped>
.clicker-fx {
  overflow: visible;
  box-shadow: 0 0 0 0 rgba(56, 225, 194, 0.4), 0 16px 30px rgba(0, 0, 0, 0.35);
  transition: transform 0.08s ease, box-shadow 0.2s ease, filter 0.2s ease;
  animation: idlePulse 2s ease-in-out infinite;
}

.clicker-fx.is-pressed {
  transform: translateX(-50%) scale(0.94);
  filter: brightness(1.1) saturate(1.2);
  box-shadow: 0 0 0 10px rgba(56, 225, 194, 0), 0 12px 26px rgba(0, 0, 0, 0.3);
}

.coin-emoji {
  font-size: 3rem;
  transform: translateY(-1px);
  user-select: none;
}

.plus-one {
  position: absolute;
  transform: translateX(-50%);
  pointer-events: none;
  font-size: 1.5rem;
  font-weight: 700;
  color: #ffffff;
  text-shadow: 0 2px 6px rgba(0, 0, 0, 0.35), 0 0 18px rgba(56, 225, 194, 0.65);
  animation: plusFloatUp 0.66s linear forwards;
}

.ripple-burst {
  position: absolute;
  width: 12px;
  height: 12px;
  border: 2px solid rgba(255, 255, 255, 0.9);
  border-radius: 999px;
  transform: translate(-50%, -50%);
  pointer-events: none;
}

.plus-float-enter-active,
.plus-float-leave-active {
  transition: none;
}

@keyframes plusFloatUp {
  0% {
    transform: translate(-50%, -58%) scale(0.78);
    opacity: 0;
  }
  70% {
    transform: translate(-50%, calc(-58% - 58px)) scale(1.15);
    opacity: 1;
  }
  100% {
    transform: translate(-50%, calc(-58% - 78px)) scale(1.12);
    opacity: 0;
  }
}

.ripple-enter-active {
  transition: transform 0.45s ease-out, opacity 0.45s ease-out;
}

.ripple-leave-active {
  transition: opacity 0.1s linear;
}

.ripple-enter-from {
  transform: translate(-50%, -50%) scale(0.2);
  opacity: 1;
}

.ripple-enter-to {
  transform: translate(-50%, -50%) scale(5.5);
  opacity: 0;
}

.ripple-leave-to {
  opacity: 0;
}

@keyframes idlePulse {
  0%,
  100% {
    box-shadow: 0 0 0 0 rgba(56, 225, 194, 0.28), 0 16px 30px rgba(0, 0, 0, 0.35);
  }
  50% {
    box-shadow: 0 0 0 18px rgba(56, 225, 194, 0), 0 20px 34px rgba(0, 0, 0, 0.38);
  }
}
</style>
