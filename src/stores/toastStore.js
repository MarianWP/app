import { reactive } from 'vue'
const state = reactive({
  visible: false,
  message: '',
  duration: 2500,
  timeoutId: null,
})

export function useToastStore() {
  const show = (message, duration = 2500) => {
    state.message = message
    state.duration = duration
    state.visible = true

    if (state.timeoutId) clearTimeout(state.timeoutId)

    state.timeoutId = setTimeout(() => {
      state.visible = false
      state.timeoutId = null
    }, duration)
  }

  const hide = () => {
    state.visible = false
    if (state.timeoutId) {
      clearTimeout(state.timeoutId)
      state.timeoutId = null
    }
  }

  return { state, show, hide }
}
