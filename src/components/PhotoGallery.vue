<script setup lang="ts">
import { ref } from 'vue'

defineProps<{
  photos: string[]
  basePath: string
  alt: string
}>()

const lightboxIndex = ref<number | null>(null)

function openLightbox(index: number) {
  lightboxIndex.value = index
}

function closeLightbox() {
  lightboxIndex.value = null
}

function nextPhoto(total: number) {
  if (lightboxIndex.value !== null) {
    lightboxIndex.value = (lightboxIndex.value + 1) % total
  }
}

function prevPhoto(total: number) {
  if (lightboxIndex.value !== null) {
    lightboxIndex.value = (lightboxIndex.value - 1 + total) % total
  }
}
</script>

<template>
  <div class="gallery">
    <div class="gallery-grid">
      <div
        v-for="(photo, index) in photos"
        :key="photo"
        class="gallery-item"
        @click="openLightbox(index)"
      >
        <img
          :src="`${basePath}/${photo}`"
          :alt="`${alt} photo ${index + 1}`"
          loading="lazy"
        />
      </div>
    </div>

    <Teleport to="body">
      <Transition name="fade">
        <div
          v-if="lightboxIndex !== null"
          class="lightbox"
          @click.self="closeLightbox"
        >
          <button class="lightbox-close" @click="closeLightbox">✕</button>
          <button class="lightbox-prev" @click="prevPhoto(photos.length)">‹</button>
          <img
            :src="`${basePath}/${photos[lightboxIndex]}`"
            :alt="`${alt} photo ${lightboxIndex + 1}`"
            class="lightbox-image"
          />
          <button class="lightbox-next" @click="nextPhoto(photos.length)">›</button>
        </div>
      </Transition>
    </Teleport>
  </div>
</template>

<style scoped>
.gallery-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 8px;
}

.gallery-item {
  aspect-ratio: 3 / 4;
  border-radius: var(--radius-sm);
  overflow: hidden;
  cursor: pointer;
  background: linear-gradient(135deg, #2d1b4e, #1a1a3e);
  border: 1px solid var(--border-subtle);
  transition: all var(--transition-fast);
}

.gallery-item:hover {
  border-color: var(--accent-purple);
  transform: scale(1.02);
}

.gallery-item img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.lightbox {
  position: fixed;
  inset: 0;
  z-index: 200;
  background: rgba(0, 0, 0, 0.9);
  display: flex;
  align-items: center;
  justify-content: center;
}

.lightbox-image {
  max-width: 85vw;
  max-height: 85vh;
  object-fit: contain;
  border-radius: var(--radius-md);
}

.lightbox-close {
  position: absolute;
  top: 20px;
  right: 24px;
  font-size: 1.5em;
  color: var(--text-primary);
  padding: 8px;
}

.lightbox-prev,
.lightbox-next {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  font-size: 2.5em;
  color: var(--text-primary);
  padding: 16px;
  opacity: 0.7;
  transition: opacity var(--transition-fast);
}

.lightbox-prev:hover,
.lightbox-next:hover {
  opacity: 1;
}

.lightbox-prev {
  left: 16px;
}

.lightbox-next {
  right: 16px;
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
