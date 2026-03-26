<script setup lang="ts">
import { ref, computed } from 'vue'

defineProps<{
  src: string
  title: string
  subtitle: string
}>()

const audio = ref<HTMLAudioElement | null>(null)
const isPlaying = ref(false)
const currentTime = ref(0)
const duration = ref(0)
const hasError = ref(false)

const progress = computed(() =>
  duration.value > 0 ? (currentTime.value / duration.value) * 100 : 0
)

function formatTime(seconds: number): string {
  if (!seconds || !isFinite(seconds)) return '0:00'
  const m = Math.floor(seconds / 60)
  const s = Math.floor(seconds % 60)
  return `${m}:${s.toString().padStart(2, '0')}`
}

function togglePlay() {
  if (!audio.value || hasError.value) return
  if (isPlaying.value) {
    audio.value.pause()
  } else {
    audio.value.play().catch(() => {
      hasError.value = true
    })
  }
}

function onTimeUpdate() {
  if (audio.value) {
    currentTime.value = audio.value.currentTime
  }
}

function onLoadedMetadata() {
  if (audio.value) {
    duration.value = audio.value.duration
  }
}

function onEnded() {
  isPlaying.value = false
  currentTime.value = 0
}

function onError() {
  hasError.value = true
}

function seek(event: MouseEvent) {
  if (!audio.value || hasError.value) return
  const bar = event.currentTarget as HTMLElement
  const rect = bar.getBoundingClientRect()
  const ratio = Math.max(0, Math.min(1, (event.clientX - rect.left) / rect.width))
  audio.value.currentTime = ratio * duration.value
}
</script>

<template>
  <div class="audio-player" :class="{ playing: isPlaying, error: hasError }">
    <audio
      ref="audio"
      :src="src"
      preload="metadata"
      @timeupdate="onTimeUpdate"
      @loadedmetadata="onLoadedMetadata"
      @play="isPlaying = true"
      @pause="isPlaying = false"
      @ended="onEnded"
      @error="onError"
    />

    <button class="play-btn" :class="{ playing: isPlaying }" @click="togglePlay" :disabled="hasError">
      <svg v-if="!isPlaying" viewBox="0 0 24 24" fill="currentColor" width="18" height="18">
        <path d="M8 5v14l11-7z"/>
      </svg>
      <svg v-else viewBox="0 0 24 24" fill="currentColor" width="18" height="18">
        <path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z"/>
      </svg>
    </button>

    <div class="player-body">
      <div class="player-header">
        <div class="player-text">
          <div class="player-title">{{ title }}</div>
          <div class="player-subtitle">{{ subtitle }}</div>
        </div>
        <div class="player-time">
          {{ formatTime(currentTime) }} / {{ formatTime(duration) }}
        </div>
      </div>
      <div class="progress-track" @click="seek">
        <div class="progress-fill" :style="{ width: progress + '%' }">
          <span class="progress-thumb"></span>
        </div>
      </div>
    </div>

    <!-- Animated equalizer bars when playing -->
    <div v-if="isPlaying" class="equalizer">
      <span v-for="n in 4" :key="n" class="eq-bar" :style="{ '--i': n }"></span>
    </div>
  </div>
</template>

<style scoped>
.audio-player {
  display: flex;
  align-items: center;
  gap: 12px;
  background: var(--bg-card);
  border: 1px solid var(--border-subtle);
  border-radius: var(--radius-md);
  padding: 14px 16px;
  transition: all var(--transition-normal);
  position: relative;
  overflow: hidden;
}

.audio-player::before {
  content: '';
  position: absolute;
  inset: 0;
  background: linear-gradient(135deg, rgba(139, 92, 246, 0.05), transparent);
  opacity: 0;
  transition: opacity var(--transition-normal);
}

.audio-player.playing::before {
  opacity: 1;
}

.audio-player.playing {
  border-color: var(--accent-purple);
  box-shadow: 0 0 20px rgba(139, 92, 246, 0.1);
}

.audio-player.error {
  opacity: 0.5;
}

.play-btn {
  position: relative;
  z-index: 1;
  flex-shrink: 0;
  width: 44px;
  height: 44px;
  border-radius: 50%;
  background: linear-gradient(135deg, var(--accent-purple), var(--accent-purple-bright));
  color: var(--bg-primary);
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all var(--transition-fast);
  box-shadow: 0 2px 8px rgba(139, 92, 246, 0.3);
}

.play-btn:hover:not(:disabled) {
  transform: scale(1.08);
  box-shadow: 0 4px 16px rgba(139, 92, 246, 0.4);
}

.play-btn:disabled {
  opacity: 0.4;
  cursor: not-allowed;
}

.play-btn.playing {
  animation: playPulse 2s ease-in-out infinite;
}

@keyframes playPulse {
  0%, 100% { box-shadow: 0 2px 8px rgba(139, 92, 246, 0.3); }
  50% { box-shadow: 0 2px 16px rgba(139, 92, 246, 0.5); }
}

.player-body {
  position: relative;
  z-index: 1;
  flex: 1;
  min-width: 0;
}

.player-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 8px;
}

.player-text {
  min-width: 0;
}

.player-title {
  font-size: 0.9em;
  color: var(--text-primary);
  font-weight: 600;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.player-subtitle {
  font-size: 0.75em;
  color: var(--text-dim);
}

.player-time {
  font-size: 0.7em;
  color: var(--text-dim);
  white-space: nowrap;
  margin-left: 8px;
  font-variant-numeric: tabular-nums;
}

.progress-track {
  height: 6px;
  background: rgba(201, 160, 220, 0.1);
  border-radius: 3px;
  cursor: pointer;
  position: relative;
}

.progress-track:hover {
  height: 8px;
}

.progress-fill {
  height: 100%;
  background: linear-gradient(90deg, var(--accent-purple), var(--accent-purple-bright));
  border-radius: 3px;
  transition: width 0.1s linear;
  position: relative;
}

.progress-thumb {
  position: absolute;
  right: -5px;
  top: 50%;
  transform: translateY(-50%);
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background: var(--accent-purple-bright);
  box-shadow: 0 0 6px rgba(139, 92, 246, 0.5);
  opacity: 0;
  transition: opacity var(--transition-fast);
}

.progress-track:hover .progress-thumb {
  opacity: 1;
}

/* Equalizer animation */
.equalizer {
  position: relative;
  z-index: 1;
  display: flex;
  align-items: flex-end;
  gap: 2px;
  height: 20px;
  margin-left: 4px;
}

.eq-bar {
  width: 3px;
  border-radius: 1px;
  background: var(--accent-purple);
  animation: eqBounce 0.8s ease-in-out infinite alternate;
  animation-delay: calc(var(--i) * 0.15s);
}

@keyframes eqBounce {
  0% { height: 4px; opacity: 0.4; }
  100% { height: 18px; opacity: 1; }
}
</style>
