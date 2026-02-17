<script setup>
import { computed, inject, ref } from 'vue'
import HeaderBlock from '@/components/HeaderBlock.vue'
import NavBlock from '@/components/NavBlock.vue'
import Balance from '@/components/BalanceBlock.vue'
import Clicker from '@/components/ClickerBlock.vue'
import { supabase } from '@/api/supabase'
import BaseIcon from '@/components/BaseIcon.vue'

const userId = inject('userId', ref(null))

const isLeaderboardOpen = ref(false)
const isLeaderboardLoading = ref(false)
const leaderboardError = ref('')
const leaderboard = ref([])

const currentUserId = computed(() => String(userId.value || ''))

function normalizeCoins(value) {
  const parsed = Number(value)
  return Number.isFinite(parsed) ? parsed : 0
}

function maskTelegramId(id) {
  const text = String(id || '')
  if (!text) return 'Невідомий'
  if (text.length <= 6) return text
  return `${text.slice(0, 3)}...${text.slice(-3)}`
}

function resolvePlayerLabel(row) {
  const displayName = String(row?.display_name || '').trim()
  if (displayName) return displayName
  return maskTelegramId(row?.telegram_id)
}

async function loadLeaderboard() {
  isLeaderboardLoading.value = true
  leaderboardError.value = ''

  try {
    const { data, error } = await supabase
      .from('coins')
      .select('telegram_id, display_name, coins')
      .order('coins', { ascending: false })
      .limit(20)

    if (error) {
      leaderboardError.value = 'Не вдалося завантажити лідерборд'
      return
    }

    leaderboard.value = (data || []).map((row, index) => ({
      rank: index + 1,
      telegramId: String(row.telegram_id || ''),
      coins: normalizeCoins(row.coins),
      isCurrentUser: String(row.telegram_id || '') === currentUserId.value,
      label: resolvePlayerLabel(row),
    }))
  } finally {
    isLeaderboardLoading.value = false
  }
}

async function openLeaderboard() {
  isLeaderboardOpen.value = true
  await loadLeaderboard()
}

function closeLeaderboard() {
  isLeaderboardOpen.value = false
}
</script>

<template>
  <section class="container">
    <HeaderBlock>
      <div class="text-head">
        <div class="line">КЛІКАЙ,</div>
        <div class="line"><span>ЗБИРАЙ</span></div>
        <div class="text line">монети, обмінюй на подарунки 🪙</div>
      </div>

      <div class="coin-wrapper">
        <div class="coin">
          <Balance />
        </div>
      </div>
    </HeaderBlock>
    <div class="leaderboard-block">
      <div class="leaderboard-wrapper">
        <button class="leaderboard-btn" type="button" @click="openLeaderboard">
          <BaseIcon name="rating" size="24" />
        </button>
      </div>
    </div>
    <Clicker />

    <transition name="fade">
      <div v-if="isLeaderboardOpen" class="leaderboard-modal" @click.self="closeLeaderboard">
        <div class="leaderboard-card">
          <div class="leaderboard-header">
            <h3>Топ по монетах</h3>
            <button class="close-btn" type="button" @click="closeLeaderboard">✕</button>
          </div>

          <p v-if="isLeaderboardLoading" class="leaderboard-state">Завантаження...</p>
          <p v-else-if="leaderboardError" class="leaderboard-state error">{{ leaderboardError }}</p>
          <p v-else-if="!leaderboard.length" class="leaderboard-state">Поки що немає даних</p>

          <ul v-else class="leaderboard-list">
            <li
              v-for="player in leaderboard"
              :key="player.telegramId"
              class="leaderboard-item"
              :class="{ current: player.isCurrentUser }"
            >
              <span class="rank">#{{ player.rank }}</span>
              <span class="name">{{ player.label }}</span>
              <span class="coins">{{ player.coins }}</span>
            </li>
          </ul>
        </div>
      </div>
    </transition>
  </section>

  <NavBlock />
</template>

<style scoped>
.leaderboard-block {
  display: flex;
  justify-content: end;
  width: 95%;
  position: absolute;
  bottom: calc(4rem + 2%);
  right: 50%;
  transform: translateX(50%);
}
.leaderboard-wrapper {
  display: flex;
  background: rgba(0, 0, 0, 0.2);
  backdrop-filter: blur(0.625rem);
  border-radius: 6.25rem;
  border: 0.0625rem solid rgba(255, 255, 255, 0.05);
  padding: 0.25rem;
  width: fit-content;
}
.leaderboard-btn {
  flex-grow: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.375rem;
  width: 3.375rem !important;
  border-radius: 6.25rem;
  height: 3.375rem;
  font-weight: bold;
  color: var(--white);
  font-size: clamp(0.875rem, 0.7rem + 0.25vw, 1rem);
  background: linear-gradient(135deg, #2d946f, #1b6fbe);
}
.leaderboard-modal {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.65);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 1rem;
  z-index: 20;
}

.leaderboard-card {
  width: min(480px, 100%);
  max-height: 80dvh;
  background: #101010;
  border: 1px solid rgba(255, 255, 255, 0.14);
  border-radius: 16px;
  padding: 1rem;
  display: flex;
  flex-direction: column;
}

.leaderboard-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 0.75rem;
}

.leaderboard-header h3 {
  font-size: 1.1rem;
  color: #fff;
}

.close-btn {
  color: rgba(255, 255, 255, 0.8);
  font-size: 1rem;
  width: 32px;
  height: 32px;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.08);
}

.leaderboard-state {
  color: rgba(255, 255, 255, 0.8);
  font-size: 0.95rem;
  padding: 1rem 0;
}

.leaderboard-state.error {
  color: #ff7d7d;
}

.leaderboard-list {
  list-style: none;
  margin: 0;
  padding: 0;
  overflow-y: auto;
}

.leaderboard-item {
  display: grid;
  grid-template-columns: 56px 1fr auto;
  align-items: center;
  gap: 0.75rem;
  padding: 0.65rem 0.75rem;
  border-radius: 10px;
  color: #fff;
  background: rgba(255, 255, 255, 0.04);
}

.leaderboard-item + .leaderboard-item {
  margin-top: 0.4rem;
}

.leaderboard-item.current {
  background: rgba(56, 225, 194, 0.2);
  border: 1px solid rgba(56, 225, 194, 0.45);
}

.rank {
  font-weight: 700;
  color: rgba(255, 255, 255, 0.82);
}

.name {
  color: #fff;
  font-weight: 600;
}

.coins {
  font-weight: 700;
  color: #43e8bf;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.2s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
