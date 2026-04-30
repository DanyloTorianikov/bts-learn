import { ref, computed } from 'vue'
import type { QuizMode, QuizQuestion, QuizResult } from '@/types/member'
import { members } from '@/data/members'

function shuffle<T>(array: T[]): T[] {
  const arr = [...array]
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[arr[i], arr[j]] = [arr[j], arr[i]]
  }
  return arr
}

function pickRandom<T>(array: T[]): T {
  return array[Math.floor(Math.random() * array.length)]
}

function generateQuestions(): QuizQuestion[] {
  const shuffled = shuffle(members)
  return shuffled.map(member => {
    const others = shuffle(members.filter(m => m.id !== member.id)).slice(0, 3)
    const options = shuffle([member, ...others])
    const optionPhotos: Record<string, string> = {}
    for (const opt of options) {
      optionPhotos[opt.id] = pickRandom(opt.photos)
    }
    return {
      correctMember: member,
      options,
      correctPhoto: pickRandom(member.photos),
      optionPhotos
    }
  })
}

export function useQuiz() {
  const state = ref<'mode-select' | 'playing' | 'results'>('mode-select')
  const mode = ref<QuizMode | null>(null)
  const questions = ref<QuizQuestion[]>([])
  const currentIndex = ref(0)
  const results = ref<QuizResult[]>([])

  const currentQuestion = computed(() =>
    questions.value[currentIndex.value] ?? null
  )

  const score = computed(() =>
    results.value.filter(r => r.correct).length
  )

  function startQuiz(selectedMode: QuizMode) {
    mode.value = selectedMode
    questions.value = generateQuestions()
    currentIndex.value = 0
    results.value = []
    state.value = 'playing'
  }

  function answer(memberId: string) {
    const q = currentQuestion.value
    if (!q) return

    results.value.push({
      member: q.correctMember,
      correct: memberId === q.correctMember.id
    })

    if (currentIndex.value < 6) {
      currentIndex.value++
    } else {
      state.value = 'results'
    }
  }

  function reset() {
    state.value = 'mode-select'
    mode.value = null
    questions.value = []
    currentIndex.value = 0
    results.value = []
  }

  function restart() {
    if (mode.value) {
      startQuiz(mode.value)
    }
  }

  return {
    state,
    mode,
    questions,
    currentIndex,
    currentQuestion,
    results,
    score,
    startQuiz,
    answer,
    reset,
    restart
  }
}
