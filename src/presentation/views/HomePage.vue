<script setup lang="ts">
import { useExperiences } from '../composables/experience/useExperiences.composable'
import { useProjects } from '../composables/project/useProjects.composable'
import { useSkills } from '../composables/skill/useSkills.composable'
import ExperienceCard from '../components/experience/ExperienceCard.component.vue'

// Load data from composables
const { currentJob } = useExperiences()
const { featuredProjects } = useProjects()
const { skills } = useSkills()

// Select top 6 skills to highlight on homepage
const featuredSkills = computed(() => {
  return skills.value.slice(0, 6)
})

import { computed } from 'vue'
</script>

<template>
  <div class="homepage-container">
    <!-- Hero Section -->
    <section class="hero-section">
      <div class="hero-content">
        <h1 class="name-title">Rubén Darío</h1>
        <h2 class="role-subtitle">Senior Full Stack Software Architect</h2>
        <p class="bio-text">
          Especialista en el diseño y desarrollo de arquitecturas escalables, sistemas limpios y mantenibles bajo principios SOLID y arquitectura hexagonal. Más de 15 años liderando implementaciones críticas y de alto rendimiento.
        </p>
        <div class="cta-buttons">
          <RouterLink to="/projects" class="btn primary-btn">Ver Proyectos</RouterLink>
          <RouterLink to="/experience" class="btn secondary-btn">Mi Experiencia</RouterLink>
        </div>
      </div>
    </section>

    <!-- Content Split Layout -->
    <div class="sections-grid">
      <!-- Left Column: Current Job & Core Skills -->
      <div class="grid-column">
        <!-- Current Role Summary -->
        <section class="home-section" v-if="currentJob">
          <div class="section-header">
            <h3 class="section-title">📍 Rol Actual</h3>
          </div>
          <ExperienceCard :experience="currentJob" />
        </section>

        <!-- Skill Highlights -->
        <section class="home-section" v-if="featuredSkills.length > 0">
          <div class="section-header">
            <h3 class="section-title">⚡ Habilidades Destacadas</h3>
            <RouterLink to="/about" class="view-link">Ver todas →</RouterLink>
          </div>
          <div class="skills-highlight-grid">
            <div v-for="skill in featuredSkills" :key="skill.id" class="skill-mini-card">
              <div class="skill-info">
                <span class="skill-name">{{ skill.name }}</span>
                <span class="skill-level-text">{{ skill.proficiencyLabel }}</span>
              </div>
              <div class="progress-bar-container">
                <div class="progress-bar" :style="{ width: skill.level + '%' }"></div>
              </div>
            </div>
          </div>
        </section>
      </div>

      <!-- Right Column: Featured Projects -->
      <div class="grid-column">
        <section class="home-section" v-if="featuredProjects.length > 0">
          <div class="section-header">
            <h3 class="section-title">🚀 Proyectos Destacados</h3>
            <RouterLink to="/projects" class="view-link">Ver todos →</RouterLink>
          </div>
          <div class="projects-highlight-list">
            <div v-for="project in featuredProjects" :key="project.id" class="project-mini-card">
              <img v-if="project.imageUrl" :src="project.imageUrl" :alt="project.title" class="project-img" />
              <div class="project-details">
                <h4 class="project-title">{{ project.title }}</h4>
                <p class="project-desc">{{ project.description }}</p>
                <div class="project-techs">
                  <span v-for="(t, index) in project.technologies.slice(0, 3)" :key="index" class="mini-tech-badge">
                    {{ t.name }}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  </div>
</template>

<style scoped>
.homepage-container {
  display: flex;
  flex-direction: column;
  gap: 3rem;
  width: 100%;
  padding-bottom: 3rem;
}

.hero-section {
  padding: 4rem 2rem;
  background: radial-gradient(circle at 10% 20%, rgba(0, 189, 126, 0.05) 0%, transparent 40%),
              radial-gradient(circle at 90% 80%, rgba(59, 130, 246, 0.03) 0%, transparent 40%);
  border-radius: 24px;
  border: 1px solid rgba(255, 255, 255, 0.03);
  text-align: center;
}

.hero-content {
  max-width: 800px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1.5rem;
}

.name-title {
  font-size: 3.5rem;
  font-weight: 800;
  letter-spacing: -0.02em;
  background: linear-gradient(135deg, #fff 30%, hsla(160, 100%, 37%, 1) 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  margin: 0;
}

.role-subtitle {
  font-size: 1.5rem;
  font-weight: 500;
  color: var(--color-text);
  opacity: 0.8;
  margin: 0;
}

.bio-text {
  font-size: 1.1rem;
  line-height: 1.6;
  color: var(--color-text);
  opacity: 0.9;
  margin: 0;
}

.cta-buttons {
  display: flex;
  gap: 1rem;
  margin-top: 0.5rem;
}

.btn {
  padding: 0.8rem 1.8rem;
  border-radius: 10px;
  font-size: 1rem;
  font-weight: 600;
  transition: all 0.3s;
  cursor: pointer;
}

.primary-btn {
  background: hsla(160, 100%, 37%, 1);
  color: #fff;
  border: none;
  box-shadow: 0 4px 15px rgba(0, 189, 126, 0.3);
}

.primary-btn:hover {
  background: hsla(160, 100%, 40%, 1);
  transform: translateY(-2px);
  box-shadow: 0 6px 20px rgba(0, 189, 126, 0.4);
}

.secondary-btn {
  background: rgba(255, 255, 255, 0.03);
  color: var(--color-text);
  border: 1px solid rgba(255, 255, 255, 0.08);
}

.secondary-btn:hover {
  background: rgba(255, 255, 255, 0.06);
  border-color: rgba(255, 255, 255, 0.15);
  transform: translateY(-2px);
}

.sections-grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: 2.5rem;
}

@media (min-width: 1024px) {
  .sections-grid {
    grid-template-columns: 1.1fr 0.9fr;
  }
}

.grid-column {
  display: flex;
  flex-direction: column;
  gap: 2.5rem;
}

.home-section {
  display: flex;
  flex-direction: column;
  gap: 1.25rem;
}

.section-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.section-title {
  font-size: 1.4rem;
  font-weight: 700;
  color: var(--color-heading);
  margin: 0;
}

.view-link {
  font-size: 0.9rem;
  color: hsla(160, 100%, 37%, 1);
  font-weight: 500;
}

.view-link:hover {
  opacity: 0.8;
}

/* Skills Highlight List */
.skills-highlight-grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: 1rem;
}

@media (min-width: 480px) {
  .skills-highlight-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

.skill-mini-card {
  background: rgba(255, 255, 255, 0.02);
  border: 1px solid rgba(255, 255, 255, 0.05);
  padding: 1rem;
  border-radius: 12px;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  transition: all 0.2s;
}

.skill-mini-card:hover {
  background: rgba(255, 255, 255, 0.04);
  border-color: rgba(255, 255, 255, 0.1);
}

.skill-info {
  display: flex;
  justify-content: space-between;
  font-size: 0.9rem;
}

.skill-name {
  font-weight: 600;
  color: var(--color-heading);
}

.skill-level-text {
  opacity: 0.7;
  font-size: 0.8rem;
}

.progress-bar-container {
  height: 4px;
  width: 100%;
  background: rgba(255, 255, 255, 0.08);
  border-radius: 2px;
  overflow: hidden;
}

.progress-bar {
  height: 100%;
  background: linear-gradient(90deg, hsla(160, 100%, 37%, 0.7), hsla(160, 100%, 37%, 1));
  border-radius: 2px;
}

/* Project Highlights List */
.projects-highlight-list {
  display: flex;
  flex-direction: column;
  gap: 1.25rem;
}

.project-mini-card {
  background: rgba(255, 255, 255, 0.02);
  border: 1px solid rgba(255, 255, 255, 0.05);
  border-radius: 16px;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  transition: all 0.3s;
}

.project-mini-card:hover {
  transform: translateY(-2px);
  background: rgba(255, 255, 255, 0.04);
  border-color: hsla(160, 100%, 37%, 0.2);
}

@media (min-width: 480px) {
  .project-mini-card {
    flex-direction: row;
    height: 140px;
  }
}

.project-img {
  width: 100%;
  height: 120px;
  object-fit: cover;
  flex-shrink: 0;
}

@media (min-width: 480px) {
  .project-img {
    width: 140px;
    height: 100%;
  }
}

.project-details {
  padding: 1rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 0.4rem;
  overflow: hidden;
}

.project-title {
  margin: 0;
  font-size: 1.05rem;
  font-weight: 600;
  color: var(--color-heading);
}

.project-desc {
  margin: 0;
  font-size: 0.85rem;
  opacity: 0.7;
  line-height: 1.4;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.project-techs {
  display: flex;
  gap: 0.35rem;
  margin-top: 0.25rem;
  flex-wrap: wrap;
}

.mini-tech-badge {
  font-size: 0.75rem;
  padding: 0.15rem 0.45rem;
  background: rgba(255, 255, 255, 0.04);
  border: 1px solid rgba(255, 255, 255, 0.08);
  border-radius: 4px;
  opacity: 0.85;
}
</style>
