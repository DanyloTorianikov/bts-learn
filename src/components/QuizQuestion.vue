<script setup lang="ts">
import { ref, watch, onBeforeUnmount } from 'vue'
import type { QuizQuestion, QuizMode } from '@/types/member'

const props = defineProps<{
  question: QuizQuestion
  mode: QuizMode
}>()

const base = import.meta.env.BASE_URL

const emit = defineEmits<{
  answer: [memberId: string]
}>()

const selectedId = ref<string | null>(null)
const showFeedback = ref(false)

// Quiz audio player state
const quizAudio = ref<HTMLAudioElement | null>(null)
const isPlaying = ref(false)
const currentTime = ref(0)
const duration = ref(0)

function toggleQuizAudio() {
  if (!quizAudio.value) return
  if (isPlaying.value) {
    quizAudio.value.pause()
  } else {
    quizAudio.value.play()
  }
}

function seekQuizAudio(event: MouseEvent) {
  if (!quizAudio.value) return
  const bar = event.currentTarget as HTMLElement
  const rect = bar.getBoundingClientRect()
  const ratio = Math.max(0, Math.min(1, (event.clientX - rect.left) / rect.width))
  quizAudio.value.currentTime = ratio * duration.value
}

function formatTime(seconds: number): string {
  if (!seconds || !isFinite(seconds)) return '0:00'
  const m = Math.floor(seconds / 60)
  const s = Math.floor(seconds % 60)
  return `${m}:${s.toString().padStart(2, '0')}`
}

watch(() => props.question, () => {
  selectedId.value = null
  showFeedback.value = false
  isPlaying.value = false
  currentTime.value = 0
  duration.value = 0
  if (quizAudio.value) {
    quizAudio.value.pause()
    quizAudio.value.currentTime = 0
  }
})

onBeforeUnmount(() => {
  if (quizAudio.value) {
    quizAudio.value.pause()
  }
})

function selectAnswer(memberId: string) {
  if (showFeedback.value) return
  selectedId.value = memberId
  showFeedback.value = true
  if (quizAudio.value) quizAudio.value.pause()
  setTimeout(() => {
    emit('answer', memberId)
  }, 1200)
}

function optionClass(memberId: string): string {
  if (!showFeedback.value) return ''
  if (memberId === props.question.correctMember.id) return 'correct'
  if (memberId === selectedId.value) return 'incorrect'
  return ''
}
</script>

<template>
  <div class="quiz-question">
    <!-- Photo mode: show photo, guess name -->
    <div v-if="mode === 'photo'" class="question-content">
      <div class="question-photo">
        <img
          :src="`${base}images/members/${question.correctMember.id}/${question.correctMember.photos[0]}`"
          :alt="'?'"
        />
      </div>
      <div class="options-grid">
        <button
          v-for="option in question.options"
          :key="option.id"
          class="option-btn"
          :class="optionClass(option.id)"
          @click="selectAnswer(option.id)"
        >
          {{ option.name.en }}
        </button>
      </div>
    </div>

    <!-- Name mode: show name, guess photo -->
    <div v-else-if="mode === 'name'" class="question-content">
      <div class="question-name">{{ question.correctMember.name.en }}</div>
      <div class="question-name-ko">{{ question.correctMember.fullName.ko }}</div>
      <div class="options-grid options-photos">
        <button
          v-for="option in question.options"
          :key="option.id"
          class="option-photo"
          :class="optionClass(option.id)"
          @click="selectAnswer(option.id)"
        >
          <img
            :src="`${base}images/members/${option.id}/${option.photos[0]}`"
            :alt="'?'"
          />
        </button>
      </div>
    </div>

    <!-- Voice mode: play audio, guess name -->
    <div v-else-if="mode === 'voice'" class="question-content">
      <div class="voice-player" :class="{ playing: isPlaying }">
        <audio
          ref="quizAudio"
          :src="`${base}audio/${question.correctMember.audio.song}`"
          preload="metadata"
          @timeupdate="currentTime = quizAudio?.currentTime ?? 0"
          @loadedmetadata="duration = quizAudio?.duration ?? 0"
          @play="isPlaying = true"
          @pause="isPlaying = false"
          @ended="isPlaying = false; currentTime = 0"
        />

        <button class="voice-play-btn" :class="{ playing: isPlaying }" @click="toggleQuizAudio">
          <svg v-if="!isPlaying" viewBox="0 0 24 24" fill="currentColor" width="28" height="28">
            <path d="M8 5v14l11-7z"/>
          </svg>
          <svg v-else viewBox="0 0 24 24" fill="currentColor" width="28" height="28">
            <path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z"/>
          </svg>
        </button>

        <div class="voice-info">
          <div class="voice-label">🎵 Послухай та вгадай</div>
          <div class="voice-progress" @click="seekQuizAudio">
            <div class="voice-progress-fill" :style="{ width: (duration > 0 ? (currentTime / duration) * 100 : 0) + '%' }">
              <span class="voice-thumb"></span>
            </div>
          </div>
          <div class="voice-time">{{ formatTime(currentTime) }} / {{ formatTime(duration) }}</div>
        </div>

        <!-- Animated sound waves -->
        <div class="sound-waves" :class="{ active: isPlaying }">
          <span v-for="n in 5" :key="n" class="wave" :style="{ '--i': n }"></span>
        </div>
      </div>

      <div class="options-grid">
        <button
          v-for="option in question.options"
          :key="option.id"
          class="option-btn"
          :class="optionClass(option.id)"
          @click="selectAnswer(option.id)"
        >
          {{ option.name.en }}
        </button>
      </div>
    </div>
  </div>
</template>

<style scoped>
.quiz-question {
  text-align: center;
}

.question-content {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 24px;
}

.question-photo {
  width: 220px;
  height: 280px;
  border-radius: var(--radius-lg);
  overflow: hidden;
  border: 2px solid var(--border-accent);
  background: linear-gradient(135deg, #2d1b4e, #1a1a3e);
}

.question-photo img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.question-name {
  font-size: 2em;
  font-weight: 700;
  color: var(--text-primary);
}

.question-name-ko {
  font-size: 1.2em;
  color: var(--accent-purple);
  margin-top: -16px;
}

/* Voice player */
.voice-player {
  display: flex;
  align-items: center;
  gap: 16px;
  background: var(--bg-card);
  border: 2px solid var(--border-accent);
  border-radius: var(--radius-lg);
  padding: 20px 24px;
  min-width: 380px;
  max-width: 480px;
  width: 100%;
  position: relative;
  overflow: hidden;
  transition: all var(--transition-normal);
}

.voice-player::before {
  content: '';
  position: absolute;
  inset: 0;
  background: linear-gradient(135deg, rgba(139, 92, 246, 0.08), transparent);
  opacity: 0;
  transition: opacity var(--transition-normal);
}

.voice-player.playing::before {
  opacity: 1;
}

.voice-player.playing {
  border-color: var(--accent-purple);
  box-shadow: 0 0 30px rgba(139, 92, 246, 0.15);
}

.voice-play-btn {
  position: relative;
  z-index: 1;
  flex-shrink: 0;
  width: 56px;
  height: 56px;
  border-radius: 50%;
  background: linear-gradient(135deg, var(--accent-purple), var(--accent-purple-bright));
  color: var(--bg-primary);
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all var(--transition-fast);
  box-shadow: 0 4px 16px rgba(139, 92, 246, 0.35);
}

.voice-play-btn:hover {
  transform: scale(1.08);
  box-shadow: 0 6px 24px rgba(139, 92, 246, 0.45);
}

.voice-play-btn.playing {
  animation: voicePulse 2s ease-in-out infinite;
}

@keyframes voicePulse {
  0%, 100% { box-shadow: 0 4px 16px rgba(139, 92, 246, 0.35); }
  50% { box-shadow: 0 4px 28px rgba(139, 92, 246, 0.55); }
}

.voice-info {
  flex: 1;
  min-width: 0;
  position: relative;
  z-index: 1;
}

.voice-label {
  font-size: 0.95em;
  font-weight: 600;
  color: var(--text-primary);
  margin-bottom: 10px;
}

.voice-progress {
  height: 6px;
  background: rgba(201, 160, 220, 0.12);
  border-radius: 3px;
  cursor: pointer;
  margin-bottom: 6px;
  transition: height var(--transition-fast);
}

.voice-progress:hover {
  height: 8px;
}

.voice-progress-fill {
  height: 100%;
  background: linear-gradient(90deg, var(--accent-purple), var(--accent-purple-bright));
  border-radius: 3px;
  transition: width 0.1s linear;
  position: relative;
}

.voice-thumb {
  position: absolute;
  right: -6px;
  top: 50%;
  transform: translateY(-50%);
  width: 12px;
  height: 12px;
  border-radius: 50%;
  background: var(--accent-purple-bright);
  box-shadow: 0 0 8px rgba(139, 92, 246, 0.5);
  opacity: 0;
  transition: opacity var(--transition-fast);
}

.voice-progress:hover .voice-thumb {
  opacity: 1;
}

.voice-time {
  font-size: 0.75em;
  color: var(--text-dim);
  font-variant-numeric: tabular-nums;
}

/* Sound waves animation */
.sound-waves {
  position: relative;
  z-index: 1;
  display: flex;
  align-items: center;
  gap: 3px;
  height: 32px;
}

.wave {
  width: 3px;
  height: 8px;
  border-radius: 2px;
  background: var(--accent-purple);
  opacity: 0.3;
  transition: all var(--transition-fast);
}

.sound-waves.active .wave {
  animation: waveAnim 1s ease-in-out infinite alternate;
  animation-delay: calc(var(--i) * 0.12s);
  opacity: 1;
}

@keyframes waveAnim {
  0% { height: 6px; opacity: 0.4; }
  50% { height: 24px; opacity: 1; }
  100% { height: 10px; opacity: 0.6; }
}

/* Options */
.options-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 12px;
  max-width: 500px;
  width: 100%;
}

.option-btn {
  background: var(--bg-card);
  border: 1px solid var(--border-accent);
  border-radius: var(--radius-md);
  padding: 16px;
  color: var(--text-secondary);
  font-size: 1em;
  transition: all var(--transition-fast);
}

.option-btn:hover:not(.correct):not(.incorrect) {
  border-color: var(--accent-purple);
  color: var(--text-primary);
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(139, 92, 246, 0.15);
}

.option-btn.correct {
  border-color: var(--success);
  background: rgba(34, 197, 94, 0.15);
  color: var(--success);
  transform: scale(1.02);
}

.option-btn.incorrect {
  border-color: var(--error);
  background: rgba(239, 68, 68, 0.15);
  color: var(--error);
  transform: scale(0.98);
}

.options-photos {
  max-width: 600px;
}

.option-photo {
  aspect-ratio: 3 / 4;
  border-radius: var(--radius-md);
  overflow: hidden;
  border: 2px solid var(--border-accent);
  background: linear-gradient(135deg, #2d1b4e, #1a1a3e);
  padding: 0;
  transition: all var(--transition-fast);
}

.option-photo:hover:not(.correct):not(.incorrect) {
  border-color: var(--accent-purple);
  transform: translateY(-4px);
  box-shadow: 0 8px 20px rgba(139, 92, 246, 0.2);
}

.option-photo.correct {
  border-color: var(--success);
  box-shadow: 0 0 24px rgba(34, 197, 94, 0.35);
}

.option-photo.incorrect {
  border-color: var(--error);
  box-shadow: 0 0 24px rgba(239, 68, 68, 0.35);
}

.option-photo img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

@media (max-width: 640px) {
  .voice-player {
    min-width: unset;
    padding: 16px;
    gap: 12px;
  }

  .voice-play-btn {
    width: 48px;
    height: 48px;
  }

  .voice-play-btn svg {
    width: 22px;
    height: 22px;
  }

  .question-photo {
    width: 180px;
    height: 230px;
  }

  .question-name {
    font-size: 1.6em;
  }
}
</style>
