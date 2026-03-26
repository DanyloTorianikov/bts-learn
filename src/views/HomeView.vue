<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { useI18n } from 'vue-i18n'
import { RouterLink } from 'vue-router'
import { members } from '@/data/members'

const { t } = useI18n()
const visible = ref(false)

onMounted(() => {
  requestAnimationFrame(() => {
    visible.value = true
  })
})
</script>

<template>
  <div class="home">
    <!-- Floating member photos background -->
    <div class="floating-photos">
      <div
        v-for="(member, i) in members"
        :key="member.id"
        class="floating-photo"
        :class="{ visible }"
        :style="{
          '--delay': `${i * 0.15}s`,
          '--x': `${10 + (i % 4) * 22}%`,
          '--y': `${8 + Math.floor(i / 4) * 45}%`,
          '--rotate': `${-12 + i * 4}deg`,
          '--size': i % 3 === 0 ? '140px' : '110px'
        }"
      >
        <img
          :src="`/images/members/${member.id}/${member.photos[0]}`"
          :alt="member.name.en"
        />
      </div>
    </div>

    <!-- Hero content -->
    <section class="hero" :class="{ visible }">
      <div class="hero-badge">💜 BTS ARMY</div>
      <h1 class="hero-title">
        <span class="title-line">BTS</span>
        <span class="title-line accent">Learn</span>
      </h1>
      <p class="hero-subtitle">{{ t('home.subtitle') }}</p>

      <!-- Member avatars row -->
      <div class="member-avatars">
        <RouterLink
          v-for="member in members"
          :key="member.id"
          :to="`/members/${member.id}`"
          class="avatar"
          :title="member.name.en"
        >
          <img
            :src="`/images/members/${member.id}/${member.photos[0]}`"
            :alt="member.name.en"
          />
          <span class="avatar-name">{{ member.name.en }}</span>
        </RouterLink>
      </div>

      <div class="hero-actions">
        <RouterLink to="/members" class="btn btn-primary">
          <span class="btn-icon">✦</span>
          {{ t('home.explore') }}
        </RouterLink>
        <RouterLink to="/quiz" class="btn btn-outline">
          <span class="btn-icon">🎯</span>
          {{ t('home.startQuiz') }}
        </RouterLink>
      </div>

      <div class="hero-stats">
        <div class="stat">
          <span class="stat-number">7</span>
          <span class="stat-label">{{ t('nav.members') }}</span>
        </div>
        <div class="stat-divider"></div>
        <div class="stat">
          <span class="stat-number">3</span>
          <span class="stat-label">Quiz modes</span>
        </div>
        <div class="stat-divider"></div>
        <div class="stat">
          <span class="stat-number">2</span>
          <span class="stat-label">🌐 UA / EN</span>
        </div>
      </div>
    </section>
  </div>
</template>

<style scoped>
.home {
  min-height: calc(100vh - 64px);
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  overflow: hidden;
}

/* Floating background photos */
.floating-photos {
  position: absolute;
  inset: 0;
  pointer-events: none;
  z-index: 0;
}

.floating-photo {
  position: absolute;
  left: var(--x);
  top: var(--y);
  width: var(--size);
  height: var(--size);
  border-radius: var(--radius-lg);
  overflow: hidden;
  opacity: 0;
  transform: rotate(var(--rotate)) scale(0.8);
  transition: all 1s cubic-bezier(0.16, 1, 0.3, 1);
  transition-delay: var(--delay);
  filter: blur(1px) brightness(0.3) saturate(0.5);
}

.floating-photo.visible {
  opacity: 0.15;
  transform: rotate(var(--rotate)) scale(1);
}

.floating-photo img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

/* Hero */
.hero {
  position: relative;
  text-align: center;
  padding: 60px 24px;
  width: 100%;
  max-width: 700px;
  margin: 0 auto;
  z-index: 2;
  opacity: 0;
  transform: translateY(30px);
  transition: all 0.8s cubic-bezier(0.16, 1, 0.3, 1);
}

.hero.visible {
  opacity: 1;
  transform: translateY(0);
}

.hero-badge {
  display: inline-block;
  background: rgba(201, 160, 220, 0.1);
  border: 1px solid var(--border-accent);
  color: var(--accent-purple);
  padding: 6px 18px;
  border-radius: var(--radius-xl);
  font-size: 0.85em;
  font-weight: 500;
  margin-bottom: 24px;
  letter-spacing: 0.5px;
  animation: badgePulse 3s ease-in-out infinite;
}

@keyframes badgePulse {
  0%, 100% { box-shadow: 0 0 0 0 rgba(201, 160, 220, 0.2); }
  50% { box-shadow: 0 0 20px 4px rgba(201, 160, 220, 0.1); }
}

.hero-title {
  margin-bottom: 16px;
  line-height: 1.1;
}

.title-line {
  display: block;
  font-size: 4.5em;
  font-weight: 900;
  color: var(--text-primary);
  letter-spacing: -2px;
}

.title-line.accent {
  background: linear-gradient(135deg, var(--accent-purple), var(--accent-purple-bright), #d4a0ff);
  background-size: 200% 200%;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  animation: gradientShift 4s ease-in-out infinite alternate;
}

@keyframes gradientShift {
  0% { background-position: 0% 50%; }
  100% { background-position: 100% 50%; }
}

.hero-subtitle {
  font-size: 1.2em;
  color: var(--text-secondary);
  margin-bottom: 32px;
  line-height: 1.6;
  max-width: 450px;
  margin-left: auto;
  margin-right: auto;
}

/* Member avatars */
.member-avatars {
  display: flex;
  justify-content: center;
  gap: 12px;
  margin-bottom: 36px;
}

.avatar {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 6px;
  text-decoration: none;
  transition: all var(--transition-normal);
}

.avatar:hover {
  transform: translateY(-4px);
}

.avatar img {
  width: 56px;
  height: 56px;
  border-radius: 50%;
  object-fit: cover;
  border: 2px solid var(--border-accent);
  transition: all var(--transition-normal);
}

.avatar:hover img {
  border-color: var(--accent-purple);
  box-shadow: 0 0 16px rgba(201, 160, 220, 0.3);
}

.avatar-name {
  font-size: 0.7em;
  color: var(--text-dim);
  transition: color var(--transition-fast);
}

.avatar:hover .avatar-name {
  color: var(--accent-purple);
}

/* Actions */
.hero-actions {
  display: flex;
  gap: 16px;
  justify-content: center;
  margin-bottom: 40px;
}

.btn {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 14px 28px;
  border-radius: var(--radius-md);
  font-size: 1em;
  font-weight: 600;
  transition: all var(--transition-normal);
}

.btn-icon {
  font-size: 0.9em;
}

.btn-primary {
  background: linear-gradient(135deg, var(--accent-purple), var(--accent-purple-bright));
  color: var(--bg-primary);
}

.btn-primary:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 30px rgba(139, 92, 246, 0.35);
}

.btn-outline {
  border: 1px solid var(--border-accent);
  color: var(--accent-purple);
}

.btn-outline:hover {
  background: rgba(201, 160, 220, 0.1);
  transform: translateY(-2px);
  box-shadow: 0 8px 30px rgba(201, 160, 220, 0.1);
}

/* Stats */
.hero-stats {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 24px;
}

.stat {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 2px;
}

.stat-number {
  font-size: 1.5em;
  font-weight: 700;
  color: var(--accent-purple);
}

.stat-label {
  font-size: 0.75em;
  color: var(--text-dim);
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.stat-divider {
  width: 1px;
  height: 32px;
  background: var(--border-accent);
}

/* Mobile */
@media (max-width: 640px) {
  .floating-photo {
    display: none;
  }

  .hero {
    padding: 40px 16px;
  }

  .title-line {
    font-size: 3em;
  }

  .hero-subtitle {
    font-size: 1em;
  }

  .member-avatars {
    gap: 8px;
    flex-wrap: wrap;
  }

  .avatar img {
    width: 44px;
    height: 44px;
  }

  .avatar-name {
    font-size: 0.6em;
  }

  .hero-actions {
    flex-direction: column;
    align-items: center;
  }

  .btn {
    width: 100%;
    max-width: 280px;
    justify-content: center;
  }

  .hero-stats {
    gap: 16px;
  }

  .stat-number {
    font-size: 1.2em;
  }
}
</style>
