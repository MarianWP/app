import { reactive, computed } from 'vue'
import { TASKS_MOCK } from '@/mocks/tasks'

// приводим статусы к free | active | done
const normalizeStatus = (status) => {
  if (status === 'new') return 'free'
  if (status === 'accepted') return 'active'
  return status // free/active/done остаются как есть
}

// нормализуем мок сразу при загрузке
const state = reactive({
  tasks: TASKS_MOCK.map((t) => ({
    ...t,
    status: normalizeStatus(t.status),
  })),
})

export function useTasksStore() {
  // ========= базовые =========
  const tasks = computed(() => state.tasks)

  const getById = (id) => state.tasks.find((t) => t.id === Number(id))

  // ========= фильтры =========
  const freeTasks = computed(() => state.tasks.filter((t) => t.status === 'free'))
  const acceptedTasks = computed(() => state.tasks.filter((t) => t.status === 'active'))
  const doneTasks = computed(() => state.tasks.filter((t) => t.status === 'done'))

  // (на главной активные = принятые)
  const activeTasks = acceptedTasks

  const counts = computed(() => ({
    free: freeTasks.value.length,
    active: acceptedTasks.value.length,
    done: doneTasks.value.length,
  }))

  // ========= действия по заявке =========
  const setActive = (id) => {
    const task = getById(id)
    if (!task) return null

    task.status = 'active'

    // если у задачи есть steps, но не задан currentStepId — стартуем с первого шага
    if (Array.isArray(task.steps) && task.steps.length && !task.currentStepId) {
      task.currentStepId = task.steps[0].id
    }

    // если нет stepTimes — подготовим
    if (!task.stepTimes) task.stepTimes = {}

    return task
  }

  // ========= чек-лист =========
  const OPENABLE_STEP_IDS = new Set(['loadUp', 'inventory', 'confirm'])

  const getChecklistItems = (taskId) => {
    const task = getById(taskId)
    if (!task || !Array.isArray(task.steps) || !task.steps.length) return []

    const steps = task.steps

    // если currentStepId не задан — считаем что текущий первый
    const currentId = task.currentStepId ?? steps[0].id
    const times = task.stepTimes || {}

    const currentIndex = steps.findIndex((s) => s.id === currentId)
    const isLastCurrent = currentIndex === steps.length - 1

    return steps.map((s) => {
      const isDone = Boolean(times[s.id])
      const isCurrent = s.id === currentId
      const isOpenable = OPENABLE_STEP_IDS.has(s.id)

      // "Текущий шаг" показываем только если current и НЕ последний
      const subtitle = isCurrent && !isLastCurrent ? 'Текущий шаг' : ''

      return {
        id: s.id,
        title: s.title,
        subtitle,
        state: isDone ? 'done' : isCurrent ? 'current' : 'pending',
        time: times[s.id] || '',
        iconName: s.iconName || '',
        iconSize: s.iconSize ?? 24,

        // "Открыть" только для открываемых шагов и только если шаг текущий
        showAction: isOpenable && isCurrent,
        actionText: isOpenable && isCurrent ? 'Открыть' : '',
      }
    })
  }

  // текущий шаг в формате ChecklistItem (для ActiveTaskCard)
  const getCurrentStepItem = (taskId) => {
    const items = getChecklistItems(taskId)
    return items.find((i) => i.state === 'current') || null
  }

  // текущий step из массива steps (если нужен где-то как raw step)
  const getCurrentStep = (taskId) => {
    const task = getById(taskId)
    if (!task || !Array.isArray(task.steps) || !task.steps.length) return null
    const currentId = task.currentStepId ?? task.steps[0]?.id
    return task.steps.find((s) => s.id === currentId) ?? task.steps[0]
  }

  // завершить текущий шаг и переключиться на следующий
  const completeCurrentStep = (taskId) => {
    const task = getById(taskId)
    if (!task || !Array.isArray(task.steps) || !task.steps.length) return

    if (!task.currentStepId) task.currentStepId = task.steps[0].id

    const idx = task.steps.findIndex((s) => s.id === task.currentStepId)
    if (idx === -1) return

    const currentId = task.currentStepId

    // проставляем время выполнения
    if (!task.stepTimes) task.stepTimes = {}
    if (!task.stepTimes[currentId]) {
      const now = new Date()
      const hh = String(now.getHours()).padStart(2, '0')
      const mm = String(now.getMinutes()).padStart(2, '0')
      task.stepTimes[currentId] = `${hh}:${mm}`
    }

    // следующий шаг
    const next = task.steps[idx + 1]
    if (next) {
      task.currentStepId = next.id
    } else {
      // шагов больше нет — закрываем заявку
      task.status = 'done'
    }
  }

  return {
    // state access
    tasks,
    getById,

    // filters
    freeTasks,
    acceptedTasks,
    doneTasks,
    activeTasks,
    counts,

    // actions
    setActive,

    // checklist
    getChecklistItems,
    getCurrentStepItem,
    getCurrentStep,
    completeCurrentStep,
  }
}
