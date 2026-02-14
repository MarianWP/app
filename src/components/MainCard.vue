<script setup>
import BaseIcon from './BaseIcon.vue'
defineProps({
  href: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    default: 'Донат',
  },
  badge: {
    type: String,
    default: '',
  },
  description: {
    type: String,
    default: '',
  },
  minAmount: {
    type: String,
    default: '',
  },
  backgroundVariant: {
    type: String,
    default: 'monodonat',
  },
  image: {
    type: String,
    default: '',
  },
  external: {
    type: Boolean,
    default: true,
  },
})
</script>

<template>
  <a
    :href="href"
    :target="external ? '_blank' : '_self'"
    :rel="external ? 'noopener noreferrer' : null"
    class="main-element"
    :class="backgroundVariant"
  >
    <div class="element-top">
      <div class="element-title">{{ title }}</div>

      <div v-if="badge" class="element-info">
        {{ badge }}
      </div>
    </div>

    <div class="element-down">
      <div class="element-desc">
        {{ description }}
        <span v-if="minAmount"> — від {{ minAmount }}</span>
      </div>

      <div class="arrow">
        <BaseIcon class="nav__item-icon" name="arrowNext" size="24" />
      </div>
    </div>

    <div v-if="image" class="card-image" :style="{ backgroundImage: `url(${image})` }"></div>
  </a>
</template>

<style scoped>
.main-element {
  padding: 0.875rem;
  border-radius: 18px;
  background: linear-gradient(158deg, #1c1c1c 0%, #0c0c0c 100%);
  position: relative;
  text-decoration: none;
  display: block;
  overflow: hidden;
}

.monodonat {
  background: linear-gradient(158deg, #1c1c1c 0%, #0c0c0c 100%);
}

.donat {
  background: linear-gradient(158deg, #1c1c1c 0%, #0c0c0c 100%);
}

.element-top {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 1rem;
}

.element-title {
  color: white;
  font-size: 20px;
  line-height: 26px;
  width: 160px;
}

.element-info {
  font-size: 0.75rem;
  text-transform: uppercase;
  padding: 0.25rem 0.5rem;
  border-radius: 1.25rem;
  color: white;

  background: radial-gradient(173.66% 242.21% at 108.8% 1.52%, #38a081 0%, #5544c1 52.01%);

  background-size: 200% 200%;
  animation: gradientMove 8s ease infinite;
}

@keyframes gradientMove {
  0% {
    background-position: 0% 0%;
  }
  50% {
    background-position: 100% 100%;
  }
  100% {
    background-position: 0% 0%;
  }
}

.element-down {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.element-desc {
  color: white;
  font-size: 14px;
}

.arrow svg {
  width: 22px;
  height: 22px;
}

.card-image {
  position: absolute;
  right: 70px;
  bottom: 0;
  width: 80px;
  height: 80px;
  background-size: cover;
  background-repeat: no-repeat;
  opacity: 0.9;
}
</style>
