<script setup lang="ts">
import type { Member } from '@/types/member'

defineProps<{
  member: Member
}>()
</script>

<template>
  <RouterLink :to="`/members/${member.id}`" class="member-card">
    <div class="card-image">
      <img
        :src="`/images/members/${member.id}/${member.photos[0]}`"
        :alt="member.name.en"
        loading="lazy"
      />
    </div>
    <div class="card-info">
      <h3 class="card-name">{{ member.name.en }}</h3>
      <p class="card-name-ko">{{ member.fullName.ko }}</p>
    </div>
  </RouterLink>
</template>

<style scoped>
.member-card {
  display: block;
  background: var(--bg-card);
  border-radius: var(--radius-lg);
  overflow: hidden;
  border: 2px solid var(--border-subtle);
  transition: all var(--transition-normal);
  text-decoration: none;
}

.member-card:hover {
  transform: translateY(-6px);
  border-color: var(--accent-gold);
  box-shadow: 0 12px 40px rgba(212, 175, 55, 0.15);
}

.card-image {
  aspect-ratio: 3 / 4;
  overflow: hidden;
  background: linear-gradient(135deg, #2d1b4e, #1a1a3e);
}

.card-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform var(--transition-normal);
}

.member-card:hover .card-image img {
  transform: scale(1.05);
}

.card-info {
  padding: 16px;
  text-align: center;
}

.card-name {
  font-size: 1.1em;
  font-weight: 700;
  color: var(--text-primary);
  margin-bottom: 4px;
}

.card-name-ko {
  font-size: 0.85em;
  color: var(--text-muted);
}
</style>
