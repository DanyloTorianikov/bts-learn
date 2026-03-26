<script setup lang="ts">
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'
import { useQuiz } from '@/composables/useQuiz'
import QuizQuestion from '@/components/QuizQuestion.vue'
import type { QuizMode } from '@/types/member'

const { t } = useI18n()
const quiz = useQuiz()

const progressPercent = computed(() =>
  ((quiz.currentIndex.value + 1) / 7) * 100
)

const resultMessage = computed(() => {
  const s = quiz.score.value
  if (s >= 6) return t('quiz.great')
  if (s >= 4) return t('quiz.good')
  return t('quiz.keepLearning')
})

const modes: { key: QuizMode; icon: string }[] = [
  { key: 'photo', icon: '📷' },
  { key: 'name', icon: '✏️' },
  { key: 'voice', icon: '🎵' }
]
</script>

<template>
  <div class="quiz-page">
    <div v-if="quiz.state.value === 'mode-select'" class="mode-select">
      <h1 class="quiz-title">{{ t('quiz.chooseMode') }}</h1>
      <p class="quiz-subtitle">{{ t('quiz.subtitle') }}</p>
      <div class="mode-cards">
        <button
          v-for="m in modes"
          :key="m.key"
          class="mode-card"
          @click="quiz.startQuiz(m.key)"
        >
          <span class="mode-icon">{{ m.icon }}</span>
          <span class="mode-name">{{ t(`quiz.mode${m.key.charAt(0).toUpperCase() + m.key.slice(1)}`) }}</span>
          <span class="mode-desc">{{ t(`quiz.mode${m.key.charAt(0).toUpperCase() + m.key.slice(1)}Desc`) }}</span>
        </button>
      </div>
    </div>

    <div v-else-if="quiz.state.value === 'playing'" class="gameplay">
      <div class="quiz-header">
        <span class="quiz-progress-text">
          {{ t('quiz.question', { current: quiz.currentIndex.value + 1, total: 7 }) }}
        </span>
        <span class="quiz-score">
          {{ t('quiz.correct') }}: {{ quiz.score.value }}/{{ quiz.currentIndex.value }}
        </span>
      </div>
      <div class="progress-bar">
        <div class="progress-fill" :style="{ width: progressPercent + '%' }"></div>
      </div>

      <div class="question-label">
        <template v-if="quiz.mode.value === 'photo'">{{ t('quiz.whoIsPhoto') }}</template>
        <template v-else-if="quiz.mode.value === 'name'">{{ t('quiz.selectPhoto') }}</template>
        <template v-else>{{ t('quiz.whoseVoice') }}</template>
      </div>

      <QuizQuestion
        v-if="quiz.currentQuestion.value"
        :question="quiz.currentQuestion.value"
        :mode="quiz.mode.value!"
        @answer="quiz.answer"
      />
    </div>

    <div v-else class="results">
      <div class="results-emoji">🎉</div>
      <div class="results-score">{{ quiz.score.value }} / 7</div>
      <div class="results-message">{{ resultMessage }}</div>

      <div class="results-breakdown">
        <span
          v-for="result in quiz.results.value"
          :key="result.member.id"
          class="result-badge"
          :class="result.correct ? 'badge-correct' : 'badge-incorrect'"
        >
          {{ result.member.name.en }} {{ result.correct ? '✓' : '✗' }}
        </span>
      </div>

      <div class="results-actions">
        <button class="btn btn-primary" @click="quiz.restart()">
          {{ t('quiz.tryAgain') }}
        </button>
        <button class="btn btn-outline" @click="quiz.reset()">
          {{ t('quiz.differentMode') }}
        </button>
      </div>
    </div>
  </div>
</template>

<style scoped>
.quiz-page {
  max-width: 700px;
  margin: 0 auto;
  padding: 48px 24px;
}

.mode-select {
  text-align: center;
}

.quiz-title {
  font-size: 1.8em;
  font-weight: 700;
  color: var(--text-primary);
  margin-bottom: 8px;
}

.quiz-subtitle {
  color: var(--text-dim);
  margin-bottom: 32px;
}

.mode-cards {
  display: flex;
  gap: 16px;
  justify-content: center;
}

.mode-card {
  flex: 1;
  max-width: 200px;
  background: var(--bg-card);
  border: 2px solid var(--border-accent);
  border-radius: var(--radius-lg);
  padding: 28px 16px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
  transition: all var(--transition-normal);
}

.mode-card:hover {
  border-color: var(--accent-purple);
  transform: translateY(-4px);
  box-shadow: 0 8px 30px rgba(139, 92, 246, 0.2);
}

.mode-icon {
  font-size: 2.5em;
}

.mode-name {
  color: var(--text-primary);
  font-weight: 600;
}

.mode-desc {
  color: var(--text-dim);
  font-size: 0.8em;
}

.quiz-header {
  display: flex;
  justify-content: space-between;
  margin-bottom: 12px;
  font-size: 0.85em;
}

.quiz-progress-text {
  color: var(--text-dim);
}

.quiz-score {
  color: var(--accent-purple);
}

.progress-bar {
  height: 6px;
  background: var(--bg-card);
  border-radius: 3px;
  margin-bottom: 32px;
}

.progress-fill {
  height: 100%;
  background: linear-gradient(90deg, var(--accent-purple), var(--accent-purple-bright));
  border-radius: 3px;
  transition: width var(--transition-normal);
}

.question-label {
  text-align: center;
  font-size: 1.2em;
  color: var(--text-primary);
  margin-bottom: 24px;
}

.results {
  text-align: center;
}

.results-emoji {
  font-size: 3em;
  margin-bottom: 8px;
}

.results-score {
  font-size: 2.5em;
  font-weight: 700;
  color: var(--text-primary);
}

.results-message {
  color: var(--accent-purple);
  font-size: 1.1em;
  margin-bottom: 24px;
}

.results-breakdown {
  display: flex;
  gap: 8px;
  justify-content: center;
  flex-wrap: wrap;
  margin-bottom: 32px;
}

.result-badge {
  padding: 6px 14px;
  border-radius: var(--radius-xl);
  font-size: 0.85em;
}

.badge-correct {
  background: rgba(34, 197, 94, 0.15);
  color: var(--success);
}

.badge-incorrect {
  background: rgba(239, 68, 68, 0.15);
  color: var(--error);
}

.results-actions {
  display: flex;
  gap: 12px;
  justify-content: center;
}

.btn {
  padding: 12px 28px;
  border-radius: var(--radius-md);
  font-size: 1em;
  font-weight: 600;
  transition: all var(--transition-normal);
}

.btn-primary {
  background: linear-gradient(135deg, var(--accent-purple), var(--accent-purple-bright));
  color: var(--bg-primary);
}

.btn-primary:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 25px rgba(139, 92, 246, 0.3);
}

.btn-outline {
  border: 1px solid var(--border-accent);
  color: var(--accent-purple);
}

.btn-outline:hover {
  background: rgba(201, 160, 220, 0.1);
}
</style>
