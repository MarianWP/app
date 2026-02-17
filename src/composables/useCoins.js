import { supabase } from '@/api/supabase'

/**
 * Coins via Supabase RPC.
 * Uses strict parameter names that match SQL functions:
 * get_coins(p_telegram_id text), add_coin(p_user_id text)
 */
export function useCoins(userIdRef, coinsRef, displayNameRef = null) {
  const coins = coinsRef
  let lastClick = 0
  let pendingClicks = 0
  let isSyncing = false
  let lastSyncedUserId = ''
  let lastSyncedDisplayName = ''
  const minClickIntervalMs = 20
  const devUserId = import.meta.env.VITE_DEV_USER_ID || 'dev-local-user'
  const isDevMode = !!import.meta.env.DEV

  const resolveUserId = () => {
    if (userIdRef.value) return String(userIdRef.value)
    if (isDevMode) return String(devUserId)
    return null
  }

  const resolveDisplayName = () => {
    const raw = String(displayNameRef?.value || '').trim()
    if (raw) return raw
    if (isDevMode) return 'Developer'
    return ''
  }

  const toBalanceNumber = (value) => {
    if (typeof value === 'number' && Number.isFinite(value)) return value

    if (typeof value === 'string' && value.trim() !== '') {
      const parsed = Number(value)
      if (Number.isFinite(parsed)) return parsed
    }

    if (Array.isArray(value) && value.length > 0) {
      return toBalanceNumber(value[0])
    }

    if (value && typeof value === 'object') {
      if ('coins' in value) return toBalanceNumber(value.coins)
      if ('get_coins' in value) return toBalanceNumber(value.get_coins)
      if ('add_coin' in value) return toBalanceNumber(value.add_coin)
    }

    return null
  }

  async function syncProfile(force = false) {
    const userId = resolveUserId()
    const displayName = resolveDisplayName()
    if (!userId || !displayName) return

    if (!force && userId === lastSyncedUserId && displayName === lastSyncedDisplayName) return

    const { error } = await supabase.from('coins').upsert(
      {
        telegram_id: userId,
        display_name: displayName,
      },
      { onConflict: 'telegram_id' }
    )

    if (error) {
      console.error('[Coins] profile sync error:', {
        code: error.code,
        message: error.message,
        details: error.details,
        hint: error.hint,
      })
      return
    }

    lastSyncedUserId = userId
    lastSyncedDisplayName = displayName
  }

  async function loadCoins() {
    const userId = resolveUserId()
    if (!userId) return

    await syncProfile()

    const { data, error } = await supabase.rpc('get_coins', {
      p_telegram_id: userId,
    })

    if (error) {
      console.error('[Coins] RPC get_coins error:', {
        code: error.code,
        message: error.message,
        details: error.details,
        hint: error.hint,
      })
      return
    }

    const balance = toBalanceNumber(data)
    coins.value = balance ?? 0
  }

  async function addCoin() {
    const userId = resolveUserId()
    if (!userId) return
    if (Date.now() - lastClick < minClickIntervalMs) return
    lastClick = Date.now()

    coins.value += 1
    pendingClicks += 1

    if (isSyncing) return
    isSyncing = true

    try {
      while (pendingClicks > 0) {
        pendingClicks -= 1

        const { data, error } = await supabase.rpc('add_coin', {
          p_user_id: userId,
        })

        if (error) {
          console.error('[Coins] RPC add_coin error:', {
            code: error.code,
            message: error.message,
            details: error.details,
            hint: error.hint,
          })
          // rollback one optimistic click on failure and resync from server
          coins.value = Math.max(0, coins.value - 1)
          pendingClicks = 0
          await loadCoins()
          break
        }

        const newBalance = toBalanceNumber(data)
        if (typeof newBalance === 'number' && newBalance >= 0) {
          coins.value = newBalance
        }
      }
    } finally {
      isSyncing = false
    }
  }

  return { coins, loadCoins, addCoin }
}
