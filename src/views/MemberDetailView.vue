<script setup lang="ts">
import { computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useI18n } from 'vue-i18n'
import { members } from '@/data/members'
import AudioPlayer from '@/components/AudioPlayer.vue'
import PhotoGallery from '@/components/PhotoGallery.vue'

const route = useRoute()
const router = useRouter()
const { t, locale } = useI18n()

const member = computed(() => {
  const found = members.find(m => m.id === route.params.id)
  if (!found) router.replace('/members')
  return found
})

const lang = computed(() => locale.value as 'en' | 'ua')

function formatDate(dateStr: string): string {
  const date = new Date(dateStr)
  return date.toLocaleDateString(locale.value === 'ua' ? 'uk-UA' : 'en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  })
}
</script>

<template>
  <div v-if="member" class="member-detail">
    <section class="hero-section">
      <div class="hero-photo">
        <img
          :src="`/images/members/${member.id}/${member.photos[0]}`"
          :alt="member.name.en"
        />
      </div>
      <div class="hero-info">
        <h1 class="member-name">{{ member.name.en }}</h1>
        <p class="member-name-full">
          {{ member.fullName.ko }} · {{ member.fullName.en }}
        </p>
        <span class="role-badge">{{ member.role[lang] }}</span>

        <div class="info-grid">
          <div class="info-item">
            <span class="info-icon">🎂</span>
            <span>{{ formatDate(member.birthDate) }}</span>
          </div>
          <div class="info-item">
            <span class="info-icon">📏</span>
            <span>{{ member.height }} {{ locale === 'ua' ? 'см' : 'cm' }}</span>
          </div>
          <div class="info-item">
            <span class="info-icon">♈</span>
            <span>{{ t(`zodiac.${member.zodiac}`) }}</span>
          </div>
          <div class="info-item">
            <span class="info-icon">💜</span>
            <span>{{ member.nickname }}</span>
          </div>
        </div>

        <div class="audio-section">
          <div class="section-label">{{ t('members.audio') }}</div>
          <div class="audio-players">
            <AudioPlayer
              :src="`/audio/${member.audio.song}`"
              :title="t('members.songClip')"
              :subtitle="member.audio.songTitle"
            />
            <AudioPlayer
              :src="`/audio/${member.audio.voice}`"
              :title="t('members.voiceClip')"
              :subtitle="member.audio.voiceSource"
            />
          </div>
        </div>
      </div>
    </section>

    <section class="content-section">
      <div class="content-left">
        <div class="section-block">
          <h3 class="section-title">{{ t('members.facts') }}</h3>
          <ul class="facts-list">
            <li v-for="fact in member.facts" :key="fact.en">
              {{ fact[lang] }}
            </li>
          </ul>
        </div>

        <div class="section-block">
          <h3 class="section-title">{{ t('members.soloProjects') }}</h3>
          <div class="tags">
            <span v-for="project in member.soloProjects" :key="project.name" class="tag">
              {{ project.name }} ({{ project.year }})
            </span>
          </div>
        </div>

        <div class="section-block">
          <h3 class="section-title">{{ t('members.hobbies') }}</h3>
          <div class="tags">
            <span v-for="hobby in member.hobbies" :key="hobby.en" class="tag">
              {{ hobby[lang] }}
            </span>
          </div>
        </div>

        <div class="section-block">
          <h3 class="section-title">{{ t('members.favorites') }}</h3>
          <div class="favorites-grid">
            <div class="favorite-item">
              <span class="favorite-label">{{ t('members.favoriteColor') }}</span>
              <span>{{ member.favorites[lang].color }}</span>
            </div>
            <div class="favorite-item">
              <span class="favorite-label">{{ t('members.favoriteFood') }}</span>
              <span>{{ member.favorites[lang].food }}</span>
            </div>
          </div>
        </div>
      </div>

      <div class="content-right">
        <h3 class="section-title">{{ t('members.gallery') }}</h3>
        <PhotoGallery
          :photos="member.photos.slice(1)"
          :base-path="`/images/members/${member.id}`"
          :alt="member.name.en"
        />
      </div>
    </section>
  </div>
</template>

<style scoped>
.member-detail {
  max-width: 1100px;
  margin: 0 auto;
  padding: 48px 24px;
}

.hero-section {
  display: flex;
  gap: 0;
  background: var(--bg-secondary);
  border-radius: var(--radius-lg);
  overflow: hidden;
  border: 1px solid var(--border-subtle);
  margin-bottom: 32px;
}

.hero-photo {
  flex: 0 0 300px;
  background: linear-gradient(135deg, #2d1b4e, #1a1a3e);
  padding: 24px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.hero-photo img {
  width: 100%;
  max-width: 240px;
  border-radius: var(--radius-lg);
  aspect-ratio: 3 / 4;
  object-fit: cover;
}

.hero-info {
  flex: 1;
  padding: 28px 32px;
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.member-name {
  font-size: 2.2em;
  font-weight: 700;
  color: var(--text-primary);
}

.member-name-full {
  font-size: 1.1em;
  color: var(--accent-purple);
}

.role-badge {
  display: inline-block;
  align-self: flex-start;
  background: rgba(201, 160, 220, 0.13);
  color: var(--accent-purple);
  padding: 4px 14px;
  border-radius: var(--radius-xl);
  font-size: 0.85em;
}

.info-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 10px;
  font-size: 0.9em;
  color: var(--text-muted);
}

.info-item {
  display: flex;
  align-items: center;
  gap: 8px;
}

.info-item span:last-child {
  color: var(--text-secondary);
}

.audio-section {
  margin-top: auto;
}

.section-label {
  font-size: 0.8em;
  color: var(--text-dim);
  text-transform: uppercase;
  letter-spacing: 1px;
  margin-bottom: 8px;
}

.audio-players {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.content-section {
  display: flex;
  gap: 32px;
}

.content-left {
  flex: 1;
}

.content-right {
  flex: 1;
}

.section-block {
  margin-bottom: 28px;
}

.section-title {
  font-size: 0.8em;
  color: var(--text-dim);
  text-transform: uppercase;
  letter-spacing: 1px;
  margin-bottom: 12px;
}

.facts-list {
  color: var(--text-secondary);
  font-size: 0.9em;
  line-height: 1.8;
  padding-left: 16px;
}

.facts-list li {
  list-style: disc;
  padding-left: 4px;
}

.tags {
  display: flex;
  gap: 8px;
  flex-wrap: wrap;
}

.tag {
  background: rgba(201, 160, 220, 0.13);
  color: var(--accent-purple);
  padding: 4px 12px;
  border-radius: var(--radius-md);
  font-size: 0.85em;
}

.favorites-grid {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.favorite-item {
  display: flex;
  gap: 12px;
  font-size: 0.9em;
}

.favorite-label {
  color: var(--text-dim);
  min-width: 140px;
}

@media (max-width: 768px) {
  .member-detail {
    padding: 24px 16px;
  }

  .hero-section {
    flex-direction: column;
  }

  .hero-photo {
    flex: none;
    padding: 20px;
  }

  .hero-photo img {
    max-width: 200px;
    margin: 0 auto;
  }

  .hero-info {
    padding: 20px 16px;
  }

  .member-name {
    font-size: 1.6em;
  }

  .member-name-full {
    font-size: 0.95em;
  }

  .info-grid {
    grid-template-columns: 1fr;
    gap: 8px;
  }

  .content-section {
    flex-direction: column;
    gap: 24px;
  }

  .favorite-label {
    min-width: 120px;
  }
}
</style>
