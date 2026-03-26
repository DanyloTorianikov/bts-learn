import { describe, it, expect } from 'vitest'
import { useQuiz } from '../useQuiz'

describe('useQuiz', () => {
  it('starts with mode selection state', () => {
    const quiz = useQuiz()
    expect(quiz.state.value).toBe('mode-select')
    expect(quiz.mode.value).toBeNull()
  })

  it('starts quiz with selected mode', () => {
    const quiz = useQuiz()
    quiz.startQuiz('photo')
    expect(quiz.state.value).toBe('playing')
    expect(quiz.mode.value).toBe('photo')
    expect(quiz.questions.value).toHaveLength(7)
    expect(quiz.currentIndex.value).toBe(0)
  })

  it('each question has 4 options with exactly 1 correct', () => {
    const quiz = useQuiz()
    quiz.startQuiz('photo')
    for (const q of quiz.questions.value) {
      expect(q.options).toHaveLength(4)
      const correctCount = q.options.filter(o => o.id === q.correctMember.id).length
      expect(correctCount).toBe(1)
    }
  })

  it('tracks score when answering correctly', () => {
    const quiz = useQuiz()
    quiz.startQuiz('photo')
    const correctId = quiz.currentQuestion.value!.correctMember.id
    quiz.answer(correctId)
    expect(quiz.results.value[0].correct).toBe(true)
    expect(quiz.score.value).toBe(1)
  })

  it('tracks score when answering incorrectly', () => {
    const quiz = useQuiz()
    quiz.startQuiz('photo')
    const wrongId = quiz.currentQuestion.value!.options.find(
      o => o.id !== quiz.currentQuestion.value!.correctMember.id
    )!.id
    quiz.answer(wrongId)
    expect(quiz.results.value[0].correct).toBe(false)
    expect(quiz.score.value).toBe(0)
  })

  it('advances to next question after answering', () => {
    const quiz = useQuiz()
    quiz.startQuiz('photo')
    const correctId = quiz.currentQuestion.value!.correctMember.id
    quiz.answer(correctId)
    expect(quiz.currentIndex.value).toBe(1)
  })

  it('shows results after all 7 questions', () => {
    const quiz = useQuiz()
    quiz.startQuiz('photo')
    for (let i = 0; i < 7; i++) {
      const correctId = quiz.currentQuestion.value!.correctMember.id
      quiz.answer(correctId)
    }
    expect(quiz.state.value).toBe('results')
    expect(quiz.results.value).toHaveLength(7)
    expect(quiz.score.value).toBe(7)
  })

  it('resets to mode selection', () => {
    const quiz = useQuiz()
    quiz.startQuiz('photo')
    quiz.reset()
    expect(quiz.state.value).toBe('mode-select')
    expect(quiz.mode.value).toBeNull()
    expect(quiz.results.value).toHaveLength(0)
  })

  it('restarts with same mode', () => {
    const quiz = useQuiz()
    quiz.startQuiz('voice')
    for (let i = 0; i < 7; i++) {
      quiz.answer(quiz.currentQuestion.value!.correctMember.id)
    }
    quiz.restart()
    expect(quiz.state.value).toBe('playing')
    expect(quiz.mode.value).toBe('voice')
    expect(quiz.currentIndex.value).toBe(0)
    expect(quiz.results.value).toHaveLength(0)
  })
})
