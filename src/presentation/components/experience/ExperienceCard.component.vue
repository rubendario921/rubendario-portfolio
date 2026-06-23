<script setup lang="ts">
import type { ExperienceResponse } from '@/application/dto/experience/ExperienceResponse.dto'

/**
 * Component props definition.
 */
defineProps<{
  /**
   * The professional experience details mapping the DTO representation.
   */
  experience: ExperienceResponse
}>()
</script>

<template>
  <div class="experience-card" :class="{ 'current-job-card': experience.idCurrentJob }">
    <div class="card-header">
      <div class="logo-container">
        <img
          v-if="experience.companyLogo"
          :src="experience.companyLogo"
          :alt="experience.company"
          class="company-logo"
        />
        <div v-else class="company-logo-placeholder">
          {{ experience.company.charAt(0) }}
        </div>
      </div>
      <div class="header-info">
        <div class="position-badge-row">
          <h3 class="position">{{ experience.position }}</h3>
          <span v-if="experience.idCurrentJob" class="current-badge">Actual</span>
        </div>
        <h4 class="company">{{ experience.company }}</h4>
        <div class="date-duration">
          <span class="dates">{{ experience.startDate }} - {{ experience.endDate || 'Presente' }}</span>
          <span class="dot">•</span>
          <span class="duration">{{ experience.duration }}</span>
        </div>
      </div>
    </div>

    <div class="card-body">
      <ul class="description-list">
        <li v-for="(item, index) in experience.description" :key="index" class="description-item">
          {{ item }}
        </li>
      </ul>

      <div v-if="experience.achievements && experience.achievements.length > 0" class="achievements-section">
        <h5 class="section-title">Logros Destacados:</h5>
        <ul class="achievements-list">
          <li v-for="(achievement, idx) in experience.achievements" :key="idx" class="achievement-item">
            <span class="achievement-icon">★</span> {{ achievement }}
          </li>
        </ul>
      </div>
    </div>

    <div class="card-footer">
      <div class="tech-pills">
        <span
          v-for="(tech, index) in experience.technologies"
          :key="index"
          class="tech-pill"
          :class="tech.category.toLowerCase()"
        >
          {{ tech.name }}
        </span>
      </div>
    </div>
  </div>
</template>

<style scoped>
.experience-card {
  background: rgba(255, 255, 255, 0.02);
  border: 1px solid rgba(255, 255, 255, 0.05);
  border-radius: 16px;
  padding: 1.75rem;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  display: flex;
  flex-direction: column;
  gap: 1.25rem;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
  position: relative;
  overflow: hidden;
}

.experience-card:hover {
  transform: translateY(-4px);
  background: rgba(255, 255, 255, 0.04);
  border-color: hsla(160, 100%, 37%, 0.3);
  box-shadow: 0 12px 30px rgba(0, 189, 126, 0.08);
}

.current-job-card {
  border-left: 4px solid hsla(160, 100%, 37%, 1);
  background: rgba(0, 189, 126, 0.01);
}

.current-job-card::before {
  content: '';
  position: absolute;
  top: 0;
  right: 0;
  width: 120px;
  height: 120px;
  background: radial-gradient(circle, rgba(0, 189, 126, 0.06) 0%, transparent 70%);
  pointer-events: none;
}

.card-header {
  display: flex;
  gap: 1rem;
  align-items: flex-start;
}

.logo-container {
  width: 48px;
  height: 48px;
  border-radius: 12px;
  overflow: hidden;
  flex-shrink: 0;
  border: 1px solid rgba(255, 255, 255, 0.08);
  background: rgba(255, 255, 255, 0.03);
  display: flex;
  align-items: center;
  justify-content: center;
}

.company-logo {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.company-logo-placeholder {
  font-size: 1.5rem;
  font-weight: 700;
  color: hsla(160, 100%, 37%, 1);
}

.header-info {
  display: flex;
  flex-direction: column;
  gap: 0.2rem;
  flex-grow: 1;
}

.position-badge-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  gap: 0.5rem;
}

.position {
  font-size: 1.2rem;
  font-weight: 600;
  color: var(--color-heading);
  margin: 0;
}

.current-badge {
  font-size: 0.75rem;
  font-weight: 600;
  color: hsla(160, 100%, 37%, 1);
  background: rgba(0, 189, 126, 0.1);
  padding: 0.25rem 0.6rem;
  border-radius: 20px;
  border: 1px solid rgba(0, 189, 126, 0.2);
  text-transform: uppercase;
}

.company {
  font-size: 1rem;
  color: var(--color-text);
  opacity: 0.9;
  font-weight: 500;
  margin: 0;
}

.date-duration {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 0.85rem;
  color: var(--color-text);
  opacity: 0.7;
}

.dot {
  font-weight: bold;
}

.card-body {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.description-list {
  padding-left: 1.2rem;
  margin: 0;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.description-item {
  font-size: 0.95rem;
  line-height: 1.5;
  color: var(--color-text);
  opacity: 0.95;
}

.achievements-section {
  display: flex;
  flex-direction: column;
  gap: 0.4rem;
  background: rgba(255, 255, 255, 0.01);
  border-radius: 8px;
  padding: 0.75rem;
  border-left: 2px solid rgba(255, 255, 255, 0.1);
}

.section-title {
  margin: 0;
  font-size: 0.85rem;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  color: var(--color-text);
  opacity: 0.7;
  font-weight: 600;
}

.achievements-list {
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: column;
  gap: 0.3rem;
}

.achievement-item {
  font-size: 0.9rem;
  color: var(--color-text);
  opacity: 0.95;
  display: flex;
  gap: 0.5rem;
}

.achievement-icon {
  color: #fbbf24;
  flex-shrink: 0;
}

.tech-pills {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
}

.tech-pill {
  font-size: 0.8rem;
  padding: 0.25rem 0.6rem;
  border-radius: 6px;
  background: rgba(255, 255, 255, 0.04);
  color: var(--color-text);
  border: 1px solid rgba(255, 255, 255, 0.08);
  font-weight: 500;
  transition: all 0.2s;
}

.tech-pill:hover {
  transform: scale(1.05);
  border-color: rgba(255, 255, 255, 0.2);
}

/* Category-specific styling for Pills */
.tech-pill.frontend {
  background: rgba(59, 130, 246, 0.06);
  color: #60a5fa;
  border-color: rgba(59, 130, 246, 0.2);
}

.tech-pill.backend {
  background: rgba(16, 185, 129, 0.06);
  color: #34d399;
  border-color: rgba(16, 185, 129, 0.2);
}

.tech-pill.database {
  background: rgba(245, 158, 11, 0.06);
  color: #fbbf24;
  border-color: rgba(245, 158, 11, 0.2);
}

.tech-pill.devops {
  background: rgba(139, 92, 246, 0.06);
  color: #a78bfa;
  border-color: rgba(139, 92, 246, 0.2);
}

.tech-pill.mobile {
  background: rgba(236, 72, 153, 0.06);
  color: #f472b6;
  border-color: rgba(236, 72, 153, 0.2);
}
</style>
