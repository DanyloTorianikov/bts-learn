<script setup lang="ts">
import { ref } from 'vue'
import { useI18n } from 'vue-i18n'
import { RouterLink, useRouter } from 'vue-router'

const { t, locale } = useI18n()
const router = useRouter()
const menuOpen = ref(false)

function toggleLocale() {
  const next = locale.value === 'ua' ? 'en' : 'ua'
  locale.value = next
  localStorage.setItem('bts-learn-locale', next)
}

function closeMenu() {
  menuOpen.value = false
}

router.afterEach(() => {
  menuOpen.value = false
})
</script>

<template>
  <header class="navbar">
    <RouterLink to="/" class="navbar-brand" @click="closeMenu">
      <span class="navbar-icon">💜</span>
      <span class="navbar-title">BTS Learn</span>
    </RouterLink>

    <button class="burger" :class="{ active: menuOpen }" @click="menuOpen = !menuOpen">
      <span></span>
      <span></span>
      <span></span>
    </button>

    <nav class="navbar-links" :class="{ open: menuOpen }">
      <RouterLink to="/" class="nav-link">{{ t('nav.home') }}</RouterLink>
      <RouterLink to="/members" class="nav-link">{{ t('nav.members') }}</RouterLink>
      <RouterLink to="/quiz" class="nav-link">{{ t('nav.quiz') }}</RouterLink>
      <button class="lang-toggle" @click="toggleLocale">
        🌐 {{ locale === 'ua' ? 'UA' : 'EN' }}
      </button>
    </nav>
  </header>
</template>

<style scoped>
.navbar {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 100;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 32px;
  height: 64px;
  background: rgba(26, 26, 46, 0.85);
  border-bottom: 1px solid var(--border-subtle);
  backdrop-filter: blur(16px);
  -webkit-backdrop-filter: blur(16px);
}

.navbar-brand {
  display: flex;
  align-items: center;
  gap: 10px;
  text-decoration: none;
}

.navbar-icon {
  font-size: 1.3em;
}

.navbar-title {
  font-weight: 700;
  font-size: 1.1em;
  color: var(--text-primary);
}

.burger {
  display: none;
  flex-direction: column;
  gap: 5px;
  padding: 4px;
  background: none;
  border: none;
  cursor: pointer;
}

.burger span {
  display: block;
  width: 22px;
  height: 2px;
  background: var(--text-primary);
  border-radius: 2px;
  transition: all var(--transition-fast);
}

.burger.active span:nth-child(1) {
  transform: rotate(45deg) translate(5px, 5px);
}

.burger.active span:nth-child(2) {
  opacity: 0;
}

.burger.active span:nth-child(3) {
  transform: rotate(-45deg) translate(5px, -5px);
}

.navbar-links {
  display: flex;
  align-items: center;
  gap: 24px;
}

.nav-link {
  color: var(--text-muted);
  font-size: 0.95em;
  padding-bottom: 4px;
  border-bottom: 2px solid transparent;
  transition: all var(--transition-fast);
}

.nav-link:hover,
.nav-link.router-link-active {
  color: var(--accent-purple);
  border-bottom-color: var(--accent-purple);
}

.lang-toggle {
  color: var(--text-muted);
  font-size: 0.9em;
  padding: 4px 12px;
  border-radius: var(--radius-sm);
  transition: all var(--transition-fast);
}

.lang-toggle:hover {
  color: var(--text-primary);
  background: var(--border-subtle);
}

@media (max-width: 640px) {
  .navbar {
    padding: 0 16px;
  }

  .burger {
    display: flex;
  }

  .navbar-links {
    position: fixed;
    top: 64px;
    left: 0;
    right: 0;
    flex-direction: column;
    gap: 0;
    background: rgba(26, 26, 46, 0.95);
    backdrop-filter: blur(16px);
    -webkit-backdrop-filter: blur(16px);
    border-bottom: 1px solid var(--border-subtle);
    padding: 8px 0;
    transform: translateY(-100%);
    opacity: 0;
    pointer-events: none;
    transition: all var(--transition-normal);
  }

  .navbar-links.open {
    transform: translateY(0);
    opacity: 1;
    pointer-events: auto;
  }

  .nav-link {
    display: block;
    width: 100%;
    padding: 14px 24px;
    border-bottom: none;
    font-size: 1em;
  }

  .nav-link:hover,
  .nav-link.router-link-active {
    background: rgba(201, 160, 220, 0.08);
    border-bottom: none;
  }

  .lang-toggle {
    width: 100%;
    text-align: left;
    padding: 14px 24px;
    border-radius: 0;
  }
}
</style>
