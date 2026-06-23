<script setup lang="ts">
import { useProjects } from '../composables/project/useProjects.composable'
import LoadingSpinner from '../components/shared/LoadingSpinner.vue'
import ErrorAlert from '../components/shared/ErrorAlert.vue'

// Load data from useProjects
const {
  projects,
  loading,
  error,
  selectedTechnology,
  uniqueTechnologies,
  filterByTechnology,
  clearFilter,
} = useProjects()

/**
 * Handle technology pill click.
 * @param tech - Technology name.
 */
const toggleTechFilter = (tech: string) => {
  if (selectedTechnology.value === tech) {
    clearFilter()
  } else {
    filterByTechnology(tech)
  }
}
</script>

<template>
  <div class="projects-page-container">
    <!-- Header Section -->
    <div class="header-section">
      <h1 class="page-title">Proyectos & Portafolio</h1>
      <p class="page-subtitle">
        Una recopilación de mis trabajos de código abierto, proyectos personales y sistemas empresariales.
      </p>
    </div>

    <!-- Tech Filter Bar -->
    <div class="tech-filters-bar" v-if="uniqueTechnologies.length > 0">
      <span class="filter-label">Tecnología:</span>
      <div class="filters-pills-row">
        <button
          @click="clearFilter"
          class="filter-pill-btn"
          :class="{ active: !selectedTechnology }"
        >
          Todos
        </button>
        <button
          v-for="tech in uniqueTechnologies"
          :key="tech"
          @click="toggleTechFilter(tech)"
          class="filter-pill-btn"
          :class="{ active: selectedTechnology === tech }"
        >
          {{ tech }}
        </button>
      </div>
    </div>

    <!-- Content Area -->
    <main class="main-content">
      <div v-if="loading" class="state-wrapper">
        <LoadingSpinner />
      </div>

      <div v-else-if="error" class="state-wrapper">
        <ErrorAlert :message="error" />
      </div>

      <div v-else-if="projects.length === 0" class="empty-state">
        <div class="empty-icon">📂</div>
        <p class="empty-title">No se encontraron proyectos</p>
        <p class="empty-desc">Prueba quitando los filtros seleccionados.</p>
        <button @click="clearFilter" class="reset-filters-btn">Restablecer filtros</button>
      </div>

      <!-- Projects Grid -->
      <div v-else class="projects-grid">
        <div v-for="project in projects" :key="project.id" class="project-card">
          <div class="card-img-wrapper" v-if="project.imageUrl">
            <img :src="project.imageUrl" :alt="project.title" class="card-img" />
            <span v-if="project.featured" class="featured-badge">Destacado</span>
          </div>

          <div class="card-body">
            <h3 class="project-title">{{ project.title }}</h3>
            <p class="project-description">{{ project.description }}</p>

            <div class="project-techs">
              <span
                v-for="(tech, idx) in project.technologies"
                :key="idx"
                class="tech-pill"
                :class="tech.category.toLowerCase()"
              >
                {{ tech.name }}
              </span>
            </div>
          </div>

          <div class="card-footer">
            <a v-if="project.githubUrl" :href="project.githubUrl" target="_blank" rel="noopener" class="footer-link repo-link">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4"/>
                <path d="M9 18c-4.51 2-5-2-7-2"/>
              </svg>
              GitHub
            </a>
            <a v-if="project.url" :href="project.url" target="_blank" rel="noopener" class="footer-link live-link">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/>
                <polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/>
              </svg>
              Demo en Vivo
            </a>
          </div>
        </div>
      </div>
    </main>
  </div>
</template>

<style scoped>
.projects-page-container {
  display: flex;
  flex-direction: column;
  gap: 2rem;
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

.tech-filters-bar {
  display: flex;
  align-items: center;
  gap: 1rem;
  flex-wrap: wrap;
  padding: 0.5rem 0;
  border-bottom: 1px solid rgba(255, 255, 255, 0.03);
}

.filter-label {
  font-size: 0.85rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  opacity: 0.7;
}

.filters-pills-row {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
}

.filter-pill-btn {
  background: rgba(255, 255, 255, 0.02);
  border: 1px solid rgba(255, 255, 255, 0.06);
  padding: 0.35rem 0.75rem;
  border-radius: 20px;
  color: var(--color-text);
  font-size: 0.85rem;
  cursor: pointer;
  transition: all 0.2s;
  font-weight: 500;
}

.filter-pill-btn:hover {
  border-color: rgba(255, 255, 255, 0.15);
  background: rgba(255, 255, 255, 0.04);
}

.filter-pill-btn.active {
  background: rgba(0, 189, 126, 0.1);
  border-color: hsla(160, 100%, 37%, 1);
  color: hsla(160, 100%, 37%, 1);
}

.main-content {
  width: 100%;
}

.projects-grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: 2rem;
}

@media (min-width: 768px) {
  .projects-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

.project-card {
  background: rgba(255, 255, 255, 0.02);
  border: 1px solid rgba(255, 255, 255, 0.05);
  border-radius: 20px;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
}

.project-card:hover {
  transform: translateY(-5px);
  background: rgba(255, 255, 255, 0.04);
  border-color: hsla(160, 100%, 37%, 0.3);
  box-shadow: 0 12px 30px rgba(0, 189, 126, 0.08);
}

.card-img-wrapper {
  position: relative;
  width: 100%;
  height: 180px;
  overflow: hidden;
}

.card-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.5s;
}

.project-card:hover .card-img {
  transform: scale(1.05);
}

.featured-badge {
  position: absolute;
  top: 1rem;
  right: 1rem;
  background: rgba(0, 189, 126, 0.9);
  color: #fff;
  font-size: 0.75rem;
  font-weight: 700;
  padding: 0.3rem 0.75rem;
  border-radius: 30px;
  text-transform: uppercase;
  backdrop-filter: blur(4px);
  border: 1px solid rgba(255, 255, 255, 0.1);
}

.card-body {
  padding: 1.5rem;
  display: flex;
  flex-direction: column;
  gap: 0.8rem;
  flex-grow: 1;
}

.project-title {
  margin: 0;
  font-size: 1.25rem;
  font-weight: 700;
  color: var(--color-heading);
}

.project-description {
  margin: 0;
  font-size: 0.95rem;
  line-height: 1.5;
  color: var(--color-text);
  opacity: 0.8;
}

.project-techs {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  margin-top: 0.5rem;
}

.tech-pill {
  font-size: 0.75rem;
  padding: 0.2rem 0.5rem;
  border-radius: 6px;
  background: rgba(255, 255, 255, 0.03);
  border: 1px solid rgba(255, 255, 255, 0.08);
  font-weight: 500;
  color: var(--color-text);
}

.tech-pill.frontend {
  background: rgba(59, 130, 246, 0.05);
  color: #60a5fa;
  border-color: rgba(59, 130, 246, 0.15);
}

.tech-pill.backend {
  background: rgba(16, 185, 129, 0.05);
  color: #34d399;
  border-color: rgba(16, 185, 129, 0.15);
}

.tech-pill.database {
  background: rgba(245, 158, 11, 0.05);
  color: #fbbf24;
  border-color: rgba(245, 158, 11, 0.15);
}

.tech-pill.devops {
  background: rgba(139, 92, 246, 0.05);
  color: #a78bfa;
  border-color: rgba(139, 92, 246, 0.15);
}

.card-footer {
  padding: 1.25rem 1.5rem;
  background: rgba(0, 0, 0, 0.05);
  border-top: 1px solid rgba(255, 255, 255, 0.03);
  display: flex;
  gap: 1.25rem;
}

.footer-link {
  display: flex;
  align-items: center;
  gap: 0.4rem;
  font-size: 0.9rem;
  font-weight: 600;
  padding: 0;
  background: transparent;
}

.repo-link {
  color: var(--color-text);
  opacity: 0.8;
}

.repo-link:hover {
  opacity: 1;
  color: hsla(160, 100%, 37%, 1);
}

.live-link {
  color: hsla(160, 100%, 37%, 1);
}

.live-link:hover {
  color: hsla(160, 100%, 42%, 1);
}

.state-wrapper {
  padding: 4rem 0;
  display: flex;
  justify-content: center;
}

.empty-state {
  text-align: center;
  padding: 4rem 2rem;
  background: rgba(255, 255, 255, 0.01);
  border: 1px dashed rgba(255, 255, 255, 0.05);
  border-radius: 16px;
  max-width: 480px;
  margin: 2rem auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.75rem;
}

.empty-icon {
  font-size: 3rem;
}

.empty-title {
  font-size: 1.2rem;
  font-weight: 600;
  margin: 0;
  color: var(--color-heading);
}

.empty-desc {
  font-size: 0.95rem;
  margin: 0;
  opacity: 0.7;
  line-height: 1.5;
}

.reset-filters-btn {
  margin-top: 0.75rem;
  background: rgba(0, 189, 126, 0.1);
  border: 1px solid rgba(0, 189, 126, 0.2);
  color: hsla(160, 100%, 37%, 1);
  padding: 0.5rem 1.25rem;
  border-radius: 8px;
  font-size: 0.9rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s;
}

.reset-filters-btn:hover {
  background: rgba(0, 189, 126, 0.2);
}
</style>
