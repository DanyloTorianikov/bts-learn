<script setup lang="ts">
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import { members } from '@/data/members'

const route = useRoute()

const currentMember = computed(() => {
  if (route.name === 'member-detail') {
    return members.find(m => m.id === route.params.id)
  }
  return null
})

const glowColor = computed(() => {
  if (currentMember.value) return currentMember.value.color
  if (route.name === 'quiz') return '#8b5cf6'
  return '#c9a0dc'
})

const pageName = computed(() => String(route.name || 'home'))
</script>

<template>
  <div class="app-bg" :data-page="pageName">
    <!-- Glow orbs -->
    <div
      class="orb orb-1"
      :style="{ background: `radial-gradient(circle, ${glowColor}22 0%, transparent 70%)` }"
    ></div>
    <div
      class="orb orb-2"
      :style="{ background: `radial-gradient(circle, ${glowColor}15 0%, transparent 70%)` }"
    ></div>
    <div
      class="orb orb-3"
      :style="{ background: `radial-gradient(circle, rgba(139, 92, 246, 0.08) 0%, transparent 70%)` }"
    ></div>

    <!-- Particles -->
    <div class="particles">
      <span
        v-for="n in 30"
        :key="n"
        class="dot"
        :style="{
          '--x': `${Math.random() * 100}%`,
          '--y': `${Math.random() * 100}%`,
          '--dur': `${4 + Math.random() * 6}s`,
          '--del': `${Math.random() * 8}s`,
          '--sz': `${1.5 + Math.random() * 2.5}px`,
          '--op': `${0.2 + Math.random() * 0.5}`
        }"
      ></span>
    </div>

    <!-- Grid pattern overlay -->
    <div class="grid-overlay"></div>

    <!-- Noise texture -->
    <div class="noise"></div>
  </div>
</template>

<style scoped>
.app-bg {
  position: fixed;
  inset: 0;
  z-index: -1;
  overflow: hidden;
  pointer-events: none;
}

/* Glow orbs */
.orb {
  position: absolute;
  border-radius: 50%;
  filter: blur(60px);
  transition: all 1.5s cubic-bezier(0.16, 1, 0.3, 1);
}

.orb-1 {
  width: 600px;
  height: 600px;
  top: -10%;
  left: -5%;
  animation: orbFloat1 20s ease-in-out infinite alternate;
}

.orb-2 {
  width: 500px;
  height: 500px;
  bottom: -15%;
  right: -10%;
  animation: orbFloat2 25s ease-in-out infinite alternate;
}

.orb-3 {
  width: 400px;
  height: 400px;
  top: 40%;
  left: 50%;
  transform: translateX(-50%);
  animation: orbFloat3 18s ease-in-out infinite alternate;
}

@keyframes orbFloat1 {
  0% { transform: translate(0, 0) scale(1); }
  33% { transform: translate(80px, 60px) scale(1.1); }
  66% { transform: translate(-40px, 100px) scale(0.95); }
  100% { transform: translate(60px, 40px) scale(1.05); }
}

@keyframes orbFloat2 {
  0% { transform: translate(0, 0) scale(1); }
  33% { transform: translate(-70px, -50px) scale(1.08); }
  66% { transform: translate(50px, -80px) scale(0.92); }
  100% { transform: translate(-40px, -30px) scale(1.03); }
}

@keyframes orbFloat3 {
  0% { transform: translateX(-50%) translateY(0) scale(0.8); opacity: 0.5; }
  50% { transform: translateX(-50%) translateY(-40px) scale(1); opacity: 1; }
  100% { transform: translateX(-50%) translateY(30px) scale(0.9); opacity: 0.6; }
}

/* Quiz page: more energetic */
[data-page="quiz"] .orb-1 {
  animation-duration: 12s;
}
[data-page="quiz"] .orb-2 {
  animation-duration: 15s;
}

/* Member detail: focused glow behind content */
[data-page="member-detail"] .orb-3 {
  top: 10%;
  width: 600px;
  height: 600px;
}

/* Particles */
.particles {
  position: absolute;
  inset: 0;
}

.dot {
  position: absolute;
  left: var(--x);
  top: var(--y);
  width: var(--sz);
  height: var(--sz);
  border-radius: 50%;
  background: var(--accent-purple);
  opacity: 0;
  animation: dotFloat var(--dur) var(--del) ease-in-out infinite;
}

@keyframes dotFloat {
  0%, 100% {
    opacity: 0;
    transform: translateY(0) scale(0.5);
  }
  40%, 60% {
    opacity: var(--op);
    transform: translateY(-20px) scale(1);
  }
}

/* Subtle grid pattern */
.grid-overlay {
  position: absolute;
  inset: 0;
  background-image:
    linear-gradient(rgba(201, 160, 220, 0.03) 1px, transparent 1px),
    linear-gradient(90deg, rgba(201, 160, 220, 0.03) 1px, transparent 1px);
  background-size: 60px 60px;
  mask-image: radial-gradient(ellipse at center, black 30%, transparent 80%);
  -webkit-mask-image: radial-gradient(ellipse at center, black 30%, transparent 80%);
}

/* Noise texture */
.noise {
  position: absolute;
  inset: 0;
  opacity: 0.015;
  background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E");
  background-repeat: repeat;
  background-size: 256px 256px;
}
</style>
