<script setup>
import NavBlock from '@/components/NavBlock.vue'
import HeaderBlock from '@/components/HeaderBlock.vue'
import MainCard from '@/components/MainCard.vue'
</script>

<template>
  <section class="container">
    <HeaderBlock>
      <div class="text-head">
        <div class="line">НОВА КАРТА УКРАЇНИ?</div>
        <div class="line"><span>UKRAINE REBORN</span></div>
      </div>
      <div class="release-badge-wrap animate__animated animate__fadeInUp animate__delay-1s">
        <div class="release-badge">
          <span class="release-badge__dot"></span>
          <span class="release-badge__text">Реліз 24 червня</span>
        </div>
      </div>
    </HeaderBlock>
    <div class="cards-list">
      <MainCard
        class="animate__animated animate__fadeInUp animate__delay-1s"
        href="https://ukrmap.me/release_time"
        title="Таймер релізу"
        description="Коли вийде у відкритий доступ"
        backgroundVariant="monodonat"
      />
      <MainCard
        class="animate__animated animate__fadeInUp animate__delay-1s"
        href="https://ukrmap.me/"
        title="Сайт карти"
        description="Вийде після релізу, зі всією інформацією з отримання карти"
        backgroundVariant="monodonat"
      />
    </div>
  </section>
  <NavBlock />
</template>

<style scoped>
.release-badge-wrap {
  display: inline-block;
  margin-top: 0.875rem;
}

.release-badge {
  position: relative;
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem 1rem;
  border-radius: 6.25rem;
  font-weight: 700;
  font-size: clamp(0.8125rem, 0.75rem + 0.4vw, 0.9375rem);
  letter-spacing: 0.02em;
  color: var(--white);
  background: linear-gradient(135deg, rgba(45, 148, 111, 0.18), rgba(27, 111, 190, 0.18));
  border: 0.0625rem solid rgba(56, 225, 194, 0.35);
  backdrop-filter: blur(0.625rem);
  overflow: hidden;
  isolation: isolate;
  animation: badge-glow 2.8s ease-in-out infinite;
}

/* анімований градієнтний перелив поверх бейджа */
.release-badge::before {
  content: '';
  position: absolute;
  inset: 0;
  z-index: -1;
  background: linear-gradient(
    115deg,
    transparent 0%,
    rgba(56, 225, 194, 0.45) 45%,
    rgba(64, 156, 245, 0.45) 55%,
    transparent 100%
  );
  background-size: 250% 100%;
  opacity: 0.75;
  animation: badge-shine 7.2s linear infinite;
}

.release-badge__text {
  position: relative;
  background: linear-gradient(90deg, #ffffff, #b9fff2, #ffffff);
  background-size: 200% 100%;
  -webkit-background-clip: text;
  background-clip: text;
  font-size: 1rem;
  -webkit-text-fill-color: transparent;
  animation: badge-text 3.2s linear infinite;
}

.release-badge__dot {
  width: 0.5rem;
  height: 0.5rem;
  border-radius: 50%;
  background: var(--accent);
  box-shadow: 0 0 0.5rem var(--accent);
  animation: badge-pulse 5.6s ease-in-out infinite;
}

@keyframes badge-glow {
  0%,
  100% {
    box-shadow: 0 0 0 0 rgba(56, 225, 194, 0), 0 0.5rem 1.25rem rgba(0, 0, 0, 0.35);
  }
  50% {
    box-shadow: 0 0 1.5rem 0.125rem rgba(56, 225, 194, 0.4), 0 0.5rem 1.25rem rgba(0, 0, 0, 0.35);
  }
}

@keyframes badge-shine {
  0% {
    background-position: 200% 0;
  }
  100% {
    background-position: -100% 0;
  }
}

@keyframes badge-text {
  0% {
    background-position: 200% 0;
  }
  100% {
    background-position: -100% 0;
  }
}

@keyframes badge-pulse {
  0%,
  100% {
    transform: scale(1);
    opacity: 1;
  }
  50% {
    transform: scale(1.35);
    opacity: 0.65;
  }
}

@media (min-width: 1024px) {
  .about {
    display: flex;
    align-items: center;
    justify-content: center;
  }
}
</style>
