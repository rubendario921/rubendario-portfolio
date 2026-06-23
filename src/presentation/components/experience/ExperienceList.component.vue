<script setup lang="ts">
import { ref, computed } from 'vue'
import { useExperiences } from '../../composables/experience/useExperiences.composable'
import ExperienceTimeline from './ExperienceTimeline.component.vue'
import ExperienceCard from './ExperienceCard.component.vue'
import LoadingSpinner from '../shared/LoadingSpinner.vue'
import ErrorAlert from '../shared/ErrorAlert.vue'

// Instantiate the experiences composable
const {
  experiences,
  loading,
  error,
  selectedTechnology,
  uniqueTechnologies,
  filterByTechnology,
  clearFilter,
} = useExperiences()

// View layout: 'timeline' or 'grid'
const activeLayout = ref<'timeline' | 'grid'>('timeline')

// Search term
const searchQuery = ref('')

/**
 * Reactively filter the experiences based on search term.
 */
const filteredAndSearchedExperiences = computed(() => {
  const query = searchQuery.value.trim().toLowerCase()
  if (!query) {
    return experiences.value
  }
  return experiences.value.filter((exp) => {
    const matchCompany = exp.company.toLowerCase().includes(query)
    const matchPosition = exp.position.toLowerCase().includes(query)
    const matchDesc = exp.description.some((d) => d.toLowerCase().includes(query))
    const matchTech = exp.technologies.some((t) => t.name.toLowerCase().includes(query))
    return matchCompany || matchPosition || matchDesc || matchTech
  })
})

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
  <div class="experience-list-container">
    <!-- Filters Header -->
    <div class="filters-header">
      <div class="search-box">
        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" class="search-icon">
          <circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/>
        </svg>
        <input
          v-model="searchQuery"
          type="text"
          placeholder="Buscar cargo, empresa o tecnología..."
          class="search-input"
        />
        <button v-if="searchQuery" @click="searchQuery = ''" class="clear-search-btn">✕</button>
      </div>

      <div class="layout-controls">
        <button
          @click="activeLayout = 'timeline'"
          :class="{ active: activeLayout === 'timeline' }"
          title="Ver en Línea de Tiempo"
          class="control-btn"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <line x1="8" y1="6" x2="21" y2="6"/><line x1="8" y1="12" x2="21" y2="12"/><line x1="8" y1="18" x2="21" y2="18"/>
            <line x1="3" y1="6" x2="3.01" y2="6"/><line x1="3" y1="12" x2="3.01" y2="12"/><line x1="3" y1="18" x2="3.01" y2="18"/>
          </svg>
        </button>
        <button
          @click="activeLayout = 'grid'"
          :class="{ active: activeLayout === 'grid' }"
          title="Ver en Cuadrícula"
          class="control-btn"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <rect width="7" height="9" x="3" y="3" rx="1"/><rect width="7" height="5" x="14" y="3" rx="1"/>
            <rect width="7" height="9" x="14" y="12" rx="1"/><rect width="7" height="5" x="3" y="16" rx="1"/>
          </svg>
        </button>
      </div>
    </div>

    <!-- Tech Pills Filters -->
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

    <!-- Main Content Area -->
    <div class="content-area">
      <div v-if="loading" class="state-wrapper">
        <LoadingSpinner />
      </div>

      <div v-else-if="error" class="state-wrapper">
        <ErrorAlert :message="error" />
      </div>

      <div v-else-if="filteredAndSearchedExperiences.length === 0" class="empty-state">
        <div class="empty-icon">📂</div>
        <p class="empty-title">No se encontraron experiencias</p>
        <p class="empty-desc">Intenta cambiando el filtro de tecnología o el término de búsqueda.</p>
        <button @click="clearFilter(); searchQuery = ''" class="reset-filters-btn">Restablecer filtros</button>
      </div>

      <div v-else>
        <!-- Timeline Layout -->
        <ExperienceTimeline
          v-if="activeLayout === 'timeline'"
          :experiences="filteredAndSearchedExperiences"
        />

        <!-- Grid Layout -->
        <div v-else class="experiences-grid">
          <ExperienceCard
            v-for="experience in filteredAndSearchedExperiences"
            :key="experience.id"
            :experience="experience"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.experience-list-container {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  width: 100%;
}

.filters-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 1rem;
  flex-wrap: wrap;
}

.search-box {
  position: relative;
  flex-grow: 1;
  max-width: 500px;
  display: flex;
  align-items: center;
}

.search-icon {
  position: absolute;
  left: 1rem;
  color: var(--color-text);
  opacity: 0.5;
  pointer-events: none;
}

.search-input {
  width: 100%;
  padding: 0.75rem 1rem 0.75rem 2.8rem;
  border-radius: 12px;
  background: rgba(255, 255, 255, 0.02);
  border: 1px solid rgba(255, 255, 255, 0.08);
  color: var(--color-text);
  font-size: 0.95rem;
  transition: all 0.3s;
}

.search-input:focus {
  outline: none;
  background: rgba(255, 255, 255, 0.04);
  border-color: hsla(160, 100%, 37%, 0.5);
  box-shadow: 0 0 0 3px rgba(0, 189, 126, 0.15);
}

.clear-search-btn {
  position: absolute;
  right: 1rem;
  background: transparent;
  border: none;
  color: var(--color-text);
  opacity: 0.6;
  cursor: pointer;
  font-size: 0.9rem;
}

.clear-search-btn:hover {
  opacity: 1;
}

.layout-controls {
  display: flex;
  background: rgba(255, 255, 255, 0.03);
  padding: 0.25rem;
  border-radius: 10px;
  border: 1px solid rgba(255, 255, 255, 0.06);
}

.control-btn {
  background: transparent;
  border: none;
  color: var(--color-text);
  opacity: 0.6;
  padding: 0.5rem;
  border-radius: 8px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s;
}

.control-btn:hover {
  opacity: 1;
}

.control-btn.active {
  background: hsla(160, 100%, 37%, 1);
  color: #fff;
  opacity: 1;
  box-shadow: 0 2px 10px rgba(0, 189, 126, 0.3);
}

.tech-filters-bar {
  display: flex;
  align-items: center;
  gap: 1rem;
  flex-wrap: wrap;
  padding: 0.5rem 0;
  border-top: 1px solid rgba(255, 255, 255, 0.03);
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

.experiences-grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: 1.5rem;
}

@media (min-width: 768px) {
  .experiences-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

.state-wrapper {
  padding: 3rem 0;
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
  transform: translateY(-1px);
}
</style>
