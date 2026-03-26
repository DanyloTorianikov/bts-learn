<script setup lang="ts">
import NavBar from './components/NavBar.vue'
import AppBackground from './components/AppBackground.vue'
</script>

<template>
  <AppBackground />
  <NavBar />
  <main class="main-content">
    <RouterView />
  </main>
</template>

<style scoped>
.main-content {
  padding-top: 64px;
  position: relative;
  z-index: 1;
}
</style>
