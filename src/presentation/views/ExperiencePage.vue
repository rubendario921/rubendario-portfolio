<script setup lang="ts">
import ExperienceList from '../components/experience/ExperienceList.component.vue'
</script>

<template>
  <div class="experience-page-container">
    <div class="header-section">
      <h1 class="page-title">Trayectoria Profesional</h1>
      <p class="page-subtitle">
        Historial detallado de mis roles en ingeniería de software, liderazgo técnico y consultoría.
      </p>
    </div>

    <!-- Experiences List wrapper -->
    <main class="main-content">
      <ExperienceList />
    </main>
  </div>
</template>

<style scoped>
.experience-page-container {
  display: flex;
  flex-direction: column;
  gap: 2.5rem;
  width: 100%;
  padding-bottom: 4rem;
}

.header-section {
  text-align: left;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  border-bottom: 1px solid rgba(255, 255, 255, 0.05);
  padding-bottom: 1.5rem;
}

.page-title {
  font-size: 2.2rem;
  font-weight: 800;
  color: var(--color-heading);
  margin: 0;
  letter-spacing: -0.01em;
}

.page-subtitle {
  font-size: 1.05rem;
  color: var(--color-text);
  opacity: 0.7;
  margin: 0;
  max-width: 600px;
}

.main-content {
  width: 100%;
}
</style>
