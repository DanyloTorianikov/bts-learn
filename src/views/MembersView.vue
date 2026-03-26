<script setup lang="ts">
import { useI18n } from 'vue-i18n'
import { members } from '@/data/members'
import MemberCard from '@/components/MemberCard.vue'

const { t } = useI18n()
</script>

<template>
  <div class="members-page">
    <h1 class="page-title">{{ t('members.title') }}</h1>
    <div class="members-grid">
      <MemberCard
        v-for="member in members"
        :key="member.id"
        :member="member"
      />
    </div>
  </div>
</template>

<style scoped>
.members-page {
  max-width: 1100px;
  margin: 0 auto;
  padding: 48px 24px;
}

.page-title {
  font-size: 2em;
  font-weight: 700;
  text-align: center;
  margin-bottom: 40px;
  color: var(--text-primary);
}

.members-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));
  gap: 24px;
}
</style>
